import { generateClient } from 'aws-amplify/api';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';

const client = generateClient();

/**
 * Crea o actualiza Cliente usando la cédula como id
 */
export async function upsertClienteByCedula({ cedula, nombre, antecedentes }) {
  // 1) Buscar si existe por cédula
  const { data } = await client.graphql({
    query: queries.clienteByCedula,
    variables: { cedula, limit: 1 },
    authMode: 'userPool',
  });

  const existing = data?.clienteByCedula?.items?.[0];

  if (existing) {
    const input = {
      id: existing.id,
      nombre,
      antecedentes,
      // incluye _version si activaste conflict detection
      ...(existing._version !== undefined ? { _version: existing._version } : {}),
    };
    const res = await client.graphql({
      query: mutations.updateCliente,
      variables: { input },
      authMode: 'userPool',
    });
    return res.data.updateCliente;
  } else {
    const res = await client.graphql({
      query: mutations.createCliente,
      variables: { input: { id: cedula, cedula, nombre, antecedentes } },
      authMode: 'userPool',
    });
    return res.data.createCliente;
  }
}

/**
 * Devuelve la ficha del cliente (incluye relaciones paginadas)
 */
export async function getClienteFullByCedula(cedula) {
  const { data } = await client.graphql({
    query: queries.clienteByCedula,
    variables: { cedula, limit: 1 },
    authMode: 'userPool',
  });
  const cli = data?.clienteByCedula?.items?.[0];
  if (!cli) return null;

  const res = await client.graphql({
    query: queries.getCliente,
    variables: { id: cli.id },
    authMode: 'userPool',
  });
  return res.data.getCliente;
}

/**
 * Crear revisión
 */
export async function createRevision({ clienteID, parte, descripcion }) {
  const res = await client.graphql({
    query: mutations.createRevision,
    variables: {
      input: {
        clienteID,
        parte,
        descripcion,
        createdAt: new Date().toISOString(),
      },
    },
    authMode: 'userPool',
  });
  return res.data.createRevision;
}

/**
 * Listar revisiones (usa el índice generado: revisionsByClienteIDAndCreatedAt)
 */
export async function listRevisiones(clienteID, { limit = 20, nextToken, sortDirection = 'DESC' } = {}) {
  const { data } = await client.graphql({
    query: queries.revisionsByClienteIDAndCreatedAt,
    variables: { clienteID, sortDirection, limit, nextToken },
    authMode: 'userPool',
  });
  return data.revisionsByClienteIDAndCreatedAt; // { items, nextToken }
}

/**
 * Actualizar / Eliminar revisión (si activaste conflictos, incluye _version)
 */
export async function updateRevision({ id, parte, descripcion, _version }) {
  const res = await client.graphql({
    query: mutations.updateRevision,
    variables: { input: { id, parte, descripcion, _version } },
    authMode: 'userPool',
  });
  return res.data.updateRevision;
}
export async function deleteRevision({ id, _version }) {
  console.log('deleteRevision input:', { id, _version });
  const res = await client.graphql({
    query: mutations.deleteRevision,
    variables: { input: { id, _version } },
    authMode: 'userPool',
  });
  console.log('deleteRevision response:', res);
  return res.data.deleteRevision;
}

/**
 * (Metadatos) Crear/listar/actualizar/eliminar recetas
 * Nota: S3 lo añadimos después; por ahora s3key puede quedar vacío o con un texto.
 */
export async function createRecetaMeta({ clienteID, indicaciones, s3key }) {
  const res = await client.graphql({
    query: mutations.createReceta,
    variables: {
      input: {
        clienteID,
        indicaciones,
        s3key,
        createdAt: new Date().toISOString(),
      },
    },
    authMode: 'userPool',
  });
  return res.data.createReceta;
}
export async function listRecetas(clienteID, { limit = 20, nextToken, sortDirection = 'DESC' } = {}) {
  const { data } = await client.graphql({
    query: queries.recetasByClienteIDAndCreatedAt,
    variables: { clienteID, sortDirection, limit, nextToken },
    authMode: 'userPool',
  });
  return data.recetasByClienteIDAndCreatedAt; // { items, nextToken }
}
export async function updateReceta({ id, indicaciones, s3key, _version }) {
  const res = await client.graphql({
    query: mutations.updateReceta,
    variables: { input: { id, indicaciones, s3key, _version } },
    authMode: 'userPool',
  });
  return res.data.updateReceta;
}
export async function deleteReceta({ id, _version }) {
  const res = await client.graphql({
    query: mutations.deleteReceta,
    variables: { input: { id, _version } },
    authMode: 'userPool',
  });
  return res.data.deleteReceta;
}

