<template>
    <b-card>
    <template v-slot:header>
            <h4 class="mb-0">Календарь</h4>
        </template>
        <b-row>
            <b-col md="auto">
                <b-calendar
                    :start-weekday="1"
                    :hide-header="true"
                    class="p-2"
                    v-model="calendarValue" @context="onContext" locale="ru-RU"></b-calendar>
            </b-col>
            <b-col>
                <TaskList :date="selectedDate" />
            </b-col>
        </b-row>
    </b-card>
</template>

<script>
import TaskList from './TaskList';

export default {
    name: 'Calendar',
    components: {
        TaskList,
    },
    data: function() {
        return {
            calendarValue: '',
            calendarContext: null,
        }
    },
    methods: {
      onContext(ctx) {
        this.calendarContext = ctx
      }
    },
    mounted() {
        const now = new Date()
        this.calendarValue = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    },
    computed: {
        selectedDate: function () { return  this.calendarContext ? this.calendarContext.selectedYMD : null }
    }
}
</script>

<style>

</style>