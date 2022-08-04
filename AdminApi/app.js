const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const mysql = require('mysql');

const con = mysql.createPool({
    connectionLimit: 10,
    user: 'root',
    database: 'elevvpndb',
    host: 'localhost',
    port: '3306'

});


const userarray = [
    {
        "Username": "administrator",
        "Password": "Kode1234!"
    },
    {
        "Username": "marc7075",
        "Password": "Password123!"
    }
];



// const apiRouter = require('./Routes');
// const db = require('./DB/index');

app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use('/api/admin', apiRouter);

const loginAttempts = [];

app.get('/login', (req, res) => {
    console.log(loginAttempts);

    const username = req.query["username"].trim();
    const password = req.query["password"].trim();

    // If any of them are empty
    if (username.trim() == '' || password.trim() == '') {
        // Fejl brormand
        res.status(403).send('You fucked up');
        return;
    }

    const userAttempts = loginAttempts.filter(x => new Date(x.Time).getTime() + (1000 * 60 * 5) > new Date().getTime()).filter(x => x.Username == username);
    // The same username tried to login more than 3 times within a timespan of 5 minutes
    if (userAttempts.length >= 3) {
        userAttempts.forEach(el => {
            loginAttempts[loginAttempts.findIndex(x => x == el)].Time = new Date();
        });
        
        res.status(403).send('Too many failed attempts');
        return;
    }

    // Authorize
    //do my db shit.
    if (CheckLogin(username, password)) {
        // console.log(`Welcome back ${username}`);
        res.status(200).send(`Welcome back ${username}`);
        return;
    } else {
        // Add to failed login attempts array
        loginAttempts.push({
            "Username": username,
            "Time": new Date()
        });

        // Remove old elements (if any)
        let newArray = loginAttempts.filter(x => new Date(x.Time).getTime() + (1000 * 60 * 5) < new Date().getTime());

        if (newArray.length >= 1) {
            newArray.forEach(el => {
                loginAttempts.splice(loginAttempts.findIndex(x => x == el), 1);
            });
        }

        res.status(403).send('Hovsa');
        return;
    }
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});




function CheckLogin(username, password) {
    if (userarray.find(x => x.Username == username && x.Password == password))
        return true;
    return false;
}