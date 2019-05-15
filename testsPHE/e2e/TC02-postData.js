describe("Check if a new data can be created", function() {
    it("List should grow after the data creation", function() {
        browser.get("http://sos1819-11.herokuapp.com/#!/ui/v1/public-health-expenses");
        element.all(by.repeater("data in getData")).then(function(initialData) {

            element(by.model('newData.country')).sendKeys('spain');
            element(by.model('newData.year')).sendKeys(2020);
            element(by.model('newData.publicHealthExpense')).sendKeys(20);
            element(by.model('newData.healthExpense')).sendKeys(20);
            element(by.model('newData.totalPublicExpense')).sendKeys(20);
            element(by.model('newData.healthExpensePib')).sendKeys(20);
            element(by.model('newData.healthExpenditurePerCapita')).sendKeys(20);
            element(by.model('newData.var_')).sendKeys(20);

            element(by.css('[value="add"]')).click();

            element
                .all(by.repeater("data in getData"))
                .then(function(finalData) {
                    expect(finalData.length).toEqual(initialData.length + 1);
                });
        });
    });
});
