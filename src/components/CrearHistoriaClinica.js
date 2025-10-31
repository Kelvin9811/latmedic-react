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
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    const fechaNacimientoISO = fechaNacimiento ? new Date(fechaNacimiento).toISOString() : undefined;
    const fechaAdmisionISO = fechaAdmision ? new Date(fechaAdmision).toISOString() : undefined;
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
      fechaNacimiento: fechaNacimientoISO,
      lugarNacimiento,
      nacionalidad,
      grupoCultural,
      edadEnAnosCumplidos: edadEnAnosCumplidos ? parseInt(edadEnAnosCumplidos) : undefined,
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
    setShowConfirm(false);
  };

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

  return (
    <>
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
          <label>Dirección:</label>
          <input
            type="text"
            value={direccionResidenciaHabitual}
            onChange={e => setDireccionResidenciaHabitual(e.target.value)}
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
            onChange={handleFechaNacimientoChange}
          />          
          <label>Edad:</label>
          <input
            type="number"
            value={edadEnAnosCumplidos}
            readOnly
            min={0}
            max={120}
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
          <label>Sexo:</label>
          <select value={sexo} onChange={e => setSexo(e.target.value)}>
            <option value="">Seleccione...</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
          <label>Estado civil:</label>
          <select value={estadoCivil} onChange={e => setEstadoCivil(e.target.value)}>
            <option value="">Seleccione...</option>
            <option value="Casado">Casado</option>
            <option value="Soltero">Soltero</option>
            <option value="Viudo">Viudo</option>
            <option value="Divorciado">Divorciado</option>
            <option value="Union libre">Unión libre</option>
          </select>
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
        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '24px 0 8px 0' }} />
        <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>En caso de emergencia</h4>        
        <div className="crear-historia-campo">
          <label>Notificar a:</label>
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
          <label>Teléfono:</label>
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
      {showConfirm && (
        <div className="crear-historia-modal" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.15)', padding: 32, minWidth: 320, maxWidth: 400, textAlign: 'center' }}>
            <p style={{ fontWeight: 'bold', color: '#222', marginBottom: 24 }}>¿Está seguro que desea crear la historia clínica?</p>
            <button onClick={handleConfirm} className="crear-historia-btn" >Confirmar</button>
            <button onClick={() => setShowConfirm(false)} style={{background: '#ff4d4f'}} className="crear-historia-btn crear-historia-btn-cancel">Cancelar</button>
          </div>
        </div>
      )}
    </>
  );
};
export default CrearHistoriaClinica;