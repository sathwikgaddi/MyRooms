const express = require("express")
const router = express.Router();
const User = require("../models/user")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post("/register", async(req, res) => {

        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, genSalt)
        // const secretKey = process.env.VERIFY_SECRET
        // const token = jwt.sign({email: req.body.email}, secretKey, {
        //     expiresIn: "15m",
        // })
        // const link = `http://localhost:5000/api/users/verify/${token}`
         const newuser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
         });

         try {
            const user = await newuser.save()
            res.send("User registered succesfully")
         }
         catch(error) {
                return res.send(400).json({error});
         }

});

router.post("/login", async(req, res) => {

    const {email, password} = req.body

    try {
    const user = await User.findOne({email : email})
    if(user) {
    console.log(password, user.password )
    console.log(password)
    if(await (bcrypt.compare(password, user.password))) {

        console.log("Came here")
            const token = jwt.sign({ userid: user._id, name: user.name , isAdmin: user.isAdmin}, process.env.JWT_SECRET);

            res.json({token})
        }
        else {
            
            return res.status(400).json({message: "Login Failed! Incorrect Password"});
        }
    } 
    else {
        return res.status(400).json({message: "Login Failed! User Email Not found"});
    }
}


    
    catch(e) {
        return res.status(400).json({e});
    }

});

module.exports = router