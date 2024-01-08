const http = require('node:http')
const { findAvailablePort } = require('./free-port')
const pc = require('picocolors')

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Primer servidor de Node')
})

findAvailablePort(3000).then(port => {
  server.listen(port, () => {
    console.log(pc.green(`✔ Listening on port http://localhost:${port}`))
  })
})
