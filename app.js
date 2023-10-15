import express from 'express';
import {takeScreenshot} from './puppeter/pup-screenshot.js'
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {recParDowRed} from './puppeter/indexPup.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);








const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(express.static('public'));



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


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

