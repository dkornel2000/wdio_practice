const expectChai = require('chai').expect

describe('Windows and Frames Miscellanous', async() => 
{
    xit('Parent and Child windows switch', async()=>
    {
        await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
        await $('.blinkingText').click();
        const handles = await browser.getWindowHandles(); //arayt csinál, a bejelenkető oldal a parent, a többi a child
        await browser.switchToWindow(handles[1]);
        console.log(await $('h1').getText());
        console.log(await browser.getTitle());
        await browser.closeWindow(); // ha vissza akarunk menni a parent ablakra, váltás előtt kell zárni, ha akarjuk.
        await browser.switchToWindow(handles[0]);
        console.log(await browser.getTitle());
        await browser.newWindow('https://google.com/') // !! ha automatizácóval nyitom meg az új ablakot akkor nem kell a handles !!
        console.log(await browser.getTitle());
        await browser.switchWindow("https://rahulshettyacademy.com/loginpagePractise/");
        await $('#username').setValue('helloiswitchedback');
    })
    it('Frames switch', async()=>
    {
        await browser.url('https://www.rahulshettyacademy.com/AutomationPractice/');
        await $('#courses-iframe').scrollIntoView();
        console.log(await $$('a').length)
        await browser.switchToFrame(await $('#courses-iframe'))
        console.log(await $('=Courses').getTagName());
        console.log(await $$('a').length)
        await browser.switchToParentFrame();
        console.log(await $$('a').length)
    })
})