/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCliente = /* GraphQL */ `
  query GetCliente($id: ID!) {
    getCliente(id: $id) {
      id
      cedula
      nombre
      direccionResidenciaHabitual
      barrio
      parroquia
      canton
      provincia
      telefono
      grupoSanguineoYFactorRh
      antecedenteAlergico
      antecedenteClinico
      antecedenteGinecologico
      antecedenteTraumatologico
      antecedenteQuirurgico
      antecedenteFarmacoLogico
      antecedentePsiquiatrico
      antecedenteOtro
      fechaNacimiento
      lugarNacimiento
      nacionalidad
      grupoCultural
      edadEnAnosCumplidos
      sexo
      estadoCivil
      nivelEducativo
      fechaAdmision
      ocupacion
      empresaDondeTrabaja
      tipoSeguroSalud
      referidoDe
      enCasoDeAvisarA
      parentescoAfinidad
      direccion
      consultas {
        items {
          id
          clienteID
          createdAt
          hora
          motivoDeConsulta
          enfermedadActual
          presionArterial
          frecuenciaCardiaca
          frecuenciaRespiratoria
          temperaturaBucal
          temperaturaAxilar
          peso
          talla
          gaslowOcular
          gaslowVerbal
          gaslowMotora
          gaslowTotal
          reaccionPupilaIzq
          reaccionPupilaDer
          tiempoLlenadoCapilar
          saturacionOxigeno
          viaAereaObstruida
          cabeza
          cuello
          torax
          abdomen
          columna
          pelvis
          extremidades
          heridaPenetrante
          heridaCortante
          fracturaExpuesta
          fracturaCerrada
          cuerpoExtrano
          hemorragia
          mordedura
          picadura
          excoriacion
          deformidadOMasa
          hematoma
          eritemaInflamacion
          luxacionEsguince
          quemadura
          solicitudExamenBiometria
          solicitudExamenUroanalisis
          solicitudExamenQuimicaSanguinea
          solicitudExamenElectrolitos
          solicitudExamenGasometria
          solicitudExamenElectrocardiograma
          solicitudExamenEndoscopia
          solicitudExamenRxTorax
          solicitudExamenRxAbdomen
          solicitudExamenRxOsea
          solicitudExamenTomografia
          solicitudExamenResonancia
          solicitudExamenEcografiaPelvica
          solicitudExamenEcografiaAbdomen
          solicitudExamenInterconsulta
          solicitudExamenOtros
          diagnosticodeIngreso
          diagnosticodeAltade
          planDeTratamientoIndicaciones
          planDeTratamientoMedicamentos
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
        direccionResidenciaHabitual
        barrio
        parroquia
        canton
        provincia
        telefono
        grupoSanguineoYFactorRh
        antecedenteAlergico
        antecedenteClinico
        antecedenteGinecologico
        antecedenteTraumatologico
        antecedenteQuirurgico
        antecedenteFarmacoLogico
        antecedentePsiquiatrico
        antecedenteOtro
        fechaNacimiento
        lugarNacimiento
        nacionalidad
        grupoCultural
        edadEnAnosCumplidos
        sexo
        estadoCivil
        nivelEducativo
        fechaAdmision
        ocupacion
        empresaDondeTrabaja
        tipoSeguroSalud
        referidoDe
        enCasoDeAvisarA
        parentescoAfinidad
        direccion
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
      createdAt
      hora
      motivoDeConsulta
      enfermedadActual
      presionArterial
      frecuenciaCardiaca
      frecuenciaRespiratoria
      temperaturaBucal
      temperaturaAxilar
      peso
      talla
      gaslowOcular
      gaslowVerbal
      gaslowMotora
      gaslowTotal
      reaccionPupilaIzq
      reaccionPupilaDer
      tiempoLlenadoCapilar
      saturacionOxigeno
      viaAereaObstruida
      cabeza
      cuello
      torax
      abdomen
      columna
      pelvis
      extremidades
      heridaPenetrante
      heridaCortante
      fracturaExpuesta
      fracturaCerrada
      cuerpoExtrano
      hemorragia
      mordedura
      picadura
      excoriacion
      deformidadOMasa
      hematoma
      eritemaInflamacion
      luxacionEsguince
      quemadura
      solicitudExamenBiometria
      solicitudExamenUroanalisis
      solicitudExamenQuimicaSanguinea
      solicitudExamenElectrolitos
      solicitudExamenGasometria
      solicitudExamenElectrocardiograma
      solicitudExamenEndoscopia
      solicitudExamenRxTorax
      solicitudExamenRxAbdomen
      solicitudExamenRxOsea
      solicitudExamenTomografia
      solicitudExamenResonancia
      solicitudExamenEcografiaPelvica
      solicitudExamenEcografiaAbdomen
      solicitudExamenInterconsulta
      solicitudExamenOtros
      diagnosticodeIngreso
      diagnosticodeAltade
      planDeTratamientoIndicaciones
      planDeTratamientoMedicamentos
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
        createdAt
        hora
        motivoDeConsulta
        enfermedadActual
        presionArterial
        frecuenciaCardiaca
        frecuenciaRespiratoria
        temperaturaBucal
        temperaturaAxilar
        peso
        talla
        gaslowOcular
        gaslowVerbal
        gaslowMotora
        gaslowTotal
        reaccionPupilaIzq
        reaccionPupilaDer
        tiempoLlenadoCapilar
        saturacionOxigeno
        viaAereaObstruida
        cabeza
        cuello
        torax
        abdomen
        columna
        pelvis
        extremidades
        heridaPenetrante
        heridaCortante
        fracturaExpuesta
        fracturaCerrada
        cuerpoExtrano
        hemorragia
        mordedura
        picadura
        excoriacion
        deformidadOMasa
        hematoma
        eritemaInflamacion
        luxacionEsguince
        quemadura
        solicitudExamenBiometria
        solicitudExamenUroanalisis
        solicitudExamenQuimicaSanguinea
        solicitudExamenElectrolitos
        solicitudExamenGasometria
        solicitudExamenElectrocardiograma
        solicitudExamenEndoscopia
        solicitudExamenRxTorax
        solicitudExamenRxAbdomen
        solicitudExamenRxOsea
        solicitudExamenTomografia
        solicitudExamenResonancia
        solicitudExamenEcografiaPelvica
        solicitudExamenEcografiaAbdomen
        solicitudExamenInterconsulta
        solicitudExamenOtros
        diagnosticodeIngreso
        diagnosticodeAltade
        planDeTratamientoIndicaciones
        planDeTratamientoMedicamentos
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
        direccionResidenciaHabitual
        barrio
        parroquia
        canton
        provincia
        telefono
        grupoSanguineoYFactorRh
        antecedenteAlergico
        antecedenteClinico
        antecedenteGinecologico
        antecedenteTraumatologico
        antecedenteQuirurgico
        antecedenteFarmacoLogico
        antecedentePsiquiatrico
        antecedenteOtro
        fechaNacimiento
        lugarNacimiento
        nacionalidad
        grupoCultural
        edadEnAnosCumplidos
        sexo
        estadoCivil
        nivelEducativo
        fechaAdmision
        ocupacion
        empresaDondeTrabaja
        tipoSeguroSalud
        referidoDe
        enCasoDeAvisarA
        parentescoAfinidad
        direccion
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
        createdAt
        hora
        motivoDeConsulta
        enfermedadActual
        presionArterial
        frecuenciaCardiaca
        frecuenciaRespiratoria
        temperaturaBucal
        temperaturaAxilar
        peso
        talla
        gaslowOcular
        gaslowVerbal
        gaslowMotora
        gaslowTotal
        reaccionPupilaIzq
        reaccionPupilaDer
        tiempoLlenadoCapilar
        saturacionOxigeno
        viaAereaObstruida
        cabeza
        cuello
        torax
        abdomen
        columna
        pelvis
        extremidades
        heridaPenetrante
        heridaCortante
        fracturaExpuesta
        fracturaCerrada
        cuerpoExtrano
        hemorragia
        mordedura
        picadura
        excoriacion
        deformidadOMasa
        hematoma
        eritemaInflamacion
        luxacionEsguince
        quemadura
        solicitudExamenBiometria
        solicitudExamenUroanalisis
        solicitudExamenQuimicaSanguinea
        solicitudExamenElectrolitos
        solicitudExamenGasometria
        solicitudExamenElectrocardiograma
        solicitudExamenEndoscopia
        solicitudExamenRxTorax
        solicitudExamenRxAbdomen
        solicitudExamenRxOsea
        solicitudExamenTomografia
        solicitudExamenResonancia
        solicitudExamenEcografiaPelvica
        solicitudExamenEcografiaAbdomen
        solicitudExamenInterconsulta
        solicitudExamenOtros
        diagnosticodeIngreso
        diagnosticodeAltade
        planDeTratamientoIndicaciones
        planDeTratamientoMedicamentos
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
