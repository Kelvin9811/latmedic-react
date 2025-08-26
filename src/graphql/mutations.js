/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCliente = /* GraphQL */ `
  mutation CreateCliente(
    $input: CreateClienteInput!
    $condition: ModelClienteConditionInput
  ) {
    createCliente(input: $input, condition: $condition) {
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
export const updateCliente = /* GraphQL */ `
  mutation UpdateCliente(
    $input: UpdateClienteInput!
    $condition: ModelClienteConditionInput
  ) {
    updateCliente(input: $input, condition: $condition) {
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
export const deleteCliente = /* GraphQL */ `
  mutation DeleteCliente(
    $input: DeleteClienteInput!
    $condition: ModelClienteConditionInput
  ) {
    deleteCliente(input: $input, condition: $condition) {
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
export const createRevision = /* GraphQL */ `
  mutation CreateRevision(
    $input: CreateRevisionInput!
    $condition: ModelRevisionConditionInput
  ) {
    createRevision(input: $input, condition: $condition) {
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
export const updateRevision = /* GraphQL */ `
  mutation UpdateRevision(
    $input: UpdateRevisionInput!
    $condition: ModelRevisionConditionInput
  ) {
    updateRevision(input: $input, condition: $condition) {
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
export const deleteRevision = /* GraphQL */ `
  mutation DeleteRevision(
    $input: DeleteRevisionInput!
    $condition: ModelRevisionConditionInput
  ) {
    deleteRevision(input: $input, condition: $condition) {
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
export const createReceta = /* GraphQL */ `
  mutation CreateReceta(
    $input: CreateRecetaInput!
    $condition: ModelRecetaConditionInput
  ) {
    createReceta(input: $input, condition: $condition) {
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
export const updateReceta = /* GraphQL */ `
  mutation UpdateReceta(
    $input: UpdateRecetaInput!
    $condition: ModelRecetaConditionInput
  ) {
    updateReceta(input: $input, condition: $condition) {
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
export const deleteReceta = /* GraphQL */ `
  mutation DeleteReceta(
    $input: DeleteRecetaInput!
    $condition: ModelRecetaConditionInput
  ) {
    deleteReceta(input: $input, condition: $condition) {
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
