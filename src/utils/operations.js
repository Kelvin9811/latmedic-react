// src/main.tsx
import { Amplify } from 'aws-amplify';
import outputs from './amplify_outputs.json';
Amplify.configure(outputs);

// src/data.ts
import { generateClient } from 'aws-amplify/api';
import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries';
export const client = generateClient();

// Guardar ficha del cliente
export async function upsertCliente({ id, nombre, antecedentes }) {
  return client.graphql({
    query: mutations.createCliente, // o updateCliente si ya existe
    variables: { input: { id, nombre, antecedentes } }
  });
}

// Añadir revisión
export async function addRevision({ clienteID, parte, descripcion }) {
  return client.graphql({
    query: mutations.createRevision,
    variables: { input: { clienteID, parte, descripcion } }
  });
}

// Listar revisiones por cliente
export async function listRevisiones(clienteID) {
  return client.graphql({
    query: queries.revisionsByCliente, // generado por @index/@hasMany
    variables: { clienteID }
  });
}
