import React, { useState } from 'react';
import { createConsultaForCedula } from '../apiCrud';
import './CrearConsulta.css';

const CrearConsulta = ({ cedula, onConsultaCreada, nombreCliente }) => {
  const [hora, setHora] = useState('');
  const [grupoSanguineoYFactorRh, setGrupoSanguineoYFactorRh] = useState('');
  const [motivoDeConsulta, setMotivoDeConsulta] = useState('');
  const [alientoEtilico, setAlientoEtilico] = useState('');
  const [valorAlcoCheck, setValorAlcoCheck] = useState('');
  const [antecedenteAlergico, setAntecedenteAlergico] = useState('');
  const [antecedenteClinico, setAntecedenteClinico] = useState('');
  const [antecedenteGinecologico, setAntecedenteGinecologico] = useState('');
  const [antecedenteTraumatologico, setAntecedenteTraumatologico] = useState('');
  const [antecedenteQuirurgico, setAntecedenteQuirurgico] = useState('');
  const [antecedenteFarmacoLogico, setAntecedenteFarmacoLogico] = useState('');
  const [antecedentePsiquiatrico, setAntecedentePsiquiatrico] = useState('');
  const [antecedenteOtro, setAntecedenteOtro] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const consulta = await createConsultaForCedula(cedula, {
        hora,
        grupoSanguineoYFactorRh,
        motivoDeConsulta,
        alientoEtilico,
        valorAlcoCheck,
        antecedenteAlergico,
        antecedenteClinico,
        antecedenteGinecologico,
        antecedenteTraumatologico,
        antecedenteQuirurgico,
        antecedenteFarmacoLogico,
        antecedentePsiquiatrico,
        antecedenteOtro,
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
      setGrupoSanguineoYFactorRh('');
      setMotivoDeConsulta('');
      setAlientoEtilico('');
      setValorAlcoCheck('');
      setAntecedenteAlergico('');
      setAntecedenteClinico('');
      setAntecedenteGinecologico('');
      setAntecedenteTraumatologico('');
      setAntecedenteQuirurgico('');
      setAntecedenteFarmacoLogico('');
      setAntecedentePsiquiatrico('');
      setAntecedenteOtro('');
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
      <div className="crear-consulta-campo">
        <label>Hora:</label>
        <input
          type="text"
          value={hora}
          onChange={e => setHora(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Grupo Sanguíneo y Factor RH:</label>
        <input
          type="text"
          value={grupoSanguineoYFactorRh}
          onChange={e => setGrupoSanguineoYFactorRh(e.target.value)}
          className="crear-consulta-input"
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
      <div className="crear-consulta-campo">
        <label>Aliento Etílico:</label>
        <input
          type="text"
          value={alientoEtilico}
          onChange={e => setAlientoEtilico(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Valor AlcoCheck:</label>
        <input
          type="text"
          value={valorAlcoCheck}
          onChange={e => setValorAlcoCheck(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Antecedente Alérgico:</label>
        <input
          type="text"
          value={antecedenteAlergico}
          onChange={e => setAntecedenteAlergico(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Antecedente Clínico:</label>
        <input
          type="text"
          value={antecedenteClinico}
          onChange={e => setAntecedenteClinico(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Antecedente Ginecológico:</label>
        <input
          type="text"
          value={antecedenteGinecologico}
          onChange={e => setAntecedenteGinecologico(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Antecedente Traumatológico:</label>
        <input
          type="text"
          value={antecedenteTraumatologico}
          onChange={e => setAntecedenteTraumatologico(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Antecedente Quirúrgico:</label>
        <input
          type="text"
          value={antecedenteQuirurgico}
          onChange={e => setAntecedenteQuirurgico(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Antecedente Farmacológico:</label>
        <input
          type="text"
          value={antecedenteFarmacoLogico}
          onChange={e => setAntecedenteFarmacoLogico(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Antecedente Psiquiátrico:</label>
        <input
          type="text"
          value={antecedentePsiquiatrico}
          onChange={e => setAntecedentePsiquiatrico(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Antecedente Otro:</label>
        <input
          type="text"
          value={antecedenteOtro}
          onChange={e => setAntecedenteOtro(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
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
      </div>
      <div className="crear-consulta-campo">
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
      </div>
      <div className="crear-consulta-campo">
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
      </div>
      <div className="crear-consulta-campo">
        <label>Talla:</label>
        <input
          type="text"
          value={talla}
          onChange={e => setTalla(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Gaslow Ocular:</label>
        <input
          type="text"
          value={gaslowOcular}
          onChange={e => setGaslowOcular(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Gaslow Verbal:</label>
        <input
          type="text"
          value={gaslowVerbal}
          onChange={e => setGaslowVerbal(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Gaslow Motora:</label>
        <input
          type="text"
          value={gaslowMotora}
          onChange={e => setGaslowMotora(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Gaslow Total:</label>
        <input
          type="text"
          value={gaslowTotal}
          onChange={e => setGaslowTotal(e.target.value)}
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
      <div className="crear-consulta-campo">
        <label>Vía Aérea Obstruida:</label>
        <input
          type="text"
          value={viaAereaObstruida}
          onChange={e => setViaAereaObstruida(e.target.value)}
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Examen Biometría:</label>
        <input
          type="checkbox"
          checked={solicitudExamenBiometria}
          onChange={e => setSolicitudExamenBiometria(e.target.checked)}
          className="crear-consulta-checkbox"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Examen Uroanálisis:</label>
        <input
          type="checkbox"
          checked={solicitudExamenUroanalisis}
          onChange={e => setSolicitudExamenUroanalisis(e.target.checked)}
          className="crear-consulta-checkbox"
        />
      </div>
      <div className="crear-consulta-campo">
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
      </div>
      <div className="crear-consulta-campo">
        <label>Examen Gasometría:</label>
        <input
          type="checkbox"
          checked={solicitudExamenGasometria}
          onChange={e => setSolicitudExamenGasometria(e.target.checked)}
          className="crear-consulta-checkbox"
        />
      </div>
      <div className="crear-consulta-campo">
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
      </div>
      <div className="crear-consulta-campo">
        <label>Examen Rx Tórax:</label>
        <input
          type="checkbox"
          checked={solicitudExamenRxTorax}
          onChange={e => setSolicitudExamenRxTorax(e.target.checked)}
          className="crear-consulta-checkbox"
        />
      </div>
      <div className="crear-consulta-campo">
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
      </div>
      <div className="crear-consulta-campo">
        <label>Examen Tomografía:</label>
        <input
          type="checkbox"
          checked={solicitudExamenTomografia}
          onChange={e => setSolicitudExamenTomografia(e.target.checked)}
          className="crear-consulta-checkbox"
        />
      </div>
      <div className="crear-consulta-campo">
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
      </div>
      <div className="crear-consulta-campo">
        <label>Examen Ecografía Abdomen:</label>
        <input
          type="checkbox"
          checked={solicitudExamenEcografiaAbdomen}
          onChange={e => setSolicitudExamenEcografiaAbdomen(e.target.checked)}
          className="crear-consulta-checkbox"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Interconsulta:</label>
        <input
          type="checkbox"
          checked={solicitudExamenInterconsulta}
          onChange={e => setSolicitudExamenInterconsulta(e.target.checked)}
          className="crear-consulta-checkbox"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Otros Exámenes:</label>
        <input
          type="checkbox"
          checked={solicitudExamenOtros}
          onChange={e => setSolicitudExamenOtros(e.target.checked)}
          className="crear-consulta-checkbox"
        />
      </div>
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
