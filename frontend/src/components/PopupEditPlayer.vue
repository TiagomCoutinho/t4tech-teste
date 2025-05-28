<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useSelectedPlayerStore, usePlayersStore } from '@/stores/players'
import type { Player } from '@/types/nbaTypes'
import InputText from 'primevue/inputtext'

import { useToast } from 'primevue/usetoast';

const toast = useToast();

const playersStore = usePlayersStore()
const selectedPlayerStore = useSelectedPlayerStore()
const playerData: Player | null = ref(() => {
	return selectedPlayerStore.getId() ? playersStore.getPlayerById(selectedPlayerStore.getId()) : null
})

const formInputs = ref({
	id: null,
	first_name: '',
	last_name: '',
	position: '',
	height: '',
	weight: '',
	jersey_number: '',
	college: '',
	country: '',
	draft_year: '',
	draft_round: '',
	draft_number: '',
	team: {
		full_name: ''
	}
})

watch(
  () => selectedPlayerStore.selectedPlayerId,
  (newId) => {
    const newPlayerData = newId ? playersStore.getPlayerById(newId) : null
    playerData.value = newPlayerData
    if (newPlayerData) {
      formInputs.value = JSON.parse(JSON.stringify({
				id: newId,
        first_name: newPlayerData.first_name || '',
        last_name: newPlayerData.last_name || '',
        position: newPlayerData.position || '',
        height: newPlayerData.height || '',
        weight: newPlayerData.weight || '',
        jersey_number: newPlayerData.jersey_number || '',
        college: newPlayerData.college || '',
        country: newPlayerData.country || '',
        draft_year: newPlayerData.draft_year || '',
        draft_round: newPlayerData.draft_round || '',
        draft_number: newPlayerData.draft_number || '',
        team: {
					full_name: newPlayerData.team_name || ''
				},
      }))
    } else {
      formInputs.value =  JSON.parse(JSON.stringify({
				id: null,
        first_name: '',
        last_name: '',
        position: '',
        height: '',
        weight: '',
        jersey_number: '',
        college: '',
        country: '',
        draft_year: '',
        draft_round: '',
        draft_number: '',
        team: {
					full_name: ''
				},
      }))
    }
  },
  { immediate: true }
)

const updatePlayerData = () => {
	if (!selectedPlayerStore.getId()) return
	playersStore.fetchUpdatePlayerById(parseInt(selectedPlayerStore.getId()), formInputs.value)
}

const deletePlayerData = () => {
	if (!selectedPlayerStore.getId()) return
	isDeletePlayerModalActive.value = false
	playersStore.fetchDeletePlayerById(parseInt(selectedPlayerStore.getId()))
}

const isDeletePlayerModalActive = ref(false)

</script>

<template>
  <div
    v-if="selectedPlayerStore.getId()"
    class="popup-edit-player fixed top-0 left-0 w-full h-full"
  >
    <div class="w-full h-full bg-black opacity-50 absolute top-0 left-0" @click="selectedPlayerStore.setId(null)"></div>
    <div class="max-w-[600px] w-full absolute top-[50%] left-[50%] bg-white rounded-md -translate-1/2 text-black py-4 px-8">
      <div class="font-bold text-xl mb-4">Edit player details</div>
      <div class="flex gap-4 mb-4">
        <div class="flex-1">
          First name
          <InputText
            v-model="formInputs.first_name"
            placeholder="First name"
            class="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div class="flex-1">
          Last name
          <InputText
            v-model="formInputs.last_name"
            placeholder="Last name"
            class="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
      </div>
      <div class="flex gap-4 mb-4">
        <div class="flex-1">
          Position
          <InputText
            v-model="formInputs.position"
            placeholder="Position"
            class="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div class="flex-1">
          Height
          <InputText
            v-model="formInputs.height"
            placeholder="Height"
            class="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
      </div>
      <div class="flex gap-4 mb-4">
        <div class="flex-1">
          Weight
          <InputText
            v-model="formInputs.weight"
            placeholder="Weight"
            class="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div class="flex-1">
          Jersey number
          <InputText
            v-model="formInputs.jersey_number"
            placeholder="Jersey number"
            class="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
      </div>
      <div class="flex gap-4 mb-4">
        <div class="flex-1">
          College
          <InputText
            v-model="formInputs.college"
            placeholder="College"
            class="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div class="flex-1">
          Country
          <InputText
            v-model="formInputs.country"
            placeholder="Country"
            class="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
      </div>
      <div class="flex gap-4 mb-4">
        <div class="flex-1">
          Draft year
          <InputText
            v-model="formInputs.draft_year"
            placeholder="Draft year"
            class="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div class="flex-1">
          Draft round
          <InputText
            v-model="formInputs.draft_round"
            placeholder="Draft round"
            class="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
      </div>
      <div class="flex gap-4 mb-4">
        <div class="flex-1">
          Draft number
          <InputText
            v-model="formInputs.draft_number"
            placeholder="Draft number"
            class="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div class="flex-1">
          Team
          <InputText
            v-model="formInputs.team.full_name"
            placeholder="Team"
            class="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
      </div>
			<div class="flex gap-4 text-center text-white">
				<div class="grow-1 bg-blue-800 rounded-md cursor-pointer p-2" @click="updatePlayerData()">Save Changes</div>
				<div class="grow-1 bg-red-800 rounded-md cursor-pointer p-2" @click="isDeletePlayerModalActive = !isDeletePlayerModalActive">Delete player</div>
			</div>
			<div v-if="isDeletePlayerModalActive" class="absolute w-full h-full bg-white text-black top-0 left-0 rounded-md p-8 flex justify-between flex-col">
				<div class="grow-1 flex flex-col justify-center">
					<div class="text-2xl">Are you sure you want to delete {{ formInputs.first_name }} {{ formInputs.last_name }}?</div>
					<p>This action is irreversible</p>
				</div>
				<div class="flex flex-col gap-4">
					<div class="grow-1 bg-red-800 rounded-md cursor-pointer p-2 text-white" @click="deletePlayerData()">Yes, Delete player</div>
					<div class="grow-1 bg-white rounded-md border-1 cursor-pointer p-2" @click="isDeletePlayerModalActive = !isDeletePlayerModalActive">
						No, go back
					</div>
				</div>
			</div>
    </div>
  </div>
</template>