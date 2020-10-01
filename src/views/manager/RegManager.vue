<template>
  <div class="main">
    <RegManagerMain :user="user"/>
  </div>
</template>

<script>
// @ is an alias to /src
import RegManagerMain from '@/components/manager/RegManagerMain.vue'

export default {
  name: 'RegManager',
  props: {user: Object},
  components: {
    RegManagerMain
  }
}
</script>
