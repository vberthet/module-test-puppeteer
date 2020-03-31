const timeout = 15000;

// test d'un feedback
describe("Login Anonymous", async () => {
    let page;
 
     // parcours client avec Sign In
        test('Login', async () => {
            await page.goto('http://polr.web-74.com');
            await page.waitForSelector('#navbar li a');
            // click sur le lien "About" de la navigation
            await page.evaluate(() => {
                Array
                    .from(document.querySelectorAll('#navbar li a'))
                    .filter(el => el.textContent === 'Sign In')[0].click();
            });


            await page.waitForSelector('#dropdown');
            // on récupère le code HTML
            const html = await page.$eval('#dropdown', e => e.innerHTML);
            // on vérifie qu'il contient la bonne chaîne de caractères
            expect(html).toContain("Login");
        }, timeout);

    // login with wron email
    test('Login with wrong email', async () => {
        await page.goto('http://polr.web-74.com');

        await page.waitForSelector("#navbar li a");
        await page.evaluate(() => {
            Array
                .from(document.querySelectorAll('#navbar li a'))
                .filter(el => el.textContent === 'Sign In')[0].click();
        });

        await page.waitForSelector('#dropdown', { visible: true });
        await page.type("input[placeholder='username']", 'fakename');
        await page.screenshot({ path: './tests/img/login-wrong-username.png' });
        await page.type("input[placeholder='password']", 'test');
        await page.screenshot({ path: './tests/img/login-wrong-email.png' });

        await page.$eval('.login-form-submit', el => el.click());
        await page.screenshot({ path: './tests/img/login-modal-error.png' });
        await page.waitForSelector('body');
        const url = page.url();
        console.log({url})
        expect(url).toBe("http://polr.web-74.com/login");

    
        //expect(errorAlertEmail).toBe("Invalid email address");

    }, timeout);


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
