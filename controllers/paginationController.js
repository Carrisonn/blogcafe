import Courses from '../models/Courses.js'
import Testimonials from '../models/Testimonials.js'
import Blogs from '../models/Blogs.js'
import { DBConnectionError, NotFoundError } from '../utilities/errors.js'

async function renderHome(req, res) {
  try {
    const infoDB = [Blogs.findAll(), Courses.findAll({ limit: 3 })]
    const [articles, courses] = await Promise.all(infoDB)
    res.render('home', {
      actualSection: 'Home',
      articles,
      courses
    })
  } catch (error) {
    res.render('out-of-service', {
      errorMessage: new DBConnectionError('At this moment our site is experiencing some troubles, please come back later.')
    })
  }
}

async function renderArticle(req, res) {
  try {
    const { slug } = req.params
    const article = await Blogs.findOne({ where: { slug } })
    if (!article) return res.render('404', { errorMessage: new NotFoundError('Article not found') })
    const { name, description, image } = article
    res.render('article', {
      actualSection: name,
      name,
      description,
      image
    })
  } catch (error) {
    res.render('out-of-service', {
      errorMessage: new DBConnectionError('At this moment our site is experiencing some troubles, please come back later.')
    })
  }
}

function renderAboutUs(req, res) {
  res.render('about-us', {
    actualSection: 'About Us'
  })
}

async function renderCourses(req, res) {
  try {
    const courses = await Courses.findAll()
    res.render('courses', {
      actualSection: 'Courses',
      courses
    })
  } catch (error) {
    res.render('out-of-service', {
      errorMessage: new DBConnectionError('At this moment our site is experiencing some troubles, please come back later.')
    })
  }
}

async function renderCourse(req, res) {
  try {
    const { slug } = req.params
    const course = await Courses.findOne({ where: { slug } })
    if (!course) return res.render('404', { errorMessage: new NotFoundError('Course not found') })
    const { name, price, image, description, places } = course
    res.render('course', {
      actualSection: name,
      name, price, image, description, places
    })
  } catch (error) {
    res.render('out-of-service', {
      errorMessage: new DBConnectionError('At this moment our site is experiencing some troubles, please come back later.')
    })
  }
}

async function renderTestimonials(req, res) {
  try {
    const testimonials = await Testimonials.findAll()
    res.render('testimonials', {
      actualSection: 'Testimonials',
      testimonials
    })
  } catch (error) {
    res.render('out-of-service', {
      errorMessage: new DBConnectionError('At this moment our site is experiencing some troubles, please come back later.')
    })
  }
}

export {
  renderHome,
  renderArticle,
  renderAboutUs,
  renderCourses,
  renderCourse,
  renderTestimonials
}
