const mysql = require('mysql');

const con = mysql.createPool({
    connectionLimit: 10,
    user: 'root',
    database: 'elevvpndb',
    host: 'localhost',
    port: '3306',
    "typeCast": function castField(field, useDefaultTypeCasting) {

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

db.AddUserEmail = (email) => {

    let query = 'CALL AddUser(?)';

    return new Promise(
        (resolve, reject) => {
            con.query(query, email, (err, results) => {
                if (err) {
                    console.log("query not working");
                    return reject(err);
                }
console.log("add users: ",results);
                return resolve(results[0]);
            });
        }
    );
};


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


module.exports = db;