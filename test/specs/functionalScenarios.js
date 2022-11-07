const expectChai = require('chai').expect

describe('Functional Testing on Application', async() => 
{

    xit("Scrolling and mouse over", async()=>
    {
        await browser.url("https://www.rahulshettyacademy.com/AutomationPractice/");
        await $('#mousehover').scrollIntoView();
        await $('#mousehover').moveTo();
        await $('=Top').click();
    })
    xit("Handling JavaScript alerts", async()=>
    {
        await browser.url("http://only-testing-blog.blogspot.com/2014/09/selectable.html")
        await $('button').doubleClick();
        await browser.isAlertOpen();
        expectChai(await browser.isAlertOpen()).to.be.true;
        await browser.getAlertText();
        expectChai(await browser.getAlertText()).to.equal('You double clicked me.. Thank You..');
        await browser.acceptAlert();
    })
    it("Web Tables validation", async()=>
    {
        await browser.url("https://www.rahulshettyacademy.com/seleniumPractise/#/offers/");
        await $('th:nth-child(1)').click();   
        const fruitNameLocators = await $$('tr td:nth-child(1)');
        // const savedData = await fruitNameLocators.map(async fruits => await fruits.getText()); // MAP BUGGOS
        let fruitNames = []
        for (let i = 0; i < fruitNameLocators.length; i++) {
            await fruitNames.push(await fruitNameLocators[i].getText());
        } 
        const sortData = await fruitNames.sort();
        console.log(await fruitNames[0], fruitNames[1], fruitNames[2], fruitNames[3], fruitNames[4]);
        expectChai(fruitNames).to.eql(sortData);

    
        // await browser.url("https://www.rahulshettyacademy.com/seleniumPractise/#/offers/")
        // await browser.pause(5000);
        // await $("tr th:nth-child(1)").click()
        // await browser.pause(5000);
        //  const veggiesLocators =  await $$("tr td:nth-child(1)")
        //  const OriginalveggiesNames = await veggiesLocators.map(async veggie=> await veggie.getText())
        //  console.log(OriginalveggiesNames)
        //  veggies =  OriginalveggiesNames.slice()
        //  sortedVeggies = veggies.sort()
        //  console.log(sortedVeggies)
        //   expectChai(OriginalveggiesNames).to.eql(sortedVeggies)
    })
    xit("Web Tables search", async()=>
    { 
        await browser.url("https://www.rahulshettyacademy.com/seleniumPractise/#/offers/");
        await $('#search-field').setValue("Tomato");
        const tomatoSearchTable = await $$('tr td:nth-child(1)')
        await expect(tomatoSearchTable).toBeElementsArrayOfSize({eq:1})
        console.log(await tomatoSearchTable[0].getText());
        await expect(await tomatoSearchTable).toHaveText("Tomato")
    })
})