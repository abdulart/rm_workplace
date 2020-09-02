<template>
  <div class="task-list p-2 m-2 text-left">
    <b class="mx-2" style="font-weight: 600!important;">Задачи:</b>
    <b-overlay
      :show="busy"
      rounded
      opacity="1"
      spinner-variant="danger"
    >
        <div class="task-list-item-container">
            <div class="no-items text-center" v-if="items && items.length === 0">
                <p>У вас нет задач!</p>
            </div>
            <b-list-group v-else>
                <b-list-group-item v-for="item in items" :key="item.key">{{item.text}}</b-list-group-item>
            </b-list-group>
        </div>
    </b-overlay>
  </div>
</template>

<script>
export default {
    name: 'TaskList',
    props: {
        date: String,
    },
    data: function() {
        return {
            busy: false,
            items: null,
        }
    },
    methods: {

    },
    mounted() {
        this.busy = true;
        setTimeout(() => {
            this.busy = false;
            this.items = [];
        }, 1000);
    }
}
</script>

<style>
.task-list-item-container {
    height: 260px;
    background: #f7f7f7;
    overflow-y:scroll;
    padding: 10px;
}
.list-group-item {
    padding: .25rem .75rem!important;
}
</style>