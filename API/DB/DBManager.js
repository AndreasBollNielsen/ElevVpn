const mysql = require('mysql');
const config = require('../DBConfig.json');


const con = mysql.createPool({
    connectionLimit: 100,
    user: config.test.user,
    database: config.test.database,
    host: config.test.host,
    port: config.test.port,
    password: config.test.password

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
db.AddUserEmail = (email) => {

    let query = 'CALL AddUser(?)';
    // console.log(email);
    return new Promise(
        (resolve, reject) => {
            con.query(query, email, (err, results) => {
                if (err) {
                    console.log("query not working");
                    return reject(err);
                }
                // console.log("add users: ", results);
                return resolve(results);
            });
        }
    );
};

//check if admin credentials is valid
db.checkAdminLogin = (username, password) => {

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
                console.log("DB Results: ", results[0]);
                return resolve(results[0]);
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
            con.query(query, infoText, (err, results) => {
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