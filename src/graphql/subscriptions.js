/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCliente = /* GraphQL */ `
  subscription OnCreateCliente(
    $filter: ModelSubscriptionClienteFilterInput
    $owner: String
  ) {
    onCreateCliente(filter: $filter, owner: $owner) {
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
export const onUpdateCliente = /* GraphQL */ `
  subscription OnUpdateCliente(
    $filter: ModelSubscriptionClienteFilterInput
    $owner: String
  ) {
    onUpdateCliente(filter: $filter, owner: $owner) {
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
export const onDeleteCliente = /* GraphQL */ `
  subscription OnDeleteCliente(
    $filter: ModelSubscriptionClienteFilterInput
    $owner: String
  ) {
    onDeleteCliente(filter: $filter, owner: $owner) {
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
export const onCreateRevision = /* GraphQL */ `
  subscription OnCreateRevision(
    $filter: ModelSubscriptionRevisionFilterInput
    $owner: String
  ) {
    onCreateRevision(filter: $filter, owner: $owner) {
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
export const onUpdateRevision = /* GraphQL */ `
  subscription OnUpdateRevision(
    $filter: ModelSubscriptionRevisionFilterInput
    $owner: String
  ) {
    onUpdateRevision(filter: $filter, owner: $owner) {
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
export const onDeleteRevision = /* GraphQL */ `
  subscription OnDeleteRevision(
    $filter: ModelSubscriptionRevisionFilterInput
    $owner: String
  ) {
    onDeleteRevision(filter: $filter, owner: $owner) {
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
export const onCreateReceta = /* GraphQL */ `
  subscription OnCreateReceta(
    $filter: ModelSubscriptionRecetaFilterInput
    $owner: String
  ) {
    onCreateReceta(filter: $filter, owner: $owner) {
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
export const onUpdateReceta = /* GraphQL */ `
  subscription OnUpdateReceta(
    $filter: ModelSubscriptionRecetaFilterInput
    $owner: String
  ) {
    onUpdateReceta(filter: $filter, owner: $owner) {
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
export const onDeleteReceta = /* GraphQL */ `
  subscription OnDeleteReceta(
    $filter: ModelSubscriptionRecetaFilterInput
    $owner: String
  ) {
    onDeleteReceta(filter: $filter, owner: $owner) {
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
