import express from 'express'

const router = express.Router()

router.get('/', (_req, res) => {
  res.render('home')
})

router.get('/test', (_req, res) => {
  res.render('test')
})

export default router
