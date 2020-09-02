<template>
  <div class="activate">
    <ClientList/>
  </div>
</template>

<script>
// @ is an alias to /src
import ClientList from '@/components/activators/ClientList.vue'

export default {
  name: 'Activate',
  components: {
    ClientList
  }
}
</script>
