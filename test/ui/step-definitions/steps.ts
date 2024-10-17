import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.ts';
import SecurePage from '../pageobjects/secure.page.ts';
// import fs from 'fs';

// const downloadPath = `Downloads`;
// const fileName = `selenium-snapshot.png`;
// const filepath = `${process.env.HOME|| process.env.USERPROFILE}/${downloadPath}/${fileName}`;

const pages:any = {
    login: LoginPage
}

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open()
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await LoginPage.login(username, password)
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveText(expect.stringContaining(message));
});

// Given (/^I am on the download page$/, async()=> {
//     await browser.url('https://the-internet.herokuapp.com/download');
// });

// When (/^I click on download link$/, async()=>{
//     await (await browser.$(`//a[text()="selenium-snapshot.png"]`)).click();
//     await browser.pause(5000);
// });

// Then (/^The downloaded file should exist in the desired downloaded path$/, async()=>{
//     if (fs.existsSync(filepath)) {
//         console.log('File download successfull');
//     } else {
//         console.log('File download failed or File not found');
//     }
//     console.log('Test Run');
// });










