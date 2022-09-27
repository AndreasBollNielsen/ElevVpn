const mysql = require('mysql');
const config = require('../DBConfig.json');
const { json } = require('express');

DBContext = config.test;


const con = mysql.createPool({
    connectionLimit: 100,
    user: DBContext.user,
    database: DBContext.database,
    host: DBContext.host,
    port: DBContext.port,
    password: DBContext.password

});

let db = {};




//get list of users from databas"e
db.getUsers = () => {

    return new Promise(
        (resolve, reject) => {
            con.query('SELECT * FROM users', (err, results) => {
                if (err) {
                    console.log("query not working");
                    return reject(err);
                }
                return resolve(results);
            });
        }
    );
};

//add multiple emails to database
db.AddUserEmail = (emails) => {

    let query = 'CALL AddUser(?)';
    let DBresults = [];
    let promises = [];

    return new Promise(

        //add list of promises and wait for it to finish
        (resolve, reject) => {

            for (let index = 0; index < emails.length; index++) {
                const email = emails[index];

                promises.push(AddUserToDB(email));
            }

            Promise.all(promises).then(() => {
                console.log("add users: ", DBresults.length);
                return resolve(DBresults);
            })
                .catch(error => { return reject(error) })


        }
    );

    //promise that inserts data to DB
    function AddUserToDB(email) {
        return new Promise((resolve, reject) => {
            con.query(query, email, (err, results) => {
                if (err) {
                    console.log("query not working");
                    return reject(err);
                }
                DBresults.push(results);
                resolve();
                console.log("db result: ", DBresults.length);

            });
        })
    };
};

//check if admin credentials is valid
db.checkAdminLogin = async (username, password) => {

    console.log("username: ", username);
    console.log("password: ", password);
    let query = "CALL AdminLogin(?,?)";

    return new Promise(
        (resolve, reject) => {
            con.query(query, [username, password], (err, results) => {
                if (err) {
                    console.log("query not working");
                    return reject(err);
                }
                //  const rowData = JSON.stringify(results[0]);
                 //  console.log("From DB: ", results);
                // const UserValidated = security.passwordCompare(password,results[0].passWord);
                // console.log("user validation: ", UserValidated);
                return resolve(results[0]);
            });
        }
    );
};

//update admin password
db.UpdateAdminLogin = (username, password) => {

    console.log("username: ", username);
    console.log("password: ", password);
    let query = "CALL ChangePassword(?,?)";

    console.log("data for database: " + `username: ${username} hashed password: ${password}`);
    return new Promise(
        (resolve, reject) => {
            con.query(query, [username, password], (err, results) => {
                if (err) {
                    console.log("query not working");
                    return reject(err);
                }
                console.log("DB Results: ", results.affectedRows);
                return resolve(results);
            });
        }
    );
};

//update user sticky value
db.UpdateSticky = (id, sticky) => {

    let query = 'CALL UpdateSticky(?,?)';

    return new Promise(
        (resolve, reject) => {
            con.query(query, [id, sticky], (err, results) => {
                if (err) {
                    console.log("query not working");
                    return reject(err);
                }
                console.log(results);
                return resolve(results[0]);
            });
        }
    );
};

//update user VPN value
db.UpdateVPN = (email) => {

    let query = 'CALL UpdateVpn(?)';

    return new Promise(
        (resolve, reject) => {
            con.query(query, email, (err, results) => {
                if (err) {
                    console.log("query not working");
                    return reject(err);
                }
                //console.log(results);
                return resolve(results);
            });
        }
    );
};

//Delete user from database
db.DeleteUser = (id) => {

    let query = 'CALL deleteUser(?)';

    return new Promise(
        (resolve, reject) => {
            con.query(query, id, (err, results) => {
                if (err) {
                    console.log("query not working");
                    return reject(err);
                }
                // console.log("from DB: ",results);
                return resolve(results);
            });
        }
    );
};


//Get Info mail from database
db.GetInfo = () => {

    let query = 'SELECT * FROM mailInfo';

    return new Promise(
        (resolve, reject) => {
            con.query(query, (err, results) => {
                if (err) {
                    console.log("query not working");
                    return reject(err);
                }
                // console.log("from DB: ",results);
                return resolve(results);
            });
        }
    );
};


//Update Info mail from database
db.UpdateInfo = (infoText) => {

    let query = 'CALL updateInfo(?)';
    console.log(infoText);
    return new Promise(
        (resolve, reject) => {
            con.query(query, [infoText], (err, results) => {
                if (err) {
                    console.log("query not working");
                    return reject(err);
                }
                console.log("from DB: ", results);
                return resolve(results);
            });
        }
    );
};



module.exports = db;