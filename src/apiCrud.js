import { generateClient } from 'aws-amplify/api';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';

const client = generateClient();

// ---------- helpers ----------
const pickConn = (resp, key) => resp?.data?.[key] ?? {};
const pickItems = (conn) => (conn?.items ?? []).filter(Boolean);

// Paginador generico: llama fn({ nextToken }) hasta agotar
async function collectAll(fn, limit = 100) {
  let nextToken = null;
  const all = [];
  do {
    const { dataKey, resp } = await fn({ nextToken, limit });
    const conn = pickConn(resp, dataKey);
    all.push(...pickItems(conn));
    nextToken = conn.nextToken ?? null;
  } while (nextToken);
  return all;
}

// =====================================================
//                      CLIENTE
// =====================================================

/**
 * Crea/Actualiza un Cliente (usa la cédula como id estable).
 * Solo actualiza los campos provistos.
 */
export async function upsertClienteByCedula(input) {
  const { cedula, ...rest } = input;
  if (!cedula) throw new Error('Falta cedula');

  // Buscar si ya existe por cédula
  const found = await client.graphql({
    query: queries.clienteByCedula,
    variables: { cedula, limit: 1 },
    authMode: 'userPool',
  });
  const existing = found?.data?.clienteByCedula?.items?.[0];

  if (existing) {
    const updateInput = { id: existing.id, ...rest };
    if (existing._version !== undefined) updateInput._version = existing._version; // si activaste conflictos
    const res = await client.graphql({
      query: mutations.updateCliente,
      variables: { input: updateInput },
      authMode: 'userPool',
    });
    return res.data.updateCliente;
  } else {
    const createInput = { id: cedula, cedula, ...rest };
    const res = await client.graphql({
      query: mutations.createCliente,
      variables: { input: createInput },
      authMode: 'userPool',
    });
    return res.data.createCliente;
  }
}

/** Obtiene el Cliente por cédula (y opcionalmente hace un get por id). */
export async function getClienteByCedula(cedula, withGet = false) {
  const found = await client.graphql({
    query: queries.clienteByCedula,
    variables: { cedula, limit: 1 },
    authMode: 'userPool',
  });
  const cli = found?.data?.clienteByCedula?.items?.[0] ?? null;
  if (!withGet || !cli) return cli;

  const res = await client.graphql({
    query: queries.getCliente,
    variables: { id: cli.id },
    authMode: 'userPool',
  });
  return res.data.getCliente;
}

/** Elimina historia clínica por cédula. Hace borrado en cascada de Consultas, Recetas y Documentos. */
export async function deleteHistoriaClinicaByCedula(cedula, { cascade = true } = {}) {
  const found = await client.graphql({
    query: queries.clienteByCedula,
    variables: { cedula, limit: 1 },
    authMode: 'userPool',
  });
  const cliente = found?.data?.clienteByCedula?.items?.[0];
  if (!cliente) return { ok: false, error: 'NOT_FOUND' };

  if (cascade) {
    // borrar todas las consultas del cliente (y sus hijos)
    const consultas = await listConsultasByCedula(cedula).then(r => r.items);
    for (const c of consultas) {
      await deleteConsultaById(c.id, { cascade: true });
    }
  }

  const del = await client.graphql({
    query: mutations.deleteCliente,
    variables: { input: (cliente._version !== undefined) ? { id: cliente.id, _version: cliente._version } : { id: cliente.id } },
    authMode: 'userPool',
  });
  return { ok: true, deleted: del.data.deleteCliente };
}

// =====================================================
//                      CONSULTA
// =====================================================

