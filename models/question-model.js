const mongoose=require('mongoose');
const { Schema } = mongoose;
const QuestionSchema=new mongoose.Schema({
   quizCategoryId:{
    type:Schema.Types.ObjectId,
    required:["Category Required"]
  },
  question:
    {
    type:String,
    required:["question Required"]
  },
  options:[
    {
      value:{
        type:String,
        required:["Option Value Required"]
      },
      isCorrect:{
        type:Boolean
      },
    }
   ]
});

const Question=mongoose.model("Question",QuestionSchema);
module.exports = Question;