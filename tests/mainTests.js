describe("Check if data is loaded: ",function () {
    it("List shows more than 3 items", function (){
        browser.get("https://sos1819-11.herokuapp.com/#!/ui/v1/public-expenditure-educations");
        var getLista = element.all(by.repeater("i in getLista"));
        expect(getLista.count()).toBeGreaterThan(3);

        
    });
    
    it('should add a new data education', function() {
        browser.
        get("https://sos1819-11.herokuapp.com/#!/ui/v1/public-expenditure-educations");
        element.all(by.repeater('i in getLista')).then(function(getLista) {

            element(by.model('data.country')).sendKeys('pekin');
            element(by.model('data.year')).sendKeys(2010);
            element(by.model('data.educationExpense')).sendKeys(123);
            element(by.model('data.educationExpensePub')).sendKeys(123);
            element(by.model('data.educationExpensePib')).sendKeys(123);
            element(by.model('data.healthExpenditurePerCapita')).sendKeys(123);
            element(by.model('data.var_')).sendKeys(123);

            element(by.id('add')).click();
            
            element.all(by.repeater('i in getLista')).then(function(getListaFinal) {
                
                expect(getListaFinal.length).toEqual(getLista.length+1);
            });
        });
    });
    
    it('should delete a data education', function() {
        browser.
        get("https://sos1819-11.herokuapp.com/#!/ui/v1/public-expenditure-educations");
        element.all(by.repeater('i in getLista')).then(function(getLista) {
            var d = element(by.model('delete(estonia,2015)'));
            element(by.id('delete')).click();
        });
    });
    
    
});



       
