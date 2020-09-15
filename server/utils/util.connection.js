const mongoose = require('mongoose')

// set global promise
mongoose.Promise = global.Promise

// init database connection
mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.eac74.mongodb.net/merncsaauth?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  )
  .then(() => {
    console.log('Database Connected')
  })
  .catch((err) => {
    console.log(`Database not connected ${err}`)
  })
