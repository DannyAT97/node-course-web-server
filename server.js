const express = require('express');
const hbs = require('hbs'); 
const fs = require('fs');

// this is for heroku, if the port doesnt exits the will be 3000.
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log');  
        }
    });
    next(); 
});

//  

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => { // this is receibing the text from the html
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Danny',
    //     likes: [
    //         'Gym',
    //         'Computer Science',
    //         'Cyber Security'
    //     ]
    // });
    res.render('home.hbs', {
        name: 'Danny Acosta',
        likes: [
            'Gym',
            ' Computer Science',
            ' Cyber Security'
        ], 
        pageTitle: 'Using node for this title',
        welcomeMessage: 'Welcome to home page',
        currentYear: new Date().getFullYear() 
    });

});

app.get('/whatever', (req, res) => {
    res.render('about.hbs', {
        name: 'Danny Acosta',
        pageTitle: 'Welcome to Whatever page, From server.js',
        currentYear: new Date().getFullYear()
    });

    // res.send('Another page');
}); // http://localhost:3000/whatever

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'ERROR_PAGE_NOT_FOUND'
    }); 
});
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
}); 
// nodemon have to be running to see the app running in the browser