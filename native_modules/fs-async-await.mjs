import { readFile } from 'node:fs/promises'

console.log('Leyendo el primer archivo')
const text = await readFile('./archivo.txt', 'utf-8')
console.log('Primer archivo', text)

console.log('....Haciendo muchas cosas....')

console.log('Leyendo el segundo archivo')
const textDos = await readFile('./archivo2.txt', 'utf-8')
console.log('Segudno archivo:', textDos)
