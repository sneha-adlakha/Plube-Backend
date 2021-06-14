const express=require('express');
const LikedVideo =require("../models/likevideo-model");
const User=require("../models/user-model");
const {useTryCatch}=require("../comman/comman-function");
const router=express.Router();
const {extend}=require("lodash");

router.get("/",(req,res)=>{
  useTryCatch(res,async()=>{
    const likedVideos=await LikedVideo.find({});
    res.json({success:"true",likedVideos});
  });
});

const searchUserLikedVideos=async(req,res,next,userId)=>{
  try{
    let user=await User.findOne({_id:userId});
    if(!user){
      res
      .status(404)
      .json({
        success:"false",
        message:"User Not Found..SignUp"
      });
      throw Error("User Not Found")
    }
    let likedVideo=await LikedVideo.findOne({userId});
    if(!likedVideo){
      likedVideo=new LikedVideo({userId,videos:[]})
      likedVideo=await likedVideo.save();
    }
    req.likedVideo=likedVideo;
    next();
  }catch(err){
    res.status(500).json({
      success:"false",
      message:"Unable to Fetch Liked Video",
      errorMessage: error.message
    });
  }
};

router.param("userId",searchUserLikedVideos)

const getLikedVideoItems=async(likedVideo)=>{
  likedVideo.videos=likedVideo.videos.filter((video)=>video.active);
  likedVideo=await likedVideo.populate("videos._id").execPopulate();
  return likedVideo.videos.map((video)=>video._id);
}

router.get("/:userId",(req,res)=>{
  useTryCatch(res,async()=>{
    let {likedVideo}=req;
    let likedVideoItems=await getLikedVideoItems(likedVideo);
    res.json({success:true,likedVideoItems});
  });
});

router.post("/:userId",(req,res)=>{
  useTryCatch(res,async()=>{
    const {_id}=req.body;
    const {likedVideo}=req;
    let resStatus;
    const videoExists=likedVideo.videos.some((video)=>video._id==_id);
    if(videoExists){
      resStatus=200;
      for(let video of likedVideo.videos){
        if(video._id==_id){
          video.active=!video.active;
          break;
        }
      }
    }else{
      resStatus=201;
      likedVideo.videos.push({ _id, active: true });
    }
    let updatedlikedVideo=await likedVideo.save();
    let likedVideoItems=await getLikedVideoItems(updatedlikedVideo);
    res.status(resStatus).json({success:true,likedVideo:likedVideoItems})
  });
});
module.exports=router;