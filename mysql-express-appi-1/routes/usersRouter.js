const express = require('express');
const pc = require('picocolors')
const { addUser, loginUser, updateUser, deleteUser, getUsers } = require('../controllers/userControllers');
const verifyToken = require('../utils/verifyToken');

const usersRouter = express.Router();

const verifyTokenMiddleware = async (req, res, next) => {
    console.log(pc.magenta('Middleware from users'));
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send('No autorizado');
    };
    try {
        const payload = await verifyToken(authorization);
        req.user = payload.payload; // Adjuntamos la carga útil al objeto de solicitud
        next();
    } catch (error) {
        res.status(401).send('Token inválido');
    }
}

usersRouter.get('/',verifyTokenMiddleware, getUsers)
usersRouter.post('/', verifyTokenMiddleware, addUser);
usersRouter.post('/login', loginUser);
usersRouter.patch('/:id',verifyTokenMiddleware, updateUser);
usersRouter.delete('/:id/',verifyTokenMiddleware, deleteUser);

module.exports = usersRouter;