// --- ELIMINAR EN CASCADA POR CÉDULA -----------------------------------------

/**
 * Elimina TODAS las revisiones del cliente (paginado).
 */
async function deleteAllRevisionesByCedula(cedula) {
  let nextToken = null;
  do {
    const { data } = await client.graphql({
      query: queries.revisionsByClienteIDAndCreatedAt,
      variables: { clienteID: cedula, limit: 50, nextToken, sortDirection: 'DESC' },
      authMode: 'userPool',
    });
    const page = data?.revisionsByClienteIDAndCreatedAt;
    const items = page?.items ?? [];
    for (const it of items) {
      await client.graphql({
        query: mutations.deleteRevision,
        variables: { input: { id: it.id, ...(it._version !== undefined ? { _version: it._version } : {}) } },
        authMode: 'userPool',
      });
    }
    nextToken = page?.nextToken ?? null;
  } while (nextToken);
}

/**
 * Elimina TODAS las recetas del cliente (paginado).
 */
async function deleteAllRecetasByCedula(cedula) {
  let nextToken = null;
  do {
    const { data } = await client.graphql({
      query: queries.recetasByClienteIDAndCreatedAt,
      variables: { clienteID: cedula, limit: 50, nextToken, sortDirection: 'DESC' },
      authMode: 'userPool',
    });
    const page = data?.recetasByClienteIDAndCreatedAt;
    const items = page?.items ?? [];
    for (const it of items) {
      await client.graphql({
        query: mutations.deleteReceta,
        variables: { input: { id: it.id, ...(it._version !== undefined ? { _version: it._version } : {}) } },
        authMode: 'userPool',
      });
    }
    nextToken = page?.nextToken ?? null;
  } while (nextToken);
}

/**
 * Elimina TODAS las consultas del cliente (paginado).
 */
async function deleteAllConsultasByCedula(cedula, cascade) {
  // Buscar el cliente por cédula
  const { data } = await client.graphql({
    query: queries.clienteByCedula,
    variables: { cedula, limit: 1 },
    authMode: 'userPool',
  });
  const cliente = data?.clienteByCedula?.items?.[0];
  if (!cliente) return;


  let nextToken = null;
  do {
    const resp = await client.graphql({
      query: queries.consultasByCliente,
      variables: { clienteID: cliente.id, limit: 50, nextToken, sortDirection: 'DESC' },
      authMode: 'userPool',
    });
    const page = resp?.data?.consultasByCliente;
    const items = page?.items ?? [];
    for (const consulta of items) {
      if (cascade) {
        await deleteAllRevisionesByConsulta(consulta.id);
        await deleteAllRecetasByConsulta(consulta.id);
        await deleteAllDocumentosByConsulta(consulta.id);
      }
      await client.graphql({
        query: mutations.deleteConsulta,
        variables: { input: { id: consulta.id, ...(consulta._version !== undefined ? { _version: consulta._version } : {}) } },
        authMode: 'userPool',
      });
    }
    nextToken = page?.nextToken ?? null;
  } while (nextToken);
}

/**
 * Elimina la historia clínica (cliente) por cédula.
 * Por defecto hace borrado en cascada de Revisiones, Recetas y Consultas.
 */
export async function deleteHistoriaClinicaByCedula(cedula, { cascade = true } = {}) {
  console.log(`Eliminando historia clínica para cédula: ${cedula}`);
  // 1) Buscar el cliente por cédula para obtener su ID (y _version si aplica)
  const { data } = await client.graphql({
    query: queries.clienteByCedula,
    variables: { cedula, limit: 1 },
    authMode: 'userPool',
  });

  const cliente = data?.clienteByCedula?.items?.[0];
  if (!cliente) return { ok: false, error: 'NOT_FOUND' };

  // 2) Borrado en cascada (primero hijos)
  if (cascade) {
    await deleteAllConsultasByCedula(cedula,true);
    // (Cuando integremos S3: aquí también borraremos los archivos si los tuviera)
  }

  // 3) Borrar el cliente
  const del = await client.graphql({
    query: mutations.deleteCliente,
    variables: { input: { id: cliente.id, ...(cliente._version !== undefined ? { _version: cliente._version } : {}) } },
    authMode: 'userPool',
  });

  return { ok: true, deleted: del.data.deleteCliente };
}

