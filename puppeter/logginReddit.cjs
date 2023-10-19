

const puppeteer = require("puppeteer"); // v20.7.4 or later

async function funcion2(wsEndpoint,pagePassed) {



    console.log(">>>>>>>>>>>>>>> me estoy logeando")

    //const browser = 
    await puppeteer.connect({ browserWSEndpoint: wsEndpoint });

  const page = pagePassed
  
  const timeout = 50000;
  page.setDefaultTimeout(timeout);

  {
    const targetPage = page;
    await targetPage.setViewport({
      width: 1245,
      height: 969,
    });
  }
  {
    const targetPage = page;
    const promises = [];
    const startWaitingForEvents = () => {
      promises.push(targetPage.waitForNavigation());
    };
    startWaitingForEvents();
    await targetPage.goto("https://www.reddit.com/");
    await Promise.all(promises);
  }
  await new Promise((resolve) => setTimeout(resolve, 3500));
  try{
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("span:nth-of-type(3) span > span"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 18.25,
          y: 13,
        },
      });
  } catch (err) {
    console.log(err);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>ya estabas logeado asi que no secesitas relogearte ")
    return
  }

  try{
    const targetPage = page;
    await puppeteer.Locator.race([targetPage.locator("#login-username")])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 113,
          y: 4.513916015625,
        },
      });
  } catch (err) {
    console.log(err);
    console.log("returnando desde user")
    return
  }


  try{
    const targetPage = page;
    await puppeteer.Locator.race([targetPage.locator("#login-username")])
      .setTimeout(timeout)
      .fill("thelordthering");
  } catch (err) {
    console.log(err);
    console.log("returnando desde user")
    return
  }


  await new Promise((resolve) => setTimeout(resolve, 1000));


  try{
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator(
        "shreddit-overlay-display >>>> shreddit-signup-drawer >>>> shreddit-slotter >>>> #login-password >>>> div > span"
      ),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 102,
          y: 33.5,
        },
      });
  } catch (err) {
    console.log(err);
    
  }


  try{
    const targetPage = page;
    await puppeteer.Locator.race([targetPage.locator("#login-password")])
      .setTimeout(timeout)
      .fill("7c70c7ea23c");
  } catch (err) {
    console.log(err);
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  try{
    const targetPage = page;
    await waitForElement(
      {
        type: "waitForElement",
        target: "main",
        selectors: [
          'aria/Log In[role="button"]',
          [
            "shreddit-overlay-display",
            "shreddit-signup-drawer",
            "shreddit-slotter",
            "auth-flow-modal:nth-of-type(1) > div.w-100 button",
          ],
          "pierce/auth-flow-modal:nth-of-type(1) > div.w-100 button",
        ],
      },
      targetPage,
      timeout
    );
  } catch (err) {
    console.log(err);
  }


  try{
    const targetPage = page;
    const promises = [];
    const startWaitingForEvents = () => {
      promises.push(targetPage.waitForNavigation());
    };
    await puppeteer.Locator.race([
      targetPage.locator(
        "shreddit-overlay-display >>>> shreddit-signup-drawer >>>> shreddit-slotter >>>> auth-flow-modal:nth-of-type(1) > div.w-100 button"
      ),
    ])
      .setTimeout(timeout)
      .on("action", () => startWaitingForEvents())
      .click({
        offset: {
          x: 223,
          y: 22.5,
        },
      });
    await Promise.all(promises);
  } catch (err) {
    console.log(err);
  }

  await new Promise((resolve) => setTimeout(resolve, 12000));

  try {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("div._12Ewyh01Y1cMPB3Ri_F1C4 > div"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 1199,
          y: 34,
        },
      });
  } catch (err) {
    console.log(err);
  }

  try {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("div:nth-of-type(3) button > svg"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 4,
          y: 8,
        },
      });
  } catch (err) {
    console.log(err);
  }
  await new Promise((resolve) => setTimeout(resolve, 5000));
  try{
    const targetPage = page;
    await puppeteer.Locator.race([targetPage.locator("path:nth-of-type(3)")])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 4.230003356933594,
          y: 15.5,
        },
      });
  } catch (err) {
    console.log(err);
  }
  await new Promise((resolve) => setTimeout(resolve, 12000));
  //await browser.close();

  async function waitForElement(step, frame, timeout) {
    const {
      count = 1,
      operator = ">=",
      visible = true,
      properties,
      attributes,
    } = step;
    const compFn = {
      "==": (a, b) => a === b,
      ">=": (a, b) => a >= b,
      "<=": (a, b) => a <= b,
    }[operator];
    await waitForFunction(async () => {
      const elements = await querySelectorsAll(step.selectors, frame);
      let result = compFn(elements.length, count);
      const elementsHandle = await frame.evaluateHandle((...elements) => {
        return elements;
      }, ...elements);
      await Promise.all(elements.map((element) => element.dispose()));
      if (result && (properties || attributes)) {
        result = await elementsHandle.evaluate(
          (elements, properties, attributes) => {
            for (const element of elements) {
              if (attributes) {
                for (const [name, value] of Object.entries(attributes)) {
                  if (element.getAttribute(name) !== value) {
                    return false;
                  }
                }
              }
              if (properties) {
                if (!isDeepMatch(properties, element)) {
                  return false;
                }
              }
            }
            return true;

            function isDeepMatch(a, b) {
              if (a === b) {
                return true;
              }
              if ((a && !b) || (!a && b)) {
                return false;
              }
              if (!(a instanceof Object) || !(b instanceof Object)) {
                return false;
              }
              for (const [key, value] of Object.entries(a)) {
                if (!isDeepMatch(value, b[key])) {
                  return false;
                }
              }
              return true;
            }
          },
          properties,
          attributes
        );
      }
      await elementsHandle.dispose();
      return result === visible;
    }, timeout);
  }

  async function querySelectorsAll(selectors, frame) {
    for (const selector of selectors) {
      const result = await querySelectorAll(selector, frame);
      if (result.length) {
        return result;
      }
    }
    return [];
  }

  async function querySelectorAll(selector, frame) {
    if (!Array.isArray(selector)) {
      selector = [selector];
    }
    if (!selector.length) {
      throw new Error("Empty selector provided to querySelectorAll");
    }
    let elements = [];
    for (let i = 0; i < selector.length; i++) {
      const part = selector[i];
      if (i === 0) {
        elements = await frame.$$(part);
      } else {
        const tmpElements = elements;
        elements = [];
        for (const el of tmpElements) {
          elements.push(...(await el.$$(part)));
        }
      }
      if (elements.length === 0) {
        return [];
      }
      if (i < selector.length - 1) {
        const tmpElements = [];
        for (const el of elements) {
          const newEl = (
            await el.evaluateHandle((el) =>
              el.shadowRoot ? el.shadowRoot : el
            )
          ).asElement();
          if (newEl) {
            tmpElements.push(newEl);
          }
        }
        elements = tmpElements;
      }
    }
    return elements;
  }

  async function waitForFunction(fn, timeout) {
    let isActive = true;
    const timeoutId = setTimeout(() => {
      isActive = false;
    }, timeout);
    while (isActive) {
      const result = await fn();
      if (result) {
        clearTimeout(timeoutId);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    throw new Error("Timed out");
  }
}

module.exports = funcion2


























/*

const puppeteer = require("puppeteer"); // v20.7.4 or later



async function funcion2(wsEndpoint,pagePassed) {
    console.log("iniciando funcion2 ")

    //const browser = 
    await puppeteer.connect({ browserWSEndpoint: wsEndpoint });
    const page = pagePassed

  //const browser = await puppeteer.launch({ headless: false });
  //const page = await browser.newPage();
  const timeout = 15000;
  page.setDefaultTimeout(timeout);

  {
    const targetPage = page;
    await targetPage.setViewport({
      width: 1245,
      height: 969,
    });
  }
  {
    const targetPage = page;
    const promises = [];
    const startWaitingForEvents = () => {
      promises.push(targetPage.waitForNavigation());
    };
    startWaitingForEvents();
    await targetPage.goto("https://www.reddit.com/");
    await Promise.all(promises);
  }
  await new Promise((resolve) => setTimeout(resolve, 3500));
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("nav > faceplate-tracker:nth-of-type(1) span.text-14"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 23,
          y: 12,
        },
      });
  }
  await new Promise((resolve) => setTimeout(resolve, 3500));
  {
    const targetPage = page;
    await waitForElement(
      {
        type: "waitForElement",
        target: "main",
        selectors: [
          "nav > faceplate-tracker:nth-of-type(2) span.text-14",
          'xpath///*[@id="popular-posts"]/a/span[1]/span[2]/span[1]',
          "pierce/nav > faceplate-tracker:nth-of-type(2) span.text-14",
        ],
      },
      targetPage,
      timeout
    );
  }
  await new Promise((resolve) => setTimeout(resolve, 3500));
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("nav > faceplate-tracker:nth-of-type(2) span.text-14"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 36,
          y: 12,
        },
      });
  }
  await new Promise((resolve) => setTimeout(resolve, 6500));

  

  async function waitForElement(step, frame, timeout) {
    const {
      count = 1,
      operator = ">=",
      visible = true,
      properties,
      attributes,
    } = step;
    const compFn = {
      "==": (a, b) => a === b,
      ">=": (a, b) => a >= b,
      "<=": (a, b) => a <= b,
    }[operator];
    await waitForFunction(async () => {
      const elements = await querySelectorsAll(step.selectors, frame);
      let result = compFn(elements.length, count);
      const elementsHandle = await frame.evaluateHandle((...elements) => {
        return elements;
      }, ...elements);
      await Promise.all(elements.map((element) => element.dispose()));
      if (result && (properties || attributes)) {
        result = await elementsHandle.evaluate(
          (elements, properties, attributes) => {
            for (const element of elements) {
              if (attributes) {
                for (const [name, value] of Object.entries(attributes)) {
                  if (element.getAttribute(name) !== value) {
                    return false;
                  }
                }
              }
              if (properties) {
                if (!isDeepMatch(properties, element)) {
                  return false;
                }
              }
            }
            return true;

            function isDeepMatch(a, b) {
              if (a === b) {
                return true;
              }
              if ((a && !b) || (!a && b)) {
                return false;
              }
              if (!(a instanceof Object) || !(b instanceof Object)) {
                return false;
              }
              for (const [key, value] of Object.entries(a)) {
                if (!isDeepMatch(value, b[key])) {
                  return false;
                }
              }
              return true;
            }
          },
          properties,
          attributes
        );
      }
      await elementsHandle.dispose();
      return result === visible;
    }, timeout);
  }

  async function querySelectorsAll(selectors, frame) {
    for (const selector of selectors) {
      const result = await querySelectorAll(selector, frame);
      if (result.length) {
        return result;
      }
    }
    return [];
  }

  async function querySelectorAll(selector, frame) {
    if (!Array.isArray(selector)) {
      selector = [selector];
    }
    if (!selector.length) {
      throw new Error("Empty selector provided to querySelectorAll");
    }
    let elements = [];
    for (let i = 0; i < selector.length; i++) {
      const part = selector[i];
      if (i === 0) {
        elements = await frame.$$(part);
      } else {
        const tmpElements = elements;
        elements = [];
        for (const el of tmpElements) {
          elements.push(...(await el.$$(part)));
        }
      }
      if (elements.length === 0) {
        return [];
      }
      if (i < selector.length - 1) {
        const tmpElements = [];
        for (const el of elements) {
          const newEl = (
            await el.evaluateHandle((el) =>
              el.shadowRoot ? el.shadowRoot : el
            )
          ).asElement();
          if (newEl) {
            tmpElements.push(newEl);
          }
        }
        elements = tmpElements;
      }
    }
    return elements;
  }

  async function waitForFunction(fn, timeout) {
    let isActive = true;
    const timeoutId = setTimeout(() => {
      isActive = false;
    }, timeout);
    while (isActive) {
      const result = await fn();
      if (result) {
        clearTimeout(timeoutId);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    throw new Error("Timed out");
  }
}


module.exports = funcion2

*/