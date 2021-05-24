const mongoose = require("mongoose");
const { Schema } = mongoose;
const videosData = require("./videos-data");

const videosSchema=new Schema({
  id:Schema.Types.ObjectId,
  vid:String,
  title:String,
  category:String,
  author:String,
  subsciber:Number,
  views:Number,
  date:Date,
  image:String,
  description:String
},  
{
    timestamps: true,
});

const Video=mongoose.model("Video",videosSchema);

async function fillVideosData() {
  try {
      videosData.forEach(async (item) => {
      const newVideo = new Video(item);
      const savedVideo = await newVideo.save();
      console.log({success:true,video:savedVideo});
    });
  } catch (e) {
        res.status(500).json({success:false,message:"unable to add product",errorMessage:err.message})
  }
}

module.exports = { Video, fillVideosData};