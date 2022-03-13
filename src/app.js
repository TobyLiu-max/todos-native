const http = require('http')
const mongoose = require('mongoose')
const router = require('./route/todo')

const hostname = 'localhost'
const port = 4000

const server = http.createServer(router)

mongoose.connect('mongodb://localhost:27017/zhifu').then(() => {
  server.listen(port, () => {
    console.log(`Server run at http://${hostname}:${port}`)
  })
}).catch((error) => {
  console.log('error', error)
})
