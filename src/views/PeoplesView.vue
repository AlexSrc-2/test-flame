<template>
  <div class="container pt-3">
    <h2>List of Peoples</h2>
    <hr />
    <PeoplesList />
  </div>
</template>

<script lang="ts">

import PeoplesList from '@/components/PeoplesList.vue'

export default {
  name: 'PeoplesView',
  components: {
    PeoplesList
  }
}
</script>