import express from 'express'
import { validateUserInfo } from '../controllers/testimonialController.js'
import { renderHome, renderArticle, renderAboutUs, renderCourses, renderCourse, renderTestimonials } from '../controllers/paginationController.js'

const router = express.Router()

router.get('/', renderHome)
router.get('/article/:slug', renderArticle)
router.get('/about-us', renderAboutUs)
router.get('/courses', renderCourses)
router.get('/courses/:slug', renderCourse)
router.get('/testimonials', renderTestimonials)
router.post('/testimonials', validateUserInfo)

export default router
