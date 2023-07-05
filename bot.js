import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
puppeteer.use(StealthPlugin())

export default class Bot {
   constructor () {
    this.name = '';
       this.nationality = '';
       this.gender = Math.random() < 0.5 ? "masculine" : "feminine"
       this.birth = `${Math.floor(Math.random() * 30)}/${Math.floor(Math.random() * 12)}/${Math.floor(Math.random() * (2004 - 1985 + 1)) + 1985}`
  }

    async generateRandomName() {
        console.log('func', this.nationality)
        try {
             const browser = await puppeteer.launch({ headless: false, executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome' })
             const page = await browser.newPage()
            await page.goto(`https://www.google.com/search?q=${encodeURIComponent(`${this.nationality} ${this.gender} given name`)}`);
            await page.click('.GzLjMd .tHlp8d')
            const linkElements = await page.$$('a');
            console.log(linkElements)
       
    //    await browser.close();
        } catch (error) {
            console.error(error)
        }
//         puppeteer.launch({ headless: false }).then(async browser => {
//   console.log('Running tests..')
//   const page = await browser.newPage()
//   await page.goto('https://bot.sannysoft.com')
//   await page.waitForTimeout(5000)
//   await page.screenshot({ path: 'testresult.png', fullPage: true })
//   await browser.close()
//   console.log(`All done, check the screenshot. ✨`)
// })
       
       
  }

  async generateRandomNationality() {

    try {
      const browser = await puppeteer.launch({
        headless: false
      });
      const page = await browser.newPage();
      await page.goto('https://www.gov.uk/government/publications/nationalities/list-of-nationalities#l');
      const tdElements = await page.$$('tr td');
      const randomIndex = Math.floor(Math.random() * tdElements.length);
      const randomElement = tdElements[randomIndex];
      const tdValue = await page.evaluate(element => element.textContent, randomElement);
      await browser.close();
      this.nationality = tdValue;
    } catch (error) {
      console.error(error);
    }
    }
    
    async create() {
       await this.generateRandomNationality()
       await this.generateRandomName()
    }
}
