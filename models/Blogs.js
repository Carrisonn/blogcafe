import DataTypes from 'sequelize'
import DB from '../config/db.js'

const Blogs = DB.define('blogs', {
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  slug: { type: DataTypes.STRING },
  image: { type: DataTypes.INTEGER }
})

export default Blogs
