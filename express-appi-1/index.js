const express = require('express')
const dotenv = require('dotenv')
const { USERS_BBDD } = require('./bbdd')
dotenv.config()
const app = express()
const port = process.env.PORT
const pc = require('picocolors')

app.use(express.json())
app.use(express.text())
/** -------------------------------------------Realizadas las variables-------------------------------------------------------------- */
/** ----------------------------------------------Endpoints de account---------------------------------------------------------------------------- */
// Obtener los datos de una cuenta con guid
app.get('/account/:guid', (req, res) => {
  const { guid } = req.params
  // Buscamos los detalles de la cuenta a traves del guild recibido por req.params
  const user = USERS_BBDD.find(user => user.guid === guid)
  // si no existe el usuario respondemos con un 404(not found)
  if (!user) return res.status(404).send('La cuenta no existe')
  // Si existe respondemos con los detalles de la cuenta
  return res.send(user)
})
// Crearuna nueva cuenta a partir de guid y del name
app.post('/account', (req, res) => {
  const {guid,name} = req.body
  const newUser = {guid,name}
  if(!guid||!name) return res.status(400).send('Error en el body')
  const user =USERS_BBDD.find(user => user.guid === guid)
  if(user) return res.status(409).send('La cuenta ya existe')
  USERS_BBDD.push({guid,name})
  return res.status(201).send(newUser)
})
// Actualizar el nombre de una cuenta
app.patch('/account/:guid', (req, res) => {
  const { guid } = req.params
  const { name } = req.body
  //Nos aseguramos que ha ingresado un nombre
  if (!name) return res.sendStatus(400)
  //busca al usuario por el guid
  const user = USERS_BBDD.find(user => user.guid === guid)
  //Si no lo encuentra mandamos un error 404
  if (!user) return res.status(404).send('El cliente no exite')
  //Modificamos el nombre de la base de datos con el introducido por body
  user.name = name
  //Enviamos respuesta Ok
  return res.send(user)
})
// Eliminar una cuenta
app.delete('/account/:guid', (req, res) => {
  const { guid } = req.params
  const userIndex = USERS_BBDD.findIndex(user => user.guid === guid)
  // Si no encuentra el guid nos devuelve un -1
  if (userIndex === -1) return res.sendStatus(404)
  // Eliminamos el indice de ese usuario del array
  USERS_BBDD.splice(userIndex, 1)
  // Respondemos con un status 200
  return res.sendStatus(200)
})
/** ----------------------------------------------------Final Endpoints---------------------------------------------------------------------------- */

app.listen(port, () => {
  console.log(pc.green(`🎸 Rocking at http://localhost:${port}`))
})
