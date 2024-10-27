import testData from '../../../testdata.json' with { type: "json" };

export class workflow1Helper {

    // locators
    public get shoppingCartItems() {
        return $('.shopping_cart_badge');
    }

    public get cartBasketLink() {
        return $('.shopping_cart_link');
    }

    public get itemsInCart() {
        return $$('.inventory_item_name');
    }

    public get checkoutButton() {
        return $(`#checkout`);
    }

    public get checkoutInfoPageHeader() {
        return $(`//*[text()="Checkout: Your Information"]`);
    }

    public get checkoutOverviewPageHeader() {
        return $(`//*[text()="Checkout: Overview"]`);
    }
    public get firstName() {
        return $(`#first-name`);
    }

    public get lastName() {
        return $(`#last-name`);
    }

    public get postalCode() {
        return $(`#postal-code`);
    }

    public get continueButton() {
        return $(`#continue`);
    }

    public get itemPriceElements() {
        return $$(`.inventory_item_price`);
    }

    public get totalCheckoutSumValue() {
        return $(`.summary_total_label`);
    }

    public get taxAmtValue() {
        return $(`.summary_tax_label`);
    }

    public get subTotal() {
        return $(`.summary_subtotal_label`);
    }

    public get finish() {
        return $(`#finish`);
    }

    public get thankyouMessage() {
        return $(`.complete-header`);
    }

    public get checkoutCompletePageHeader() {
        return $(`//*[text()="Checkout: Complete!"]`);
    }

    public get burgerMenu() {
        return $(`#react-burger-menu-btn`);
    }

    // functions

    async addItemsToCart() {
        console.log(testData);
        let products = testData.products;  // inner json
        let cartItemKeys = Object.keys(products);
        console.log(cartItemKeys);
        let cartItemValues = Object.values(products);
        console.log(cartItemValues);
        for (const value of cartItemValues) {
            console.log(value);
            const addToCartButton = await browser.$(`//div[text()="${value}"]/../../.. //button[text()="Add to cart"]`);
            await addToCartButton.waitForDisplayed();
            await addToCartButton.waitForClickable();
            await addToCartButton.click();
            let itemAddedSuccessfully:boolean = await (await browser.$(`//div[text()="${value}"]/../../.. //button[text()="Remove"]`)).isExisting();
            expect(itemAddedSuccessfully).toEqual(true);
        }
    }

    async validateNumberofItemsAddedToCart() {
        let products = testData.products;  // inner json
        const itemsNeededinCart:number = Object.keys(products).length; // length of inner json
        let actualItemsInCart:string = await(await this.shoppingCartItems).getText();
        expect(itemsNeededinCart.toString()).toBe(actualItemsInCart); //items count added to cart should match with the number of input test data count
    }

    async validateItemsAddedinCartBasket() {
        await(await this.cartBasketLink).click();

        // let myItemsExpectedMap = new Map(); // json values from test data loaded in as keys of map "myItemsExpectedMap"
        // let products = testData.products;  // inner json
        // let cartItemValues = Object.values(Object.values(products));
        // for (let i=0; i<=(cartItemValues.length-1); i++) {
        //     myItemsExpectedMap.set(cartItemValues[i],i+1);
        // }

        let myItemsActualMap = new Map(); // load all cart items names into a map
        let allCartElementsCout = await(this.itemsInCart.length)
        for(let j=0; j<=allCartElementsCout-1 ; j++){
            let elementInCartText = await this.itemsInCart[j].getText();
            myItemsActualMap.set(elementInCartText, j);   // cartItem Names loaded in as keys of map "myItemsActualMap"
        }
        
        let products = testData.products; //inner json
        let cartItemValues = Object.values(Object.values(products));
        for (let i=0; i<=(cartItemValues.length-1); i++) {  // iterate through all values in json and check if it exists in map as key (loaded from cart)
            let expectedCartItem = cartItemValues[i];
            expect(myItemsActualMap.has(expectedCartItem)).toEqual(true);
        }
    }

    async fillDetailsInCheckoutPage() {
        await(await this.firstName).setValue(testData.FirstName);
        await(await this.lastName).setValue(testData.LastName);
        await(await this.postalCode).setValue(testData.PostalCode);
        await(await this.continueButton).click();
    }

    async validateTotalAmoutofCartItems() {
      let sumExpected:number=0;
      let count:number = await this.itemPriceElements.length;
      for(let k=0; k<=count-1; k++){
        const text = await this.itemPriceElements[k].getText();
        sumExpected = sumExpected + parseFloat(text.replace('$',''));
      }
      // sub total validation
      console.log(sumExpected);
      let subTotalText = await this.subTotal.getText();
      let subTotal = parseFloat(subTotalText.replace('Item total: $',''));
      expect(subTotal).toEqual(sumExpected);
      // final total validation after adding tax
      let taxAmtText = await(await this.taxAmtValue).getText();
      let taxAmt = parseFloat(taxAmtText.replace('Tax: $',''));
      sumExpected = sumExpected + taxAmt;
      let sumActualText = await(await this.totalCheckoutSumValue).getText();
      let sumActual = parseFloat(sumActualText.replace('Total: $',''));
      expect(sumExpected).toEqual(sumActual);
    }

    async bergerMenuClick(userinput:string) {
        await(await this.burgerMenu).click();
        await(await browser.$(`//a[text()="${userinput}"]`)).click();
    }

}