function routeHandler(req,res){
  res.status(404).json({
    success:"false",
    message:"Route not Found"
  });
};

module.exports=routeHandler;