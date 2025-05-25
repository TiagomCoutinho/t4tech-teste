import express, { Express, Request, Response, NextFunction } from 'express'
import { initializeDatabase, populateDatabase } from './config/database'
import dotenv from 'dotenv'
dotenv.config()

const app: Express = express()
const port:number = parseInt(process.env.PORT || '3000')

async function databaseSetup() {
  try {
    await initializeDatabase()
    await populateDatabase()
  } catch (error) {
    console.error('Error initializing or populating the database:', error)
    process.exit(1)
  }
}

databaseSetup()

app.get('/players', (req: Request, res: Response) => {
  res.send('Startup api')
})

app.listen(port, () => {
  console.log(`API is running on port ${port}`)
})