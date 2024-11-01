    const User = require("../model/userModel");
    const bcrypt = require("bcrypt");

    module.exports.register = async(req, res, next) =>{
        try{
            const { username, email, password } = req.body;
            const usernameCheck = await User.findOne({username});
            if(usernameCheck)//this checks weather the username already exists in the Db if exists it will return the following
                return res.json({msg: "Username already used", status: false});
            const emailCheck = await User.findOne({email});

            if(emailCheck)//this check weather the email is already in the db and return the following message.     
                return res.json({msg: "Email already used", status: false});
            
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                email, 
                username,
                password: hashedPassword
            });
        
            delete user.password;//this password must be deleted before sending to the server to hide the plain password.
            return res.json({status: true, user});
        }catch(error){
            next(error)
        }
    }

    module.exports.login = async(req, res, next) =>{
        try{
            const { username, password } = req.body;
            console.log("Username from request:", username);

            // Check if both username and password are provided
            if (!username || !password) {
                return res.status(400).json({ msg: "Please provide both username and password.", status: false });
            }

            const userInDb = await User.findOne({username});
            console.log("User found in DB:", userInDb);

            if(!userInDb)
                return res.json({msg: "Incorrect Username or Password.", status: false});
            
            const isPasswordValid = await bcrypt.compare(password, userInDb.password);
            if(!isPasswordValid)
                return res.json({msg: "Incorrect Password or Username.", status: false});

            delete userInDb.password
            return res.json({status: true, userInDb});
        }catch(error){
            next(error)
        }
    }
