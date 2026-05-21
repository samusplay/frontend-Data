"use client";
import { blobClient } from "@/app/lib/blobClient";
import { useState } from "react";
import toast from "react-hot-toast";

export function useExport() {
  const [isExporting, setIsExporting] = useState(false);

  const downloadFile = (blob: Blob, fileName: string) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const exportReport = async (datasetId: string) => {
    setIsExporting(true);
    try {                                          // ← try { no try:
      const { blob, fileName } = await blobClient(
        `/api/v1/export/${datasetId}`
      );
      downloadFile(blob, fileName);
      toast.success(`Reporte descargado: ${fileName}`);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "No se pudo completar la exportación debido a un error en el servicio de datos"
      );
    } finally {
      setIsExporting(false);
    }
  };

  return { exportReport, isExporting };  // ← ahora sí están definidas
}