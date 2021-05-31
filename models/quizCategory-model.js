const mongoose=require('mongoose');
const { Schema } = mongoose;
const QuizCategorySchema=new mongoose.Schema({
    name:{
    type:String,
    required:["Name Required"]
  },
});

const QuizCategory=mongoose.model("QuizCategory",QuizCategorySchema);

module.exports=QuizCategory;