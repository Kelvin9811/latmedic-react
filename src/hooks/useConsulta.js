import { useState, useRef, useCallback } from 'react';
import { uploadData, getUrl } from '@aws-amplify/storage';
import { createConsultaForCedula, addDocumentoToConsulta } from '../apiCrud';

const defaultNuevaConsulta = {
  hora: '',
  motivoDeConsulta: '',
  enfermedadActual: '',
  presionArterial: '',
  frecuenciaCardiaca: '',
  frecuenciaRespiratoria: '',
  temperaturaBucal: '',
  temperaturaAxilar: '',
  peso: '',
  talla: '',
  gaslowOcular: '',
  gaslowVerbal: '',
  gaslowMotora: '',
  gaslowTotal: '',
  reaccionPupilaIzq: '',
  reaccionPupilaDer: '',
  tiempoLlenadoCapilar: '',
  saturacionOxigeno: '',
  viaAereaObstruida: '',
  cabeza: '',
  cuello: '',
  torax: '',
  abdomen: '',
  columna: '',
  pelvis: '',
  extremidades: '',
  heridaPenetrante: '',
  heridaCortante: '',
  fracturaExpuesta: '',
  fracturaCerrada: '',
  cuerpoExtrano: '',
  hemorragia: '',
  mordedura: '',
  picadura: '',
  excoriacion: '',
  deformidadOMasa: '',
  hematoma: '',
  eritemaInflamacion: '',
  luxacionEsguince: '',
  quemadura: '',
  solicitudExamenBiometria: false,
  solicitudExamenUroanalisis: false,
  solicitudExamenQuimicaSanguinea: false,
  solicitudExamenElectrolitos: false,
  solicitudExamenGasometria: false,
  solicitudExamenElectrocardiograma: false,
  solicitudExamenEndoscopia: false,
  solicitudExamenRxTorax: false,
  solicitudExamenRxAbdomen: false,
  solicitudExamenRxOsea: false,
  solicitudExamenTomografia: false,
  solicitudExamenResonancia: false,
  solicitudExamenEcografiaPelvica: false,
  solicitudExamenEcografiaAbdomen: false,
  solicitudExamenInterconsulta: false,
  solicitudExamenOtros: false,
  diagnosticodeIngreso: '',
  diagnosticodeAltade: '',
  planDeTratamientoIndicaciones: '',
  planDeTratamientoMedicamentos: ''
};

export default function useConsulta() {
  const [nuevaConsultaData, setNuevaConsultaData] = useState({ ...defaultNuevaConsulta });
  const [adjuntos, setAdjuntos] = useState([]); // array<File>
  const [uploadingAdjuntos, setUploadingAdjuntos] = useState(false);
  const fileInputRef = useRef(null);

  const handleNuevaConsultaChange = useCallback((field, value) => {
    setNuevaConsultaData(prev => ({ ...prev, [field]: value }));
  }, []);

  const resetNuevaConsulta = useCallback(() => {
    setNuevaConsultaData({ ...defaultNuevaConsulta });
    setAdjuntos([]);
  }, []);

  const handleSingleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAdjuntos(prev => [...prev, file]);
    }
    if (e.target) e.target.value = null;
  }, []);

  const handleRemoveAdjunto = useCallback((index) => {
    setAdjuntos(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleAddDocumentoClick = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.click();
  }, []);

  const uploadFiles = useCallback(async (files) => {
    if (!files || files.length === 0) return [];

    const uploads = await Promise.all(
      Array.from(files).map(async (file) => {
        const path = `documentos/${Date.now()}_${Math.random().toString(36).slice(2, 8)}_${file.name.replace(/\s+/g, '_')}`;
        try {
          // uploadData v6: provide path & data
          await uploadData({
            path,
            data: file,
            options: { contentType: file.type || 'application/octet-stream' }
          }).result;
        } catch (err) {
          console.error('Upload error', err);
        }
        const { url } = await getUrl({ path });
        return { key: path, url: url.toString(), name: file.name };
      })
    );
    return uploads;
  }, []);

  // Guardar nueva consulta y asociar documentos; recibe cedula del paciente
  const saveNuevaConsulta = useCallback(async (consultasCedula, consultaPayload) => {
    let uploadResults = [];
    try {
      if (adjuntos && adjuntos.length > 0) {
        setUploadingAdjuntos(true);
        try {
          uploadResults = await uploadFiles(adjuntos);
        } finally {
          setUploadingAdjuntos(false);
        }
      }

      // crear consulta en backend
      const nueva = await createConsultaForCedula(consultasCedula, consultaPayload || nuevaConsultaData);

      // asociar documentos creados en storage con la consulta
      if (uploadResults && uploadResults.length > 0) {
        for (const u of uploadResults) {
          try {
            await addDocumentoToConsulta(nueva.id, {
              tipo: 'OTRO',
              titulo: u.name,
              s3key: u.key,
              notas: u.url
            });
          } catch (err) {
            console.error('Error creando documento para nueva consulta:', err);
          }
        }
      }

      // limpiar estado local tras guardar
      setAdjuntos([]);
      resetNuevaConsulta();
      return { success: true, consulta: nueva };
    } catch (err) {
      console.error('Error guardando nueva consulta:', err);
      return { success: false, error: err };
    } finally {
      setUploadingAdjuntos(false);
    }
  }, [adjuntos, nuevaConsultaData, uploadFiles, resetNuevaConsulta]);

  return {
    nuevaConsultaData,
    setNuevaConsultaData,
    handleNuevaConsultaChange,
    resetNuevaConsulta,
    adjuntos,
    setAdjuntos,
    uploadingAdjuntos,
    fileInputRef,
    handleSingleFileChange,
    handleRemoveAdjunto,
    handleAddDocumentoClick,
    uploadFiles,
    saveNuevaConsulta
  };
}
