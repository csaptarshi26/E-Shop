import mongoose from "mongoose";

const connectDb = async () => {
  let conn
  try {
    let uri = process.env.NODE_ENV === 'development' ? process.env.MONGO_URI_LOCAL : process.env.MONGO_URI_CLOUD
    const conn = await mongoose.connect(uri)

    console.log(`MongoDb Connected : ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(`Error :  ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}
export default connectDb