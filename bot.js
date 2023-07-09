import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

export default class Bot {
  constructor() {
    this.firstname = "";
    this.lastname = "";
    this.nationality = "";
    this.email = "";
    this.password = "";
    this.gender = Math.random() < 0.5 ? "masculine" : "feminine";
    this.birth = `${Math.floor(Math.random() * 30)}/${Math.floor(
      Math.random() * 12
    )}/${Math.floor(Math.random() * (2004 - 1985 + 1)) + 1985}`;
  }

  async generaterandomName() {
    try {
      const browser = await puppeteer.launch({
        headless: "new",
        executablePath:
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome",
      });
      const page = await browser.newPage();
      //  search for name by nationality
      await page.goto(
        `https://www.google.com/search?q=${encodeURIComponent(
          `${this.nationality} ${this.gender} given name`
        )}`
      );
      // consent too google document
      await page.click(".GzLjMd .tHlp8d");
      // find the first wikipidia link and go to the link
      const linkElements = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll(".yuRUbf a"));
        return links
          .filter((link) => link.textContent.includes("wikipedia"))
          .map((link) => link.href);
      });

      await page.goto(linkElements[0]);
      // see all name of wikipidia list
      const allStrings = await page.$$eval(
        ".mw-category .mw-category-group ul li a",
        (elements) => {
          return elements.map((element) => element.textContent);
        }
      );
      // make a random choice
      const randomIndex = Math.floor(Math.random() * allStrings.length);
      const randomString = allStrings[randomIndex];
      // if semothing is after the name split it
      const firstWord = randomString.split(" ");
      const name = firstWord[0];
      // go for the last name
      await page.goto(
        `https://www.google.com/search?q=${encodeURIComponent(
          `${this.nationality} language-surallStrings`
        )}`
      );
      //do the same than before
      await page.goto(linkElements[0]);
      allStrings;
      randomIndex;
      const randomIndex2 = Math.floor(Math.random() * allStrings.length);
      const randomString2 = allStrings[randomIndex2];
      const firstWord2 = randomString2.split(" ");
      const surnames = firstWord2[0];
      // join the name and last name for fullname
      this.firstname = `${name}`;
      this.lastname = `${surnames}`;
      await browser.close();
    } catch (error) {
      console.error(error);
    }
  }

  async generateRandomNationality() {
    try {
      const browser = await puppeteer.launch({
        headless: "new",
      });
      const page = await browser.newPage();
      // search all nationality on wiki
      await page.goto(
        "https://en.wikipedia.org/wiki/Lists_of_people_by_nationality"
      );
      // define the parent of all nationality elements
      const firstElement = await page.$(".div-col");
      // take them all  take randomly one
      const tdElements = await firstElement.$$("ul li a");
      const randomIndex = Math.floor(Math.random() * tdElements.length);
      const randomElement = tdElements[randomIndex];
      // get the value of the random element
      const tdValue = await page.evaluate(
        (element) => element.textContent,
        randomElement
      );
      await browser.close();
      this.nationality = tdValue;
    } catch (error) {
      console.error(error);
    }
  }

  async generateGoogleAccount() {
    try {
      const browser = await puppeteer.launch({
        headless: false,
      });
      const page = await browser.newPage();
      await page.goto(
        "https://accounts.google.com/InteractiveLogin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&flowEntry=ServiceLogin&flowName=GlifWebSignIn&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&ifkv=AeDOFXh5DC38cM7bSAu5UbYo5ncOtMDJY91KK7Hksko_DtGadxYCJ58f6E9cnH0Ht6x1XShtfI1pBg&osid=1&passive=1209600&service=mail"
      );
      await page.waitForSelector(
        'button[data-idom-class="ksBjEc lKxP2d LQeN7 FliLIb uRo0Xe TrZEUc Xf9GD"]'
      );
      await page.click(
        'button[data-idom-class="ksBjEc lKxP2d LQeN7 FliLIb uRo0Xe TrZEUc Xf9GD"]'
      );
      await page.click(".G3hhxb");
      await page.waitForSelector("input#firstName");
      await page.type("input#firstName", this.firstname, { delay: 100 });
      await page.type("input#lastName", this.lastname, { delay: 100 });
      await page.click(
        'button[data-idom-class="nCP5yc AjY5Oe DuMIQc LQeN7 qIypjc TrZEUc lw1w4b"]'
      );
      const birtdayArray = this.birth.split("/");
            await page.waitForSelector("input#day",{visible: true, timeout: 3000 });
      const inputday = await page.$("input#day");
      await inputday.type(birtdayArray[0]);
            const selectElement = await page.$("select#month");
      await selectElement.select(birtdayArray[1]);
      await page.waitForSelector("input#year",{visible: true, timeout: 3000 });
      const inputyear = await page.$("input#year");
      await inputyear.type(birtdayArray[2]);


    } catch (error) {
      console.error(error);
    }
  }
  //define the bot structure
  async create() {
    await this.generateRandomNationality();
    await this.generaterandomName();
    await this.generateGoogleAccount();
  }
}
