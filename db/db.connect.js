const mongoose=require('mongoose');

async function initializeDBConnection() 
{
  try{
    await mongoose.connect(process.env['uri'], {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log("successfully connected")
  }
  catch(e){
  console.log("Failed to Connect DB");
  }
}

module.exports={initializeDBConnection}

