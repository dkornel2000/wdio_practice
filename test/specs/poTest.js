const loginPage = require('../pageobjects/loginPage.js');
const shopPage = require('../pageobjects/shopPage.js');
const summaryPage = require('../pageobjects/summaryPage.js');
const confirmPage = require('../pageobjects/confirmPage.js');
const expectChai = require('chai').expect
const fs = require('fs')
let Credentials = JSON.parse(fs.readFileSync('test/testData/LoginTest.json'))
let e2eCredentials = JSON.parse(fs.readFileSync('test/testData/e2eTest.json'))


describe('Ecommerce Application', async() => 
{

    Credentials.forEach(({username,password}) => {
it("Login Fail Page", async() => 
{
    //WebdriverIO Async 
    await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await browser.getTitle());
    await expect(browser).toHaveTitleContaining("Rahul Shetty Academy");
    // await loginPage.Login("rahulshettyacademy","learning123")
    await loginPage.Login(username,password)
    // await console.log(await loginPage.alert.getText());
    await browser.waitUntil(async()=>await loginPage.signIn.getAttribute('value') === "Sign In",
    {
     timeout: 5000,
     timeoutMsg: "Error message is not showing up"
    });
    await console.log(await loginPage.alert.getText());
    await expect(await loginPage.textInfo).toHaveTextContaining("username is rahulshettyacademy and Password is learning")   
})
})
        e2eCredentials.forEach(({products}) => {
it('End to End Test', async ()=>
    {
        // const products = ['iphone X', 'Blackberry']
        await browser.url('https://rahulshettyacademy.com/loginpagePractise/');
        await expect(browser).toHaveTitleContaining("Rahul Shetty Academy");
        await loginPage.Login("rahulshettyacademy","learning");
        
        await shopPage.navbar.waitForDisplayed();
        await shopPage.addProductToCart(products)
        await shopPage.navbar.click();
        await shopPage.checkout.click();
        
        sumOfProducts = await summaryPage.sumOfProducts();  
        TotalFormatedPrice = await summaryPage.totalFormatedPrice();
        await expectChai(sumOfProducts).to.equal(TotalFormatedPrice);
        await summaryPage.checkout.click();

        await confirmPage.country();
        await confirmPage.countrySelect();
        await confirmPage.purchase.click();
        await expect(confirmPage.alert).toHaveTextContaining('Success');
    })
})
})