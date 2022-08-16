// const mysql = require('mysql');

const mariadb = require('mariadb');
const con = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'OmgL00k@The$paceMonkey',
    database:'radius',
    connectionLimit: 10
});


let db = {};





db.GetFromRadius = () => {

    return new Promise(
        (resolve, reject) => {
            con.query('SELECT * FROM radcheck', (err, results) => {
                if (err) {
                    console.log("query not working");
                    return reject(err);
                }
                return resolve(results[0]);
            });
        }
    );
};

module.exports = db;