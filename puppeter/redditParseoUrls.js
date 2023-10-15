/*
let arr = [  'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png',
'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_0.png',
'https://preview.redd.it/etzggcdl49ub1.jpg?width=320&crop=smart&auto=webp&s=9243243e6c56a6704f29247b8bec6075dbbf5440',

'https://preview.redd.it/3pwy8k1hn03b1.jpg?width=640&crop=smart&auto=webp&s=6c62612c4c3f613b17066990030c0e3a28586523',
'https://preview.redd.it/mulg0pyaq03a1.jpg?width=640&crop=smart&auto=webp&s=ef0392f08c10b2920878cfb9ccbcb7e574617482',] 
*/



export const transformUrls = async (arrUrls) => {
    // 1. Leer el archivo


        // 2. Aplicar la función para transformar las URLs
 

        const urls = await arrUrls.map(u => u.split("?", 1)[0]);
        const urlsFinales = await urls.map(u => {
            if (!u.includes("image_widget")) {
                let ulfinal = u.split("/").reverse().shift();
                return `https://i.redd.it/${ulfinal}`;
            }
            return u; // Si no cumple la condición, retornar la URL original
        });
        console.log('¡URLs transformadas con éxito!')
        return urlsFinales
        
}

/*
const u = await transformUrls(arr)
console.log(u)

*/