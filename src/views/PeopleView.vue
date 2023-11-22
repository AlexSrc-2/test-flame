<template>
  <div class="container pt-3 position-relative">
    <PeopleInfo :people="peopleData" />
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import PeopleInfo from '@/components/PeopleInfo.vue'
import People from '@/models/People'
import { onMounted, ref } from 'vue'
import { readInvoice } from '@/modules/people'

export default {
  name: 'PeoplesView',
  components: {
    PeopleInfo
  },
  setup() {
    const route = useRoute()
    const peopleData = ref({} as People)
    const id = ref(route.params.id)

    function getUserData(): void {
      readInvoice((id.value) as string)
          .then(data => {
            data.id = Number(id.value)
            peopleData.value = data
          })
    }

    onMounted(() => {
      getUserData()
    })

    return {
      id,
      peopleData
    }
  }
}
</script>