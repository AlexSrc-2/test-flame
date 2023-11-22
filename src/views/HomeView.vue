<template>
  <div class="container pt-3">
    <router-link to="/peoples">Люди</router-link>
    <router-link to="/favorites">Избранное</router-link>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class HomeView extends Vue {}
</script>
