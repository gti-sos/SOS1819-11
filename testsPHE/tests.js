exports.config = {
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: ["e2e/TC01-loadData.js",
        "e2e/TC02-postData.js",
        "e2e/TC03-deleteData.js"
    ]
};
