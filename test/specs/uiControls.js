const expectChai = require('chai').expect

describe('Ecommerce Application', async() => 
{

xit("UI Controls", async()=>
{
    await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
   
    await $("input[name='username']").setValue("rahulshettyacademy");
    
    const password = $("//input[@name='password']");
    await password.setValue("learning");               //jelszót meg lehet csinálni egy sorban, lásd alternatív megoldás

    const radioButton = await $$(".radiotextsty")
    await radioButton[1].click();
    // await browser.pause(5000);

    // const radioButton = await $$(".customradio");
    // await radioButton[1].$("span").click();          //Alternatív megoldás, elsőnek defináljuk a ".customradio"-t majda arra hivatkozunk

    // await $$(".customradio")[1].$("span").click();
    await $(".modal-body").waitForDisplayed();
    await $("#cancelBtn").click();                      //cancelt nyom a gombra

    await $$(".customradio")[0].$("span").isSelected(); //visszadobja a usert a cancel után, a gombnak Adminra vissza kell váltania, ezt validája ez a lépés.

    await $$(".customradio")[1].$("span").click();             //innentől újra kiválasztja a "user"-t de most acceptet nyom
    await $(".modal-body").waitForDisplayed();
    await $("#okayBtn").click();

    await $$(".customradio")[0].$("span").click();      //validáljuk, hogy az admint kiválasztjuk, nincsen pop-up window
    await expect($(".modal-body")).not.toBeDisplayed();

    const dropDown = await $("select.form-control");
    await dropDown.selectByAttribute("value","teach");
    await dropDown.selectByVisibleText("Consultant");
    await dropDown.selectByIndex(0);
    expectChai(await dropDown.getValue()).to.equal("stud");

    await $("#signInBtn").click();
    await $("#signInBtn").waitForExist($["//a[@class='nav-link btn btn-primary"]);
    // //egy validálás elég, vagy "waitForExist" -> gomb // vagy az alábbiak
    // await expect(browser).toHaveUrlContaining("shop");
    // await expect(browser).toHaveTitle("ProtoCommerce");   
})

    xit ("Dynamic Dropdown controls", async()=>
    {
        await browser.url("https://www.rahulshettyacademy.com/AutomationPractice/");
        await $("#autocomplete").setValue("ind");
        await $("#ui-id-1").waitForDisplayed();
        let items = await $$("[class=ui-menu-item] div")
        
        for(var i = 0;i<await items.length;i++)
        {
            if (await items[i].getText() === "India")
                {
                    await items[i].click()
                }
        }
    })

    it ("Checkboxes Identification", async()=>
    {
        await browser.url("https://www.rahulshettyacademy.com/AutomationPractice/");
        const element = await $$("input[type='checkbox']");
        await element[1].click();
        await element[2].isSelected();
        const TheNotString = await element[2].isSelected();
        const TheString = await TheNotString.toString();
        expectChai(await TheString).to.equal('true');
        // expectChai((await element[2].isSelected()).toString()).to.equal('true')

        // FONTOS, nem kell stringé konvertálni ugyanis van rá megoldás: expectChai(await element[2].isSelected()).to.be.true

        await browser.saveScreenshot("screenshot.png");
    })

})
