const mongoose = require('mongoose')

// setup global promise
mongoose.Promise = global.Promise

// set mongodb cloud ur
const DB_URI =
  process.env.MONGODB_URI ||
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.eac74.mongodb.net/merncsaauth?retryWrites=true&w=majority`

// init database connection
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log('Database Connected')
  })
  .catch((err) => {
    console.log(`Database not connected ${err}`)
  })
