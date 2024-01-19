const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongodbConnection = require('./services/mongoConect');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const accountRouter = require('./routes/accountRouter');
const authRouter = require('./routes/authRouter');
const authSesionRouter = require('./routes/authSessionRouter');
const authTokenRouter = require('./routes/authTokenRouter');

const port = process.env.PORT;
const app = express();
const pc = require('picocolors');




app.use(express.json());
app.use(express.text());
app.use(logger('dev'));
app.use(cookieParser());
app.use('/account', accountRouter);
app.use('/auth', authRouter);
app.use('/auth-session', authSesionRouter);
app.use('/auth-token', authTokenRouter);
/** -------------------------------------------Realizadas las variables-------------------------------------------------------------- */
const main = async () => {
  try {
    await mongodbConnection();
    console.log('Database connection OK!');
    app.listen(port, () => {
    console.log(pc.green(`🎸 Rocking at http://localhost:${port}`))
});
  } catch (err) {
    console.log('Error in database connection: ', err.message)
  }
}

main();