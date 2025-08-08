import DataTypes from 'sequelize'
import DB from '../config/db.js'

const Courses = DB.define('courses', {
  name: { type: DataTypes.STRING },
  price: { type: DataTypes.INTEGER },
  places: { type: DataTypes.INTEGER },
  image: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  slug: { type: DataTypes.STRING }
})

export default Courses
