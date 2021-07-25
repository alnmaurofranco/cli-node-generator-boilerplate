import mongoose from 'mongoose'

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`✨ MongoDB connected`))
  .catch((err) => console.log(`MongoDB connection error: ${err}`))
