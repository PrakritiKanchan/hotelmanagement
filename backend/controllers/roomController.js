const ROom = require("../models/Room");

exports.addRoom = async(req, res)=>{
  try {
    const{roomNumber, roomType, pricePerNight, isAvailable} = req.body;

    if(!roomNumber || !roomType || !pricePerNight){
      return res.status(400).json({error: "All fields are required"});
    }
    const existing = await Room.findOne({roomNumber});
    if(existing){
      return res.status(409).json({error: "Room already exists"});
    }

    const room = new Room({
      roomNumber,
      roomType,
      pricePerNight,
      isAvailable: isAvailable ?? true,
    });

    await room.save();
    res.status(201).json({message: "Room added successfully", room});
  } catch (err){
    res.status(500).json({error:"Error adding room", details: err.message});
  }
};

exports.getAllRooms = async(req,res)=>{
  try{
    const rooms = await Room.find();
    res.json(rooms);
  } catch(err){
    res.status(500).json({error: "Failed to fetch rooms",details: err.message})
  }
};