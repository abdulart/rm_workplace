<template>
  <div class="main">
    <br>
    <SetTask :user="user" />
  </div>
</template>

<script>
// @ is an alias to /src
import SetTask from '@/components/manager/SetTask.vue'

export default {
  name: 'Tasks',
  props: {user: Object},
  components: {
    SetTask
  }
}
</script>
