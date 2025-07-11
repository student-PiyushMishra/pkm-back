import express from "express"
import fs from "fs"
import dotenv from "dotenv"
import {dbConnection as DB_CONNECTION} from "./db/connection.js"
import ejs from "ejs"
import path from "path"
import {__dirname} from "./constants.js"
import activityRoutes from "./routes/activities.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT
app.set("view engine",'ejs')
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
DB_CONNECTION(process.env.MONGODB_URI)

app.use("/activity",activityRoutes)

app.listen(2000,()=>{
	console.log("listening on port",2000)
})
