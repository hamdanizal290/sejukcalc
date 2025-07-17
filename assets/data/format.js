const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

// Baca file CSV
const csv = fs.readFileSync(path.join(__dirname, 'weather.csv'), 'utf8');
const parsed = Papa.parse(csv, { header: true }).data;

const output = ['export const dataCuaca = ['];

parsed.forEach(row => {
  const obj = {
    kota: row.Kota,
    bulan: row.Bulan,
    jam: Number(row.Jam),
    drybulb: Number(row.DryBulb),
    wetbulb: Number(row.WetBulb),
    humidityratio: Number(row.HumidityRatio),
    kecudara: Number(row.KecUdara),
  };
  let json = JSON.stringify(obj, null, 2)
    .replace(/"([^"]+)":/g, '$1:')       // hapus tanda kutip di key
    .replace(/\n/g, '\n  ');              // indent ulang
  output.push('  ' + json + ',');
});

output.push('];');

fs.writeFileSync('dataCuaca.js', output.join('\n'));
