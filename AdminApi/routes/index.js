const express = require('express');
const router = express.Router();
const db = require('../DB');

app.get('/login/username:username/password:password', (req, res) => {
    const data = req.query;
 
    const username = req.query["username"].trim();
    const password = req.query["password"].trim();
 
    // If any of them are empty
    if (username.trim() == '' || password.trim() == '') {
     // Fejl brormand
     res.status(403).send('You fucked up');
    }
 
    if (loginAttempts.filter(x => x.Time.getTime() + (1000 * 60 * 5) < Date()).filter(x => x.Username == username).length >= 3) {
     // The same username tried to login more than 3 times within a timespan of 5 minutes
     res.status(403).send('Too many failed attempts');
    }
 
    // Authorize
    //do my db shit.
    if (userarray) {
        
    }
 });