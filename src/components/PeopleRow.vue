<template>
  <tr>
    <td> <router-link :to="`/peoples/${people.id}`">{{ people.id }}</router-link></td>
    <td v-for="row in Object.keys(needRows)" :key='row'>{{ people[row] }}</td>
    <td class="min-width-column">
      <button v-if="isFavorite" class="btn btn-dark" @click="removeFromFavorites">
        <i class="bi bi-heart-fill"></i>
      </button>
      <button v-else class="btn btn-dark" @click="addToFavorites">
        <i class="bi bi-heart"></i>
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import People from '@/models/People'
import { computed, defineComponent } from 'vue'
import store from '@/store'

interface PeopleRowProps {
  people: People,
  needRows: string[]
}

export default defineComponent({
  name: 'PeopleRow',
  props: {
    people: {} as People,
    needRows: [] as string[]
  },
  setup(props: PeopleRowProps) {
    const isFavorite = computed(() => store.getters.userIsFavorite(props.people.id))

    async function addToFavorites() {
      await store.dispatch('addToFavorite', props.people)
    }

    async function removeFromFavorites() {
      await store.dispatch('removeFromFavorites', props.people.id)
    }

    return {
      isFavorite,
      addToFavorites,
      removeFromFavorites
    }
  }
} as any)
</script>
<style scoped>
</style>
