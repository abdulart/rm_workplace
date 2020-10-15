<template>
  <div class="main">
    <br>
    <HuntersList :user="user" />
  </div>
</template>

<script>
// @ is an alias to /src
import HuntersList from '@/components/manager/HuntersList.vue'

export default {
  name: 'Hunters',
  props: {user: Object},
  components: {
    HuntersList
  }
}
</script>
