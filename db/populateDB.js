const express=require('express');
const QuizCategory=require("../models/quizCategory-model");
const Question=require("../models/question-model");
const moviequiz=require("../quiz-data/moviequiz");
const musicquiz=require("../quiz-data/musicquiz");
const socialmediaquiz=require("../quiz-data/socialmediaquiz");

const populateDB=async()=>{
  try{
    let newQuizCategoy=new QuizCategory({name:"movieQuiz"});
    let savedQuizCategory=await newQuizCategoy.save();
    moviequiz.forEach(async(question)=>{
      const newQuestion=new Question({
        quizCategoryId:savedQuizCategory._id,
        question:question.question,
        options:question.options
      });
      const savedQuestion=await newQuestion.save();
      console.log(savedQuestion);
    });

      newQuizCategoy=new QuizCategory({name:"musicQuiz"});
      savedQuizCategory=await newQuizCategoy.save();
    musicquiz.forEach(async(question)=>{
      const newQuestion=new Question({
        quizCategoryId:savedQuizCategory._id,
        question:question.question,
        options:question.options
      });
      const savedQuestion=await newQuestion.save();
      console.log(savedQuestion);
    });

      newQuizCategoy=new QuizCategory({name:"socialmediaQuiz"});
      savedQuizCategory=await newQuizCategoy.save();
    socialmediaquiz.forEach(async(question)=>{
      const newQuestion=new Question({
        quizCategoryId:savedQuizCategory._id,
        question:question.question,
        options:question.options
      });
      const savedQuestion=await newQuestion.save();
      console.log(savedQuestion);
    });
  } catch(e){
    console.log(e);
  }
}

module.exports=populateDB;
