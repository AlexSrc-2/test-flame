<template>
  <div class="position-relative">
    <div class="input-group mb-3">
      <input
          v-model="textSearch"
          type="text"
          class="form-control"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon2"
          @focusin="focused = true"
          @focusout="focused = false"
          @input="searchPeoplesByText"
      >
      <span class="input-group-text" id="basic-addon2">
        <i class="bi bi-search"></i>
      </span>
    </div>
    <div class="search-dropdown" v-if="focused">
      <div v-if="peoples.length">
        <router-link v-for="people in peoples" :key="people.name" :to="'/peoples/' + getIdByUrl(people.url)" class="search-dropdown__item">
          {{ people.name }}
        </router-link>
      </div>
      <div v-else>
        Nothing found
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { searchPeoples } from '@/modules/people'
import People from '@/models/People'

export default defineComponent({
  name: 'PeoplesSearch',
  setup() {
    const fields = ref({
      'id': 'ID',
      'name': 'Name',
      'height': 'Height',
      'mass': 'Mass',
      'hair_color': 'Hair color'
    })
    const isLoading = ref(false)
    const focused = ref(false)

    const peoples = ref([] as People[])
    const textSearch = ref('')
    const focusedSearch = ref('')

    function getIdByUrl(url: string) {
      return url.replace('https://swapi.dev/api/people/', '')
          .replace('/', '')
    }

    function searchPeoplesByText (): void {
      isLoading.value = true
      searchPeoples(textSearch.value)
          .then(data => {
            peoples.value = data.results
          })
          .finally(() => {
            isLoading.value = false
          })
    }

    return {
      textSearch,
      searchPeoplesByText,
      getIdByUrl,
      focused,
      focusedSearch,
      fields,
      peoples,
      isLoading,
    }
  }
} as any) //TODO: нельзя использовать any
</script>
<style scoped lang="scss">
.search-dropdown {
  position: absolute;
  background: white;
  border-radius: 8px;
  border: 1px solid #797979;
  padding: 15px;
  top: 45px;
  width: 100%;
  z-index: 1;

  &__item {
    padding: 10px 0;
    cursor: pointer;
    border-radius: 8px;
    display: block;
    text-decoration: none;
    color: #2c3e50;

    &:hover {
      background: #dedede;
    }
   }
}
</style>
