const { ZodError } = require("zod");
const { validateUser, validateEmailPassword, validateEmail, validatePassword } = require("../utils/zodSchemas/zodSchemas");
const dao = require("../services/Dao/usersDao");
const md5 = require("md5");
const { SignJWT } = require('jose');
const verifyToken = require("../utils/verifyToken");
const getUsers = async (req, res) => {
    try {
        const payload = req.user;
        if (!payload.role) {
            return res.status(401).send('No autorizado');
        };
        const users = await dao.getUsers();
        Object.keys(users).forEach((key)=>{
            delete users[key].id;
            delete users[key].password;
            delete users[key].userAccesId;
            delete users[key].userRole
        })
        return res.status(200).send(users);
    } catch (e) {
        return res.status(500).send(e.message)
    };
}
const addUser = async (req, res) => {
    try {
        const validate = validateUser.parse(req.body);
        console.log(`Se ha introducido lo siguiente: %o`, validate);
        const user = await dao.getUserByEmail(validate.email)
        console.log(`Se ha encontrado el siguiente usuario: %o`, user[0]);
        if (user.length > 0) {
            return res.status(409).json({ message: 'Usuario ya registrado' })
        }
        const userAcces = await dao.addUserAcces(validate)
        console.log(`Usuario registrado en acces con el id: %o`, userAcces)
        if (!userAcces) {
            return res.sendStatus(404)
        }
        validate.userAccesId = userAcces;
        const newUser = await dao.addUser(validate)
        return res.status(201).json({ message: `Usuario ${validate.name} con id: ${newUser} registrado` });
    } catch (e) {
        if (e instanceof ZodError) {
            return res.status(400).json(e.issues.map(issue => ({ message: issue.message })));
        }
        console.log(e)
        return res.sendStatus(500)
    }
};
const loginUser = async (req, res) => {
    try {
        const validate = validateEmailPassword.parse(req.body);
        let user = await dao.getUserByEmail(validate.email);
        if (user.length <= 0) {
            return res.status(404).send('Usuario no registrado');
        };
        const clientPassword = md5(validate.password);
        [user] = user;
        if (user.password != clientPassword) {
            return res.status(401).send('Password incorrecta');
        }
        const jwtConstructor = new SignJWT({ id: user.id, role: user.userRole });
        const encoder = new TextEncoder();
        const jwt = await jwtConstructor
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(encoder.encode(process.env.JWT_SECRET));
        return res.send({ jwt });
    } catch (e) {
        if (e instanceof ZodError) {
            return res.status(400).json(e.issues.map(issue => ({ message: issue.message })));
        }
        console.log(e.message)
        return res.sendStatus(500);

    }

}
const updateUser = async (req, res) => {
    try {
        //Obtenemos el token del header
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).send('No autorizado');
        };
        const userId = parseint(req.params.id);
        //Verificamos el token
        const payload = await verifyToken(authorization);
        //Comprobamos el rol o el id del token
        if (!payload.role && payload.id !== userId) {
            return res.status(401).send('No puedes actualizar');
        }
        //Obtenemos el usuario a actualizar
        let user = await dao.getUserById(userId);
        if (user.length < 1) {
            return res.status(404).send('Usuario no encontrado');
        }
        [user] = user
        //Comprobamos que el body no este vacio
        if (Object.entries(req.body).length === 0) {
            return res.status(400).send("Error al recibir el body");
        }
        let datos = req.body;
        //Comprobamos que el body contenga email o password
        if (datos.email) {
            if (payload.id !== userId) {
                return res.status(401).send('No puedes actualizar');
            }
            let validate = validateEmail.parse(datos);
            await dao.updateUserAcces(user.userAccesId, validate);
            await dao.updateUser(user.id, validate);
            return res.status(200).send(`Usuario con id: ${userId} actualizado`);
        } else if (datos.password) {
            if (payload.id !== userId) {
                return res.status(401).send('No puedes actualizar');
            }
            let validate = validatePassword.parse(datos);
            await dao.updateUserAcces(user.userAccesId, validate);
            await dao.updateUser(user.id, validate);
            return res.status(200).send(`Usuario con id: ${userId} actualizado`);
        }
        //Si no tiene email o password actuaizamos el resto de datos
        await dao.updateUser(user.id, datos);
        if (updateUser) {
            return res.status(200).send(`Usuario con id: ${userId} actualizado`);
        } else {
            return res.sendStatus(500)
        }
    } catch (e) {
        if (e instanceof ZodError) {
            return res.status(400).json(e.issues.map(issue => ({ message: issue.message })));
        };

        return res.status(500).send(e.message);
    };
};
const deleteUser = async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.sendStatus(401);
    }
    try {
        const payload = await verifyToken(authorization);
        if (!payload.role) {
            return res.status(401).send('No autorizado');
        }
        const { id } = req.params;
        let user = await dao.getUserById(id);
        if (user.length < 1) {
            return res.status(404).send('Usuario no encontrado');
        }
        [user] = user
        if (user.userRole) {
            return res.status(409).send('No se pueden eliminar administradores');
        }
        await dao.deleteUser(id);
        await dao.deleteUserAcces(user.userAccesId);
        return res.send(`Usuario con id: ${id} eliminado`).status(200);
    } catch (e) {
        console.log(e.message)
        return res.sendStatus(500);

    }


}

module.exports = { getUsers, addUser, loginUser, updateUser, deleteUser };