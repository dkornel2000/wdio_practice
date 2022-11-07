describe('Ecommerce Application', async() => 
{

xit("Login Fail Page", async() => 
{
    //WebdriverIO Async 
    await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await browser.getTitle());
    
    await expect(browser).toHaveTitleContaining("Rahul Shetty Academy");
    
    await $("input[name='username']").setValue("rahulshettyacademy"); // ha nincsen ID így is meg lehet találni a username-et
    
    await $("#username").setValue("secondCSS"); //CSS "#username" ha van ID
    
    const password = $("//input[@name='password']");
    await password.setValue("learning");
    
    await $("#signInBtn").click()
    
    // await console.log(await $("//div[@class='alert alert-danger col-md-12']").getText());
    
    await browser.waitUntil(async()=>await $('#signInBtn').getAttribute("value") === "Sign In",
       {
        timeout: 5000,
        timeoutMsg: "Error message is not showing up"
       }
    );
    await console.log(await $("//div[@class='alert alert-danger col-md-12']").getText());

    await expect($("p")).toHaveTextContaining("username is rahulshettyacademy and Password is learning");
})

it("Login success page", async()=>
{
    await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
   
    await $("input[name='username']").setValue("rahulshettyacademy");
    
    const password = $("//input[@name='password']");
    await password.setValue("learning");

    await $("#signInBtn").click();
    await $("#signInBtn").waitForExist($["//a[@class='nav-link btn btn-primary"]);
    //egy validálás elég, vagy "waitForExist" -> gomb // vagy az alábbiak
    await expect(browser).toHaveUrlContaining("shop");
    await expect(browser).toHaveTitle("ProtoCommerce");
    
})
})