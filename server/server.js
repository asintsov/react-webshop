import mongoose from 'mongoose'

import app from './app.js'
import { PORT, URL } from './config.js'

async function start() {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })

    app.listen(PORT, () => {
      console.log(`Server on port ${PORT} in process...`)
    })
  } catch (e) {
    console.log(`Server error ${e}`)
  }
}

start()
