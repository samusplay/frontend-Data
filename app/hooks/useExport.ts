"use client";
import { blobClient } from "@/app/lib/blobClient";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";
import { useState } from "react";
import toast from "react-hot-toast";

export function useExport() {
  const [isExporting, setIsExporting] = useState(false);

  /**
   * Convierte un Blob CSV a PDF con tabla formateada
   * y dispara la descarga automática en el navegador.
   */
  const convertCsvToPdfAndDownload = async (csvBlob: Blob, fileName: string) => {
    // 1. Leer el contenido del Blob como texto
    const csvText = await csvBlob.text();

    // 2. Parsear el CSV con PapaParse
    const parsed = Papa.parse<Record<string, string>>(csvText, {
      header: true,       // primera fila como cabeceras
      skipEmptyLines: true
    });

    const rows = parsed.data;
    const columns = parsed.meta.fields || [];

    if (rows.length === 0) {
      toast.error("El reporte no contiene datos para exportar.");
      return;
    }

    // 3. Crear el documento PDF
    const doc = new jsPDF({
      orientation: "landscape", // horizontal para que quepan todas las columnas
      unit: "mm",
      format: "a4"
    });

    // 4. Título del reporte
    const today = new Date().toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    doc.setFontSize(16);
    doc.setTextColor(6, 182, 212); // color cyan similar al UI
    doc.text("Reporte Analítico Territorial", 14, 15);

    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(`Generado el ${today}`, 14, 22);

    // 5. Generar la tabla con autoTable
    autoTable(doc, {
      startY: 28,
      head: [columns],                              // cabeceras del CSV
      body: rows.map(row => columns.map(col => row[col] ?? "")), // filas
      styles: {
        fontSize: 8,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [6, 182, 212],   // cyan
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245], // gris claro para filas alternas
      },
      margin: { left: 14, right: 14 },
    });

    // 6. Nombre del archivo PDF con fecha
    const pdfFileName = fileName.replace(".csv", ".pdf");

    // 7. Disparar descarga del PDF
    doc.save(pdfFileName);
  };

  const exportReport = async (datasetId: string) => {
    setIsExporting(true);
    try {
      // ← ENDPOINT: aquí va la ruta del backend que devuelve el CSV
      // Cuando el endpoint esté listo reemplaza esta línea con la URL correcta
      // Ejemplo: /api/v1/export/{datasetId}
      const { blob