import jwt from 'jsonwebtoken'

import lang from '../../src/defaultLang.js'
import { JWT_SECRET_KEY } from '../config.js'

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization
  if (authorization) {
    const token = authorization.slice(7, authorization.length)
    jwt.verify(token, JWT_SECRET_KEY, (error, decode) => {
      if (error) {
        return res.status(400).json({ message: { text: lang.server.loginAgain, type: 'error' } })
      }
      req.login = decode.login
      next()
    })
  } else {
    return res.status(401).send({ message: { text: lang.server.notAuth, type: 'error' } })
  }
}
