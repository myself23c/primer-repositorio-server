import {recolectadorUrls} from './recolectorUrlsReddit.js'
import {transformUrls} from './redditParseoUrls.js'
import {downloadImagesFromUrls} from './descargador.js'


export async function recParDowRed (url, numberScrolls, numberChangeTop, numberChangeYear){

    const recolectar = await recolectadorUrls(url, numberScrolls, numberChangeTop, numberChangeYear)
    console.log(recolectar)
    const parseador = await transformUrls(recolectar)
    console.log(parseador)
    //const download = await downloadImagesFromUrls(parseador)
    
}