/* -------------------- CONSULTAS -------------------- */

// Crear una consulta para un paciente (por cédula)
export async function createConsultaForCedula(cedula, { motivo, diagnostico } = {}) {
  // busca el cliente
  const { data } = await client.graphql({
    query: queries.clienteByCedula,
    variables: { cedula, limit: 1 },
    authMode: 'userPool',
  });
  const cli = data?.clienteByCedula?.items?.[0];
  if (!cli) throw new Error('CLIENTE_NOT_FOUND');

  const res = await client.graphql({
    query: mutations.createConsulta,
    variables: { input: {
      clienteID: cli.id,
      motivo: motivo ?? null,
      diagnostico: diagnostico ?? null,
      createdAt: new Date().toISOString(),
    }},
    authMode: 'userPool',
  });
  return res.data.createConsulta;
}

// Listar consultas por cédula (ordenadas por fecha)
export async function listConsultasByCedula(cedula, { limit = 20, nextToken, sortDirection = 'DESC' } = {}) {
  const { data } = await client.graphql({
    query: queries.clienteByCedula,
    variables: { cedula, limit: 1 },
    authMode: 'userPool',
  });
  const cli = data?.clienteByCedula?.items?.[0];
  if (!cli) return { items: [], nextToken: null };

  const resp = await client.graphql({
    query: queries.consultasByCliente,
    variables: { clienteID: cli.id, sortDirection, limit, nextToken },
    authMode: 'userPool',
  });
  const conn = resp?.data?.consultasByCliente ?? {};
  return { items: conn.items ?? [], nextToken: conn.nextToken ?? null };
}

/* --------- Revisiones/Recetas/Documentos por CONSULTA --------- */

// Revisión
export async function addRevisionToConsulta(consultaID, { parte, descripcion }) {
  const res = await client.graphql({
    query: mutations.createRevision,
    variables: { input: {
      consultaID,
      parte,
      descripcion,
      createdAt: new Date().toISOString(),
    }},
    authMode: 'userPool',
  });
  return res.data.createRevision;
}

export async function listRevisionesByConsulta(consultaID, { limit = 50, nextToken, sortDirection = 'DESC' } = {}) {
  const { data } = await client.graphql({
    query: queries.revisionesByConsulta,
    variables: { consultaID, sortDirection, limit, nextToken },
    authMode: 'userPool',
  });
  const conn = data?.revisionesByConsulta ?? {};
  return { items: (conn.items ?? []).filter(Boolean), nextToken: conn.nextToken ?? null };
}

// Receta (metadatos; S3 lo vemos luego)
export async function addRecetaToConsulta(consultaID, { indicaciones, s3key }) {
  const res = await client.graphql({
    query: mutations.createReceta,
    variables: { input: {
      consultaID,
      indicaciones: indicaciones ?? null,
      s3key: s3key ?? null,
      createdAt: new Date().toISOString(),
    }},
    authMode: 'userPool',
  });
  return res.data.createReceta;
}

export async function listRecetasByConsulta(consultaID, { limit = 50, nextToken, sortDirection = 'DESC' } = {}) {
  const { data } = await client.graphql({
    query: queries.recetasByConsulta,
    variables: { consultaID, sortDirection, limit, nextToken },
    authMode: 'userPool',
  });
  const conn = data?.recetasByConsulta ?? {};
  return { items: (conn.items ?? []).filter(Boolean), nextToken: conn.nextToken ?? null };
}

// Documento (metadatos; luego subimos a S3)
export async function addDocumentoToConsulta(consultaID, { tipo, titulo, s3key, notas }) {
  const res = await client.graphql({
    query: mutations.createDocumento,
    variables: { input: {
      consultaID,
      tipo: tipo ?? 'OTRO',
      titulo: titulo ?? null,
      s3key: s3key ?? null,
      notas: notas ?? null,
      createdAt: new Date().toISOString(),
    }},
    authMode: 'userPool',
  });
  return res.data.createDocumento;
}

