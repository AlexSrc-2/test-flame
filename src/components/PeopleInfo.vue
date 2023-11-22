<template>
  <h2>People #{{ people.id }}</h2>
  <button v-if="isFavorite" class="btn btn-dark btn-favorite" @click="removeFromFavorites">
    <i class="bi bi-heart-fill"></i>
  </button>
  <button v-else class="btn btn-dark btn-favorite" @click="addToFavorites">
    <i class="bi bi-heart"></i>
  </button>
  <hr />
  <table class="table table-striped">
    <thead>
      <tr>
        <th>
          Props
        </th>
        <th>
          Values
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="([fieldName, value]) in Object.entries(people)" :key='fieldName'>
        <th scope="row">{{ fieldName }}</th>
        <td>{{ formatValue(value) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import People from '@/models/People'
import { computed, defineComponent } from 'vue'
import store from '@/store'

interface PeopleRowProps {
  people: People
}

export default defineComponent({
  name: 'PeopleInfo',
  props: {
    people: {} as People
  },
  setup(props: PeopleRowProps) {
    const isFavorite = computed(() => store.getters.userIsFavorite(props.people.id))

    function formatValue(value: string|string[]): string {
      if (Array.isArray(value)) {
        return value.join(', ')
      }

      return value
    }

    async function addToFavorites() {
      await store.dispatch('addToFavorite', props.people)
    }

    async function removeFromFavorites() {
      await store.dispatch('removeFromFavorites', props.people.id)
    }

    return {
      isFavorite,
      formatValue,
      addToFavorites,
      removeFromFavorites
    }
  }
} as any)
</script>
<style scoped>
.btn-favorite {
  position: absolute;
  top: 15px;
  right: 0;
}
</style>
