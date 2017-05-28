var items = Array(); // list your product id here, we will random the id when promoting the product

var casper = require('casper').create({
    pageSettings: {
        loadImages: false,
        loadPlugins: false,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'
    }
});

casper.start().thenOpen("https://www.tokopedia.com/login.pl", function() {
    console.log("Tokopedia website opened");
});

casper.then(function(){
    console.log("Login using username and password");

    this.evaluate(function(){
        document.getElementById("inputEmail").value=""; // your email
                document.getElementById("inputPassword").value=""; // your password
                document.getElementsByClassName("btn btn-action mb-20")[0].click();
    });
});

// optional : remove this if you don't want a screenshot after login
casper.then(function(){
    console.log("Make a screenshot and save it as AfterLogin.png");
        this.wait(6000);
    this.capture('AfterLogin.png');
});


var item = items[Math.floor(Math.random()*items.length)];

casper.thenOpen("https://www.tokopedia.com/ajax/product-e4.pl?action=event_dink_it&p_id="+item, function(){
    this.wait(6000);
});

// optional : remove this if you don't screenshot after promote the product
casper.then(function(){
    this.wait(6000);
    this.capture("hasil.png");
});

casper.run(function() {
    this.echo('Done.').exit();
});
