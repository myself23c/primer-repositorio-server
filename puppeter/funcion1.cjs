/*
const puppeteer = require('puppeteer');


const funcion1 = async () => {

    console.log("iniciando browser")
    const browser = await puppeteer.launch({   
    headless: "new",
    defaultViewport: null,
    args: [
        `--window-size=1366,768`,
        `--no-sandbox`,
        `--disable-setuid-sandbox`,
        `--disable-web-security`,
        '--disable-popup-blocking',
      '--disable-notifications',
    ], });
    const wsEndpoint = browser.wsEndpoint();

    const page = await browser.newPage()
    return {page,wsEndpoint,browser};
  };


  */

/*
  async function datosRevelados (){
const datos = await funcion1()
  console.log(datos)

  }

  */
  //module.exports = funcion1

 //datosRevelados()



 const puppeteer = require('puppeteer');
 const path = require('path');

const funcion1 = async () => {
    console.log(">>>>>>>>>>>>>iniciando browser<<<<<<<<<<<<<<<<<");
    const browser = await puppeteer.launch({
        headless: "new",
        userDataDir: path.resolve(__dirname, 'myUserDataDir'),  // Aquí se especifica el directorio
        defaultViewport: null,
        args: [
            `--window-size=1366,768`,
            `--no-sandbox`,
            `--disable-setuid-sandbox`,
            `--disable-web-security`,
            '--disable-popup-blocking',
            '--disable-notifications',
        ],
    });
    const wsEndpoint = browser.wsEndpoint();

    const page = await browser.newPage();
    return { page, wsEndpoint, browser };
};

module.exports = funcion1;
