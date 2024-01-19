/**Importamos los modulos*/
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config()
const logger = require('morgan')
const cookieParser = require('cookie-parser');
const path = require('path')
const pc = require('picocolors');
const fileUpload = require('express-fileupload')
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productRouter');
const port = process.env.PORT;
/**Middleweares */
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:false}))
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.use(
    fileUpload({
        createParentPath: true,
        limits:{fieldSize:20 * 1024 * 1024},
        abortOnLimit: true,
        responseOnLimits: "Imagen demasiado grande",
        uploadTimeout:0,
        })
);
/**Rutas */
app.use('/users',usersRouter);
app.use('/products', productsRouter);

/*Levantamos el servidor*/
app.listen(port, ()=>{
    console.log(pc.cyan(pc.italic(pc.bold(`✅ Server Up and listen on ${port}`))))
});