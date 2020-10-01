<template>
  <div class="main">
    <Main :user="user"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Main from '@/components/prospects/Main.vue'

export default {
  name: 'ProspectsMain',
  props: {user: Object},
  components: {
    Main
  }
}
</script>
