class confirmPage
{
    async country()
    {
        await $('#country').setValue("hun")
    }
    async countrySelect()
    {
        await $('lds-ellipsis').waitForExist({reverse:true})
        await $('=Hungary').click();
    }
    get purchase()
    {
        return $('input[value="Purchase"]')
    }
    get alert()
    {
        return $('.alert-success')
    }

}


module.exports = new confirmPage()