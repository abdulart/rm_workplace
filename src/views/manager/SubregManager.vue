<template>
  <div class="main">
    <SubregManagerMain :user="user"/>
  </div>
</template>

<script>
// @ is an alias to /src
import SubregManagerMain from '@/components/manager/SubregManagerMain.vue'

export default {
  name: 'RegManager',
  props: {user: Object},
  components: {
    SubregManagerMain
  }
}
</script>
