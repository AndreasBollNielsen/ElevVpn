const bcrypt = require('bcrypt');
const generator = require('generate-password');

//create json object that holds all the methods
encryption = {};
const salt = 10;

encryption.Encrypt = (password) => {

return new Promise ((resolve,error)=>{

    bcrypt.hash(password, salt, (err, hash) => {
        console.log("hashed and salted password: ", hash);
        return resolve(hash);
    })

});

   
}




encryption.Decrypt = () => {

}


encryption.GeneratePassword = async () => {


    let password = generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
        lowercase: true,
        uppercase: true
    });

    let hashedPassword = await encryption.Encrypt(password);
    let passwords = {"password":password,"hashed": hashedPassword};

    return passwords;

}

encryption.passwordCompare = () => {

}




module.exports = encryption;