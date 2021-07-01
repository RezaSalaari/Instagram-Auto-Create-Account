const { Builder, By, Key, until } = require('selenium-webdriver');

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

const getInstCode = async function (domain, mailName, browser) {

    const INST_CODE = 'https://email-fake.com/' + domain + '/' + mailName;
    let code = "";
    try {
        await browser.executeScript('window.open("newURL");');
        let tab = await browser.getAllWindowHandles();
        await browser.switchTo().window(tab[1]);
        await browser.get(INST_CODE);
        await browser.findElement(By.xpath('/html/body/div[2]/div/div[2]/table/tbody/tr[3]/td[1]/a/button/span')).click()
        await sleep(10000);
        code = await browser.findElement(By.xpath('/html/body/div[3]/div/div/div/div[2]/div[2]/div[4]/div[3]/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td[2]')).getText();
        console.log(code)
        code = code.replace("is your Instagram code", "");
        await browser.switchTo().window(tab[0]);
    } catch (error) {

    } finally {
        return code;
    }
};

module.exports = { getInstCode };
