const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials'); //After using partials, we need to restart nodemon with -e js,hbs extension
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err)
        { 
            console.log('Unable to append to server.log');
        }
    });
    console.log(log);
    next();
});

//Stop the control at a maintence page
// app.use((req, res, next) => {
//     res.render('maintenence.hbs');
// });

app.use(express.static(__dirname + '/public'));  //__dirname is current dir and + the folder where the help is present

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    res.render('home.hbs',{
        siteTitle: 'Malay',
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to my Website'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/project',(req, res) => {
    res.render('project.hbs',{
        pageTitle: 'Project Page',
        welcomeMessage: 'Abbe Marab'  
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable To Handle Request!'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});