import yoga from 'graphql-yoga'
import express from 'express'
import cookieParser from 'cookie-parser'
import resolvers from './resolvers.mjs'
import pages from './routes/pages.mjs'

const { static: expressStatic } = express
const { GraphQLServer } = yoga
const server = new GraphQLServer({
  context: req => ({ req: req.request }),
  resolvers,
  typeDefs: './server/typeDefs.graphql'
})

server.express.set('view engine', 'ejs')
server.express.use(expressStatic('public'))
server.express.use(cookieParser())

server.express.use((_req, res, next) => {
  res.pageData = {
    config: {}
  }

  next()
})

server.express.use('/', pages)

const serverOptions = {
  endpoint: '/graphql',
  playground: '/playground',
  port: process.env.PORT || 3000
}

server.start(serverOptions, ({ port }) => console.info(`Server is running on localhost:${port}`))
