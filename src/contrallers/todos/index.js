const queryString = require('query-string')
const Todo = require('../../model/todo')

const getTodos = async (req, res) => {
  const todos = await Todo.find()
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  const data = {
    code: 200,
    total: todos.length,
    todos
  }
  res.end(JSON.stringify(data))
}

const addTodo = (req, res) => {
  let data = ''
  req.on('data', chunk => {
    data += chunk
  })
  req.on('end', async () => {
    data = queryString.parse(data)
    await Todo.create({
      name: data.name,
      description: data.description
    })
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    const result = {
      code: 200
    }
    res.end(JSON.stringify(result))
  })
}

const updateTodo = async (req, res) => {
  const id = req.params.id
  let data = ''
  req.on('data', chunk => {
    data += chunk
  })
  req.on('end', async () => {
    data = queryString.parse(data)
    await Todo.findByIdAndUpdate(id, { status: data.status })
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    const result = {
      code: 200
    }
    res.end(JSON.stringify(result))
  })
}

const deleteTodo = async (req, res) => {
  const id = req.params.id
  await Todo.findByIdAndDelete(id)
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  const data = {
    code: 200
  }
  res.end(JSON.stringify(data))
}

module.exports = {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo
}
