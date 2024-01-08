const http = require('node:http')
// const host = '127.0.0.1'
const port = 3000
const pc = require('picocolors')

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Primer servidor con node')
})

server.listen(port, () => {
  console.log(pc.green(`✔ Servidor corriendo en http://localhost:${port}`))
})
