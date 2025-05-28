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

const filter = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const columns = ref([
  { field: 'id', header: 'ID', sortable: true },
  { field: 'first_name', header: 'Full name', sortable: true }
])

const passthroughClasses = {
  root: { class: 'w-full' },
  table: { class: 'w-full table-auto border-collapse' },
  header: { class: 'bg-gray-100' },
  headerrow: { class: 'text-left' },
  bodyrow: { class: 'even:bg-slate-900' },
  paginator: {
    root: { class: 'flex justify-between p-4 bg-gray-100' },
    pagebutton: { class: 'px-3 py-1 border rounded hover:bg-gray-200' }
  }
}
</script>

<template class="datatable-players">
  <div>
    <InputText
      v-model="filter.global.value"
      placeholder="Search by name"
      class="border border-gray-300 p-2 rounded-md mb-4 w-full"
    />
    <DataTable
      :value="playersStore.getAllPlayers()"
      paginator
      :rows="25"
      :unstyled="true"
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
          <span class="whitespace-nowrap">Edit</span>
        </template>
        <template #body="{ data }">
          <button class="opacity-50 hover:opacity-100 cursor-pointer" @click="selectedPlayerStore.setId(data.id)">
            <IconEdit />
          </button>
        </template>
      </Column>
        <template #paginatorcontainer="{ first, last, page, pageCount, prevPageCallback, nextPageCallback, totalRecords }">
          <div class="flex items-center gap-4 w-full py-1 px-2 justify-around">
            <div class="flex gap-2">
              <button class="w-8 h-8 bg-white text-black rounded-full cursor-pointer" @click="prevPageCallback" :disabled="page === 0"><</button>
              <span class="hidden sm:block">Showing {{ first }} to {{ last }} of {{ totalRecords }}</span>
              <span class="block sm:hidden">Page {{ page + 1 }} of {{ pageCount }}</span>
              <button class="w-8 h-8 bg-white text-black rounded-full cursor-pointer" @click="nextPageCallback" :disabled="page === pageCount - 1">></button>
            </div>
          </div>
        </template>
    </DataTable>
  </div>
</template>