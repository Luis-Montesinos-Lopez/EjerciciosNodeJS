const productsQuerys = require("../MysqlQuerys/productsQuerys");

let productsDao={};

productsDao.addProductImage = async (imageData) => await productsQuerys.addProductImage(imageData);
productsDao.getPathById = async (id) => await productsQuerys.getPathById(id);

module.exports = productsDao;