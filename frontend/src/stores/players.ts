import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Player } from '@/types/nbaTypes'
import axios from 'axios'

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
			const response = await axios.put(`${import.meta.env.VITE_BACKEND_API_URL}players/${id}`, updatedPlayer)
			if (response.status === 200) {
				updatePlayerById(id, response.data)
			} else {
				console.error('Failed to update player:', response.statusText)
			}
		} catch (error) {
			console.error('Error updating player:', error)
		}
	}

	async function fetchDeletePlayerById(id: number) {
		try {
			const response = await axios.delete(`${import.meta.env.VITE_BACKEND_API_URL}players/${id}`)
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
			const response = await axios.get(import.meta.env.VITE_BACKEND_API_URL + 'players')
			if (response.status === 200) {
				setPlayers(response.data)
			} else {
				console.error('Failed to fetch players:', response.statusText)
			}
		} catch (error) {
			console.error('Error fetching players:', error)
		}
  }

  return { setPlayers, getPlayerById, getAllPlayers, fetchAllPlayers, fetchDeletePlayerById, fetchUpdatePlayerById }
})

export const useSelectedPlayerStore = defineStore('selectedPlayer', () => {
	const selectedPlayerId = ref<number | null>(null)

	function setId(id: number | null) {
		selectedPlayerId.value = id
	}
	function getId() {
		return selectedPlayerId.value
	}

	return { setId, getId }
})