const fs = require('node:fs')
console.log('leyendo el primer archivo...')
fs.readFile('./archivo.txt', 'utf-8', (err, data) => {
  if (err) throw err
  console.log('primer archivo:', data)
})

console.log('......haciendo muchas cosas')

fs.readFile('./archivo2.txt', 'utf-8', (err, data) => {
  if (err) throw err
  console.log('segundo archivo:', data)
})
