<template>
  <div class="activate">
    <ClientList :user="user"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ClientList from '@/components/activators/ClientList.vue'

export default {
  name: 'Activate',
  props: {user: Object},
  components: {
    ClientList
  }
}
</script>
