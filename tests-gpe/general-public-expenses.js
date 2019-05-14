describe("Check if data is loaded: ",function () {
    it("List shows more than 5 items", function (){
        browser.get("https://sos1819-11.herokuapp.com/#!/ui/v1/general-public-expenses");
        var getLista = element.all(by.repeater("generalPublicExpenses in generalPublicExpenses"));
        expect(getLista.count()).toBeGreaterThan(5);

        
    });
    
    it('should add a new data general public expenses', function() {
        browser.
        get("https://sos1819-11.herokuapp.com/#!/ui/v1/general-public-expenses");
        element.all(by.repeater('generalPublicExpenses in generalPublicExpenses')).then(function(getLista) {

            element(by.model('newGeneralPublicExpenses.country')).sendKeys('china');
            element(by.model('newGeneralPublicExpenses.year')).sendKeys(2005);
            element(by.model('newGeneralPublicExpenses.publicSpending')).sendKeys(5555);
            element(by.model('newGeneralPublicExpenses.educationExpense')).sendKeys(5555);
            element(by.model('newGeneralPublicExpenses.healthExpense')).sendKeys(5555);
            element(by.model('newGeneralPublicExpenses.defenseSpending')).sendKeys(5555);
            element(by.model('newGeneralPublicExpenses.publicSpendingPib')).sendKeys(5555);
            element(by.model('newGeneralPublicExpenses.var_')).sendKeys(5555);

            element(by.id('add')).click();
            
            element.all(by.repeater('generalPublicExpenses in generalPublicExpenses')).then(function(getListaFinal) {
                
                expect(getListaFinal.length).toEqual(getLista.length+1);
            });
        });
    });
    
    it('should delete a general public expenses ', function() {
        browser.
        get("https://sos1819-11.herokuapp.com/#!/ui/v1/general-public-expenses");
        element.all(by.repeater('generalPublicExpenses in generalPublicExpenses')).then(function(getLista) {
            var d = element(by.model('delete(espania,2017)'));
            element(by.id('delete')).click();
        });
    });
    
    
});



       
