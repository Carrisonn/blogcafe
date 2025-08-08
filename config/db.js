import Sequelize from 'sequelize'

process.loadEnvFile()

const DB = new Sequelize(process.env.DATABASE_URL, {
  define: { timestamps: false },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

export default DB
