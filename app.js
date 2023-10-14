const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');


const path = require('path');

app.get('/peticion', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



app.use(express.static('public'));


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





app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

