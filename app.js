import express from 'express';
import {takeScreenshot} from './puppeter/pup-screenshot.js'
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {recParDowRed} from './puppeter/indexPup.js'
import fs from 'fs';
import fsp from 'fs/promises'
import {deleteFiles} from './puppeter/eliminarArchivos.js'



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);








const app = express();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use(express.static('public'));


/*
app.post("/reddit", async (req,res)=>{
    const url = req.body.url

    if(!url){return res.status(400).send("no hay url")}
    try{
        console.log("se emepzo con el caputado de urls reddit")
        const recolectarReddid = await recParDowRed(url)

        console.log(recolectarReddid)
        res.send("se termino el capturado de urls reddit")

    } catch(err){
        console.log(err)
    }
})
*/


// ... (el resto de tus imports y configuración)



const checkFileExists = async (filePath, timeout = 30000, maxAttempts = 10) => {
    let attempts = 0;
    return new Promise((resolve, reject) => {
        const check = async () => {
            try {
                await fsp.access(filePath);
                resolve(true);
            } catch (e) {
                if (attempts >= maxAttempts) {
                    reject(new Error('Max attempts reached'));
                    return;
                }
                attempts++;
                setTimeout(check, timeout);
            }
        };
        check();
    });
};



app.post("/reddit", async (req, res) => {
    const url = req.body.url;

    if (!url) {
        return res.status(400).send("no hay url");
    }

    try {
        console.log("Se empezó con el capturado de URLs de Reddit");
       await recParDowRed(url); // Asumiendo que esta función genera el archivo

        const filePath = path.join(__dirname, 'puppeter', 'imagenes.zip');

        // Esperar a que el archivo se cree
        await checkFileExists(filePath);

        // Ahora el archivo debería existir, procedemos a enviarlo


        res.download(filePath, 'imagenes.zip', async (err) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error al descargar el archivo');
            } else {
                console.log("se borraron los archivos creados")
               
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).send('Error al capturar URLs de Reddit');
    }
});











app.post('/screenshot', async (req, res) => {
    const url = req.body.url;

    if (!url) {
        return res.status(400).send('URL no proporcionada');
    }

    try {
        

        const screenshot = await takeScreenshot()

        res.set('Content-Type', 'image/png');
        res.send(screenshot);
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al capturar la página');
    }
});



app.get('/peticion', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



app.get('/peticionreddit', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'descargarReddit.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

