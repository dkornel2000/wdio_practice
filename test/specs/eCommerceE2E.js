const expectChai = require('chai').expect

describe('Eccommerce Application', async()=>
{
    it('End to End Test', async ()=>
    {
        const products = ['iphone X', 'Blackberry']
        await browser.url('https://rahulshettyacademy.com/loginpagePractise/');
        await expect(browser).toHaveTitleContaining("Rahul Shetty Academy");
        await $("input[name='username']").setValue("rahulshettyacademy"); 
        const password = $("//input[@name='password']");
        await password.setValue("learning");
        await $("#signInBtn").click()
        await $("button[aria-controls='navbarResponsive']").waitForDisplayed();
        // await $('.btn-primary').waitForDisplayed(); || kicsi felbontáson ez a gomb egy navbar mögött van
        //$(*=Checkout) | *= megnézi, hogy ez a text részben valahol szerepel-e. Ha nincs csillag, akkor pontos egyezést keres.
        // akkor használható ha 'a'-val kezdődik = link
        const cards = await $$("div[class='card h-100']")
        for(let i = 0; i < await cards.length; i++)
        {
           const card = await cards[i].$("div h4 a")
           if(products.includes(await card.getText()))
           {
                await cards[i].$('div button').click();
           }
        }
        await $("button[aria-controls='navbarResponsive']").click();
        await $('.btn-primary').click();
        const productPrices = await $$('//tr/td[4]/strong');
        const sumOfProducts = (await Promise.all(await productPrices.map(async (productPrice)=>  parseInt((await productPrice.getText()).split(".")[1].trim()))))
        .reduce((acc,price)=>acc+price,0);
        console.log(sumOfProducts);
        const TotalValue = await $('h3 strong').getText();
        const TotalIntValue = parseInt(TotalValue.split('.')[1].trim());
        await expectChai(sumOfProducts).to.equal(TotalIntValue);
        await $("button[class$='btn-success']").click();
        await $('#country').setValue("hun");
        await $('lds-ellipsis').waitForExist({reverse:true})
        await $('=Hungary').click();
        await $('input[value="Purchase"]').click();
        await expect($('.alert-success')).toHaveTextContaining('Success');
    })
})