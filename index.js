import puppeteer from 'puppeteer';
import Bot from './bot.js';

(async () => {
    const browser = await puppeteer.launch({
      headless: false
    });
  const myBot = new Bot
  await myBot.create()
  console.log('dzdq',myBot)
    // const page = await browser.newPage();
    
//   //go to create gmail account
//     await page.goto('https://accounts.google.com/signup/v2/createaccount?biz=false&cc=FR&continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&dsh=S1191974086%3A1688560216865226&emr=1&flowEntry=SignUp&flowName=GlifWebSignIn&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&ifkv=AeDOFXhRQpsdVWRLMty501ScPqOEDlHlkf2RhSuAif1nrL5wTGHlPcQA4wI0aTb6Rb142wBgFvn6&osid=1&service=mail');
    
//   //write the name of new user and click 
//     await page.locator('input').fill('Tom');
//     await page.locator('button').click();


//   await browser.close();
})();