const express = require('express');
const authSesionRouter = express.Router();
const {login, profile} = require('../controllers/authSesionControllers');
const pc = require('picocolors');
authSesionRouter.use((req, res, next) => {
    console.log(pc.cyan('Enable middleware in authSesionRouter'));
    next();
});

authSesionRouter.post('/login',login);
authSesionRouter.get('/profile', profile);


module.exports = authSesionRouter;
