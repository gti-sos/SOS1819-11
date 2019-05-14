describe("Check if data is loaded: ",function () {
    it("List shows more than 5 items", function (){
        browser.get("https://sos1819-11.herokuapp.com/#!/ui/v1/general-public-expenses");
        var getLista = element.all(by.repeater("i in getLista"));
        expect(getLista.count()).toBeGreaterThan(5);

        
    });
    
    it('should add a new data general public expenses', function() {
        browser.
        get("https://sos1819-11.herokuapp.com/#!/ui/v1/general-public-expenses");
        element.all(by.repeater('i in getLista')).then(function(getLista) {

            element(by.model('data.country')).sendKeys('china');
            element(by.model('data.year')).sendKeys(2005);
            element(by.model('data.publicSpending')).sendKeys(5555);
            element(by.model('data.educationExpense')).sendKeys(5555);
            element(by.model('data.healthExpense')).sendKeys(5555);
            element(by.model('data.defenseSpending')).sendKeys(5555);
            element(by.model('data.publicSpendingPib')).sendKeys(5555);
            element(by.model('data.var_')).sendKeys(5555);

            element(by.id('add')).click();
            
            element.all(by.repeater('i in getLista')).then(function(getListaFinal) {
                
                expect(getListaFinal.length).toEqual(getLista.length+1);
            });
        });
    });
    
    it('should delete a general public expenses ', function() {
        browser.
        get("https://sos1819-11.herokuapp.com/#!/ui/v1/general-public-expenses");
        element.all(by.repeater('i in getLista')).then(function(getLista) {
            var d = element(by.model('delete(espania,2017)'));
            element(by.id('delete')).click();
        });
    });
    
    
});



       
