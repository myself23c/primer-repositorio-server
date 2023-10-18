import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function deleteFiles() {
  // Eliminar todo lo que se encuentre en la carpeta ./downloaded_images
  const directory = path.join(__dirname, 'downloaded_images');
  
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
  
    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });

  // Eliminar el archivo ./imagenes.zip
  const zipFile = path.join(__dirname, 'imagenes.zip');
  
  fs.unlink(zipFile, (err) => {
    if (err) throw err;
    console.log(`Deleted ${zipFile}`);
  });
}

// Ejecuta la función
deleteFiles().catch(console.error);
