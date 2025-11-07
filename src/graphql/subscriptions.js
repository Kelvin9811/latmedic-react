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
      telefonoEmergencia
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
export const onUpdateCliente = /* GraphQL */ `
  subscription OnUpdateCliente(
    $filter: ModelSubscriptionClienteFilterInput
    $owner: String
  ) {
    onUpdateCliente(filter: $filter, owner: $owner) {
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
      telefonoEmergencia
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
export const onDeleteCliente = /* GraphQL */ `
  subscription OnDeleteCliente(
    $filter: ModelSubscriptionClienteFilterInput
    $owner: String
  ) {
    onDeleteCliente(filter: $filter, owner: $owner) {
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
      telefonoEmergencia
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
export const onCreateConsulta = /* GraphQL */ `
  subscription OnCreateConsulta(
    $filter: ModelSubscriptionConsultaFilterInput
    $owner: String
  ) {
    onCreateConsulta(filter: $filter, owner: $owner) {
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
export const onUpdateConsulta = /* GraphQL */ `
  subscription OnUpdateConsulta(
    $filter: ModelSubscriptionConsultaFilterInput
    $owner: String
  ) {
    onUpdateConsulta(filter: $filter, owner: $owner) {
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
export const onDeleteConsulta = /* GraphQL */ `
  subscription OnDeleteConsulta(
    $filter: ModelSubscriptionConsultaFilterInput
    $owner: String
  ) {
    onDeleteConsulta(filter: $filter, owner: $owner) {
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
export const onCreateReceta = /* GraphQL */ `
  subscription OnCreateReceta(
    $filter: ModelSubscriptionRecetaFilterInput
    $owner: String
  ) {
    onCreateReceta(filter: $filter, owner: $owner) {
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
export const onUpdateReceta = /* GraphQL */ `
  subscription OnUpdateReceta(
    $filter: ModelSubscriptionRecetaFilterInput
    $owner: String
  ) {
    onUpdateReceta(filter: $filter, owner: $owner) {
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
export const onDeleteReceta = /* GraphQL */ `
  subscription OnDeleteReceta(
    $filter: ModelSubscriptionRecetaFilterInput
    $owner: String
  ) {
    onDeleteReceta(filter: $filter, owner: $owner) {
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
export const onCreateDocumento = /* GraphQL */ `
  subscription OnCreateDocumento(
    $filter: ModelSubscriptionDocumentoFilterInput
    $owner: String
  ) {
    onCreateDocumento(filter: $filter, owner: $owner) {
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
export const onUpdateDocumento = /* GraphQL */ `
  subscription OnUpdateDocumento(
    $filter: ModelSubscriptionDocumentoFilterInput
    $owner: String
  ) {
    onUpdateDocumento(filter: $filter, owner: $owner) {
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
export const onDeleteDocumento = /* GraphQL */ `
  subscription OnDeleteDocumento(
    $filter: ModelSubscriptionDocumentoFilterInput
    $owner: String
  ) {
    onDeleteDocumento(filter: $filter, owner: $owner) {
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
