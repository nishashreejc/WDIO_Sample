import { Given, When, Then } from '@wdio/cucumber-framework';
import { workflow1Helper } from '../pageobjects/workflow1Helper.ts';
import fs from 'fs';

let objWorkflow1Helper = new workflow1Helper();

Given (/^User is able to launch the saucedemo website url$/, async()=> {
    await browser.url('https://www.saucedemo.com/');
    await browser.maximizeWindow();
});

When (/^User logs in with (.*) and (.*)$/, async(username, password)=>{
    await browser.$("#user-name").setValue(username);
    await browser.$("#password").setValue(password);
    await(await browser.$(`#login-button`)).click();
});

Then (/^User is on SwagLabs homepage$/, async()=>{
    await(await browser.$(`//title[text()="Swag Labs"]`)).isExisting();
    await(await browser.$(`//title[text()="Swag Labs"]`)).isDisplayed();
});

When(/^User adds items to cart$/, async () => {
    await objWorkflow1Helper.addItemsToCart();
});

Given (/^User is on the testing page$/, async()=> {
    await browser.url('https://the-internet.herokuapp.com/');
    await browser.maximizeWindow();
    
});

Then(/^User selects "([^"]*)" link$/, async(linkText)=>{
    await(await browser.$(`//a[text()="${linkText}"]`)).click();
})

When(/^User downloads a file with name "([^"]*)"$/, async(fileName)=>{
    await(await browser.$(`//a[text()="${fileName}"]`)).click();
})

Then(/^User validates downloaded file "([^"]*)"$/, async(fileName)=>{
    const downloadDir = `C:\\Typescript_WDIO_V8.40_Cucumber_Working1\\downloads`;
    const filePath = `${downloadDir}\\${fileName}`;
    await browser.waitUntil(()=>{
        return fs.existsSync(filePath);
    },{timeout:5000,interval:500, timeoutMsg:'File download was not successful within the time limit of 5 seconds'});
})

Then(/^User validates number of items added to cart$/, async()=>{
    await objWorkflow1Helper.validateNumberofItemsAddedToCart();
})

Then(/^User is able to see the items added to cart in the cart basket$/, async()=>{
    await objWorkflow1Helper.validateItemsAddedinCartBasket();
})

When(/^User checksout$/, async()=>{
    await(await objWorkflow1Helper.checkoutButton).click();
    let checkoutInfoPageVisible = await (await objWorkflow1Helper.checkoutInfoPageHeader).isDisplayed();
    expect(checkoutInfoPageVisible).toEqual(true);
})

When(/^User fills details on information page$/, async()=>{
    await objWorkflow1Helper.fillDetailsInCheckoutPage();
})

Then(/^User is taken to checkout overview page$/, async()=>{
    let checkoutOverviewPageVisible = await (await objWorkflow1Helper.checkoutOverviewPageHeader).isDisplayed();
    expect(checkoutOverviewPageVisible).toEqual(true); 
})

Then(/^User is able to validate total amout for the items added to cart$/, async()=>{
    await objWorkflow1Helper.validateTotalAmoutofCartItems();
})

When(/^User confirms the order$/, async()=>{
    await(await objWorkflow1Helper.finish).click();
})

Then(/^User is able to place the order successfully with Thank you message on screen$/, async()=>{
    await(await objWorkflow1Helper.checkoutCompletePageHeader).isDisplayed();
    let checkoutCompleteText = await(await objWorkflow1Helper.checkoutCompletePageHeader).getText();
    expect(checkoutCompleteText).toContain('Complete!');
    let thankyouMessageText = await(await objWorkflow1Helper.thankyouMessage).getText();
    expect(thankyouMessageText).toEqual('Thank you for your order!');
})

When(/^User logs off$/, async()=>{
    await objWorkflow1Helper.bergerMenuClick('Logout');
})

Then(/^User is on SwagLabs loginpage$/, async()=>{
    let loginButonVisible:boolean = await(await browser.$(`#login-button`)).isDisplayed();
    expect(loginButonVisible).toEqual(true);
})


// do not use locators in steps (use POM)
// use isDisplayed(); before each element click or setText();
// all test data needs to be passed from step definition as parameter 
// all locators also need to be passed from getters or from functions if "parameterized locator"





