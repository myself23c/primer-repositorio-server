


import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';






const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export async function compresor (){


    console.log("estoy comprimiendo esperate")
    const downloadFolder = path.join(__dirname, 'downloaded_images');
    await fs.ensureDir(downloadFolder);



const output = fs.createWriteStream(`${__dirname}/imagenes.zip`);
const archive = archiver('zip', {
  zlib: { level: 9 },
});

archive.pipe(output);
archive.directory(downloadFolder, false);
await archive.finalize();

console.log('Archivo ZIP creado con éxito');


}

