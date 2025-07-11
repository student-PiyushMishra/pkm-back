import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true
  },
  body: {
    type:String,
    required:true
  },
  images: [String],
  comments: [{
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    text: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
  }]
},{timestamps:true})

const blog = mongoose.model("blog",blogSchema)

export default blog
