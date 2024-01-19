const checkEmailPassword = require('../utils/checkEmailPassword');
const public = (req, res) => {
    res.send('Endpoint Público')
  };
const autenticado = async (req, res) => {
    const { email, password } = req.body
    try {
      const user = await checkEmailPassword(email, password)
      return res.send(`Usuario ${user.name} autenticado`)
    } catch (err) {
      return res.sendStatus(401)
    }
  };

  const autorizado = async (req, res) => {
    const { email, password } = req.body
    try {
      const user = await checkEmailPassword(email, password)
      console.log(user)
      if (user.role !== 'admin') return res.sendStatus(403)
      return res.send(`Usuario administrador ${user.name}`)
    } catch (err) {
      return res.sendStatus(401)
    }
  };

  module.exports = {public, autenticado, autorizado};