export async function listDocumentosByConsulta(consultaID, { limit = 50, nextToken, sortDirection = 'DESC' } = {}) {
  const { data } = await client.graphql({
    query: queries.documentosByConsulta,
    variables: { consultaID, sortDirection, limit, nextToken },
    authMode: 'userPool',
  });
  const conn = data?.documentosByConsulta ?? {};
  return { items: (conn.items ?? []).filter(Boolean), nextToken: conn.nextToken ?? null };
}

export async function updateDocumento({
  id,
  titulo,
  tipo,        // 'RX' | 'ECO' | 'LAB' | 'PDF' | 'IMG' | 'OTRO'
  notas,
  s3key,       // si reemplazas el archivo en S3
  consultaID,  // opcional: re-asignar a otra consulta
  _version
}) {
  const input = { id };
  if (titulo !== undefined) input.titulo = titulo;
  if (tipo !== undefined) input.tipo = tipo;
  if (notas !== undefined) input.notas = notas;
  if (s3key !== undefined) input.s3key = s3key;
  if (consultaID !== undefined) input.consultaID = consultaID;
  if (_version !== undefined) input._version = _version;

  const { data } = await client.graphql({
    query: mutations.updateDocumento,
    variables: { input },
    authMode: 'userPool',
  });
  return data.updateDocumento;
}

/**
 * Elimina un Documento por id.
 * Con Conflict Detection, envía también _version.
 */
export async function deleteDocumento({ id, _version }) {
  const { data } = await client.graphql({
    query: mutations.deleteDocumento,
    variables: { input: _version ? { id, _version } : { id } },
    authMode: 'userPool',
  });
  return data.deleteDocumento;
}

/**
 * Elimina TODAS las revisiones de una consulta (paginado).
 */
export async function deleteAllRevisionesByConsulta(consultaID) {
  let nextToken = null;
  do {
    const { data } = await client.graphql({
      query: queries.revisionesByConsulta,
      variables: { consultaID, limit: 50, nextToken, sortDirection: 'DESC' },
      authMode: 'userPool',
    });
    const page = data?.revisionesByConsulta;
    const items = page?.items ?? [];
    for (const it of items) {
      await client.graphql({
        query: mutations.deleteRevision,
        variables: { input: { id: it.id, ...(it._version !== undefined ? { _version: it._version } : {}) } },
        authMode: 'userPool',
      });
    }
    nextToken = page?.nextToken ?? null;
  } while (nextToken);
}

/**
 * Elimina TODAS las recetas de una consulta (paginado).
 */
export async function deleteAllRecetasByConsulta(consultaID) {
  let nextToken = null;
  do {
    const { data } = await client.graphql({
      query: queries.recetasByConsulta,
      variables: { consultaID, limit: 50, nextToken, sortDirection: 'DESC' },
      authMode: 'userPool',
    });
    const page = data?.recetasByConsulta;
    const items = page?.items ?? [];
    for (const it of items) {
      await client.graphql({
        query: mutations.deleteReceta,
        variables: { input: { id: it.id, ...(it._version !== undefined ? { _version: it._version } : {}) } },
        authMode: 'userPool',
      });
    }
    nextToken = page?.nextToken ?? null;
  } while (nextToken);
}

/**
 * Elimina TODOS los documentos de una consulta (paginado).
 */
export async function deleteAllDocumentosByConsulta(consultaID) {
  let nextToken = null;
  do {
    const { data } = await client.graphql({
      query: queries.documentosByConsulta,
      variables: { consultaID, limit: 50, nextToken, sortDirection: 'DESC' },
      authMode: 'userPool',
    });
    const page = data?.documentosByConsulta;
    const items = page?.items ?? [];
    for (const it of items) {
      await client.graphql({
        query: mutations.deleteDocumento,
        variables: { input: { id: it.id, ...(it._version !== undefined ? { _version: it._version } : {}) } },
        authMode: 'userPool',
      });
    }
    nextToken = page?.nextToken ?? null;
  } while (nextToken);
}

/**
 * Listar clientes (historias clínicas) con paginado.
 */
export async function listClientes({ limit = 10, nextToken } = {}) {
  const { data } = await client.graphql({
    query: queries.listClientes,
    variables: { limit, nextToken },
    authMode: 'userPool',
  });
  const conn = data?.listClientes ?? {};
  return { items: conn.items ?? [], nextToken: conn.nextToken ?? null };
}