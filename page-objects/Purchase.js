import {expect} from "@playwright/test"
export class Purchase {
    constructor(page) {

        this.page = page
        
        this.productTitle = page.locator('.card-title')
        this.addToCart = page.getByText('Add to cart')
        this.success = page.locator('.success')
        this.cartLink = page.getByRole('link', { name: 'Cart', exact: true });
        this.delete = page.getByText('Delete')
        this.placeOrderButton = page.getByRole('button', { name: 'Place Order' })
        this.name = page.locator('#name')
        this.card = page.locator('#card')
        this.country = page.locator('#country')
        this.purchaseButton = page.getByRole('button', { name: 'Purchase' })
    }


        clickOnProduct = async () => {
            await this.productTitle.first().waitFor();
            await this.productTitle.first().click();
    
            // Click 'Add to Cart' button
            await this.addToCart.waitFor();
            await this.addToCart.click();
        }
        // verify if dialog informing that the product is added is displayed
        verifyProductAddedDialog = async () => {
            this.page.once('dialog', async (dialog) => {
    
                expect(dialog.type()).toBe('alert');
                expect(dialog.message()).toContain('Product added.');
                await dialog.dismiss();
            });
        }
    
       goToCart = async () => {
            // Click 'Cart' link
            await this.cartLink.waitFor();
            await this.cartLink.click();
    
    
        }
    
        placeOrder = async () => {
            // Click 'Place order' button
            await this.placeOrderButton.waitFor();
            await this.placeOrderButton.click()
        }
    
        fillCountry = async (country) => {
            await this.country.waitFor()
            await this.country.fill(country);
    
        }
    
        clickOnPurchaseButton = async () => {
            await this.purchaseButton.waitFor()
            await this.purchaseButton.click()
    
        }
    
        checkMissingInfoModal = async () => {
            this.page.once('dialog', async (dialog) => {
                expect(dialog.type()).toBe('alert');
                expect(dialog.message()).toContain('Please fill out Name and Creditcard.');
                await dialog.dismiss();
            });
            await this.purchaseButton.click();
        }
    
    }
