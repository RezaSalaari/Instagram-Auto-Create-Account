
const { Builder, By, Key, until,Options, WebDrive } = require('selenium-webdriver');
const accountInfo = require('./accountInfoGenerator');
const verifiCode = require('./getCode');
const email = require('./createFakeMail');
// System.setProperty("webdriver.chrome.driver","E:\\MukeshData\\chromedriver.exe");

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
(async function fakeInstagramAccount() {

  let browser = await new Builder().forBrowser('chrome')

    .build()

  try {
    await browser.get("https://www.instagram.com/accounts/emailsignup/");
    await sleep(5000);
    let fakeMail = await email.getFakeMail()
    await browser.findElement(By.name("emailOrPhone")).sendKeys(fakeMail, Key.RETURN);
    await browser.findElement(By.name("fullName")).sendKeys(await accountInfo.generatingName(), Key.RETURN);
    await browser.findElement(By.name("username")).sendKeys(await accountInfo.username(), Key.RETURN);
    await sleep(3000);
    await browser.findElement(By.name("password")).sendKeys("me47m47eaa", Key.RETURN);
    await sleep(5000);
    await browser.findElement(By.xpath('/html/body/div[1]/section/main/div/div/div[1]/div/div[4]/div/div/span/span[1]/select')).sendKeys('July');
    await sleep(8000);
    await browser.findElement(By.xpath('/html/body/div[1]/section/main/div/div/div[1]/div/div[4]/div/div/span/span[2]/select')).sendKeys('12');
    await sleep(8000);
    await browser.findElement(By.xpath("/html/body/div[1]/section/main/div/div/div[1]/div/div[4]/div/div/span/span[3]/select")).sendKeys('1998');
    await sleep(8000);
    await browser.findElement(By.xpath("/html/body/div[1]/section/main/div/div/div[1]/div/div[6]")).click();
    await sleep(5000);

    let fMail = fakeMail.split("@");
    let mailName = fMail[0];
    let domain = fMail[1];
    let veriCode = await verifiCode.getInstCode(domain, mailName, browser);
    console.log(veriCode);
    sleep(10000);
    await browser.findElement(By.name("email_confirmation_code")).sendKeys(veriCode, Key.RETURN);
  } catch (e) {
    console.log(e);
  } finally {
    // await browser.quit();
  }

})();