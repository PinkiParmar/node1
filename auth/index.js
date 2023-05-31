const bcrypt = require('bcrypt');

exports.Encrypt = {

    cryptPassword: (password) =>
        bcrypt.genSalt(10)
        .then((salt => bcrypt.hash(password, salt)))
        .then(hash => hash),
    
        comparePassword: (password, hashPassword) =>
            bcrypt.compare(password, hashPassword)
            .then(resp => resp)
    
    }

// exports.cryptPassword = async function(password) {console.log('pwd', password);
// //     bcrypt
// //     .genSalt(10)
// //     .then(salt => {
// //         console.log('Salt: ', salt)
// //         return bcrypt.hash(password, salt)
// //     })
// //     .then(hash => {
// //         console.log('Hash: ', hash)
// //     })
// //     .catch(err => console.error(err.message))

// //     bcrypt
// //   .hash(password, saltRounds)
// //   .then(hash => {
// //     console.log('Hash ', hash)
// //   })
// //   .catch(err => console.error(err.message))

//     bcrypt.genSalt(10, async function(err, salt) {console.log('salt', password, salt);
//      if (err) 
//        return err;
 
//     bcrypt.hash(password, salt, function(err, hash) {console.log('hash', hash);
//        return hash;
//      });
//    });
//  };
 
//  exports.comparePassword = function(plainPass, hashword, callback) {
//     bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {   
//         return err == null ?
//             isPasswordMatch :
//             err;
//     });
//  };