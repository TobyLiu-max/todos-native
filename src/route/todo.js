const url = require('url')
const { match } = require('path-to-regexp')
const contrallers = require('../contrallers/todos')

const { getTodos, addTodo, updateTodo, deleteTodo } = contrallers

function router (req, res) {
  const method = req.method
  const pathname = url.parse(req.url, true).pathname
  const deleteRegex = match('/delete-todo/:id', { decode: decodeURIComponent })
  const updateRegex = match('/edit-todo/:id', { decode: decodeURIComponent })
  const deletePathname = deleteRegex(pathname)?.params
  const updataPathname = updateRegex(pathname)?.params
  if (pathname === '/todos' && method === 'GET') {
    getTodos(req, res)
    return
  }
  if (pathname === '/add-todo' && method === 'POST') {
    addTodo(req, res)
    return
  }
  if (updataPathname?.id && method === 'PUT') {
    req.params = {
      id: updataPathname.id
    }
    updateTodo(req, res)
    return
  }
  if (deletePathname?.id && method === 'DELETE') {
    req.params = {
      id: deletePathname.id
    }
    deleteTodo(req, res)
    return
  }
  res.statusCode = 404
  res.setHeader('Content-Type', 'text/plan')
  res.end('not found')
}

module.exports = router
