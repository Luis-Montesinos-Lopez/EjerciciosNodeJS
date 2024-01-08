const checkEmailPassword = require('../utils/checkEmailPassword');
const {SignJWT, jwtVerify} = require('jose');
const findUserToken = require('../utils/findUser');

const login = async (req, res) => {
    const {email, password} = req.body;
    console.log(email,password);
    if(!email || !password){
        return res.sendStatus(400);
    };
    try{
        const {guid} =  await checkEmailPassword(email,password);
        console.log(guid)
        const jwtConstructor = new SignJWT({guid});

        const encoder = new TextEncoder();

        const jwt = await jwtConstructor.
        setProtectedHeader({alg: 'HS256', typ :'JWT'})
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(encoder.encode(process.env.JWT_SECRET));

        console.log(jwt);

        return res.send({jwt})

    }catch(err){

        return res.sendStatus(401)
    }
};

const profile = async (req, res) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.sendStatus(400);
    }
    try{
        const token = authorization.split(" ")[1];
        const encoder = new TextEncoder();

        const {payload} = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_SECRET));

            const user = findUserToken(payload);

            if(!user){
                return res.send(401);
            }
           
            return res.send(user);

    }catch(err){
        return res.sendStatus(401);
    }


}

module.exports= {login,profile};