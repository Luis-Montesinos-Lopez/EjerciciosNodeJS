const fs = require('node:fs')
const path = require('node:path')

// Extraemos el segundo argumento de process.argv (el directorio). utilizamos el operador nillish coalescing
// para que si se cumple se asigna el punto como directorio.
const folder = process.argv[1] ?? '.'
// node ls-advanced.js
console.log(folder)

async function ls (directory) {
  let files
  try {
    files = fs.readdir(directory)
  } catch (err) {
    console.error(`error al leer el directorio ${directory}`)
    process.exit(1)
  }

  const filesPromises = files.map(async file => {
    const filePath = path.join(directory, file)
    let stats
    try {
      stats = await fs.stat(filePath)
    } catch (err) {
      console.error(`error al leer el archivo${filePath}`, err)
      process.exit(1)
    };

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'
    const fileSize = stats.size.toString()
    const fileModified = stats.mtime.toLocalString()
    return `${fileType} ${file.padEnd(20)} ${fileSize.padStart(10)} ${fileModified}`
  })
  const filesInfo = await Promise.all(filesPromises)
  filesInfo.forEach(file => {
    console.log(file)
  })
}
ls(folder)
