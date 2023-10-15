import puppeteer from 'puppeteer'



export async function takeScreenshot(url) {
    try {
        const browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.goto(url);
        const screenshot = await page.screenshot();
        await browser.close();

        return screenshot;
    } catch (error) {
        console.log(error);
        throw new Error('Error al capturar la página');
    }
}





