import express from 'express'
import DB from './config/db.js'
import router from './router/index.js'
import { DBConnectionError, NotFoundError } from './utilities/errors.js'

const app = express()

const PORT = process.env.PORT ?? 8080

DB.authenticate()
  .catch(() => app.use((req, res) => res.render('out-of-service', {
    errorMessage: new DBConnectionError('At this moment our site is experiencing some troubles, please come back later.')
  })))

app.set('view engine', 'pug')

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.locals.websiteName = 'Blog Cafe'
  res.locals.header = 'header'
  res.locals.footer = 'footer'
  next()
})

app.use('/', router)

app.use((req, res) => res.render('404', { errorMessage: new NotFoundError('Page not found') }))

app.listen(PORT)
