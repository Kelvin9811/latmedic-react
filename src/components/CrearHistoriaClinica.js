import React, { useState } from 'react';
import './CrearHistoriaClinica.css';
import { upsertClienteByCedula } from '../apiCrud';
import useHistoriaClinica from '../hooks/useHistoriaClinica';
import useConsulta from '../hooks/useConsulta';
import ConsultaPopup from './ConsultaPopup';

const CrearHistoriaClinica = ({ onHistoriaCreada }) => {
  // uso del hook para todos los campos y utilidades compartidas
  const {
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

    // utilidades
    handleFechaNacimientoChange,
    buildHistoriaPayload,
    resetFields
  } = useHistoriaClinica();

  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // estados del flujo de agregar consulta (si ya los tienes en otro sitio, mantenlos)
  const [showAddConsultaConfirm, setShowAddConsultaConfirm] = useState(false);
  const [showCrearConsulta, setShowCrearConsulta] = useState(false);
  const [createdCliente, setCreatedCliente] = useState(null);

  // usar hook de consulta para manejar datos/adjuntos de la consulta
  const {
    nuevaConsultaData: editConsultaData,
    handleNuevaConsultaChange,
    setNuevaConsultaData: setEditConsultaData,
    adjuntos,
    fileInputRef,
    handleSingleFileChange,
    handleRemoveAdjunto,
    handleAddDocumentoClick,
    uploadingAdjuntos,
    saveNuevaConsulta
  } = useConsulta();

  const [loadingButtonState, setLoadingButtonState] = useState(false);
  const [editConsultaIdx, setEditConsultaIdx] = useState(null);
  // Placeholders mínimos para props que pide ConsultaPopup
  const [recetas] = useState([]);
  const [recetasLoading] = useState(false);
  const [documentos] = useState([]);
  const [documentosLoading] = useState(false);


  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const currentTime = now.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(',', ' -');
        handleNuevaConsultaChange('hora', currentTime)
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    // Actualiza automáticamente gaslowTotal a partir de los tres componentes.
    const ocular = parseInt(editConsultaData.gaslowOcular, 10) || 0;
    const verbal = parseInt(editConsultaData.gaslowVerbal, 10) || 0;
    const motora = parseInt(editConsultaData.gaslowMotora, 10) || 0;
    const total = ocular + verbal + motora;
    // Usamos el handler existente para mantener la consistencia del estado
    handleNuevaConsultaChange('gaslowTotal', total);
  }, [editConsultaData.gaslowOcular, editConsultaData.gaslowVerbal, editConsultaData.gaslowMotora]);



  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    // usar la utilidad reutilizable para construir payload y datos del cliente
    const { payload, clienteData } = buildHistoriaPayload();
    await upsertClienteByCedula(payload);

    if (onHistoriaCreada) {
      onHistoriaCreada(clienteData);
    }

    // Guardar el cliente creado para flujos adicionales (ej. crear consulta)
    setCreatedCliente({
      nombre: clienteData.nombre,
      cedula: clienteData.cedula,
      telefono: clienteData.telefono,
      fechaNacimiento: clienteData.fechaNacimiento,
      edadEnAnosCumplidos: clienteData.edadEnAnosCumplidos
    });

    // preguntar si desea agregar consulta
    setShowAddConsultaConfirm(true);

    // resetear campos vía hook
    resetFields();
    setLoading(false);
    setShowConfirm(false);
  };

  // guardar la consulta (usando el hook) cuando el usuario la salva en el popup
  const handleSaveEditConsulta = async () => {
    if (!createdCliente?.cedula) return;
    setLoadingButtonState(true);
    const result = await saveNuevaConsulta(createdCliente.cedula, editConsultaData);
    setLoadingButtonState(false);
    if (result?.success) {
      // cerrar modal y limpiar índice de edición
      setShowCrearConsulta(false);
      setEditConsultaIdx(null);
      // opcional: puedes notificar/update UI aquí
    } else {
      console.error('Error guardando consulta:', result?.error);
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
          <label>Grupo Sanguíneo y Factor RH:</label>
          <input
            type="text"
            value={grupoSanguineoYFactorRh}
            onChange={e => setGrupoSanguineoYFactorRh(e.target.value)}
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
        <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Antecedentes personales y familiares</h4>
        <div className="crear-historia-campo">
          <label>Antecedente Alérgico:</label>
          <input
            type="text"
            value={antecedenteAlergico}
            onChange={e => setAntecedenteAlergico(e.target.value)}
          />
        </div>
        <div className="crear-historia-campo">
          <label>Antecedente Clínico:</label>
          <input
            type="text"
            value={antecedenteClinico}
            onChange={e => setAntecedenteClinico(e.target.value)}
          />
        </div>
        <div className="crear-historia-campo">
          <label>Antecedente Ginecológico:</label>
          <input
            type="text"
            value={antecedenteGinecologico}
            onChange={e => setAntecedenteGinecologico(e.target.value)}
          />
        </div>
        <div className="crear-historia-campo">
          <label>Antecedente Traumatológico:</label>
          <input
            type="text"
            value={antecedenteTraumatologico}
            onChange={e => setAntecedenteTraumatologico(e.target.value)}
          />
        </div>
        <div className="crear-historia-campo">
          <label>Antecedente Quirúrgico:</label>
          <input
            type="text"
            value={antecedenteQuirurgico}
            onChange={e => setAntecedenteQuirurgico(e.target.value)}
          />
        </div>
        <div className="crear-historia-campo">
          <label>Antecedente Farmacológico:</label>
          <input
            type="text"
            value={antecedenteFarmacoLogico}
            onChange={e => setAntecedenteFarmacoLogico(e.target.value)}
          />
        </div>
        <div className="crear-historia-campo">
          <label>Antecedente Psiquiátrico:</label>
          <input
            type="text"
            value={antecedentePsiquiatrico}
            onChange={e => setAntecedentePsiquiatrico(e.target.value)}
          />
        </div>
        <div className="crear-historia-campo">
          <label>Antecedente Otro:</label>
          <input
            type="text"
            value={antecedenteOtro}
            onChange={e => setAntecedenteOtro(e.target.value)}
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
          <label>Teléfono de emergencia:</label>
          <input
            type="text"
            value={telefonoEmergencia}
            onChange={e => setTelefonoEmergencia(e.target.value.replace(/\D/g, ''))}
            maxLength={15}
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

            {/* Modal: preguntar si desea agregar una consulta */}
      {showAddConsultaConfirm && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1100, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.15)', padding: 28, minWidth: 300, maxWidth: 420, textAlign: 'center' }}>
            <p style={{ fontWeight: 'bold', color: '#222', marginBottom: 18 }}>¿Desea agregar una consulta ahora?</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="crear-historia-btn" onClick={() => { setShowCrearConsulta(true); setShowAddConsultaConfirm(false); }}>Sí</button>
              <button className="crear-historia-btn crear-historia-btn-cancel" style={{ background: '#ff4d4f' }} onClick={() => setShowAddConsultaConfirm(false)}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: mostrar el componente ConsultaPopup (si el usuario eligió agregar)
          Nota: mantén aquí la UI/props que necesites. El hook ya maneja los campos de la historia */}
      {showCrearConsulta && (
        <ConsultaPopup
          mode="edit"
          consultaData={editConsultaData}
          setConsultaData={setEditConsultaData}
          onSave={handleSaveEditConsulta}
          onCancel={() => { setEditConsultaIdx(null); setShowCrearConsulta(false); }}
          recetas={recetas}
          recetasLoading={recetasLoading}
          documentos={documentos}
          documentosLoading={documentosLoading}
          adjuntos={adjuntos}
          onAddDocumentoClick={handleAddDocumentoClick}
          fileInputRef={fileInputRef}
          onSingleFileChange={handleSingleFileChange}
          onRemoveAdjunto={handleRemoveAdjunto}
          uploadingAdjuntos={uploadingAdjuntos}
          loadingButtonState={loadingButtonState}
          onDeleteDocumento={() => {}}
        />
      )}
    </>
  );
};
export default CrearHistoriaClinica;