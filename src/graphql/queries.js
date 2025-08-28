/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCliente = /* GraphQL */ `
  query GetCliente($id: ID!) {
    getCliente(id: $id) {
      id
      cedula
      nombre
      antecedentes
      consultas {
        items {
          id
          clienteID
          motivo
          diagnostico
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
        consultas {
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
export const getConsulta = /* GraphQL */ `
  query GetConsulta($id: ID!) {
    getConsulta(id: $id) {
      id
      clienteID
      motivo
      diagnostico
      createdAt
      revisiones {
        items {
          id
          clienteID
          consultaID
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
          consultaID
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
      documentos {
        items {
          id
          consultaID
          tipo
          titulo
          s3key
          notas
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      updatedAt
      owner
      __typename
    }
  }
`;
export const listConsultas = /* GraphQL */ `
  query ListConsultas(
    $filter: ModelConsultaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConsultas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        clienteID
        motivo
        diagnostico
        createdAt
        revisiones {
          nextToken
          __typename
        }
        recetas {
          nextToken
          __typename
        }
        documentos {
          nextToken
          __typename
        }
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
      consultaID
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
        consultaID
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
      consultaID
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
        consultaID
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
export const getDocumento = /* GraphQL */ `
  query GetDocumento($id: ID!) {
    getDocumento(id: $id) {
      id
      consultaID
      tipo
      titulo
      s3key
      notas
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listDocumentos = /* GraphQL */ `
  query ListDocumentos(
    $filter: ModelDocumentoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDocumentos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        consultaID
        tipo
        titulo
        s3key
        notas
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
        consultas {
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
export const consultasByCliente = /* GraphQL */ `
  query ConsultasByCliente(
    $clienteID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelConsultaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    consultasByCliente(
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
        motivo
        diagnostico
        createdAt
        revisiones {
          nextToken
          __typename
        }
        recetas {
          nextToken
          __typename
        }
        documentos {
          nextToken
          __typename
        }
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
        consultaID
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
export const revisionesByConsulta = /* GraphQL */ `
  query RevisionesByConsulta(
    $consultaID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRevisionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    revisionesByConsulta(
      consultaID: $consultaID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        clienteID
        consultaID
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
        consultaID
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
export const recetasByConsulta = /* GraphQL */ `
  query RecetasByConsulta(
    $consultaID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRecetaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    recetasByConsulta(
      consultaID: $consultaID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        clienteID
        consultaID
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
export const documentosByConsulta = /* GraphQL */ `
  query DocumentosByConsulta(
    $consultaID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDocumentoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    documentosByConsulta(
      consultaID: $consultaID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        consultaID
        tipo
        titulo
        s3key
        notas
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
