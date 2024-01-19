
const userModel = require('../services/schemas/userSchema');
//Buscar un usuario
const userGuid = async (req, res) => {
    const { guid } = req.params
    // Buscamos los detalles de la cuenta a traves del guild recibido por req.params
    //const user = USERS_BBDD.find(user => user.guid === guid)
    const user = await userModel.findById(guid)
    // si no existe el usuario respondemos con un 404(not found)
    if (!user) return res.status(404).send('La cuenta no existe')
    // Si existe respondemos con los detalles de la cuenta
    return res.send(user)
  }
//Añadir un nuevo usuario
const regUser =  async (req, res) => {
  try {
    const { guid, name, email, password,role } = req.body
    if (!guid || !name) return res.status(400).send('Error en el body');
    //const user = USERS_BBDD.find(user => user.guid === guid)
    const user = await userModel.findById(guid);

    if (user) return res.status(409).send('La cuenta ya existe');
    //USERS_BBDD.push({ guid, name })
    const newUser = new userModel({_id:guid, name, email, password, role});
    await newUser.save();
    return res.status(201).json({message:'Usuario registrado'})
  } catch (err) {
    res.sendStatus(500)
  }
    
  };
//Actualizar un usuario
const updateUser = async (req, res) => {
    const { guid } = req.params
    const { name, email, password, role} = req.body
    // Nos aseguramos que ha ingresado un nombre
    if (!name) return res.sendStatus(400)
    // busca al usuario por el guid
    //const user = USERS_BBDD.find(user => user.guid === guid)
    const user = await userModel.findById(guid)
    // Si no lo encuentra mandamos un error 404
    if (!user) return res.status(404).send('El cliente no exite')
    // Modificamos el nombre de la base de datos con el introducido por body
    user.name = name
    user.email = email
    user.password = password
    user.role = role
    await user.save()
    // Enviamos respuesta Ok
    return res.send(user)
  };
//Eliminar un usuario
const deleteUser = async (req, res) => {
    const { guid } = req.params
    //const userIndex = USERS_BBDD.findIndex(user => user.guid === guid)
    const user = await userModel.findById(guid)
    // Si no encuentra el guid nos devuelve un -1
    if (!user) return res.status(404).send('El usuario no existe')
    // Eliminamos el indice de ese usuario del array
    await user.deleteOne();
    // Respondemos con un status 200
    return res.sendStatus(200)
  };


  module.exports = { userGuid, regUser, updateUser, deleteUser }