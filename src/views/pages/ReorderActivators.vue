<template>
  <div class="reorder-activators">
    <ReorderActivatorsTable :user="user"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ReorderActivatorsTable from '@/components/activators/ReorderActivatorsTable'

export default {
  name: 'ReorderActivators',
  props: {user: Object},
  components: {
    ReorderActivatorsTable,
  }
}
</script>
