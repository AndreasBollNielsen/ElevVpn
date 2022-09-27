const mysql = require('mysql');
const config = require('../DBConfig.json');
DBContext = config.Radius;

//create connection to DB
console.log(DBContext);
const con = mysql.createPool({
    host: DBContext.host,
    user: DBContext.user,
    password: DBContext.password,
    database: DBContext.database,
    connectionLimit: 10
});


let db = {};


// get user from Radius DB
db.GetFromRadius = (userName) => {

    let query = "CALL GetRadiusUser(?)";
//console.log("username: ",userName);
    return new Promise(
        (resolve, reject) => {
            con.query(query, userName, (err, results) => {
                if (err) {
                    console.log("query not working");
                    return reject(err);
                }
                // console.log(results);
                return resolve(results[0]);
            });
        }
    );
};

// Add user to Radius DB
db.AddUser = (username, password) => {

    console.log("username: ", username);
    console.log("password: ", password);
    let query = "CALL AddRadiusUser(?,?)";

    return new Promise(
        (resolve, reject) => {
            con.query(query, [username, password], (err, results) => {
                if (err) {
                    console.log("query not working");
                    return reject(err);
                }
                console.log("DB Results: ", results);
                return resolve(results);
            });
        }
    );
};

//Remove user from Radius DB
db.RemoveUser = (username) => {

   // console.log("username: ", username);
    let query = "CALL RemoveRadiusUser(?)";

    return new Promise(
        (resolve, reject) => {
            con.query(query, username, (err, results) => {
                if (err) {
                    console.log("query not working");
                    return reject(err);
                }
                console.log("DB Results: ", results);
                return resolve(results);
            });
        }
    );
};


module.exports = db;