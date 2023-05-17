const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path')

function parseXlsxData(fileName) {
  return new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname,'../../public/personnelImportFile/',fileName), (err, data) => {
          if (err) {
            reject(err);
          } else {
            const workbook = XLSX.read(data, { type: 'buffer' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            resolve(jsonData);
          }
        });
  });
}

module.exports = parseXlsxData