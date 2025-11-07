import React, { useState } from 'react';
import { createConsultaForCedula } from '../apiCrud';
import './CrearConsulta.css';

const CrearConsulta = ({ cedula, onConsultaCreada, nombreCliente }) => {
  const [hora, setHora] = useState('');
  const [motivoDeConsulta, setMotivoDeConsulta] = useState('');
  const [enfermedadActual, setEnfermedadActual] = useState('');
  const [presionArterial, setPresionArterial] = useState('');
  const [frecuenciaCardiaca, setFrecuenciaCardiaca] = useState('');
  const [frecuenciaRespiratoria, setFrecuenciaRespiratoria] = useState('');
  const [temperaturaBucal, setTemperaturaBucal] = useState('');
  const [temperaturaAxilar, setTemperaturaAxilar] = useState('');
  const [peso, setPeso] = useState('');
  const [talla, setTalla] = useState('');
  const [gaslowOcular, setGaslowOcular] = useState('');
  const [gaslowVerbal, setGaslowVerbal] = useState('');
  const [gaslowMotora, setGaslowMotora] = useState('');
  const [gaslowTotal, setGaslowTotal] = useState('');
  const [reaccionPupilaIzq, setReaccionPupilaIzq] = useState('');
  const [reaccionPupilaDer, setReaccionPupilaDer] = useState('');
  const [tiempoLlenadoCapilar, setTiempoLlenadoCapilar] = useState('');
  const [saturacionOxigeno, setSaturacionOxigeno] = useState('');
  const [viaAereaObstruida, setViaAereaObstruida] = useState('');
  const [cabeza, setCabeza] = useState('');
  const [cuello, setCuello] = useState('');
  const [torax, setTorax] = useState('');
  const [abdomen, setAbdomen] = useState('');
  const [columna, setColumna] = useState('');
  const [pelvis, setPelvis] = useState('');
  const [extremidades, setExtremidades] = useState('');
  const [heridaPenetrante, setHeridaPenetrante] = useState('');
  const [heridaCortante, setHeridaCortante] = useState('');
  const [fracturaExpuesta, setFracturaExpuesta] = useState('');
  const [fracturaCerrada, setFracturaCerrada] = useState('');
  const [cuerpoExtrano, setCuerpoExtrano] = useState('');
  const [hemorragia, setHemorragia] = useState('');
  const [mordedura, setMordedura] = useState('');
  const [picadura, setPicadura] = useState('');
  const [excoriacion, setExcoriacion] = useState('');
  const [deformidadOMasa, setDeformidadOMasa] = useState('');
  const [hematoma, setHematoma] = useState('');
  const [eritemaInflamacion, setEritemaInflamacion] = useState('');
  const [luxacionEsguince, setLuxacionEsguince] = useState('');
  const [quemadura, setQuemadura] = useState('');
  const [solicitudExamenBiometria, setSolicitudExamenBiometria] = useState(false);
  const [solicitudExamenUroanalisis, setSolicitudExamenUroanalisis] = useState(false);
  const [solicitudExamenQuimicaSanguinea, setSolicitudExamenQuimicaSanguinea] = useState(false);
  const [solicitudExamenElectrolitos, setSolicitudExamenElectrolitos] = useState(false);
  const [solicitudExamenGasometria, setSolicitudExamenGasometria] = useState(false);
  const [solicitudExamenElectrocardiograma, setSolicitudExamenElectrocardiograma] = useState(false);
  const [solicitudExamenEndoscopia, setSolicitudExamenEndoscopia] = useState(false);
  const [solicitudExamenRxTorax, setSolicitudExamenRxTorax] = useState(false);
  const [solicitudExamenRxAbdomen, setSolicitudExamenRxAbdomen] = useState(false);
  const [solicitudExamenRxOsea, setSolicitudExamenRxOsea] = useState(false);
  const [solicitudExamenTomografia, setSolicitudExamenTomografia] = useState(false);
  const [solicitudExamenResonancia, setSolicitudExamenResonancia] = useState(false);
  const [solicitudExamenEcografiaPelvica, setSolicitudExamenEcografiaPelvica] = useState(false);
  const [solicitudExamenEcografiaAbdomen, setSolicitudExamenEcografiaAbdomen] = useState(false);
  const [solicitudExamenInterconsulta, setSolicitudExamenInterconsulta] = useState(false);
  const [solicitudExamenOtros, setSolicitudExamenOtros] = useState(false);
  const [diagnosticodeIngreso, setDiagnosticodeIngreso] = useState('');
  const [diagnosticodeAltade, setDiagnosticodeAltade] = useState('');
  const [planDeTratamientoIndicaciones, setPlanDeTratamientoIndicaciones] = useState('');
  const [planDeTratamientoMedicamentos, setPlanDeTratamientoMedicamentos] = useState('');
  const [loading, setLoading] = useState(false);

  // Calcula Glasgow Total automáticamente
  React.useEffect(() => {
    const ocular = parseInt(gaslowOcular) || 0;
    const verbal = parseInt(gaslowVerbal) || 0;
    const motora = parseInt(gaslowMotora) || 0;
    setGaslowTotal(ocular + verbal + motora);
  }, [gaslowOcular, gaslowVerbal, gaslowMotora]);


    // Actualizar la hora cada segundo
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
      setHora(currentTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const consulta = await createConsultaForCedula(cedula, {
        hora,
        motivoDeConsulta,
        enfermedadActual,
        presionArterial,
        frecuenciaCardiaca,
        frecuenciaRespiratoria,
        temperaturaBucal,
        temperaturaAxilar,
        peso,
        talla,
        gaslowOcular,
        gaslowVerbal,
        gaslowMotora,
        gaslowTotal,
        reaccionPupilaIzq,
        reaccionPupilaDer,
        tiempoLlenadoCapilar,
        saturacionOxigeno,
        viaAereaObstruida,
        cabeza,
        cuello,
        torax,
        abdomen,
        columna,
        pelvis,
        extremidades,
        heridaPenetrante,
        heridaCortante,
        fracturaExpuesta,
        fracturaCerrada,
        cuerpoExtrano,
        hemorragia,
        mordedura,
        picadura,
        excoriacion,
        deformidadOMasa,
        hematoma,
        eritemaInflamacion,
        luxacionEsguince,
        quemadura,
        solicitudExamenBiometria,
        solicitudExamenUroanalisis,
        solicitudExamenQuimicaSanguinea,
        solicitudExamenElectrolitos,
        solicitudExamenGasometria,
        solicitudExamenElectrocardiograma,
        solicitudExamenEndoscopia,
        solicitudExamenRxTorax,
        solicitudExamenRxAbdomen,
        solicitudExamenRxOsea,
        solicitudExamenTomografia,
        solicitudExamenResonancia,
        solicitudExamenEcografiaPelvica,
        solicitudExamenEcografiaAbdomen,
        solicitudExamenInterconsulta,
        solicitudExamenOtros,
        diagnosticodeIngreso,
        diagnosticodeAltade,
        planDeTratamientoIndicaciones,
        planDeTratamientoMedicamentos
      });
      if (onConsultaCreada) onConsultaCreada(consulta);
      // Limpia todos los campos
      setHora('');
      setMotivoDeConsulta('');
      setEnfermedadActual('');
      setPresionArterial('');
      setFrecuenciaCardiaca('');
      setFrecuenciaRespiratoria('');
      setTemperaturaBucal('');
      setTemperaturaAxilar('');
      setPeso('');
      setTalla('');
      setGaslowOcular('');
      setGaslowVerbal('');
      setGaslowMotora('');
      setGaslowTotal('');
      setReaccionPupilaIzq('');
      setReaccionPupilaDer('');
      setTiempoLlenadoCapilar('');
      setSaturacionOxigeno('');
      setViaAereaObstruida('');
      setCabeza('');
      setCuello('');
      setTorax('');
      setAbdomen('');
      setColumna('');
      setPelvis('');
      setExtremidades('');
      setHeridaPenetrante('');
      setHeridaCortante('');
      setFracturaExpuesta('');
      setFracturaCerrada('');
      setCuerpoExtrano('');
      setHemorragia('');
      setMordedura('');
      setPicadura('');
      setExcoriacion('');
      setDeformidadOMasa('');
      setHematoma('');
      setEritemaInflamacion('');
      setLuxacionEsguince('');
      setQuemadura('');
      setSolicitudExamenBiometria(false);
      setSolicitudExamenUroanalisis(false);
      setSolicitudExamenQuimicaSanguinea(false);
      setSolicitudExamenElectrolitos(false);
      setSolicitudExamenGasometria(false);
      setSolicitudExamenElectrocardiograma(false);
      setSolicitudExamenEndoscopia(false);
      setSolicitudExamenRxTorax(false);
      setSolicitudExamenRxAbdomen(false);
      setSolicitudExamenRxOsea(false);
      setSolicitudExamenTomografia(false);
      setSolicitudExamenResonancia(false);
      setSolicitudExamenEcografiaPelvica(false);
      setSolicitudExamenEcografiaAbdomen(false);
      setSolicitudExamenInterconsulta(false);
      setSolicitudExamenOtros(false);
      setDiagnosticodeIngreso('');
      setDiagnosticodeAltade('');
      setPlanDeTratamientoIndicaciones('');
      setPlanDeTratamientoMedicamentos('');
    } catch (err) {
      // Manejo de error si lo deseas
    }
    setLoading(false);
  };

  return (
    <form className="crear-consulta-form" onSubmit={handleSubmit}>
      <h3 className="crear-consulta-titulo">
        Nueva Consulta{nombreCliente ? ` para ${nombreCliente}` : ''}
      </h3>
      <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '24px 0 8px 0' }} />
      <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Inicio de Atención y Motivo</h4>
      <div className="crear-consulta-campo">
        <label>Hora:</label>
        <input
          type="text"
          value={hora}
          onChange={e => setHora(e.target.value)}
          className="crear-consulta-input"
          readOnly={true}
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Motivo de Consulta:</label>
        <input
          type="text"
          value={motivoDeConsulta}
          onChange={e => setMotivoDeConsulta(e.target.value)}
          required
          className="crear-consulta-input"
        />
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '16px 0 24px 0' }} />
      <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Enfermedad Actual y Revisión de Sistemas</h4>
      <div className="crear-consulta-campo">
        <label>Enfermedad Actual:</label>
        <textarea
          value={enfermedadActual}
          onChange={e => setEnfermedadActual(e.target.value)}
          rows={3}
          required
          className="crear-consulta-textarea"
        />
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '16px 0 24px 0' }} />
      <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Signos Vitales, Mediciones y Valores</h4>
      <div className="crear-consulta-campo">
        <label>Presión Arterial:</label>
        <input
          type="text"
          value={presionArterial}
          onChange={e => setPresionArterial(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Frecuencia Cardíaca:</label>
        <input
          type="text"
          value={frecuenciaCardiaca}
          onChange={e => setFrecuenciaCardiaca(e.target.value)}
          className="crear-consulta-input"
        />
        <label>Frecuencia Respiratoria:</label>
        <input
          type="text"
          value={frecuenciaRespiratoria}
          onChange={e => setFrecuenciaRespiratoria(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Temperatura Bucal:</label>
        <input
          type="text"
          value={temperaturaBucal}
          onChange={e => setTemperaturaBucal(e.target.value)}
          className="crear-consulta-input"
        />
        <label>Temperatura Axilar:</label>
        <input
          type="text"
          value={temperaturaAxilar}
          onChange={e => setTemperaturaAxilar(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Peso:</label>
        <input
          type="text"
          value={peso}
          onChange={e => setPeso(e.target.value)}
          className="crear-consulta-input"
        />
        <label>Talla:</label>
        <input
          type="text"
          value={talla}
          onChange={e => setTalla(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Glasgow Ocular:</label>
        <input
          type="number"
          value={gaslowOcular}
          onChange={e => setGaslowOcular(e.target.value)}
          className="crear-consulta-input"
        />
        <label>Glasgow Verbal:</label>
        <input
          type="number"
          value={gaslowVerbal}
          onChange={e => setGaslowVerbal(e.target.value)}
          className="crear-consulta-input"
        />
        <label>Glasgow Motora:</label>
        <input
          type="number"
          value={gaslowMotora}
          onChange={e => setGaslowMotora(e.target.value)}
          className="crear-consulta-input"
        />
        <label>Glasgow Total:</label>
        <input
          type="number"
          value={gaslowTotal}
          readOnly
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Reacción Pupila Izquierda:</label>
        <input
          type="text"
          value={reaccionPupilaIzq}
          onChange={e => setReaccionPupilaIzq(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Reacción Pupila Derecha:</label>
        <input
          type="text"
          value={reaccionPupilaDer}
          onChange={e => setReaccionPupilaDer(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Tiempo Llenado Capilar:</label>
        <input
          type="text"
          value={tiempoLlenadoCapilar}
          onChange={e => setTiempoLlenadoCapilar(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Saturación Oxígeno:</label>
        <input
          type="text"
          value={saturacionOxigeno}
          onChange={e => setSaturacionOxigeno(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '16px 0 24px 0' }} />
      <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Examen Físico y Diagnóstico</h4>
      <div className="crear-consulta-campo">
        <label>Vía Aérea Obstruida:</label>
        <input
          type="text"
          value={viaAereaObstruida}
          onChange={e => setViaAereaObstruida(e.target.value)}
          className="crear-consulta-input"
        />
        <label>Cabeza:</label>
        <input
          type="text"
          value={cabeza}
          onChange={e => setCabeza(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Cuello:</label>
        <input
          type="text"
          value={cuello}
          onChange={e => setCuello(e.target.value)}
          className="crear-consulta-input"
        />
        <label>Tórax:</label>
        <input
          type="text"
          value={torax}
          onChange={e => setTorax(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Abdomen:</label>
        <input
          type="text"
          value={abdomen}
          onChange={e => setAbdomen(e.target.value)}
          className="crear-consulta-input"
        />
        <label>Columna:</label>
        <input
          type="text"
          value={columna}
          onChange={e => setColumna(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Pelvis:</label>
        <input
          type="text"
          value={pelvis}
          onChange={e => setPelvis(e.target.value)}
          className="crear-consulta-input"
        />
        <label>Extremidades:</label>
        <input
          type="text"
          value={extremidades}
          onChange={e => setExtremidades(e.target.value)}
          className="crear-consulta-input"
        />
      </div>

      {/* START: Lesiones / Traumatismos */}
      <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '24px 0 8px 0' }} />
      <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Lesiones / Traumatismos</h4>
      <div className="crear-consulta-campo" style={{ flexDirection: 'column', gap: 8 }}>
        <div>
          <label>Herida Penetrante:</label>
          <input
            type="text"
            value={heridaPenetrante}
            onChange={e => setHeridaPenetrante(e.target.value)}
            className="crear-consulta-input"
          />
        </div>
        <div>
          <label>Herida Cortante:</label>
          <input
            type="text"
            value={heridaCortante}
            onChange={e => setHeridaCortante(e.target.value)}
            className="crear-consulta-input"
          />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <label>Fractura Expuesta:</label>
            <input
              type="text"
              value={fracturaExpuesta}
              onChange={e => setFracturaExpuesta(e.target.value)}
              className="crear-consulta-input"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Fractura Cerrada:</label>
            <input
              type="text"
              value={fracturaCerrada}
              onChange={e => setFracturaCerrada(e.target.value)}
              className="crear-consulta-input"
            />
          </div>
        </div>
        <div>
          <label>Cuerpo Extraño:</label>
          <input
            type="text"
            value={cuerpoExtrano}
            onChange={e => setCuerpoExtrano(e.target.value)}
            className="crear-consulta-input"
          />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <label>Hemorragia:</label>
            <input
              type="text"
              value={hemorragia}
              onChange={e => setHemorragia(e.target.value)}
              className="crear-consulta-input"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Mordedura:</label>
            <input
              type="text"
              value={mordedura}
              onChange={e => setMordedura(e.target.value)}
              className="crear-consulta-input"
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <label>Picadura:</label>
            <input
              type="text"
              value={picadura}
              onChange={e => setPicadura(e.target.value)}
              className="crear-consulta-input"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Excoriación:</label>
            <input
              type="text"
              value={excoriacion}
              onChange={e => setExcoriacion(e.target.value)}
              className="crear-consulta-input"
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <label>Deformidad o Masa:</label>
            <input
              type="text"
              value={deformidadOMasa}
              onChange={e => setDeformidadOMasa(e.target.value)}
              className="crear-consulta-input"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Hematoma:</label>
            <input
              type="text"
              value={hematoma}
              onChange={e => setHematoma(e.target.value)}
              className="crear-consulta-input"
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <label>Eritema / Inflamación:</label>
            <input
              type="text"
              value={eritemaInflamacion}
              onChange={e => setEritemaInflamacion(e.target.value)}
              className="crear-consulta-input"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Luxación / Esguince:</label>
            <input
              type="text"
              value={luxacionEsguince}
              onChange={e => setLuxacionEsguince(e.target.value)}
              className="crear-consulta-input"
            />
          </div>
        </div>
        <div>
          <label>Quemadura:</label>
          <input
            type="text"
            value={quemadura}
            onChange={e => setQuemadura(e.target.value)}
            className="crear-consulta-input"
          />
        </div>
      </div>
      {/* END: Lesiones / Traumatismos */}

      <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '16px 0 24px 0' }} />
      <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Exámenes solicitados</h4>
      <div className="crear-consulta-campo">
        <label>Examen Biometría:</label>
        <input
          type="checkbox"
          checked={solicitudExamenBiometria}
          onChange={e => setSolicitudExamenBiometria(e.target.checked)}
          className="crear-consulta-checkbox"
        />
        <label>Examen Uroanálisis:</label>
        <input
          type="checkbox"
          checked={solicitudExamenUroanalisis}
          onChange={e => setSolicitudExamenUroanalisis(e.target.checked)}
          className="crear-consulta-checkbox"
        />
        <label>Examen Química Sanguínea:</label>
        <input
          type="checkbox"
          checked={solicitudExamenQuimicaSanguinea}
          onChange={e => setSolicitudExamenQuimicaSanguinea(e.target.checked)}
          className="crear-consulta-checkbox"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Examen Electrolitos:</label>
        <input
          type="checkbox"
          checked={solicitudExamenElectrolitos}
          onChange={e => setSolicitudExamenElectrolitos(e.target.checked)}
          className="crear-consulta-checkbox"
        />
        <label>Examen Gasometría:</label>
        <input
          type="checkbox"
          checked={solicitudExamenGasometria}
          onChange={e => setSolicitudExamenGasometria(e.target.checked)}
          className="crear-consulta-checkbox"
        />
        <label>Examen Electrocardiograma:</label>
        <input
          type="checkbox"
          checked={solicitudExamenElectrocardiograma}
          onChange={e => setSolicitudExamenElectrocardiograma(e.target.checked)}
          className="crear-consulta-checkbox"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Examen Endoscopía:</label>
        <input
          type="checkbox"
          checked={solicitudExamenEndoscopia}
          onChange={e => setSolicitudExamenEndoscopia(e.target.checked)}
          className="crear-consulta-checkbox"
        />
        <label>Examen Rx Tórax:</label>
        <input
          type="checkbox"
          checked={solicitudExamenRxTorax}
          onChange={e => setSolicitudExamenRxTorax(e.target.checked)}
          className="crear-consulta-checkbox"
        />
        <label>Examen Rx Abdomen:</label>
        <input
          type="checkbox"
          checked={solicitudExamenRxAbdomen}
          onChange={e => setSolicitudExamenRxAbdomen(e.target.checked)}
          className="crear-consulta-checkbox"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Examen Rx Ósea:</label>
        <input
          type="checkbox"
          checked={solicitudExamenRxOsea}
          onChange={e => setSolicitudExamenRxOsea(e.target.checked)}
          className="crear-consulta-checkbox"
        />
        <label>Examen Tomografía:</label>
        <input
          type="checkbox"
          checked={solicitudExamenTomografia}
          onChange={e => setSolicitudExamenTomografia(e.target.checked)}
          className="crear-consulta-checkbox"
        />
        <label>Examen Resonancia:</label>
        <input
          type="checkbox"
          checked={solicitudExamenResonancia}
          onChange={e => setSolicitudExamenResonancia(e.target.checked)}
          className="crear-consulta-checkbox"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Examen Ecografía Pélvica:</label>
        <input
          type="checkbox"
          checked={solicitudExamenEcografiaPelvica}
          onChange={e => setSolicitudExamenEcografiaPelvica(e.target.checked)}
          className="crear-consulta-checkbox"
        />
        <label>Examen Ecografía Abdomen:</label>
        <input
          type="checkbox"
          checked={solicitudExamenEcografiaAbdomen}
          onChange={e => setSolicitudExamenEcografiaAbdomen(e.target.checked)}
          className="crear-consulta-checkbox"
        />
        <label>Interconsulta:</label>
        <input
          type="checkbox"
          checked={solicitudExamenInterconsulta}
          onChange={e => setSolicitudExamenInterconsulta(e.target.checked)}
          className="crear-consulta-checkbox"
        />
        <label>Otros Exámenes:</label>
        <input
          type="checkbox"
          checked={solicitudExamenOtros}
          onChange={e => setSolicitudExamenOtros(e.target.checked)}
          className="crear-consulta-checkbox"
        />
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '16px 0 24px 0' }} />
      <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Diagnosticos</h4>
      <div className="crear-consulta-campo">
        <label>Diagnóstico de Ingreso:</label>
        <input
          type="text"
          value={diagnosticodeIngreso}
          onChange={e => setDiagnosticodeIngreso(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Diagnóstico de Alta:</label>
        <input
          type="text"
          value={diagnosticodeAltade}
          onChange={e => setDiagnosticodeAltade(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Plan de Tratamiento e Indicaciones:</label>
        <textarea
          value={planDeTratamientoIndicaciones}
          onChange={e => setPlanDeTratamientoIndicaciones(e.target.value)}
          rows={3}
          className="crear-consulta-textarea"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Plan de Tratamiento (Medicamentos):</label>
        <textarea
          value={planDeTratamientoMedicamentos}
          onChange={e => setPlanDeTratamientoMedicamentos(e.target.value)}
          rows={3}
          className="crear-consulta-textarea"
        />
      </div>
      <button className="crear-consulta-btn" type="submit" disabled={loading}>
        Guardar
      </button>
    </form>
  );
};

export default CrearConsulta;
