import { createServer } from '@graphql-yoga/node'
import express from 'express'
import cookieParser from 'cookie-parser'
import resolvers from './resolvers.mjs'
import pages from './routes/pages.mjs'

const app = express()
const { static: expressStatic } = express
const graphQLServer = createServer({
  context: req => ({ req: req.request }),
  schema: {
    resolvers,
    typeDefs: './server/typeDefs.graphql'
  }
})

app.set('view engine', 'ejs')
app.use(expressStatic('public'))
app.use(cookieParser())

app.use((_req, res, next) => {
  res.pageData = {
    config: {}
  }

  next()
})

app.use('/', pages)
app.use('/graphql', graphQLServer)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.info(`Server is running on localhost:${PORT}`)
})

// const serverOptions = {
//   endpoint: '/graphql',
//   playground: '/playground',
// }