/** Crea una Consulta para la cédula dada. */
export async function createConsultaForCedula(cedula, fields = {}) {
  const found = await client.graphql({
    query: queries.clienteByCedula,
    variables: { cedula, limit: 1 },
    authMode: 'userPool',
  });
  const cli = found?.data?.clienteByCedula?.items?.[0];
  if (!cli) throw new Error('CLIENTE_NOT_FOUND');

  const res = await client.graphql({
    query: mutations.createConsulta,
    variables: {
      input: {
        clienteID: cli.id,
        createdAt: new Date().toISOString(),
        ...fields,
      },
    },
    authMode: 'userPool',
  });
  return res.data.createConsulta; // { id, ... }
}

/** Lista consultas por cédula. Devuelve { items, nextToken }. */
export async function listConsultasByCedula(cedula, { limit = 20, nextToken, sortDirection = 'DESC' } = {}) {
  // obtener id de cliente
  const found = await client.graphql({
    query: queries.clienteByCedula,
    variables: { cedula, limit: 1 },
    authMode: 'userPool',
  });
  const cli = found?.data?.clienteByCedula?.items?.[0];
  if (!cli) return { items: [], nextToken: null };

  const resp = await client.graphql({
    query: queries.consultasByCliente,
    variables: { clienteID: cli.id, sortDirection, limit, nextToken },
    authMode: 'userPool',
  });
  const conn = pickConn(resp, 'consultasByCliente');
  return { items: pickItems(conn), nextToken: conn.nextToken ?? null };
}

/** Obtiene una consulta por id. */
export async function getConsultaById(id) {
  const res = await client.graphql({
    query: queries.getConsulta,
    variables: { id },
    authMode: 'userPool',
  });
  return res.data.getConsulta;
}

/** Actualiza una consulta (envía solo campos que cambian). */
export async function updateConsulta(input) {
  if (!input?.id) throw new Error('Falta id');
  const res = await client.graphql({
    query: mutations.updateConsulta,
    variables: { input },
    authMode: 'userPool',
  });
  return res.data.updateConsulta;
}

/** Elimina una consulta por id. Si cascade=true, borra sus Recetas y Documentos. */
export async function deleteConsultaById(id, { cascade = true } = {}) {
  if (cascade) {
    // borrar todos los hijos primero
    const recetas = await collectAll(async ({ nextToken, limit }) => ({
      dataKey: 'recetasByConsulta',
      resp: await client.graphql({
        query: queries.recetasByConsulta,
        variables: { consultaID: id, limit, nextToken, sortDirection: 'DESC' },
        authMode: 'userPool',
      }),
    }));

    for (const r of recetas) {
      await deleteReceta({ id: r.id, _version: r._version });
    }

    const docs = await collectAll(async ({ nextToken, limit }) => ({
      dataKey: 'documentosByConsulta',
      resp: await client.graphql({
        query: queries.documentosByConsulta,
        variables: { consultaID: id, limit, nextToken, sortDirection: 'DESC' },
        authMode: 'userPool',
      }),
    }));

    for (const d of docs) {
      await deleteDocumento({ id: d.id, _version: d._version });
    }
  }

  // Necesitamos la _version si hay conflictos activados. Si no la tienes, intenta delete con solo id.
  try {
    // Intento con version (si la tienes)
    const current = await getConsultaById(id);
    const res = await client.graphql({
      query: mutations.deleteConsulta,
      variables: { input: current?._version !== undefined ? { id, _version: current._version } : { id } },
      authMode: 'userPool',
    });
    return res.data.deleteConsulta;
  } catch (e) {
    // Fallback sin version
    const res = await client.graphql({
      query: mutations.deleteConsulta,
      variables: { input: { id } },
      authMode: 'userPool',
    });
    return res.data.deleteConsulta;
  }
}

// =====================================================
//                      RECETA
// =====================================================

/** Crea una receta bajo una consulta. (El archivo S3 es aparte; aquí guardas el s3key) */
export async function addRecetaToConsulta(consultaID, { indicaciones, s3key } = {}) {
  const res = await client.graphql({
    query: mutations.createReceta,
    variables: {
      input: {
        consultaID,
        indicaciones: indicaciones ?? null,
        s3key: s3key ?? null,
        createdAt: new Date().toISOString(),
      },
    },
    authMode: 'userPool',
  });
  return res.data.createReceta;
}

