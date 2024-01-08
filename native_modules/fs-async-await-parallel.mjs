import { readFile } from 'node:fs/promises'
Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8')
]).then(([text, textDos]) => {
  console.log('Primer archivo:', text)
  console.log('Segudno archivo:', textDos)
}).catch((error) => {
  console.error(error)
})
