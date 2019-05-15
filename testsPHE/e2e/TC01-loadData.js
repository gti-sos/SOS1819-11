describe("Check data is loaded", function() {
    it("List shows some public health expenses", function() {
        browser.get("http://sos1819-11.herokuapp.com/#!/ui/v1/public-health-expenses");
        var phe = element.all(by.repeater("data in getData"));
        expect(phe.count()).toBeGreaterThan(0);
    });
});
