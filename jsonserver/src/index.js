/**
 * json-server.index.js
 */
const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const jsonServer = require('json-server')
const middlewares = jsonServer.defaults({ watch : true })

const server = jsonServer.create()
const port = 3002

function simpleAuth(req, res, next) {

  if (req.headers.authorization == '1234') {

    // continue doing json-server magic
    next();

  } else {
    // it is not recommended in REST APIs to throw errors,
    // instead, we send 401 response with whatever errors
    // we want to expose to the client
    res.status(401).send({error: 'unauthorized'})
  }
}

server.use(middlewares)

server.use(simpleAuth)


server.use(jsonServer.rewriter({
  //"/assets/1/assetfiles": "/assets"
}))

let obj = {}
let files = fs.readdirSync(path.resolve(__dirname, '../db/'))

files.forEach((file) => {
  if (file.indexOf('.json') > -1) {
    _.extend(obj, require(path.resolve(__dirname, '../db/', file)))
  }
})

const router = jsonServer.router(obj)


router.render = (req, res) => {
  // We only return the inside body of the json.
  var response = res.locals.data;
  res.jsonp(response[0])
}


server.use(router)

server.listen(port, () => {
  console.log(`JSON Server is running at ${port}`)
})
