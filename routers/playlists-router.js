const express=require('express');
const User=require("../models/user-model");
const Playlist=require("../models/playlist-model");
const {concat}=require("lodash");
const {useTryCatch}=require("../comman/comman-function");
const router=express.Router();
const listRouter = express.Router({ mergeParams: true });

//new route created for user accessing his PlayList
router.use("/:userId/list",listRouter);


//get All Playlists
router.get("/",(req,res)=>{
  useTryCatch(res,async()=>{
    const playlist=await Playlist.find({});
    res.json({success:"true",playlist});
  });
});



//Search User Exists and Create default Playlist if fresh user created Playlist
async function searchUserPlaylist(req,res,next,userId){
  try{
    let user=await User.findOne({_id:userId});
    if(!user){
      res.status(404).json({
        success:"false",
        message:"Invalid UserId"
      });
      throw Error("Invalid User")
    }
    let playlist=await Playlist.findOne({userId})
    if(!playlist){
      playlist=new Playlist({userId,playlists: [{name:"Default", videos:[], active:true}],
      });
      playlist=await playlist.save();
    }
    req.playlist=playlist;
    next();
  } catch(err){
    res.status(500).json({
      success:"false",
      message:"unable to fetch playlist",
      errMessage:err.message,
    });
  }
};


//function to get playlist which is Active
async function getActivePlayList(playlist)
{
  playlist.playlists=playlist.playlists.filter((list=>list.active)
  );
  for(let list of playlist.playlists){
    if(list.videos.length>0){
      list.videos=list.videos.filter(video=>video.active)
    }
  }
  return playlist.playlists;
}

//function to get videos in Playlist
function getVideosInPlayslist(playlist,listId){
  let playlistItem=playlist.playlists.find((item)=>item._id==listId && item.active);
  if(!playlistItem){
    throw Error("Playlist Not found");
  }
  return playlistItem.videos;
};

//function to get active videos in Playlist
const getActiveVideosInPlaylist=(videoList)=>
{
  videoList = videoList.filter((item)=>item.active);
  return videoList.map(item=>item._id);
}
//useParams for userid
router.param("userId",searchUserPlaylist);

//fetch usersPlaylist by its Id
router.get("/:userId",(req,res)=>{
  useTryCatch(res,async()=>{
    const {playlist}=req;
    const playlistData=await getActivePlayList(playlist);
    res.json({success:"true",playlist:playlistData})
  });
});

//Add New Playlist

router.post("/:userId",(req,res)=>{
  useTryCatch(res,async()=>{
    const {name,_id}=req.body;
    const {playlist}=req;
    let newPlaylist={
      name,
      videos:[{_id,active:true}],
      active:true,
    };
    playlist.playlists=concat(playlist.playlists,newPlaylist);
    let updatedPlayList=await playlist.save();
    newlist=updatedPlayList.playlists[updatedPlayList.playlists.length-1]
    res.json({success:true,playlist:newlist})
  });
});


//Update Playlist Name
router.put("/:userId",(req,res)=>{
  useTryCatch(res,async()=>{
   const {_id,name}=req.body;
   let { playlist } = req;
   for(let list of playlist.playlists){
     if(list._id==_id){
       list.name=name;
       break;
     }
   }
   let updatedlist=await playlist.save();
   updatedlist=await getActivePlayList(updatedlist);
   res.json({success:"true",playlist:updatedlist});
  });
});




//get Playlist Videos
listRouter.get("/:playlistId",(req,res)=>{
  useTryCatch(res,async()=>{
    const {playlistId}=req.params;
    const {playlist}=req;
    let playlistVideos=await getVideosInPlayslist(playlist,playlistId);
    playlistVideos=getActiveVideosInPlaylist(playlistVideos);
    res.json({success:true,playlist:playlistVideos})
  });
});


//update PlayList Videos
listRouter.post("/:playlistId",(req,res)=>{
  useTryCatch(res,async()=>{
    const {playlist}=req;
    const {playlistId}=req.params;
    const {_id}=req.body;
    let playlistVideos=await getVideosInPlayslist(playlist,playlistId);
    playlistVideos=playlistVideos.map(item=>item._id);
    const isVideoExists=playlistVideos.some(item=>item== _id);
    for(let list of playlist.playlists){
      if(list._id==playlistId){
        if(isVideoExists){
          for(let video of list.videos){
            if(video._id==_id){
              video.active = !video.active;
              break;
            }
          }
        }else{
          list.videos.push({_id,active:true});
          break;
        }
      }
    }
    let updatedPlaylist = await playlist.save();
    playlistVideos=getVideosInPlayslist(updatedPlaylist,playlistId);
    playlistVideos=getActiveVideosInPlaylist(playlistVideos);
    res.json({success:true,playlist:playlistVideos})
  });
});


//Delete Playlist
listRouter.put("/:playlistId",(req,res)=>{
  useTryCatch(res,async()=>{
    const {playlistId}=req.params;
    const {playlist}=req;
    for(let list of playlist.playlists){
      if(list._id==playlistId){
        list.active=false;
        break;
      }
    }
    playlist.playlists[0].active=true;
    let updatedlist=await playlist.save();
    updatedlist=await  getActivePlayList(updatedlist);
    res.json({success:"true",playlist:updatedlist})
  });
});

module.exports=router;