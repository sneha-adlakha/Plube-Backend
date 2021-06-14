const express =require('express');
const {useTryCatch}=require("../comman/comman-function");
const {Video}=require("../models/videos-model");
const router = express.Router();

router.get("/",(req,res)=>{
  useTryCatch(res,async()=>{
    const videos=await Video.find({});
    res.json({success:"true",videos});
  });
});

router.get("/:id", (req, res) => {
  useTryCatch(res, async () => {
    const { id } = req.params;
    const videos = await Video.findById(id);
    res.json({success:"true",videos});
  });
});

module.exports=router;