const { readFile } = require('node:fs/promises')
const funcion = async () => {
  try {
    console.log('Leyendo el primer archivo')
    const text = await readFile('./archivo.txt', 'utf-8')
    console.log('Primer archivo:', text)
    console.log('.....haciendo muchas cosas....')

    console.log('Leyendo el segundo archivo...')
    const textDos = await readFile('./archivo2.txt', 'utf-8')
    console.log('Segundo archivo:', textDos)
  } catch {
    console.error()
  }
}
funcion()
