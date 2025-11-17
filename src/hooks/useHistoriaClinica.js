import { useState } from 'react';

export function useHistoriaClinica() {
  // campos básicos (iniciales vacíos)
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [direccionResidenciaHabitual, setDireccionResidenciaHabitual] = useState('');
  const [barrio, setBarrio] = useState('');
  const [parroquia, setParroquia] = useState('');
  const [canton, setCanton] = useState('');
  const [provincia, setProvincia] = useState('');
  const [telefono, setTelefono] = useState('');
  const [grupoSanguineoYFactorRh, setGrupoSanguineoYFactorRh] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [lugarNacimiento, setLugarNacimiento] = useState('');
  const [nacionalidad, setNacionalidad] = useState('');
  const [grupoCultural, setGrupoCultural] = useState('');
  const [edadEnAnosCumplidos, setEdadEnAnosCumplidos] = useState('');
  const [sexo, setSexo] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [nivelEducativo, setNivelEducativo] = useState('');
  const [fechaAdmision, setFechaAdmision] = useState('');
  const [ocupacion, setOcupacion] = useState('');
  const [empresaDondeTrabaja, setEmpresaDondeTrabaja] = useState('');
  const [tipoSeguroSalud, setTipoSeguroSalud] = useState('');
  const [referidoDe, setReferidoDe] = useState('');
  const [enCasoDeAvisarA, setEnCasoDeAvisarA] = useState('');
  const [parentescoAfinidad, setParentescoAfinidad] = useState('');
  const [telefonoEmergencia, setTelefonoEmergencia] = useState('');
  const [antecedenteAlergico, setAntecedenteAlergico] = useState('');
  const [antecedenteClinico, setAntecedenteClinico] = useState('');
  const [antecedenteGinecologico, setAntecedenteGinecologico] = useState('');
  const [antecedenteTraumatologico, setAntecedenteTraumatologico] = useState('');
  const [antecedenteQuirurgico, setAntecedenteQuirurgico] = useState('');
  const [antecedenteFarmacoLogico, setAntecedenteFarmacoLogico] = useState('');
  const [antecedentePsiquiatrico, setAntecedentePsiquiatrico] = useState('');
  const [antecedenteOtro, setAntecedenteOtro] = useState('');

  // handler reutilizable para fecha de nacimiento -> calcula edad
  const handleFechaNacimientoChange = (e) => {
    const fecha = e.target.value;
    setFechaNacimiento(fecha);
    if (fecha) {
      const hoy = new Date();
      const nacimiento = new Date(fecha);
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const m = hoy.getMonth() - nacimiento.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
      }
      setEdadEnAnosCumplidos(edad >= 0 ? edad : '');
    } else {
      setEdadEnAnosCumplidos('');
    }
  };

  // Construye el objeto payload para la API (fechas en ISO, edad en entero si aplica)
  const buildHistoriaPayload = () => {
    const fechaNacimientoISO = fechaNacimiento ? new Date(fechaNacimiento).toISOString() : undefined;
    const fechaAdmisionISO = fechaAdmision ? new Date(fechaAdmision).toISOString() : undefined;
    const payload = {
      cedula,
      nombre,
      direccionResidenciaHabitual,
      barrio,
      parroquia,
      canton,
      provincia,
      telefono,
      grupoSanguineoYFactorRh,
      fechaNacimiento: fechaNacimientoISO,
      lugarNacimiento,
      nacionalidad,
      grupoCultural,
      edadEnAnosCumplidos: edadEnAnosCumplidos !== '' ? parseInt(edadEnAnosCumplidos) : undefined,
      sexo,
      estadoCivil,
      nivelEducativo,
      fechaAdmision: fechaAdmisionISO,
      ocupacion,
      empresaDondeTrabaja,
      tipoSeguroSalud,
      referidoDe,
      enCasoDeAvisarA,
      parentescoAfinidad,
      telefonoEmergencia,
      antecedenteAlergico,
      antecedenteClinico,
      antecedenteGinecologico,
      antecedenteTraumatologico,
      antecedenteQuirurgico,
      antecedenteFarmacoLogico,
      antecedentePsiquiatrico,
      antecedenteOtro
    };

    // clienteData es el objeto "legible" que puedes pasar a callbacks de UI (sin ISO)
    const clienteData = {
      cedula,
      nombre,
      direccionResidenciaHabitual,
      barrio,
      parroquia,
      canton,
      provincia,
      telefono,
      grupoSanguineoYFactorRh,
      fechaNacimiento,
      lugarNacimiento,
      nacionalidad,
      grupoCultural,
      edadEnAnosCumplidos,
      sexo,
      estadoCivil,
      nivelEducativo,
      fechaAdmision,
      ocupacion,
      empresaDondeTrabaja,
      tipoSeguroSalud,
      referidoDe,
      enCasoDeAvisarA,
      parentescoAfinidad,
      telefonoEmergencia,
      antecedenteAlergico,
      antecedenteClinico,
      antecedenteGinecologico,
      antecedenteTraumatologico,
      antecedenteQuirurgico,
      antecedenteFarmacoLogico,
      antecedentePsiquiatrico,
      antecedenteOtro
    };

    return { payload, clienteData };
  };

  // Resetear todos los campos a vacío
  const resetFields = () => {
    setNombre('');
    setCedula('');
    setDireccionResidenciaHabitual('');
    setBarrio('');
    setParroquia('');
    setCanton('');
    setProvincia('');
    setTelefono('');
    setGrupoSanguineoYFactorRh('');
    setFechaNacimiento('');
    setLugarNacimiento('');
    setNacionalidad('');
    setGrupoCultural('');
    setEdadEnAnosCumplidos('');
    setSexo('');
    setEstadoCivil('');
    setNivelEducativo('');
    setFechaAdmision('');
    setOcupacion('');
    setEmpresaDondeTrabaja('');
    setTipoSeguroSalud('');
    setReferidoDe('');
    setEnCasoDeAvisarA('');
    setParentescoAfinidad('');
    setTelefonoEmergencia('');
    setAntecedenteAlergico('');
    setAntecedenteClinico('');
    setAntecedenteGinecologico('');
    setAntecedenteTraumatologico('');
    setAntecedenteQuirurgico('');
    setAntecedenteFarmacoLogico('');
    setAntecedentePsiquiatrico('');
    setAntecedenteOtro('');
  };

  return {
    // estados y setters
    nombre, setNombre,
    cedula, setCedula,
    direccionResidenciaHabitual, setDireccionResidenciaHabitual,
    barrio, setBarrio,
    parroquia, setParroquia,
    canton, setCanton,
    provincia, setProvincia,
    telefono, setTelefono,
    grupoSanguineoYFactorRh, setGrupoSanguineoYFactorRh,
    fechaNacimiento, setFechaNacimiento,
    lugarNacimiento, setLugarNacimiento,
    nacionalidad, setNacionalidad,
    grupoCultural, setGrupoCultural,
    edadEnAnosCumplidos, setEdadEnAnosCumplidos,
    sexo, setSexo,
    estadoCivil, setEstadoCivil,
    nivelEducativo, setNivelEducativo,
    fechaAdmision, setFechaAdmision,
    ocupacion, setOcupacion,
    empresaDondeTrabaja, setEmpresaDondeTrabaja,
    tipoSeguroSalud, setTipoSeguroSalud,
    referidoDe, setReferidoDe,
    enCasoDeAvisarA, setEnCasoDeAvisarA,
    parentescoAfinidad, setParentescoAfinidad,
    telefonoEmergencia, setTelefonoEmergencia,
    antecedenteAlergico, setAntecedenteAlergico,
    antecedenteClinico, setAntecedenteClinico,
    antecedenteGinecologico, setAntecedenteGinecologico,
    antecedenteTraumatologico, setAntecedenteTraumatologico,
    antecedenteQuirurgico, setAntecedenteQuirurgico,
    antecedenteFarmacoLogico, setAntecedenteFarmacoLogico,
    antecedentePsiquiatrico, setAntecedentePsiquiatrico,
    antecedenteOtro, setAntecedenteOtro,

    // funciones reutilizables
    handleFechaNacimientoChange,
    buildHistoriaPayload,
    resetFields
  };
}

export default useHistoriaClinica;
