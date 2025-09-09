import React, { useState } from 'react';
import './CrearHistoriaClinica.css';
import { upsertClienteByCedula } from '../apiCrud';

const CrearHistoriaClinica = ({ onHistoriaCreada }) => {
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [direccionResidenciaHabitual, setDireccionResidenciaHabitual] = useState('');
  const [calleYNumero, setCalleYNumero] = useState('');
  const [barrio, setBarrio] = useState('');
  const [parroquia, setParroquia] = useState('');
  const [canton, setCanton] = useState('');
  const [provincia, setProvincia] = useState('');
  const [zona, setZona] = useState('');
  const [telefono, setTelefono] = useState('');
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
  const [direccion, setDireccion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await upsertClienteByCedula({
      cedula,
      nombre,
      direccionResidenciaHabitual,
      calleYNumero,
      barrio,
      parroquia,
      canton,
      provincia,
      zona,
      telefono,
      fechaNacimiento,
      lugarNacimiento,
      nacionalidad,
      grupoCultural,
      edadEnAnosCumplidos: edadEnAnosCumplidos ? parseInt(edadEnAnosCumplidos) : undefined,
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
      direccion
    });
    if (onHistoriaCreada) {
      onHistoriaCreada({
        nombre,
        cedula,
        direccionResidenciaHabitual,
        calleYNumero,
        barrio,
        parroquia,
        canton,
        provincia,
        zona,
        telefono,
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
        direccion
      });
    }
    setNombre('');
    setCedula('');
    setDireccionResidenciaHabitual('');
    setCalleYNumero('');
    setBarrio('');
    setParroquia('');
    setCanton('');
    setProvincia('');
    setZona('');
    setTelefono('');
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
    setDireccion('');
    setLoading(false);
  };

  return (
    <form className="crear-historia-form" onSubmit={handleSubmit}>
      <h3 className="crear-historia-titulo">Nueva Historia Clínica</h3>
      <div className="crear-historia-campo">
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={e => {
            const val = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '');
            setNombre(val);
          }}
          required
          maxLength={60}
        />
      </div>
      <div className="crear-historia-campo">
        <label>Cédula:</label>
        <input
          type="text"
          value={cedula}
          onChange={e => {
            const val = e.target.value.replace(/\D/g, '');
            setCedula(val);
          }}
          required
          maxLength={10}
          pattern="[0-9]*"
          inputMode="numeric"
        />
      </div>
      <div className="crear-historia-campo">
        <label>Dirección residencia habitual:</label>
        <input
          type="text"
          value={direccionResidenciaHabitual}
          onChange={e => setDireccionResidenciaHabitual(e.target.value)}
        />
      </div>
      <div className="crear-historia-campo">
        <label>Calle y número:</label>
        <input
          type="text"
          value={calleYNumero}
          onChange={e => setCalleYNumero(e.target.value)}
        />
      </div>
      <div className="crear-historia-campo">
        <label>Barrio:</label>
        <input
          type="text"
          value={barrio}
          onChange={e => setBarrio(e.target.value)}
        />
      </div>
      <div className="crear-historia-campo">
        <label>Parroquia:</label>
        <input
          type="text"
          value={parroquia}
          onChange={e => setParroquia(e.target.value)}
        />
      </div>
      <div className="crear-historia-campo">
      </div>
      <div className="crear-historia-campo">
        <label>Cantón:</label>
        <input
          type="text"
          value={canton}
          onChange={e => setCanton(e.target.value)}
        />
      </div>
      <div className="crear-historia-campo">
        <label>Provincia:</label>
        <input
          type="text"
          value={provincia}
          onChange={e => setProvincia(e.target.value)}
        />
      </div>
      <div className="crear-historia-campo">
        <label>Zona:</label>
        <input
          type="text"
          value={zona}
          onChange={e => setZona(e.target.value)}
        />
      </div>
      <div className="crear-historia-campo">
        <label>Teléfono:</label>
        <input
          type="text"
          value={telefono}
          onChange={e => setTelefono(e.target.value.replace(/\D/g, ''))}
          maxLength={15}
        />
      </div>
      <div className="crear-historia-campo">
        <label>Fecha de nacimiento:</label>
        <input
          type="date"
          value={fechaNacimiento}
          onChange={e => setFechaNacimiento(e.target.value)}
        />
      </div>
      <div className="crear-historia-campo">
        <label>Lugar de nacimiento:</label>
        <input
          type="text"
          value={lugarNacimiento}
          onChange={e => setLugarNacimiento(e.target.value)}
        />
      </div>
      <div className="crear-historia-campo">
        <label>Nacionalidad:</label>
        <input
          type="text"
          value={nacionalidad}
          onChange={e => setNacionalidad(e.target.value)}
        />
      </div>
      <div className="crear-historia-campo">
        <label>Grupo cultural:</label>
        <input
          type="text"
          value={grupoCultural}
          onChange={e => setGrupoCultural(e.target.value)}
        />
      </div>
      <div className="crear-historia-campo">
        <label>Edad en años cumplidos:</label>
        <input
          type="number"
          value={edadEnAnosCumplidos}
          onChange={e => setEdadEnAnosCumplidos(e.target.value)}
          min={0}
          max={120}
        />
      </div>
      <div className="crear-historia-campo">
        <label>Sexo:</label>
        <input
          type="text"
          value={sexo}
          onChange={e => setSexo(e.target.value)}
        />
      </div>
      <div className="crear-historia-campo">
        <label>Estado civil:</label>
        <input
          type="text"
          value={estadoCivil}
          onChange={e => setEstadoCivil(e.target.value)}
        />
      </div>
      <div className="crear-historia-campo">
        <label>Nivel educativo:</label>
        <input
          type="text"
          value={nivelEducativo}
          onChange={e => setNivelEducativo(e.target.value)}
        />
      </div>
      <div className="crear-historia-campo">
        <label>Fecha de admisión:</label>
        <input
          type="date"
          value={fechaAdmision}
          onChange={e => setFechaAdmision(e.target.value)}
        />
      </div>
      <div className="crear-historia-campo">
        <label>Ocupación:</label>
        <input
          type="text"
          value={ocupacion}
          onChange={e => setOcupacion(e.target.value)}
        />
      </div>
      <div className="crear-historia-campo">
        <label>Empresa donde trabaja:</label>
        <input
          type="text"
          value={empresaDondeTrabaja}
          onChange={e => setEmpresaDondeTrabaja(e.target.value)}
        />
      </div>
      <div className="crear-historia-campo">
        <label>Tipo seguro salud:</label>
        <input
          type="text"
          value={tipoSeguroSalud}
          onChange={e => setTipoSeguroSalud(e.target.value)}
        />
      </div>
      <div className="crear-historia-campo">
        <label>Referido de:</label>
        <input
          type="text"
          value={referidoDe}
          onChange={e => setReferidoDe(e.target.value)}
        />
      </div>
      <div className="crear-historia-campo">
        <label>En caso de avisar a:</label>
        <input
          type="text"
          value={enCasoDeAvisarA}
          onChange={e => setEnCasoDeAvisarA(e.target.value)}
        />
      </div>
      <div className="crear-historia-campo">
        <label>Parentesco/afinidad:</label>
        <input
          type="text"
          value={parentescoAfinidad}
          onChange={e => setParentescoAfinidad(e.target.value)}
        />
      </div>
      <div className="crear-historia-campo">
        <label>Dirección:</label>
        <input
          type="text"
          value={direccion}
          onChange={e => setDireccion(e.target.value)}
        />
      </div>
      <button className="crear-historia-btn" type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  );
};
export default CrearHistoriaClinica;