import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.ts';
import SecurePage from '../pageobjects/secure.page.ts';
import DownloadPage from '../pageobjects/download.page.ts';

const pages:any = {
    login: LoginPage,
    download: DownloadPage
}

Given(/^I am on the (\w+) page$/, async (pageName) => {
    await pages[pageName].open()
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await LoginPage.login(username, password)
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveText(expect.stringContaining(message));
});












