import express from "express"
import activityModel from "../models/activities.js"
import createActivityController from "../controllers/createActivity.js"

const route = express.Router()

route.get('/write',(req,res)=>{
  res.render('activities',{mode:"create"})
})

route.get('/', async (req, res) => {
  try {
    const data = await activityModel.find({});
    res.json(data); 
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});


route.get("/delete",(req,res)=>{
  res.render('activities',{mode:"delete"})
})

route.post("/delete",async (req,res)=>{
  if(req.body.secret =! process.env.ACTIVITY_SECRET){
    return res.render('error',{error:"Secret key provided is not correct", returnHref:"/activity/delete"})
  }
  try {
    await activityModel.deleteOne({uid:req.body.uid})
    res.render('info',{info:"Activity deleted Successfully...",returnHref:"/activity"})  
  } catch (error) {
    res.render('error',{error:"Something went wrong while deleting but is not because of the secret either the uid is invalid or something else",returnHref:"/activity/delete"})
  }

  
})

route.post('/',async (req,res)=>{
  if(req.body.secret != process.env.ACTIVITY_SECRET){
    return res.render("error",{error:"Secret key provided is not correct", returnHref:"/activity/write"})
  } createActivityController(req.body).then(()=>{res.render("info",{info:"Activity created Successfully...",returnHref:"/activity"})})
})


export default route
