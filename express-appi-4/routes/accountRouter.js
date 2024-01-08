const express = require('express')
const accountRouter = express.Router()
const {userGuid,regUser,updateUser,deleteUser} = require('../controllers/accountControllers');
const pc = require('picocolors')

/** ----------------------------------------------Endpoints de account---------------------------------------------------------------------------- */
accountRouter.use((req, res, next) => {
  console.log(pc.cyan('Enable middleware in account'))
  next()
})
// Obtener los datos de una cuenta con guid
accountRouter.get('/:guid', userGuid);
// Crearuna nueva cuenta a partir de guid y del name
accountRouter.post('/', regUser);
// Actualizar el nombre de una cuenta
accountRouter.patch('/:guid',updateUser);
// Eliminar una cuenta
accountRouter.delete('/:guid',deleteUser );
/** ----------------------------------------------------Final Endpoints---------------------------------------------------------------------------- */
module.exports = accountRouter
