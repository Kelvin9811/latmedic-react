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
export const updateCliente = /* GraphQL */ `
  mutation UpdateCliente(
    $input: UpdateClienteInput!
    $condition: ModelClienteConditionInput
  ) {
    updateCliente(input: $input, condition: $condition) {
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
export const deleteCliente = /* GraphQL */ `
  mutation DeleteCliente(
    $input: DeleteClienteInput!
    $condition: ModelClienteConditionInput
  ) {
    deleteCliente(input: $input, condition: $condition) {
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
export const createConsulta = /* GraphQL */ `
  mutation CreateConsulta(
    $input: CreateConsultaInput!
    $condition: ModelConsultaConditionInput
  ) {
    createConsulta(input: $input, condition: $condition) {
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
export const updateConsulta = /* GraphQL */ `
  mutation UpdateConsulta(
    $input: UpdateConsultaInput!
    $condition: ModelConsultaConditionInput
  ) {
    updateConsulta(input: $input, condition: $condition) {
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
export const deleteConsulta = /* GraphQL */ `
  mutation DeleteConsulta(
    $input: DeleteConsultaInput!
    $condition: ModelConsultaConditionInput
  ) {
    deleteConsulta(input: $input, condition: $condition) {
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
export const createReceta = /* GraphQL */ `
  mutation CreateReceta(
    $input: CreateRecetaInput!
    $condition: ModelRecetaConditionInput
  ) {
    createReceta(input: $input, condition: $condition) {
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
export const updateReceta = /* GraphQL */ `
  mutation UpdateReceta(
    $input: UpdateRecetaInput!
    $condition: ModelRecetaConditionInput
  ) {
    updateReceta(input: $input, condition: $condition) {
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
export const deleteReceta = /* GraphQL */ `
  mutation DeleteReceta(
    $input: DeleteRecetaInput!
    $condition: ModelRecetaConditionInput
  ) {
    deleteReceta(input: $input, condition: $condition) {
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
export const createDocumento = /* GraphQL */ `
  mutation CreateDocumento(
    $input: CreateDocumentoInput!
    $condition: ModelDocumentoConditionInput
  ) {
    createDocumento(input: $input, condition: $condition) {
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
export const updateDocumento = /* GraphQL */ `
  mutation UpdateDocumento(
    $input: UpdateDocumentoInput!
    $condition: ModelDocumentoConditionInput
  ) {
    updateDocumento(input: $input, condition: $condition) {
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
export const deleteDocumento = /* GraphQL */ `
  mutation DeleteDocumento(
    $input: DeleteDocumentoInput!
    $condition: ModelDocumentoConditionInput
  ) {
    deleteDocumento(input: $input, condition: $condition) {
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
