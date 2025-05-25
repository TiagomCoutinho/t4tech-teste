import express, { Express, Request, Response, NextFunction } from 'express'
import { initializeDatabase, populateDatabase, getPlayersFromDatabase, getPlayerByIdFromDatabase, deletePlayerByIdFromDatabase } from './config/database'
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
  getPlayersFromDatabase()
    .then(players => {
      res.json(players)
    })
    .catch(error => {
      console.error('Error fetching players from database:', error)
      res.status(500).send('Internal Server Error')
    })
})

app.get('/players/:id', (req: Request, res: Response) => {
  const playerId = parseInt(req.params.id)
  if (isNaN(playerId)) {
    return res.status(400).json({ error: 'Invalid player ID' })
  }

  getPlayerByIdFromDatabase(playerId)
    .then(player => {
      if (!player) {
        return res.status(404).json({ error: 'Player not found' })
      }
      res.json(player)
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal Server Error' })
    })
})

app.delete('/players/:id', (req: Request, res: Response) => {
  const playerId = parseInt(req.params.id)
  if (isNaN(playerId)) {
    return res.status(400).json({ error: 'Invalid player ID' })
  }

  deletePlayerByIdFromDatabase(playerId)
    .then(() => {
      res.status(204).json({ message: 'Player deleted successfully' })
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal Server Error' })
    })
})

  
  

app.listen(port, () => {
  console.log(`API is running on port ${port}`)
})