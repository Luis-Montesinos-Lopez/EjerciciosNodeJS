const express = require('express')
// const { USERS_BBDD } = require('../bbdd')
const {public, autorizado, autenticado} = require('../controllers/authControllers');
const checkEmailPassword = require('../utils/checkEmailPassword');
const authRouter = express.Router();
const pc = require('picocolors');

authRouter.use((req, res, next) => {
  console.log(pc.cyan('Enable middleware in auth'))
  next()
})
authRouter.get('/public',public );
authRouter.post('/autenticado', autenticado);
authRouter.post('/autorizado', autorizado);

module.exports = authRouter
