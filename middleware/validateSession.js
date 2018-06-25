const jwt = require("jsonwebtoken");
const sequelize = require("../db");
const User = sequelize.import("../models/user");

module.exports = (req, res, next) => {
    if (req.method == "OPTIONS") {
        next()
    } else {
        let sessionToken = req.headers.authorization;
        console.log(sessionToken)
        if (!sessionToken) return res.status(403).send({
            auth: false, message: "No token present." });
            else {
                jwt.verify(sessionToken, process.env.JWTSECRET,
                (err, decoded) => {
                    if(decoded){
                        User.findOne({where: { id: decoded.id}})
                        .then(user => {
                            req.user = user;
                            next();
                        },
                        () => {
                            res.status(401).send({error: "Not authorized."});
                        });
                    } else {
                        res.status(400).send({error: "Not authorized"});
                    }
                })
            }
        
    }
}