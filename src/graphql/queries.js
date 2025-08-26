/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCliente = /* GraphQL */ `
  query GetCliente($id: ID!) {
    getCliente(id: $id) {
      id
      cedula
      nombre
      antecedentes
      revisiones {
        items {
          id
          clienteID
          parte
          descripcion
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      recetas {
        items {
          id
          clienteID
          indicaciones
          s3key
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listClientes = /* GraphQL */ `
  query ListClientes(
    $filter: ModelClienteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClientes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        cedula
        nombre
        antecedentes
        revisiones {
          nextToken
          __typename
        }
        recetas {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getRevision = /* GraphQL */ `
  query GetRevision($id: ID!) {
    getRevision(id: $id) {
      id
      clienteID
      parte
      descripcion
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listRevisions = /* GraphQL */ `
  query ListRevisions(
    $filter: ModelRevisionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRevisions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        clienteID
        parte
        descripcion
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getReceta = /* GraphQL */ `
  query GetReceta($id: ID!) {
    getReceta(id: $id) {
      id
      clienteID
      indicaciones
      s3key
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listRecetas = /* GraphQL */ `
  query ListRecetas(
    $filter: ModelRecetaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecetas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        clienteID
        indicaciones
        s3key
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const clienteByCedula = /* GraphQL */ `
  query ClienteByCedula(
    $cedula: String!
    $sortDirection: ModelSortDirection
    $filter: ModelClienteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    clienteByCedula(
      cedula: $cedula
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        cedula
        nombre
        antecedentes
        revisiones {
          nextToken
          __typename
        }
        recetas {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const revisionsByClienteIDAndCreatedAt = /* GraphQL */ `
  query RevisionsByClienteIDAndCreatedAt(
    $clienteID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRevisionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    revisionsByClienteIDAndCreatedAt(
      clienteID: $clienteID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        clienteID
        parte
        descripcion
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const recetasByClienteIDAndCreatedAt = /* GraphQL */ `
  query RecetasByClienteIDAndCreatedAt(
    $clienteID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRecetaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    recetasByClienteIDAndCreatedAt(
      clienteID: $clienteID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        clienteID
        indicaciones
        s3key
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
