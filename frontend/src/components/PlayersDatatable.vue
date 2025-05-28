<script setup lang="ts">
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import IconEdit from '@/components/icons/IconEdit.vue'
import { FilterMatchMode } from '@primevue/core/api'
import { usePlayersStore, useSelectedPlayerStore } from '@/stores/players'

const playersStore = usePlayersStore()
const selectedPlayerStore = useSelectedPlayerStore()

const globalFilter = ref('')

const filter = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const columns = ref([
  { field: 'id', header: 'ID', sortable: true },
  { field: 'first_name', header: 'Full name', sortable: true }
])

const passthroughClasses = {
  root: { class: 'w-full' },
  table: { class: 'w-full table-auto'}
}

</script>

<template class="datatable-players">
  <div>
    <InputText
      v-model="filter.global.value"
      placeholder="Search by name"
    />
    <DataTable
      :value="playersStore.getAllPlayers()"
      paginator
      :rows="25"
      class="w-full table-auto"
      :pt="passthroughClasses"
      :globalFilterFields="['first_name', 'last_name']"
      v-model:filters="filter"
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
          <button class="opacity-50 hover:opacity-100 cursor-pointer" @click="selectedPlayerStore.setId(data.id)">
            <IconEdit />
          </button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>