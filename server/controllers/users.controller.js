import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import lang from '../../src/defaultLang.js'
import User from '../models/users.model.js'
import { JWT_SECRET_KEY, BCRYPT_SALT } from '../config.js'
import { isAuth } from '../middleware/isAuth.js'

const router = Router()

router.route('/registration').post(async (req, res) => {
  try {
    const { name, gender, email, phone, login, password } = req.body

    if (await User.findOne({ login })) {
      return res
        .status(400)
        .json({ message: { text: lang.server.userExists(login), type: 'info' } })
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT)

    const token = jwt.sign({ login }, JWT_SECRET_KEY, { expiresIn: '1m' })

    const user = new User({
      name,
      gender,
      email,
      phone,
      login,
      password: hashedPassword,
      token,
      basket: [],
    })

    await user.save()

    return res.status(201).json({
      token,
      login: user.login,
      message: { text: lang.server.userCreated(login), type: 'info' },
    })
  } catch (e) {
    return res.status(500).json({ message: { text: e.message, type: 'error' } })
  }
})

router.route('/login').post(async (req, res) => {
  try {
    const { login, password } = req.body

    const user = await User.findOne({ login })

    if (!user) {
      return res.status(400).json({ message: { text: lang.server.userNotFound(login), type: 'error' } })
    }

    bcrypt.compare(password, user.password, (error, result) => {
      if (error) {
        return res.status(500).json({ message: { text: error.message, type: 'error' } })
      }
      if (!result) {
        return res.status(400).json({
          message: { text: lang.server.authFailed, type: 'error' },
        })
      }
      const token = jwt.sign({ login }, JWT_SECRET_KEY, { expiresIn: 60 })
      user.token = token
      user.save()

      return res.status(201).json({
        token,
        login: user.login,
        basket: user.basket,
        message: { text: lang.server.userWelcome(user.name), type: 'info' },
      })
    })
  } catch (e) {
    return res.status(500).json({ message: { text: e.message, type: 'error' } })
  }
})

router.route('/updateuserbasket').post(isAuth, async (req, res) => {
  try {
    const { basket } = req.body
    const login = req.login
    const user = await User.findOne({ login })
    user.basket = basket
    await user.save()
    return res.status(200).json({ message: { text: lang.server.basketUpdated, type: 'info' } })
  } catch (e) {
    res.status(500).json({ message: { text: e.message, type: 'error' } })
  }
})

router.route('/').get(async (req, res) => {
  const users = await User.find()
  return res.status(200).json(users)
})

export default router
