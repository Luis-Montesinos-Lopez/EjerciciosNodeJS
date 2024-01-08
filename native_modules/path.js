const path = require('node:path')
// barra separadore de directorios según el sistema operativo
console.log(path.sep)

// unir las rutas con path.join()
const filePath = path.join('content', 'subfolder', 'archivo.txt')
console.log(filePath)

const base = path.basename('./archivo.txt', '.txt')
console.log(base)

const extension = path.extname('./archivo2.txt')
console.log(extension)
