const checkEmailPassword = require('../utils/checkEmailPassword');
const findUser = require('../utils/findUser');
const { v4: uuidv4} = require('uuid');
const sessions = [];
//solicitud para autenticar un usuario, crear una sesion y enviarla por la cabecera de la cookie
const login = async (req, res) =>{
    //obtenemos el email y password del body
    const {email,password} = req.body;
    if(!email || !password){
        console.log('No ha introducido nada')
        //si no exixsten alguno de los campos devolvemos un 400(bad request)
        return res.sendStatus(400);
    }
    
    try{
        //validamos el email y el password y obtenemos el guid
          const {_id} = await checkEmailPassword(email, password);
          //generamos un identificador
          const sessionId = uuidv4();
          console.log(sessionId);
          //añadimos el sessionId y el guid del usuario al array
          sessions.push({sessionId, _id})
          //escribimos en la cookie el sessionId con la opcion httpOnly
          res.cookie('sessionId', sessionId, {httpOnly:true})
          console.log('Usuario encontrado')
          console.log(sessions)
          //Si todo es correcto enviamos un 200 OK
          return res.sendStatus(200);
    }catch(err){
        //Si el usuario no existe enviamos un 401(unauthorized)
        return res.sendStatus(401);
    }; 
   
};

//Solicitud autenticada con sesión para obtener perfil del usuario
const profile = async (req, res) => {
    //Obtenemos la cookie que recibimos
    const {cookies} = req;
    console.log(cookies)
    //Si la cookie no existe enviamos un 401(unauthorized)
    if(!cookies.sessionId){
        return res.sendStatus(401);
    };

    const userSession = sessions.find((session)=>session.sessionId===cookies.sessionId);
    console.log(userSession)
    if(!userSession){
        return res.sendStatus(401)
    }
    const user =  await findUser(userSession);
    if(!user){
        return res.sendStatus(401);
    }
    delete user.password;
    return res.send(user);
}

module.exports={login,profile};