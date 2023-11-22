<template>
  <PeoplesSearch />
  <table id="tableComponent" class="table table-bordered table-striped">
    <thead>
    <tr>
      <th class="min-width-column">#</th>
      <th v-for="(fieldName, field) in fields" :key='field' >
        {{ fieldName }}
      </th>
      <th class="min-width-column"></th>
    </tr>
    </thead>
    <tbody>
      <PeopleRow v-for="people in peoples" :key='people.name' :people="people" :need-rows="fields" />
    </tbody>
  </table>
  <div class="pagination justify-content-center gap-1 d-flex">
    <button class="btn btn-dark" :class="{disabled: !hasPrevPage}" @click="loadListPeoples(page - 1)">
      <i class="bi bi-caret-left-fill"></i>
    </button>
    <button
        class="btn btn-dark"
        v-for="pageItem in countPages"
        :key="pageItem"
        :class="{disabled: page === pageItem}"
        @click="loadListPeoples(pageItem)"
    >
      {{ pageItem }}
    </button>
    <button class="btn btn-dark" :class="{disabled: !hasNextPage}" @click="loadListPeoples(page + 1)">
      <i class="bi bi-caret-right-fill"></i>
    </button>
  </div>
  <div v-if="isLoading" class="loading-container">
    <div class="spinner-border" role="status">
      <span class="sr-only" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import store from '@/store'
import PeopleRow from '@/components/PeopleRow.vue'
import { listPeoples } from '@/modules/people'
import PeoplesSearch from '@/components/PeoplesSearch.vue'

export default defineComponent({
  name: 'PeoplesList',
  components: { PeopleRow, PeoplesSearch },
  setup() {
    const page = ref(1)
    const fields = ref({
      'name': 'Name',
      'height': 'Height',
      'mass': 'Mass',
      'hair_color': 'Hair color'
    })
    const isLoading = ref(false)

    const peoples = computed(() => store.state.peoples)
    const count = computed(() => store.state.countPeoples)
    const hasNextPage = computed(() => store.state.hasNext)
    const hasPrevPage = computed(() => store.state.hasPrev)
    const countPages = computed(() => Math.ceil(count.value / 10))

    function loadListPeoples (pageNew: number): void {
      page.value = pageNew
      isLoading.value = true
      listPeoples(page.value)
          .finally(() => {
            isLoading.value = false
          })
    }

    onMounted(() => {
      loadListPeoples(1)
    })

    return {
      peoples,
      count,
      fields,
      hasNextPage,
      hasPrevPage,
      page,
      countPages,
      isLoading,
      loadListPeoples,
    }
  }
} as any) //TODO: нельзя использовать any
</script>
<style scoped>
</style>
