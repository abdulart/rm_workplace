<template>
  <div class="activate">
    <AddProspectForm/>
  </div>
</template>

<script>
// @ is an alias to /src
import AddProspectForm from '@/components/prospects/AddProspectForm.vue'

export default {
  name: 'AddProspect',
  props: {user: Object},
  components: {
    AddProspectForm,
  }
}
</script>
