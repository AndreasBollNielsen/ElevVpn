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


function CheckLogin() {
    if (userarray.find(x => x.Username == username && x.Password == password))
        return true;
    return false;
}

// let db = {};

// db.checkLogin = () => {
//     return new Promise(
//         (resolve, reject) => {
//             con.query('SELECT * FROM users', (err, results) => {
//                 if (err) {
//                     console.log("query not working");
//                     return reject(err);
//                 }

//                 return resolve(results);
//             });
//         }
//     );
// };