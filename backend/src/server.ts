import express, { Express, Request, Response, NextFunction } from 'express'
import type { Player } from './utils/apiBallDontLie'
import { getPlayers } from './utils/apiBallDontLie'
import Database from 'better-sqlite3'

const app: Express = express()
const port:number = parseInt(process.env.PORT || '3000')
const db = new Database(process.env.NODE_ENV === 'test' ? ':memory:' : '/app/database/players.db')

db.exec(`
CREATE TABLE IF NOT EXISTS players (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  position TEXT NOT NULL,
  height TEXT NOT NULL,
  weight INTEGER NOT NULL,
  jersey_number INTEGER NOT NULL,
  college TEXT NOT NULL,
  country TEXT NOT NULL,
  draft_year INTEGER,
  draft_round INTEGER,
  draft_number INTEGER,
  team_name TEXT NOT NULL
);
`)
const populateDatabase = async (): Promise<void> => {
  const playersQuantity = db.prepare('SELECT COUNT(*) FROM players')
  const result = playersQuantity.get() as { count: number }
  if (result.count > 0) return console.info('Database already populated with players')

  try {
    const response = await getPlayers()
    const players: Player[] = response.data.data
    const insertPlayer = db.prepare("INSERT INTO players (first_name, last_name, position, height, weight, jersey_number, college, country, draft_year, draft_round, draft_number, team_name) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
    players.map((player) => {
      const { first_name, last_name, position, height, weight, jersey_number, college, country, draft_year, draft_round, draft_number } = player
      const team_name = player.team.full_name
      insertPlayer.run(first_name, last_name, position, height, weight, jersey_number, college, country, draft_year || null, draft_round || null, draft_number || null, team_name)
    })
    console.info('Database succesfully populated with players')
  }
  catch (error) {
    console.error('Error populating database:', error)
  }
}

populateDatabase()

//app.get('/api/players/:pagination?', (req, res) => {
app.get('/', (req: Request, res: Response) => {
  res.send('Startup api')
})

app.listen(port, () => {
  console.log(`API is running on port ${port}`)
})