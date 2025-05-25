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

  async function fetchPlayers() {
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

  return { players, setPlayers, getPlayerById, getAllPlayers, fetchPlayers }
})