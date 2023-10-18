const puppeteer = require('puppeteer');

const funcion1 = async () => {

    console.log("iniciando browser")
    const browser = await puppeteer.launch({ headless: false });
    const wsEndpoint = browser.wsEndpoint();

    const page = await browser.newPage()
    return {page,wsEndpoint,browser};
  };

/*
  async function datosRevelados (){
const datos = await funcion1()
  console.log(datos)

  }

  */
  module.exports = funcion1

 //datosRevelados()