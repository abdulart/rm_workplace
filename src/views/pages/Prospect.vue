<template>
  <div class="prospect">
    <ProspectForm :user="user"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ProspectForm from '@/components/prospects/ProspectForm.vue'

export default {
  name: 'Prospect',
  props: {user: Object},
  components: {
    ProspectForm
  }
}
</script>
