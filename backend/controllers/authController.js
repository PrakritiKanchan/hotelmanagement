//controllers/auth.js
const User = require("../models/User");

//Register Controller
exports.register = async(req, res) => {
  try{
    const{fillname, hotelname, numberOfRooms, phone, email, password} = req.body;

    if(!fullname || hotelName || !numberOfRooms || !phone || !email || !password){
      return res.status(400).json({error: "Please fill all required fields."});
    }

    const existingUser = await User.findone({email});
    if(existingUser){
      return res.status(409).json({error: "User already exists with this email."});
    }

    const newUser = new User({fullname, hotelName, numberOfRooms, phone, email, password});
    await newUser.save();
    res.status(201).json({message: "USer registered successfully!"});
  } catch(error){
    res.status(500).json({error: "Server error during registration", details: error.message});
  }
};

exports.login = async(req, res) => {
  try{
    const{email,password} = req.body;

    if(!email || !password){
      return res.status(400).json({error: "Please enter email and password."});
    }

    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({error: "User not found."});
    }

    if(user.password !== password){
      return res.status(401).json({error: "Invalid email or password."});
    }

    res.status(200).json({message:"Login successful", user});
  } catch(error) {
    res.status(500).json({error: "Server error during login", details: error.message});
  }
};