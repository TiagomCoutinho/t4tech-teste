import express, { Express, Request, Response } from 'express'
import { initializeDatabase, populateDatabase, getPlayersFromDatabase, getPlayerByIdFromDatabase, deletePlayerByIdFromDatabase, updatePlayerByIdInDatabase } from './config/database'
import type { Player } from './utils/apiBallDontLie'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const app: Express = express()
app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}))
app.use(express.json())
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

app.put('/players/:id', (req: Request, res: Response) => {
  
  const playerId = parseInt(req.params.id)
  if (isNaN(playerId)) {
    return res.status(400).json({ error: 'Invalid player ID' })
  }

  const playerData = req.body
  const player: Player = {
    id: playerId,
    first_name: playerData.first_name || '',
    last_name: playerData.last_name || '',
    position: playerData.position || '',
    height: playerData.height || '',
    weight: playerData.weight || '',
    jersey_number: playerData.jersey_number || '',
    college: playerData.college || '',
    country: playerData.country || '',
    draft_year: playerData.draft_year || null,
    draft_round: playerData.draft_round || null,
    draft_number: playerData.draft_number || null,
    team: {
      full_name: playerData.team_name || ''
    }
  }

  if (!player) {
    return res.status(400).json({ error: 'Invalid player data' })
  }
  updatePlayerByIdInDatabase(playerId, player)
    .then(() => {
      res.status(200).json({ message: 'Player updated successfully' })
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal Server Error', message: error })
    })
})
  
  

app.listen(port, () => {
  console.log(`API is running on port ${port}`)
})