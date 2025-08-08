import Testimonials from '../models/Testimonials.js'
import { ValidationError, DBConnectionError } from '../utilities/errors.js'

export async function validateUserInfo(req, res) {
  const { name, email, message } = req.body
  const isSomeInputEmpty = Object.values(req.body).some(value => value.trim() === '')

  if (isSomeInputEmpty) {
    try {
      const testimonials = await Testimonials.findAll()
      res.render('testimonials', {
        actualSection: 'Testimonials',
        errorMessage: new ValidationError('Oops... Seems you have some empty fields'),
        testimonials,
        name, email, message
      })
    } catch (error) {
      res.render('out-of-service', {
        errorMessage: new DBConnectionError('At this moment our site is experiencing some troubles, please come back later.')
      })
    }
  } else {
    validateName(req.body, res)
  }
}

async function validateName(userData, res) {
  const { name, email, message } = userData
  const nameRegex = /^[a-záéíóúñü]+(?:[-' ][a-záéíóúñü]+)*$/i
  const isValidName = nameRegex.test(name)

  if (!isValidName) {
    try {
      const testimonials = await Testimonials.findAll()
      res.render('testimonials', {
        actualSection: 'Testimonials',
        errorMessage: new ValidationError('Invalid Name'),
        testimonials,
        name, email, message
      })
    } catch (error) {
      res.render('out-of-service', {
        errorMessage: new DBConnectionError('At this moment our site is experiencing some troubles, please come back later.')
      })
    }
  } else {
    validateEmail(userData, res)
  }
}

async function validateEmail(userData, res) {
  const { name, email, message } = userData
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const isValidEmail = emailRegex.test(email)

  if (!isValidEmail) {
    try {
      const testimonials = await Testimonials.findAll()
      res.render('testimonials', {
        actualSection: 'Testimonials',
        errorMessage: new ValidationError('Invalid Email'),
        testimonials,
        name, email, message
      })
    } catch (error) {
      res.render('out-of-service', {
        errorMessage: new DBConnectionError('At this moment our site is experiencing some troubles, please come back later.')
      })
    }
  } else {
    validateMessage(userData, res)
  }
}

async function validateMessage(userData, res) {
  const { name, email, message } = userData
  const isValidMessage = message.length >= 10

  if (!isValidMessage) {
    try {
      const testimonials = await Testimonials.findAll()
      res.render('testimonials', {
        actualSection: 'Testimonials',
        errorMessage: new ValidationError('The message must contain 10 characters at least'),
        testimonials,
        name, email, message
      })
    } catch (error) {
      res.render('out-of-service', {
        errorMessage: new DBConnectionError('At this moment our site is experiencing some troubles, please come back later.')
      })
    }
  } else {
    handleTestimonialData(userData, res)
  }
}

async function handleTestimonialData(userData, res) {
  try {
    const { name, email, message } = userData
    const emailDuplicated = await Testimonials.findOne({ where: { email } })

    if (emailDuplicated) {
      const testimonials = await Testimonials.findAll()
      res.render('testimonials', {
        actualSection: 'Testimonials',
        errorMessage: new ValidationError('The email already exists'),
        testimonials,
        name, email, message
      })
    } else {
      createTestimonial(userData, res)
    }
  } catch (error) {
    res.render('out-of-service', {
      errorMessage: new DBConnectionError('At this moment our site is experiencing some troubles, please come back later.')
    })
  }
}

async function createTestimonial(userData, res) {
  try {
    const { name, email, message } = userData
    await Testimonials.create({ name, email, message })
    res.redirect('/testimonials')
  } catch (error) {
    res.render('out-of-service', {
      errorMessage: new DBConnectionError('At this moment our site is experiencing some troubles, please come back later.')
    })
  }
}
