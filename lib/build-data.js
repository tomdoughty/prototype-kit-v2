const fs = require('fs');

const fsPromises = fs.promises;

const XLSX = require('xlsx');

(async () => {
  try {
    // Read files from dist
    const distFilenames = await fsPromises.readdir('./app/data/dist');
    // Clear files from dist
    distFilenames.forEach(async (filename) => fsPromises.unlink(`./app/data/dist/${filename}`));

    // Read files from src
    const srcFilenames = await fsPromises.readdir('./app/data/src');
    // Process each file
    srcFilenames.forEach((filename) => {
      try {
        // Read the spreadsheet
        const wb = XLSX.readFile(`./app/data/src/${filename}`);
        // Convert the spreadsheet to JSON
        const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        // Write the JSON to dist
        fs.writeFileSync(`./app/data/dist/${filename.replace(/\.[^/.]+$/, '')}.json`, JSON.stringify({ data }));
      } catch (err) {
        console.error(`Error occured while creating ${filename}`, err);
      }
    });
  } catch (err) {
    console.error('Error occured while reading data directory', err);
  }
})();
