<script setup lang="ts">
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { usePlayersStore } from '@/stores/players'
import IconEdit from '@/components/icons/IconEdit.vue'

const columns = ref([
  { field: 'id', header: 'ID', sortable: true },
  { field: 'first_name', header: 'Full name', sortable: true }
])

const playersStore = usePlayersStore()

const passthroughClasses = {
  root: { class: 'w-full' },
  table: { class: 'w-full table-auto'}
}

</script>

<template>
  <DataTable
    :value="playersStore.getAllPlayers()"
    paginator
    :rows="25"
    class="w-full table-auto"
    :pt="passthroughClasses"
  >
    <Column
      v-for="column in columns"
      :key="column.field"
      :field="column.field"
      :header="column.header"
      :sortable="column.sortable"
      v-slot:body="slotProps"
    >
      <template v-if="column.field === 'first_name'">
        {{ slotProps.data.first_name }} {{ slotProps.data.last_name }}
      </template>
      <template v-else>
        {{ slotProps.data[column.field] }}
      </template>
    </Column>
    <Column>
      <template #header>
        <span>Edit</span>
      </template>
      <template #body="{ data }">
        <button class="opacity-50 hover:opacity-100 cursor-pointer" @click="console.log('Edit', data.id)">
          <IconEdit />
        </button>
      </template>
    </Column>
  </DataTable>
</template>