import {recolectadorUrls} from './recolectorUrlsReddit.js'
import {transformUrls} from './redditParseoUrls.js'
import {downloadImagesFromUrls} from './descargador.js'
import {compresor} from './compresor.js'
//import {funcion1} from './funcion1.cjs'
//import {funcion2} from './logginReddit.cjs'


/*
export const anotherAsyncFunction = async () => {
    const commonJSModule = await import('./funcion1.cjs');
    const importedAsyncFunction = commonJSModule.default;
  
    const {page,wsEndpoint,browser} = await importedAsyncFunction();
  
    const commonJSmodule2 = await import('./logginReddit.cjs')
    const funcion2 = commonJSmodule2.default

    funcion2(wsEndpoint,page,browser)

    


  };


 anotherAsyncFunction()
*/

  

export async function recParDowRed (url, numberScrolls, numberChangeTop, numberChangeYear){

   const commonJSModule = await import('./funcion1.cjs');
    const importedAsyncFunction = commonJSModule.default;
  
    const {page,wsEndpoint,browser} = await importedAsyncFunction();

    
  
    const commonJSmodule2 = await import('./logginReddit.cjs')
    const funcion2 = commonJSmodule2.default

    const funcionDos = await funcion2(wsEndpoint,page)




   // const recolectar = await recolectadorUrls(url, numberScrolls, numberChangeTop, numberChangeYear,page,wsEndpoint,browser)
    //console.log(recolectar)
    const recolectar = await recolectadorUrls(url, numberScrolls, numberChangeTop, numberChangeYear,wsEndpoint,page,browser)
    console.log(recolectar)

    const parseador = await transformUrls(recolectar)
    console.log(parseador)
    const download = await downloadImagesFromUrls(parseador)
    //await browser.close();
    const comprimir = await compresor()


}


