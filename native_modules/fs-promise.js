const fs = require('node:fs/promises')
console.log('Leyendo el primer archivo....')
fs.readFile('./archivo.txt', 'utf8')
  .then((data) => {
    console.log('Primer archivo:', data)
  }).catch((err) => {
    console.error(err)
  })

console.log('....Haciendo cosas mientras leemos los archivos')

console.log('Leyendo el segudno archivo...')
fs.readFile('./archivo2.txt', 'utf-8')
  .then((data) => {
    console.log('Segundo archivo:', data)
  }).catch((err) => {
    console.error(err)
  })
