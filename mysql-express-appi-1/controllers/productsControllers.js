const productsDao = require("../services/Dao/productsDao");
const path = require("path");

let products={};
products.getPathById = async (req, res) => {
    try {
        const id = req.params.id
        let product = await productsDao.getPathById(id)
        if(product.length <=0){
            return res.status(404).send('Producto no encontrado')
        }
        [product]=product
        return res.status(200).send(product)
        
    } catch (e) {
        return res.status(500).send(e.message)
    }
}
products.addProductImage = async (req, res) => {
    console.log(req.files)
try {
if(req.files === null){
    return
}
if(!req.files || Object.keys(req.files).length === 0){
    return res.status(400).send('No se ha encontrado ningún archivo')
};
const images = !req.files.imagen.length ? [req.files.imagen] : req.files.imagen;
for(const image of images){
    let uploadPath = path.join(__dirname, "../public/product/" + image.name);
    image.mv(uploadPath, (e) => {
        if(e){
            return res.status(500).send(e.message)
        }
    });
    await productsDao.addProductImage({name:image.name, path:uploadPath})
};
return res.status(201).send("Imagenes guardadas!!");
} catch (e) {
    return res.status(400).send(e.message);    
};
}

module.exports = products;