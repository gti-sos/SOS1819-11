describe("Check if a data can be deleted", function() {
    it("List should decrease after the data elimination", function() {
        browser.get("http://sos1819-11.herokuapp.com/#!/ui/v1/public-health-expenses");
        element.all(by.repeater("data in getData")).then(function(initialData) {

            element.all(by.repeater("data in getData")).last().element(by.css('[value="delete"]')).click();

            element
                .all(by.repeater("data in getData"))
                .then(function(finalData) {
                    expect(finalData.length).toEqual(initialData.length - 1);
                });
        });
    });
});
