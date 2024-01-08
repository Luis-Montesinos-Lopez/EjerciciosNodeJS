const express = require('express')
const app = express()
const port = 3000
const pc = require('picocolors')

app.get('/', (req, res) => {
  res.send('Holi mi gente!!')
})

app.listen(port, () => {
  console.log(pc.green(`💪 Conectado y escuchando en http://localhost:${port}!!`))
})
