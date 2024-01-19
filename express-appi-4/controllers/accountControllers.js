const {USERS_BBDD} = require('../bbdd');
//Buscar un usuario
const userGuid = (req, res) => {
    const { guid } = req.params
    // Buscamos los detalles de la cuenta a traves del guild recibido por req.params
    const user = USERS_BBDD.find(user => user.guid === guid)
    // si no existe el usuario respondemos con un 404(not found)
    if (!user) return res.status(404).send('La cuenta no existe')
    // Si existe respondemos con los detalles de la cuenta
    return res.send(user)
  }
//Añadir un nuevo usuario
const regUser =  (req, res) => {
    const { guid, name } = req.body
    const newUser = { guid, name }
    if (!guid || !name) return res.status(400).send('Error en el body')
    const user = USERS_BBDD.find(user => user.guid === guid)
    if (user) return res.status(409).send('La cuenta ya existe')
    USERS_BBDD.push({ guid, name })
    return res.status(201).send(newUser)
  };
//Actualizar un usuario
const updateUser = (req, res) => {
    const { guid } = req.params
    const { name } = req.body
    // Nos aseguramos que ha ingresado un nombre
    if (!name) return res.sendStatus(400)
    // busca al usuario por el guid
    const user = USERS_BBDD.find(user => user.guid === guid)
    // Si no lo encuentra mandamos un error 404
    if (!user) return res.status(404).send('El cliente no exite')
    // Modificamos el nombre de la base de datos con el introducido por body
    user.name = name
    // Enviamos respuesta Ok
    return res.send(user)
  };
//Eliminar un usuario
const deleteUser =(req, res) => {
    const { guid } = req.params
    const userIndex = USERS_BBDD.findIndex(user => user.guid === guid)
    // Si no encuentra el guid nos devuelve un -1
    if (userIndex === -1) return res.sendStatus(404)
    // Eliminamos el indice de ese usuario del array
    USERS_BBDD.splice(userIndex, 1)
    // Respondemos con un status 200
    return res.sendStatus(200)
  };


  module.exports = { userGuid, regUser, updateUser, deleteUser }