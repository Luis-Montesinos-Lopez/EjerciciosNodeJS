const express = require('express')
// const { USERS_BBDD } = require('../bbdd')
const checkEmailPassword = require('../utils/checkEmailPassword')
const authRouter = express.Router()
const pc = require('picocolors')

authRouter.use((req, res, next) => {
  console.log(pc.cyan('Enable middleware in auth'))
  next()
})
authRouter.get('/public', (req, res) => {
  res.send('Endpoint Público')
})
authRouter.post('/autenticado', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await checkEmailPassword(email, password)
    console.log(user)
    return res.send(`Usuario ${user.name} autenticado`)
  } catch (err) {
    return res.sendStatus(401)
  }
})
authRouter.post('/autorizado', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await checkEmailPassword(email, password)
    console.log(user)
    if (user.role !== 'admin') return res.sendStatus(403)
    return res.send(`Usuario administrador ${user.name}`)
  } catch (err) {
    return res.sendStatus(401)
  }
})

module.exports = authRouter
