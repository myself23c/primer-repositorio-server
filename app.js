const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/screenshot', async (req, res) => {
    const url = req.body.url;

    if (!url) {
        return res.status(400).send('URL no proporcionada');
    }

    try {
        

        const browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
           
        });
        const page = await browser.newPage();
        await page.goto(url);
        const screenshot = await page.screenshot();
        await browser.close();

        res.set('Content-Type', 'image/png');
        res.send(screenshot);
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al capturar la página');
    }
});


app.get('/peticion', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Screenshot App</title>
    </head>

    <body>

        <div>
            <h2>Captura de pantalla de URL</h2>
            <input type="text" id="urlInput" placeholder="Ingresa la URL">
            <button onclick="getScreenshot()">Capturar</button>
        </div>

        <div>
            <h3>Descarga tu captura</h3>
            <a id="downloadLink" href="#" download="screenshot.png" style="display:none;">Descargar Imagen</a>
        </div>

        <script>
            async function getScreenshot() {
                const url = document.getElementById("urlInput").value;

                try {
                    const response = await fetch('http://localhost:3000/screenshot', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ url })
                    });

                    if (!response.ok) {
                        alert('Error al obtener la captura.');
                        return;
                    }

                    const blob = await response.blob();
                    const objectURL = URL.createObjectURL(blob);
                    const downloadLink = document.getElementById("downloadLink");
                    downloadLink.href = objectURL;
                    downloadLink.style.display = 'block';
                } catch (error) {
                    alert('Ocurrió un error: ' + error.message);
                }
            }
        </script>

    </body>

    </html>
    `);
});



app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

