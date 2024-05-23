import { expect } from "@playwright/test"

export class ProductStore {

    constructor(page) {

        this.page = page

        this.loginField = page.getByRole("link", { name: "Log in" })
        this.loginUserName = page.locator("#loginusername")
        this.password = page.locator("#loginpassword")
        this.loginButton = page.getByRole("button", { name: "Log in" })
        this.linkProductStore = page.getByRole("link", { name: "PRODUCT STORE" })
        this.sigUpField = page.getByRole("link", { name: "Sign up" })
        this.signUpName = page.locator('#sign-username')
        this.signUpPassword = page.locator('#sign-password')
        this.signUpButton = page.getByRole("button", { name: "Sign up" })
        this.logOut = page.getByRole("button", { name: "Log out" })
        this.nameOfUser = page.locator('#nameofuser')
        this.sigOnModal = page.locator('data-target="#signInModal"')
    }
    

        login = async (name, password) => {
            await this.loginField.waitFor()
            await this.loginField.click();
            await this.loginUserName.waitFor()
            await this.loginUserName.fill(name)
            await this.loginUserName.press("Tab")
            await this.password.fill(password)
            await this.loginButton.waitFor()
            await this.loginButton.click()
        }


        signUp = async (name, password) => {
            await this.sigUpField.waitFor()
            await this.sigUpField.click();
            await this.signUpName.waitFor
            await this.signUpName.fill(name)
            await this.signUpName.press("Tab")
            await this.signUpPassword.fill(password)
            await this.signUpButton.waitFor()
            await this.signUpButton.click()

        }

        veriyfUnsuccessfulLogin = async () => {
            this.page.once('dialog', async (dialog) => {

                expect(dialog.type()).toBe('alert');
                expect(dialog.message()).toContain('User does not exist.');
                await dialog.dismiss();
            });

        }

        verifySuccessfulLogin = async () => {
            await expect(this.linkProductStore).toBeVisible()
        }

        verifySuccessfulSignup = async () => {
            this.page.on('dialog', async dialog => {
                expect(dialog.type()).toContain("alert")
                expect(dialog.message()).toContain("Sign up successful.")
                await dialog.dismiss();
            })
        }

        checkNameOfUser = async (name) => {
            await this.nameOfUser, { state: 'visible' }
            //Assert if the username is present 
            await expect(this.nameOfUser).toContainText(name);
        }
    }
