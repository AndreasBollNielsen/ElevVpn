const mysql = require('mysql');

const con = mysql.createPool({
    host: 'localhost',
    user: 'radius',
    password: 'J@neL0veMonkey$2',
    database: 'radius',
    connectionLimit: 10
});


let db = {};



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