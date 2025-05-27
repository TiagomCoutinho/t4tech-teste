<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { usePlayersStore } from '@/stores/players'

const playersStore = usePlayersStore()
</script>

<template>
  <DataTable :value="playersStore.getAllPlayers()" paginator :rows="25" class="w-full table-auto">
    <Column field="id" sortable header="ID" class="alou-id" />
    <Column field="first_name" sortable header="First Name" />
    <Column field="last_name" header="Last Name" />
  </DataTable>
</template>