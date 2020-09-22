<template>
  <div class="activate">
    <Dashboard/>
  </div>
</template>

<script>
// @ is an alias to /src
import Dashboard from '@/components/prospects/Dashboard.vue'

export default {
  name: 'ProspectsDashboard',
  props: {user: Object},
  components: {
    Dashboard,
  }
}
</script>
