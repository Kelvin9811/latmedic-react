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
 * Elimina la historia clínica (cliente) por cédula.
 * Por defecto hace borrado en cascada de Revisiones y Recetas.
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
    await deleteAllRevisionesByCedula(cedula);
    await deleteAllRecetasByCedula(cedula);
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
