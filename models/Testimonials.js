import DataTypes from 'sequelize'
import DB from '../config/db.js'

const Testimonials = DB.define('testimonials', {
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  message: { type: DataTypes.STRING }
})

export default Testimonials
