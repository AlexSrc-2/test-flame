<template>
  <div class="container pt-3">
    <h2>List of favorites peoples</h2>
    <hr />
    <table id="tableComponent" class="table table-bordered table-striped">
      <thead>
      <tr>
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
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import store from '@/store'
import PeopleRow from '@/components/PeopleRow.vue'

export default {
  name: 'PeoplesView',
  components: { PeopleRow },
  setup() {
    const page = ref(1)
    const fields = ref({
      'id': 'ID',
      'name': 'Name',
      'height': 'Height',
      'mass': 'Mass',
      'hair_color': 'Hair color'
    })

    const peoples = computed(() => store.state.favorites)

    return {
      peoples,
      fields,
      page
    }
  }
}
</script>