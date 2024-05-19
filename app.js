const express = require('express');
const morgan = require('morgan');
const app = express(); 
const { connectToDb, getDb } = require('./db');
const mongoose = require('mongoose');
require('dotenv').config();
//register view engine
app.set('view engine', 'ejs');
const Kana = require('./models/kana');
const { forEach } = require('lodash');
//app.set('views', views);
//this is how you set the views directory the second argument is the directory
//but it defaults to views so you dont have to do it


app.use(morgan('dev'));
app.use(express.static('public'));

const dbURI = process.env.DBCREDS;

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));




app.use((req, res, next) => {
    //console.log('new request made');
    //console.log('host:', req.hostname);
    //console.log('path:', req.path);
   // console.log('method:', req.method);
    next();//this is a function that will move on to the next middleware
    //middleware is code that runs between the request and the response
});

app.get('/', (req, res) => {
    //res.sendFile('./views/index.html', { root: __dirname });
    //sends file, 2 arguments 1 being the file thats relative but 
    //the second is an object that tells you where it is relative from root: __dirname
    res.render('index', { title: 'Home' });
});

app.get('/play', async (req, res) => {
    try {
        const kanaNumbers = [];
        
        while (kanaNumbers.length < 4) {
            let randNum = Math.floor(Math.random() * 46);
            if (!kanaNumbers.includes(randNum)) {
                kanaNumbers.push(randNum);
            }
        }
        console.log(kanaNumbers);

        const kanaArray = await Promise.all(
            kanaNumbers.map((index) => Kana.findOne({},  { __v: 0 }, { skip: index }))
        );

        console.log(kanaArray);
        console.log("Would you lose?");
        res.render('quiz', { title: 'Would You Lose?', kana: kanaArray });
    } catch (err) {
        console.log("here");
        console.log(err);
    }
});