
import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




export async function downloadImagesFromUrls(urlsParseadas) {
    const urls = urlsParseadas;
    const downloadFolder = path.join(__dirname, 'downloaded_images');
    await fs.ensureDir(downloadFolder);

    const browser = await puppeteer.launch({
        headless: "new",
        defaultViewport: null,
        args: [
            `--window-size=1366,768`,
            `--no-sandbox`,
            `--disable-setuid-sandbox`,
            `--disable-web-security`,
        ],
          // Esto cambiará la carpeta de descarga predeterminada
    });

    const page = await browser.newPage();
    const client = await page.target().createCDPSession();
    await client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: downloadFolder,
    });


    let contador = 0;
    for (let url of urls) {
        await page.goto(url, { waitUntil: 'networkidle2' });
        await page.evaluate(() => {
            document.querySelectorAll('img').forEach((img, index) => {
                const anchor = document.createElement('a');
                anchor.href = img.src;
                anchor.download = `image-${index}.jpg`;
                img.parentElement.replaceChild(anchor, img);
                anchor.appendChild(img);
                anchor.click();
            });
        });
        await new Promise((resolve) => setTimeout(resolve, 3000));
        console.log(`se descargó ${contador}`);
        contador++;
    }

    await browser.close();
}
















/*

import puppeteer from "puppeteer";



export async function downloadImagesFromUrls(urlsParseadas) {
    // Leer las URLs del archivo
    const urls = urlsParseadas

    // Crear la carpeta de descargas si no existe

    // Configurar puppeteer para descargar en la carpeta deseada
    const browser = await puppeteer.launch({
        headless: "new",
        defaultViewport: null,  // Para una mejor visualización
        args: [
            `--window-size=1366,768`,
            `--no-sandbox`,
            `--disable-setuid-sandbox`,
            `--disable-web-security`,
        ],
        //userDataDir: downloadFolder,  // Esto cambiará la carpeta de descarga predeterminada
    });

    const page = await browser.newPage();
    let contador = 0;
    for (let url of urls) {
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Convertir todas las imágenes en enlaces descargables y hacer clic en ellos
        await page.evaluate(() => {
            document.querySelectorAll('img').forEach((img, index) => {
                // Crear un elemento <a> alrededor de la imagen
                const anchor = document.createElement('a');
                anchor.href = img.src;
                anchor.download = `image-${index}.jpg`;

                // Reemplazar la imagen con el enlace
                img.parentElement.replaceChild(anchor, img);
                anchor.appendChild(img);

                // Hacer clic en el enlace para iniciar la descarga
                anchor.click();
            });
        });

        // Agregar un delay para permitir que las imágenes se descarguen (puede necesitar ajustes)
        await new Promise((resolve) => setTimeout(resolve, 3000));
        console.log(`se descargo ${contador}`)
        contador++;
    }

    await browser.close();
}



downloadImagesFromUrls([  'https://i.redd.it/nm8mc1y6n4v71.jpg',
'https://i.redd.it/gz7i34tqivza1.jpg',
'https://i.redd.it/o6t884tqivza1.jpg',
'https://i.redd.it/7u9e5z4oae0b1.jpg',
'https://i.redd.it/q7bh006oae0b1.jpg',
'https://i.redd.it/iu0vc0b9igx91.jpg',
'https://i.redd.it/a2ragxmaebha1.jpg',
'https://i.redd.it/1jmblxit7yz91.jpg',
'https://i.redd.it/I1kw8OP_z916ScCxojM84bFNRxC_r4MUezj7LCi5LNg.jpg',
'https://i.redd.it/b0m55oh75sya1.jpg',
'https://i.redd.it/1jgvv5vn1uw91.png',
'https://i.redd.it/nojmyjllqx6a1.jpg',
'https://i.redd.it/w8u3bnxlssx91.jpg',
  ]);
*/
