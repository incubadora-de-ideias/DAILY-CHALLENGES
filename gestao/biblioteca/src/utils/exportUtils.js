// Funções utilitárias de exportação (CSV, PDF, etc.)

export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => row[header] || '').join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename || 'export.csv';
  link.click();
};

export const exportToJSON = (data, filename) => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename || 'export.json';
  link.click();
};

export const printData = (data) => {
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head><title>Print</title></head>
      <body>${JSON.stringify(data, null, 2)}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
};

