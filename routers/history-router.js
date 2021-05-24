const express=require('express');
const User=require("../models/user-model");
const Video=require("../models/videos-model");
const History=require("../models/history-model");
const {concat,remove}=require("lodash");
const {useTryCatch}=require("../comman/comman-function");
const router=express.Router();
const listRouter = express.Router({ mergeParams: true });

router.get("/",(req,res)=>{
  useTryCatch(res,async()=>{
    const history=await History.find({});
    res.json({success:"true",history});
  });
});

async function searchHistory(req,res,next,userId)
{
  try{
    let user=await User.findOne({_id:userId});
    if(!user)
    {
      res.status(404).json({
        success:"false",
        message:"Invalid UserId"
      });
      throw Error("Invalid User")
    }

    let history=await History.findOne({userId})
    if(!history)
    {
      history=new History({userId,videos:[]});
      history=await history.save();
    }
    req.history=history;
    next();
  } catch(err)
  {
    res.status(500).json({
      success:"false",
      message:"unable to fetch playlist",
      errMessage:err.message,
    });
  }
};

const getHistoryData=async (history)=>{
history.videos=history.videos.filter((video)=>video.active);
history=await history.populate("videos._id").execPopulate();
return history.videos.map((video)=>video._id)
}
router.param("userId",searchHistory)

router.get("/:userId",(req,res)=>{
  useTryCatch(res,async()=>{
    const {history}=req;
    const historyData=await getHistoryData(history);
    res.json({success:"true",history:historyData})
  });
});


router.post("/:userId",(req,res)=>{
  useTryCatch(res,async()=>{
    const {_id}=req.body;
    const {history}=req;
    let resposeStatus;
    const isVideoExists=history.videos.some((video)=>video._id==_id);
    if(isVideoExists){
      responseStatus=200;
      remove(history.videos,(video)=>video._id==_id);
      history.videos=concat(history.videos,{_id,active:true});
    }else{
      responseStatus=201;
      history.videos.push({_id,active:true});
    }
    let updatedHistory=await history.save();
    let historyData=await getHistoryData(updatedHistory);
    res.status(responseStatus).json({success:"true",history:historyData});
  });
});

router.put("/:userId",(req,res)=>{
  useTryCatch(res,async()=>{
    const {history}=req;
    const {_id}=req.body;
    for(let video of history.videos){
      if(video._id==_id){
        video.active=false;
        break;
      }
    }
    let updatedHistory=await history.save();
    let historyData=await getHistoryData(updatedHistory);
    res.json({success:"true",history:historyData})
  });
});

router.delete("/:userId",(req,res)=>{
  useTryCatch(res,async()=>{
    const {history}=req;
      for(let video of history.videos){
        video.active=false;
      }
      let voidHistory=await history.save();
      voidHistory=await getHistoryData(voidHistory)
      res.json({success:"true",history:voidHistory})
  });
});



module.exports=router;