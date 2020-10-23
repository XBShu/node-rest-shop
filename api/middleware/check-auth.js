const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try{
        console.log(req.body.token);
        //verify (decode and check valid) token from request body
        const decoded = jwt.verify(req.body.token, "secret");
        console.log(`inside try block`); 
        //add new field to request
        req.userData = decoded; 
        console.log("Auth successful");
        //call next if succesfuly authenticated
        next();
    }catch(error) {
        return res.status(401).json({
            message: "Auth failed in check auth",
        });
    }
};