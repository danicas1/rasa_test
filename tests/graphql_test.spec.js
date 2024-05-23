import { test, expect } from "@playwright/test";

test.describe("Graphql API tests", () => {
    test("Should be able to assert name and native lanugage of a country", async ({ request }) => {
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

test.describe("Graphql API tests", () => {
    test("Should be able to assert if the capital is present", async ({ request }) => {
        const response = await request.post(
            "https://countries.trevorblades.com/graphql",
            {
                data: {
                    query: `
                    query {
            
                        countries{
                          capital
                        }
                         
                      }
          `,
                },
            }
        );
        const jsonResponse = await response.json();
        expect(response.status()).toBe(200);

        // Check if countries data is available
        expect(jsonResponse).toHaveProperty('data.countries');
        expect(Array.isArray(jsonResponse.data.countries)).toBe(true);
    
        // Check if any country has a capital named "Belgrade"
        const capitals = jsonResponse.data.countries.map(country => country.capital);
        expect(capitals).toContain("Belgrade");
    });
});