/** Lista recetas por consulta. */
export async function listRecetasByConsulta(consultaID, { limit = 50, nextToken, sortDirection = 'DESC' } = {}) {
  const resp = await client.graphql({
    query: queries.recetasByConsulta,
    variables: { consultaID, limit, nextToken, sortDirection },
    authMode: 'userPool',
  });
  const conn = pickConn(resp, 'recetasByConsulta');
  return { items: pickItems(conn), nextToken: conn.nextToken ?? null };
}

/** (Legacy) Lista recetas por cédula del cliente. */
export async function listRecetasByCedula(cedula, { limit = 50, nextToken, sortDirection = 'DESC' } = {}) {
  // este query existe por el índice legacy del schema
  const resp = await client.graphql({
    query: queries.recetasByClienteIDAndCreatedAt,
    variables: { clienteID: cedula, limit, nextToken, sortDirection },
    authMode: 'userPool',
  });
  const conn = pickConn(resp, 'recetasByClienteIDAndCreatedAt');
  return { items: pickItems(conn), nextToken: conn.nextToken ?? null };
}

export async function updateReceta(input) {
  if (!input?.id) throw new Error('Falta id');
  const res = await client.graphql({
    query: mutations.updateReceta,
    variables: { input },
    authMode: 'userPool',
  });
  return res.data.updateReceta;
}

export async function deleteReceta({ id, _version }) {
  const res = await client.graphql({
    query: mutations.deleteReceta,
    variables: { input: _version !== undefined ? { id, _version } : { id } },
    authMode: 'userPool',
  });
  return res.data.deleteReceta;
}

// =====================================================
//                      DOCUMENTO
// =====================================================

/** Crea un documento (metadatos). El archivo real lo subes a S3 aparte y guardas su s3key aquí. */
export async function addDocumentoToConsulta(consultaID, { tipo, titulo, s3key, notas } = {}) {
  const res = await client.graphql({
    query: mutations.createDocumento,
    variables: {
      input: {
        consultaID,
        tipo: tipo ?? 'OTRO',
        titulo: titulo ?? null,
        s3key: s3key ?? null,
        notas: notas ?? null,
        createdAt: new Date().toISOString(),
      },
    },
    authMode: 'userPool',
  });
  return res.data.createDocumento;
}

/** Lista documentos por consulta. */
export async function listDocumentosByConsulta(consultaID, { limit = 50, nextToken, sortDirection = 'DESC' } = {}) {
  const resp = await client.graphql({
    query: queries.documentosByConsulta,
    variables: { consultaID, limit, nextToken, sortDirection },
    authMode: 'userPool',
  });
  const conn = pickConn(resp, 'documentosByConsulta');
  return { items: pickItems(conn), nextToken: conn.nextToken ?? null };
}

export async function updateDocumento(input) {
  if (!input?.id) throw new Error('Falta id');
  const res = await client.graphql({
    query: mutations.updateDocumento,
    variables: { input },
    authMode: 'userPool',
  });
  return res.data.updateDocumento;
}

export async function deleteDocumento({ id, _version }) {
  const res = await client.graphql({
    query: mutations.deleteDocumento,
    variables: { input: _version !== undefined ? { id, _version } : { id } },
    authMode: 'userPool',
  });
  return res.data.deleteDocumento;
}

/** Lista clientes con paginación. Devuelve { items, nextToken }. */
export async function listClientes({ limit = 10, nextToken } = {}) {
  const resp = await client.graphql({
    query: queries.listClientes,
    variables: { limit, nextToken },
    authMode: 'userPool',
  });
  const conn = pickConn(resp, 'listClientes');
  return { items: pickItems(conn), nextToken: conn.nextToken ?? null };
}
