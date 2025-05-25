import sqlite3 from 'sqlite3'
import type { Database } from 'sqlite3'
import type { Player } from '../utils/apiBallDontLie'
import { getPlayers } from '../utils/apiBallDontLie'

export const db: Database = new sqlite3.Database(process.env.NODE_ENV === 'test' ? ':memory:' : 'src/config/players.db')

export const initializeDatabase = (): Promise<void> => {
	return new Promise((resolve, reject) => {
		db.serialize(() => {
			db.run(`
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
			`, (error: Error | null) => {
				if (error) {
					console.error('Error creating players table:', error)
					return reject(error)
				}
				console.info('Players table created or already exists')
				resolve()
			})
		})
	})
}

export const populateDatabase = async (): Promise<void> => {
	const playersQuantity = await new Promise<number>((resolve, reject) => {
		db.get('SELECT COUNT(*) FROM players', (error: Error | null, row: { count: number }) => {
			if (error) {
				console.error('Error counting players:', error)
				return reject(error)
			}
			resolve(row.count)
		})
	})

	if (playersQuantity > 0) {
		console.info('Database already populated with players')
		return
	}

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