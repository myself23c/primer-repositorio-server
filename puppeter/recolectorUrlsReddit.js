



import puppeteer from "puppeteer";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export async function recolectadorUrls(urlPage, numberScrolls = 10, numberChangeTop = 5, numberChangeYear = 8,wsEndpoint,pagePassed,browser) {

  //const currentDir = dirname(fileURLToPath(import.meta.url));
  //const userDataDir = join(currentDir, '..', 'my_profile');

const URL_PAGE = urlPage;
const URL_TOP = URL_PAGE + "top/?t=all";
const URL_TOP_YEAR = URL_PAGE + "top/?t=year";

///////////////////////
const NUMBER_SCROLLS = numberScrolls; // numero de scrolls
const TIME_BETWEEN_SCROLL = 800; // time between entre scrolls
const CHANGE_TOP = numberChangeTop; // en que numero de scrollcambia a mejores fotos del year
const CHANGE_YEAR = numberChangeYear; // en que escroll cambia a mejores fotos de todos los tiempos top


const ws = await wsEndpoint;
const p = await pagePassed;
const browser1 = await browser;

console.log(ws,p,browser1)

async function saveUrlsToFile() {
  /*
  const browser = await puppeteer.launch({
    headless: "new",
    userDataDir: userDataDir,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  
  */
  await new Promise((resolve) => setTimeout(resolve, 3500));

  await puppeteer.connect({ browserWSEndpoint: ws });
  await new Promise((resolve) => setTimeout(resolve, 3500));
  const page = await p

  await page.goto(URL_PAGE || url1.urlReddit, { waitUntil: "networkidle2" });

  let imgUrls = new Set();

  const extractImgUrls = async () => {
    return await page.$$eval("img", (imgElms) => {
      const urls = [];
      imgElms.forEach((elm) => {
        if (elm.src && elm.naturalWidth > 250) {
          urls.push(elm.src);
        }
      });
      return urls;
    });
  };

  const scrolleado = async () => {
    await page.evaluate(async () => {
      await window.scrollBy(0, 3900);
    });
  };

  for (let i = 0; i < NUMBER_SCROLLS; i++) {
    ////primer bloque de primer url ////
    if (i === CHANGE_TOP) {
      await page.goto(URL_TOP || url1.URL_TOP_YEAR, {
        waitUntil: "networkidle2",
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
    if (i === CHANGE_YEAR) {
      await page.goto(URL_TOP_YEAR || url1.URL_TOP, {
        waitUntil: "networkidle2",
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
    ////termina bloque de primer url ////
    /*
        /// comienza bloque de 2da url ////

        if(i === 1000){
            await page.goto((url2.urlReddit), { waitUntil: 'networkidle2' })
            await new Promise((resolve) => setTimeout(resolve, 3000));
            }
        if (i === 1000){
            await page.goto((url2.URL_TOP), { waitUntil: 'networkidle2' })
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }    


        if (i === 1000){
            await page.goto((url2.URL_TOP_YEAR), { waitUntil: 'networkidle2' })
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }

        ////termina bloeque de url 2 ////

        ///bloque 3 inicia/////
        if(i === 1000){
            await page.goto((url3.urlReddit), { waitUntil: 'networkidle2' })
            await new Promise((resolve) => setTimeout(resolve, 3000));
            }
        if (i === 1000){
            await page.goto((url3.URL_TOP), { waitUntil: 'networkidle2' })
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }    


        if (i === 10000){
            await page.goto((url3.URL_TOP_YEAR), { waitUntil: 'networkidle2' })
            await new Promise((resolve) => setTimeout(resolve, 5000));
        }

        ///// termina bloque 3 ////

        */


        //// esto envuelve la funcion scrollear ya que se invoca a la funcion scrollear hasta el final para que vuelva a realizarce al final del ciclo///
    const newUrls = await extractImgUrls();
    newUrls.forEach((url) => imgUrls.add(url));
    await scrolleado();
    await new Promise((resolve) => setTimeout(resolve, TIME_BETWEEN_SCROLL));
    console.log(`esta es la escroleada numero ${i}`);
  }

  // Escribir URLs al archivo .txt
  const urlDeImgArr = await Array.from(imgUrls)
  await browser1.close();
  await console.log("test terminado");
 return urlDeImgArr

}


const urlsFinalesGuardadas = await saveUrlsToFile();
return urlsFinalesGuardadas
}

/*
const final = await recolectadorUrls("https://www.reddit.com/r/cats/")

console.log(final)
*/
