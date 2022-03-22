import express from 'express'

import itemsController from './controllers/items.controller.js'
import usersController from './controllers/users.controller.js'

const app = express()

app.use(express.json({ limit: '1mb', extended: false }))
app.use(express.urlencoded({ limit: '1mb', extended: false }))

app.use('/api/items', itemsController)
app.use('/api/users', usersController)

export default app
