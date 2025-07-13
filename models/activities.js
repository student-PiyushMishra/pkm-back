import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  },
  hyperlink: {
    type: String,
    required: true
  },
  href: {
    type: String,
    required: true
  },
  uid: {
    type: String,
    required:true
  }
})

const Activity = mongoose.model("Activity",activitySchema)

export default Activity
