<script lang="ts" setup>
import { ref } from 'vue'
import { useSelectedPlayerStore, usePlayersStore } from '@/stores/players'
import type { Player } from '@/types/nbaTypes'
const playersStore = usePlayersStore()
const selectedPlayerStore = useSelectedPlayerStore()
const playerData: Player | null = ref(() => {
	return selectedPlayerStore.getId() ? playersStore.getPlayerById(selectedPlayerStore.getId()) : null
})
</script>

<template>
  <div
		:class="{ 'opacity-100': playerData() }"
		class="popup-edit-player opacity-0"
	>
		Wada wada
	</div>
</template>