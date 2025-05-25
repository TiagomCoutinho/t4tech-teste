<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView, RouterLink } from 'vue-router'

import { usePlayersStore } from '@/stores/players'
onMounted(() => {
  const playersStore = usePlayersStore()
  playersStore.fetchPlayers()
})
</script>

<template>
  <header class="h-16 content-center border-white border-b-1 bg-slate-900">
    <div class="max-w-7xl mx-auto flex justify-between items-center px-2">
      <RouterLink to="/">
        <h1 class="text-2xl font-bold">NBA <span class="text-xl text-gray-400">Player list</span></h1>
      </RouterLink>
      <nav class="flex">
        <RouterLink to="/" class="py-4 px-2 hover:text-gray-400">Home</RouterLink>
        <RouterLink to="/about" class="py-4 px-2 hover:text-gray-400">About</RouterLink>
      </nav>
    </div>
  </header>
  <div class="max-w-7xl mx-auto p-2">
    <RouterView />
  </div>
</template>
