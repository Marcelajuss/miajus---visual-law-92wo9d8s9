// Utilitários para download limpo e exportação de documentos em DOCX e PDF/HTML

/**
 * Baixa um arquivo DOCX bem formatado com suporte a Visual Law
 * (utiliza HTML formatado compatível com o Microsoft Word como .doc / .docx)
 */
export function exportToDocx(title: string, htmlContent: string) {
  const header = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
  body {
    font-family: 'Calibri', 'Arial', sans-serif;
    font-size: 11pt;
    line-height: 1.5;
    color: #1a1a1a;
    margin: 2cm;
  }
  h1 { font-size: 16pt; color: #0f172a; margin-bottom: 8pt; border-bottom: 2pt solid #1e3a8a; padding-bottom: 4pt; }
  h2 { font-size: 13pt; color: #1e3a8a; margin-top: 14pt; margin-bottom: 6pt; }
  p { margin-bottom: 8pt; text-align: justify; }
  .box-destaque {
    background-color: #f1f5f9;
    border-left: 4pt solid #1e3a8a;
    padding: 10pt;
    margin: 10pt 0;
  }
  .box-atencao {
    background-color: #fef2f2;
    border-left: 4pt solid #dc2626;
    padding: 10pt;
    margin: 10pt 0;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 10pt 0;
  }
  th, td {
    border: 1pt solid #cbd5e1;
    padding: 6pt;
    text-align: left;
  }
  th { background-color: #f8fafc; font-weight: bold; }
  .footer { font-size: 9pt; color: #64748b; margin-top: 20pt; border-top: 1pt solid #e2e8f0; padding-top: 6pt; text-align: center; }
</style>
</head>
<body>
${htmlContent}
<div class="footer">
  <p>Peça formatada com MiaJus - Visual Law | Valide os dados antes de juntar aos autos.</p>
</div>
</body>
</html>`

  const blob = new Blob(['\ufeff', header], {
    type: 'application/msword',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${sanitizeFileName(title)}.doc`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * Imprime/Salva em PDF preservando o layout A4 Visual Law
 */
export function exportToPdf(title: string, printableElementId: string) {
  const el = document.getElementById(printableElementId)
  if (!el) {
    window.print()
    return
  }

  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    window.print()
    return
  }

  const content = el.innerHTML

  printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title} - MiaJus Visual Law</title>
  <style>
    @page {
      size: A4;
      margin: 1.8cm 1.5cm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.5;
      background: #ffffff;
      padding: 0;
      margin: 0;
    }
    .print-container {
      width: 100%;
      max-width: 210mm;
      margin: 0 auto;
    }
    h1, h2, h3 { font-family: Georgia, serif; }
    table { width: 100%; border-collapse: collapse; }
    th, td { border: 1px solid #cbd5e1; padding: 8px; }
    th { background: #f8fafc; }
    .box-destaque {
      background: #f1f5f9;
      border-left: 4px solid #1e3a8a;
      padding: 12px;
      margin: 14px 0;
      border-radius: 4px;
    }
    .box-alerta {
      background: #fef2f2;
      border-left: 4px solid #ef4444;
      padding: 12px;
      margin: 14px 0;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="print-container">
    ${content}
  </div>
  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
        window.close();
      }, 350);
    };
  </script>
</body>
</html>
  `)
  printWindow.document.close()
}

export function sanitizeFileName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9_-]/g, '_')
    .replace(/_+/g, '_')
    .substring(0, 50)
}
