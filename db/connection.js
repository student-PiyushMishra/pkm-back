import mongoose from 'mongoose'

export  const dbConnection = (CONNECTION_STRING) => {
  mongoose.connect(CONNECTION_STRING).then(()=>{console.log("MONGODB Connected...")}).catch(e => console.error(e))
}
