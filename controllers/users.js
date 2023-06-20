const { user, password } = require('../config');
const con = require('../database');
const { Encrypt } = require('../auth');
const jwt = require('jsonwebtoken');
const secretkey = 'secretkeyFGFDGDFDGF';

// function getUserList(req, res, next) {
getUserList = function (req, res) {
    const sql = "Select * from users";
    
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.json(result);
    });
    }
postRegister = async function (req, res) {
    // console.log('req', req.body);
    const email=req.body.email;
    const sql="SELECT * FROM users WHERE email ='"+email+"'";
    con.query(sql, async function (err, result_data) {
        // console.log(result_data);
        if (err) {
            console.log(err);
            res.json(err)
        }
        if (result_data.length > 0) {
            console.log("user already registered");
            res.json({ 'code': 400, 'status': false, 'message': 'User already registered .' })
        } else {
            let password = req.body.password;
            password = await Encrypt.cryptPassword(password);
            console.log("password: " + password);

            var sql = "INSERT INTO users(first_name,last_name,email,address,city,state,country,zip_code,mobile,password) VALUES (?,?,?,?,?,?,?,?,?,?)";
            var values =
                [req.body.first_name, req.body.last_name, req.body.email, req.body.address, req.body.city, req.body.state, req.body.country, req.body.zip_code, req.body.mobile, password];
            con.query(sql, values, function (err, result) {
                if (err) throw err;
                console.log("insert successfully" + result);
                res.json({ 'code': 200, 'status': true, 'message': 'User registered successfully.' })
            });
        }
    });
}
postLogin = function (req, res) {
    // console.log('req', req.body);
    const email = req.body.email;
    const sql ="SELECT * FROM users WHERE email ='"+email+"'";
    
    con.query(sql, async function (err, result_data){
        // console.log(result_data, req.body.password, result_data[0]['password']);
        if (err) {
            console.log(err);
            res.json(err)
        }
        if (result_data.length == 0) {
            console.log("user not exist");
            res.json({ 'code': 400, 'status': false, 'message': 'Email is incorrect.' })
        } else {
            const data = {
                email: result_data[0]['email'],//?????????????????????????????????????????????????????
                user_id: result_data[0]['user_id']
            }
            const token = jwt.sign(data, secretkey, { expiresIn: 300 });
            // console.log('token', token)
            const matchPassword = await Encrypt.comparePassword(req.body.password, result_data[0]['password']);
            console.log('match', matchPassword);
            if (matchPassword) {
                res.json({ 'code':200,'status': true, 'message': 'User login successfully.', 'token': token })
            }
            else {
                res.json({ 'code': 400, 'status': false, 'message': 'Password is incorrect.' })
            }
        }
    });
    // function tokenVerify(req,resp,next){
    // }
}
getViewProfile = function (req, res) {
    // console.log('req', req.body.id);
    const id=req.body.id;
    let sql =   'SELECT * FROM users WHERE id ='+id;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.json(result);
    });
    
}
postUpdateProfile = function (req, res){
    const id=req.body.id;
    const first_name=req.body.first_name;
    const last_name=req.body.last_name;
    const address=req.body.address;
    const email=req.body.email;
    const city=req.body.city;
    const state=req.body.state;
    const country=req.body.country;
    const zip_code=req.body.zip_code;
    const mobile=req.body.mobile;
    const password=req.body.password;
    const sql= "UPDATE users SET first_name ='"+first_name+"', last_name = '"+ last_name +"', address = '"+ address +"', email = '"+ email +"', city = '"+ city+"', state = '"+ state +"', country = '"+ country +"', Zip_code = '"+ zip_code +"' , mobile = '"+ mobile +"', password = '"+ password +"'WHERE id ='"+id+"'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.json({"message":"Record Updated Successfully."});
    });
}
postReSetPassword=function (req, res) {
    // console.log('req', req.body);
    const email = req.body.email;
    const password = req.body.password;
    let newPassword = req.body.newPassword;
    const sql ="SELECT * FROM users WHERE email ='"+email+"'";
    con.query(sql, async function (err, result){
        // console.log(result_data, req.body.password, result_data[0]['password']);
        if (err) {
            console.log(err);
            res.json(err)
        }
        if (result.length == 0) {
            console.log("user not exist");
            res.json({ 'code': 400, 'status': false, 'message': 'Email is incorrect.' })
        } else {
            const matchPassword = await Encrypt.comparePassword(password, result[0]['password']);
            if (matchPassword ) {
                newPassword = await Encrypt.cryptPassword(newPassword);
                const sql= "UPDATE users SET password ='"+newPassword+"'WHERE email='"+email+"'";
                con.query(sql, function (err, result_data) {
                    if (err) throw err;
                    console.log("Result: " + JSON.stringify(result_data));
                    res.json({ 'code':200,'status': true, 'message': 'password reset successfully'})
                });
            }
            else {
                res.json({ 'code': 400, 'status': false, 'message': 'Password is incorrect.' })
            }
        }
    });
}
postForgetPassword=function(req,res){
    const email = req.body.email;
    let password = req.body.password;
    const user_id=req.body.id;
    const sql ="SELECT * FROM users WHERE email ='"+email+"'";
    con.query(sql, async function (err, result_data){
        // console.log(result_data, req.body.password, result_data[0]['password']);
        if (err) {
            console.log(err);
            res.json(err)
        }
        if (result_data.length == 0) {
            console.log("user not exist");
            res.json({ 'code': 400, 'status': false, 'message': 'Email is incorrect.' })
        } else {
            password = await Encrypt.cryptPassword(password);
            const sql= "INSERT INTO token(password,user_id) VALUES (?,?)";
            var values =[password,result_data[0]['user_id']];
            con.query(sql, values, function (err, result) {
                if (err) throw err;
                console.log("insert successfully" + result);
                res.json({ 'code': 200, 'status': true, 'message': 'password entered successfully.' })
            });
            const data = {
                email: result_data[0]['email'],
                user_id: result_data[0]['user_id']
            }
            const token = jwt.sign(data, secretkey, { expiresIn: 300 });
            con.query(sql, function (err, result_data) {
                if (err) throw err;
                console.log("Result: " + JSON.stringify(result_data));
                res.json({ 'code':200,'status': true, 'message': 'password generated successfully','token':token})
            });
        }
    });
}
// postSetNewPassword=function(req,res){
//     const token=req.body.token;
//     const password=req.body.password;
//     let newPassword=req.body.newPassword;
//     const sql="SELECT * FROM users WHERE password ='"+password+"'"
//     con,query(sql,function(err,result_data){
//         if (err){
//             console.log(err);
//             res.json(err);
//         }
//         if(result_data.length==0){
//             console.log("user not exist");
//             res.json({'code':400,'status':false,'message':'password is incorrect'})
//         }else{
           
//         }

//     });
// }
module.exports={ postRegister, getUserList, postLogin,getViewProfile ,postUpdateProfile,postReSetPassword,postForgetPassword}