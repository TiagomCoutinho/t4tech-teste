import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Player } from '@/types/nbaTypes'

export const usePlayersStore = defineStore('players', () => {
  const players = ref<Player[]>([])

  function setPlayers(newPlayers: Player[]) {
		players.value = newPlayers
  }

  function getPlayerById(id: number) {
		return players.value.find(player => player.id === id)
  }

  function getAllPlayers() {
		return players.value
  }

	function deletePlayerById(id: number) {
		players.value = players.value.filter(player => player.id !== id)
	}

	function updatePlayerById(id: number, updatedPlayer: Player) {
		const index = players.value.findIndex(player => player.id === id)
		if (index !== -1) {
			return players.value[index] = updatedPlayer
		}
		console.error(`Player with id ${id} not found`)
	}

	async function fetchUpdatePlayerById(id: number, updatedPlayer: Player) {
		try {
			const response = await fetch(import.meta.env.VITE_BACKEND_API_URL + `players/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(updatedPlayer)
			})
			if (response.status === 200) {
				const playerData = await response.json()
				updatePlayerById(id, playerData)
			} else {
				console.error('Failed to update player:', response.statusText)
			}
		} catch (error) {
			console.error('Error updating player:', error)
		}
	}

	async function fetchDeletePlayerById(id: number) {
		try {
			const response = await fetch(import.meta.env.VITE_BACKEND_API_URL + `players/${id}`, {
				method: 'DELETE'
			})
			if (response.status === 200) {
				deletePlayerById(id)
			} else {
				console.error('Failed to delete player:', response.statusText)
			}
		} catch (error) {
			console.error('Error deleting player:', error)
		}
	}

  async function fetchAllPlayers() {
		try {
			const response = await fetch(import.meta.env.VITE_BACKEND_API_URL + 'players')
			if (response.status === 200) {
				const playersData = await response.json()
				setPlayers(playersData)
			} else {
				console.error('Failed to fetch players:', response.statusText)
			}
		} catch (error) {
			console.error('Error fetching players:', error)
		}
  }

  return { players, setPlayers, getPlayerById, getAllPlayers, fetchAllPlayers, fetchDeletePlayerById, fetchUpdatePlayerById }
})