const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const { parse } = require("path");
mongoose.connect('mongodb://localhost/wedding', { useNewUrlParser: true });
const port = 8000;

// for serving static files
app.use('/static', express.static('static'))     
app.use(express.urlencoded())  

// HTML SPECCIFIC STUFF/CONFIGURATION
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'))

//define mongoose schema 
// create table
var weddingwish = new mongoose.Schema({
    name: String,
    email: String,
    yourwishes: String
    
});

//create table message

var message = mongoose.model('message', weddingwish);

// website page link

app.get('/', (req, res) => {
    res.status(200).render('index.html');

})

app.post('/contact', (req, res) => {
    
    var myData = new message(req.body);
    myData.save().then(() => {
        res.send("your message has been saved to the database")
    }).catch(() => {
        res.status(400).send("Your message was not saved to the database")
    });

})


//START THE SERVER
app.listen(port, () => {
    console.log(`the application started successfully on port ${port}`);
})