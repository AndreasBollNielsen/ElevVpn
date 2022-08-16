const mysql = require('mysql');

const con = mysql.createPool({
    connectionLimit: 100,
    user: 'radius',
    database: 'elevvpn',
    host: '127.0.0.1',
    port: '3306',
    pass: 'J@neL0veMonkey$2',
    "typeCast": function castField(field, useDefautTypeCasting) {

        // We only want to cast bit fields that have a single-bit in them. If the field
        // has more than one bit, then we cannot assume it is supposed to be a Boolean.
        if ((field.type === "BIT") && (field.length === 1)) {

            var bytes = field.buffer();

            // A Buffer in Node represents a collection of 8-bit unsigned integers.
            // Therefore, our single "bit field" comes back as the bits '0000 0001',
            // which is equivalent to the number 1.
            return (bytes[0] === 1);

        }

        return (useDefaultTypeCasting());
    }

});

let db = {};





db.testcon = function(req, res) {
    con.getConnection(function(err, conn){
        conn.query("select * from users", function(err, rows) {
             res.json(err);
             if(err)
             {
                res.json(err);
             }
        })
    })
}
//get list of users from database
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

    let query = 'SELECT * FROM mailinfo';

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
                console.log("from DB: ",results);
                return resolve(results);
            });
        }
    );
};



module.exports = db;