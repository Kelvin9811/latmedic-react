import { useState, useRef, useCallback , useEffect} from 'react';

/**
 * useConsultaPopup
 * - initialData: objeto inicial para consultaData (útil para editar)
 * - options: objeto opcional (p.ej. callbacks para upload/obtención de URL)
 *
 * Devuelve:
 * { consultaData, setConsultaData,
 *   adjuntos, onAddDocumentoClick, fileInputRef, onSingleFileChange, onRemoveAdjunto,
 *   uploadingAdjuntos, setUploadingAdjuntos,
 *   previewUrl, previewLoading, handlePreviewDocument, handleClosePreview,
 *   loadingButtonState, setLoadingButtonState }
 */
export default function useConsultaPopup(initialData = {}, options = {}) {
  const [consultaData, setConsultaData] = useState(() => ({ ...initialData }));
  const [adjuntos, setAdjuntos] = useState([]);
  const [uploadingAdjuntos, setUploadingAdjuntos] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewLoading, setPreviewLoading] = useState(false);
  const [loadingButtonState, setLoadingButtonState] = useState(false);

  const fileInputRef = useRef(null);

  // abrir selector de archivo
  const onAddDocumentoClick = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.click();
  }, []);

  // al seleccionar un archivo (solo archivo único aquí; puedes adaptar a múltiples)
  const onSingleFileChange = useCallback(async (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    // añadir a lista local
    setAdjuntos(prev => [...prev, file]);
    // limpiar input para permitir re-selección del mismo archivo si se quiere
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const onRemoveAdjunto = useCallback((index) => {
    setAdjuntos(prev => prev.filter((_, i) => i !== index));
  }, []);

  // manejo de preview: esperamos un callback options.getUrlFromDocumento si se necesita obtener URL (s3key)
  const handlePreviewDocument = useCallback(async (doc) => {
    if (!doc) return;
    setPreviewLoading(true);
    try {
      if (options.getUrlFromDocumento) {
        // el callback debe devolver url string
        const url = await options.getUrlFromDocumento(doc);
        if (url) setPreviewUrl(url);
        else throw new Error('No url from getUrlFromDocumento');
      } else if (doc.url) {
        setPreviewUrl(doc.url);
      } else if (doc.s3key && options.getUrlByKey) {
        const url = await options.getUrlByKey(doc.s3key);
        if (url) setPreviewUrl(url);
        else throw new Error('No url from getUrlByKey');
      } else {
        throw new Error('No strategy to obtain preview URL');
      }
    } catch (err) {
      console.error('Error obtaining preview URL', err);
      try { alert('No se pudo obtener la vista previa del documento.'); } catch (_) {}
    } finally {
      setPreviewLoading(false);
    }
  }, [options]);

  const handleClosePreview = useCallback(() => {
    setPreviewUrl('');
  }, []);

  // Calcula y actualiza el total de Glasgow cuando cambian los subvalores
  useEffect(() => {
    const ocular = Number(consultaData.gaslowOcular) || 0;
    const verbal = Number(consultaData.gaslowVerbal) || 0;
    const motora = Number(consultaData.gaslowMotora) || 0;
    const total = ocular + verbal + motora;
    if (consultaData.gaslowTotal !== total) {
      setConsultaData(d => ({ ...d, gaslowTotal: total }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultaData.gaslowOcular, consultaData.gaslowVerbal, consultaData.gaslowMotora]);

  // helper para resetear estado del popup (opcional)
  const resetConsultaPopup = useCallback((keepInitial = false) => {
    setConsultaData(keepInitial ? { ...initialData } : {});
    setAdjuntos([]);
    setPreviewUrl('');
    setPreviewLoading(false);
    setUploadingAdjuntos(false);
    setLoadingButtonState(false);
  }, [initialData]);

  return {
    // consulta data
    consultaData,
    setConsultaData,

    // adjuntos / archivos
    adjuntos,
    onAddDocumentoClick,
    fileInputRef,
    onSingleFileChange,
    onRemoveAdjunto,
    uploadingAdjuntos,
    setUploadingAdjuntos,

    // preview
    previewUrl,
    previewLoading,
    handlePreviewDocument,
    handleClosePreview,

    // botón de guardado
    loadingButtonState,
    setLoadingButtonState,

    // util
    resetConsultaPopup,
  };
}
