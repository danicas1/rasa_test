import { v4 as uuidv4 } from "uuid"

import { test, expect } from "@playwright/test";
import { ProductStore } from "../page-objects/ProductStore.js"
import { Purchase } from "../page-objects/Purchase.js"
import { userDetails } from "../data/userDetails.js"

test.describe("DemoBlaze UI tests", () => {
    test("Shouldn't be able to login with unregistered user", async ({ page }) => {

        await page.goto("/");
        let  randomUser = uuidv4() + "user"
        const productStore = new ProductStore(page)
        await productStore.login(randomUser, userDetails.password)
        await productStore.veriyfUnsuccessfulLogin()
    });
});


test.describe("DemoBlaze UI tests", () => {
    test("Should be able to signup and immediately login", async ({ page }) => {

        let  randomUser = uuidv4() + "user"
        await page.goto('/');
        const productStore = new ProductStore(page);
        await productStore.signUp(randomUser, userDetails.password)
        await productStore.verifySuccessfulSignup()
        await productStore.login(randomUser, userDetails.password)
        await productStore.verifySuccessfulLogin()
        await productStore.checkNameOfUser(randomUser)
    });
});

test.describe("DemoBlaze UI tests", () => {
    test("Should be able to add product to the basket", async ({ page }) => {

        await page.goto("/");
        const productStore = new ProductStore(page)
        await productStore.login(userDetails.username, userDetails.password)
        await productStore.verifySuccessfulLogin()
        await productStore.checkNameOfUser(userDetails.username)
        const purchase = new Purchase(page)
        await purchase.clickOnProduct()
        await purchase.goToCart()
        await purchase.verifyProductAddedDialog()
    });
});

test.describe("DemoBlaze UI tests", () => {
    test("Shouldn't be able to place order without name and cc", async ({ page }) => {

        await page.goto("/");
        const productStore = new ProductStore(page)
        await productStore.login(userDetails.username, userDetails.password)
        await productStore.verifySuccessfulLogin()
        await productStore.checkNameOfUser(userDetails.username)
        const purchase = new Purchase(page)
        await purchase.goToCart()
        await purchase.placeOrder()
        await purchase.fillCountry(userDetails.country)
        await purchase.clickOnPurchaseButton()
        await purchase.checkMissingInfoModal()
    });
});



test.describe("Graphql API tests", () => {
    test("Should be able to get details of all continents", async ({ request }) => {
        const response = await request.post(
            "https://countries.trevorblades.com/graphql",
            {
                data: {
                    query: `
                    query {
                        countries
              {
            
                    name
                languages{
                  native
                }
                  
              }
                        }
          `,
                },
            }
        );
        const jsonResponse = await response.json();
        expect(response.status()).toBe(200);

        // Check if countries data is available
        expect(jsonResponse.data.countries[0].name).toEqual("Andorra");
        expect(jsonResponse.data.countries[0].languages[0].native).toEqual("Català");

    });
});


