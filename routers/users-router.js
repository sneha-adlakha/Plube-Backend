const express=require('express');
const User=require("../models/user-model");
const {useTryCatch}=require("../comman/comman-function");
const router=express.Router();
const {extend}=require("lodash");


//Fetch Users  (/users)
router.get("/",(req,res)=>{
  useTryCatch(res,async()=>{
    let users=await User.find({});
    users=users.map((user)=>{
      user.password=undefined;
      return user
    });
    res.json({success:"true",users});
  });
});

//Login  (/user)
const searchUser=async(req,res)=>
{
    const {username,password}=req.body;
    const isUserNameExist=await User.exists({username});
    if(isUserNameExist)
    {
       let user=await User.findOne({username,password});
       console.log(user);
       if(user)
      {
      res.json({success:"true",user: { _id: user._id, name: user.name }});
      }
      else
      {
        res.status(401).json({
          success:false,
          message:"Username or Password Mismatch"
        });
      }
    } else
    {
      res.status(401).json({
        success:false,
        message:"User not Found"
      });
    }
}

//Login  (/user)
router.post("/login",searchUser);

//Add User---New User----(/register)
router.post("/register",(req,res)=>{
  useTryCatch(res,async()=>{
    const userData=req.body;
    const isUserNameExist=await User.exists({username:userData.username});
    const isEmailExist=await User.exists({email:userData.email});
    if(isUserNameExist)
    {
      res.status(409).json({success:"false",message:"UserName is not available"});
      return isUserNameExist;
    }
    if(isEmailExist)
    {
      res.status(409).json({success:"false",message:"Email already registerd"});
      return isEmailExist;
    }
    let newUser=new User(userData);
    newUser=await newUser.save();
    const user={_id:newUser._id,name:newUser.name}
    res.json({success:"true",user});
  });
});


//find function for update user and Search
const findUserById=async(req,res,next,userId)=>{
  try{
    const user=await User.findById(userId);
    if(!user){
      throw Error("Unable to fetch Details");
    }
      req.user=user;
      next();
  } catch(err){
    res
    .status(400)
    .json({success:false,message:"unable to fetch user Details"})
  }
};
//Get User By ID
router.param("userId",findUserById);



router.get("/:userId", (req, res) => {
  useTryCatch(res, async () => {
    const { user } = req;
    user.password = undefined;
    res.json({success:"true",user});
  });
});

router.post("/:userId",(req,res)=>{
  useTryCatch(res, async () => {
  let {user}=req;
  const updatedUser=req.body;
  user=extend(user,updatedUser);
  user=await user.save();
  user.password=undefined;
  res.json({success:"true",user})
  });
});


module.exports=router;