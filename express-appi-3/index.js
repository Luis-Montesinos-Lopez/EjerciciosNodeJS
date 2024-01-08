const express = require('express')
const dotenv = require('dotenv')
const logger = require('morgan')
const accountRouter = require('./routes/accountRouter')
const authRouter = require('./routes/authRouter')
dotenv.config()
const port = process.env.PORT
const app = express()
const pc = require('picocolors')

app.use(express.json())
app.use(express.text())
app.use(logger('dev'))
app.use('/account', accountRouter)
app.use('/auth', authRouter)
/** -------------------------------------------Realizadas las variables-------------------------------------------------------------- */

app.listen(port, () => {
  console.log(pc.green(`🎸 Rocking at http://localhost:${port}`))
})
