const jwt= require('jsonwebtoken');
const secretkey = 'secretkeyFGFDGDFDGF';

module.exports=reqFilter=(req,res,next) => {
    // console.log('tokkkkk', req.headers);
    const token = req.headers["authorization"];
    if(token) {
        let tokenn = token.split(' ');
        console.log('token', tokenn[1])

        if (!tokenn[1]) {
            return res.status(403).send("A token is required for authentication");
        } else {
            let verifyToken = jwt.verify(tokenn[1], secretkey);
            console.log('reqFilter', verifyToken)
            next();
        }
    } else {
        return res.status(403).send("Token not found");
    }
}