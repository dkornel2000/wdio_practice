class LoginPage 
{
get userName()
    {
        return $("input[name='username']")
    }
get password()
    {
        return $("//input[@name='password']")
    }
get alert()
    {
        return $('.alert')
    }
get signIn()
    {
        return $('#signInBtn')
    }
get textInfo()
    {
        return $("p")
    }
async Login(userName,password)
    {
        await this.userName.setValue(userName)
        await this.password.setValue(password)
        await this.signIn.click()
    }
}

module.exports = new LoginPage()