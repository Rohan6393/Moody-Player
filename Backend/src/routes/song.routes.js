const express = require('express'); // Import express to create a router
const multer = require('multer');
const uploadFile = require('../service/storage.service');
const router = express.Router(); // Create a new router instance
const songModel = require("../models/songs.model") 

const upload = multer({storage:multer.memoryStorage()});


router.post('/songs',upload.single("audio"),async(req,res)=>{
     
    console.log(req.body);

    console.log(req.file); //

    const fileData = await uploadFile(req.file);
      console.log(fileData);
    const song = await songModel.create({
        title:req.body.title,
        artist:req.body.artist,
        audio:fileData.url,
        mood:req.body.mood
    })
    //yaha pr mujhe Url problem  aa rhi thi maine schema me naam galat likha tha whaam album likfd diya tha aur yahan pa audio naam se access kr rha tha mooongoose use reject kr de rha tha mongoose schema ka  naam jaisa rakha waise hi naam sab variables ka rakha 

    console.log(song);

    res.status(201).json({
        message:"Song created Successfully",
        song: song
    });

})
// API creating which gives song according to mood
//Get method is used to get data from backend and give it to front end 

router.get('/songs',async(req,res)=>{
    const {mood} = req.query;

    // mujhe wo song laake do jiska mood sad ho   
    const song = await songModel.find({
        mood : mood

    })

    res.status(200).json({
        message:"Song fetched successfully",
        song
    })
})



module.exports = router; // Export the router for use in other files