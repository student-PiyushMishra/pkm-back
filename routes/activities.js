import express from "express"
import activityModel from "../models/activities.js"
import createActivityController from "../controllers/createActivity.js"

const route = express.Router()

route.get('/write',(req,res)=>{
  res.render('activities',{mode:"create"})
})

route.get('/',async (req,res)=>{
  const data = await activityModel.find({}) 
  res.send(data)
})

route.get("/delete",(req,res)=>{
  res.render('activities',{mode:"delete"})
})

route.post("/delete",async (req,res)=>{
  if(req.body.secret =! process.env.ACTIVITY_SECRET){
    return res.render('error',{error:"Secret key provided is not correct", returnHref:"/activity/delete"})
  }
  await activityModel.deleteOne({uid:req.body.uid})
  res.render('info',{info:"Activity deleted Successfully...",returnHref:"/activity"})
})

route.post('/',async (req,res)=>{
  if(req.body.secret != process.env.ACTIVITY_SECRET){
    return res.render("error",{error:"Secret key provided is not correct", returnHref:"/activity/write"})
  } createActivityController(req.body).then(()=>{res.render("info",{info:"Activity created Successfully...",returnHref:"/activity"})})
})


export default route
