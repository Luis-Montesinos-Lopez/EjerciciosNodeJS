const express = require('express');
const authTokenRouter = express.Router();
const {login, profile} = require('../controllers/authTokenControllers');
const validateLoginDto = require('../dto/validateLoginDto');
const pc = require('picocolors');

authTokenRouter.use((req, res, next) => {
    console.log(pc.cyan('Enable middleware into authToken'));
    next();
});

authTokenRouter.post('/login',validateLoginDto,login);
authTokenRouter.get('/profile',profile);

module.exports = authTokenRouter;
