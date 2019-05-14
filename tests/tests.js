exports.config = {
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: [ 
        "mainTests.js",
        "general-public-expenses.js"]
};