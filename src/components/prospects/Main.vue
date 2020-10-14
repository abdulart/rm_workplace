<template>
    <div class="main">
        <!-- <b-card>
        <template v-slot:header>
            <h4 class="mb-0">Хантер. Главная страница</h4>
        </template> -->
            <div class="p-2">
                <b-card-group deck>
                    <b-card
                        v-for="vidget in vidgets"
                        :key="vidget.name"
                        :bg-variant="vidget.variant"
                        class="text-left">
                        <b-card-text style="padding: 10px;">
                            <strong class="text-muted" style="font-size: 12px;margin:0;padding:0;text-transform: uppercase;">{{vidget.name}}</strong>
                            <br><strong></strong>
                            <div class="row align-items-center gx-2 mb-1">
                  <div class="col-6">
                    <span class="card-title h2">12</span> / 40
                  </div>
                  <div class="col-6">
                    
                  </div>
                </div>
                        </b-card-text>
                    </b-card>
                </b-card-group>
                <div class="mt-3">
                    <strong>Мои проспекты</strong>
                    <b-table  
                        striped
                        hover 
                        responsive
                        sticky-header="500px"
                        :busy="myProspects.busy"
                        :fields="myProspects.fields"
                        :items="myProspects.items" class="rm-table">
                        <template v-slot:cell(name)="row">
                            <router-link tag="a" :to="`/prospect/${row.item.client_id}`" style="cursor:pointer;text-decoration:underline;" @click="row.toggleDetails">{{row.value}}</router-link>
                        </template>
                        <template v-slot:cell(task)="">
                            <span>Задача 1</span>
                        </template>
                        <template v-slot:cell(status)="row">
                            <b-badge :variant="getStatus(row.item.act_result, row.item.act_type).variant">{{getStatus(row.item.act_result, row.item.act_type).text}}</b-badge>
                        </template>
                        <template v-slot:row-details="">
                            <b-card>
                                <ul>
                                    <li>Встреча 1</li>
                                    <li>Встреча 2</li>
                                </ul>
                            </b-card>
                        </template>
                    </b-table>
                </div>
            </div>
        <!-- </b-card> -->
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Main',
    props: {user: Object},
    components: {
        
    },
    data() {
        return {
            tabsActivityTypes: {
                '-1': {variant: 'danger', text: 'Rej.', key: 'rej'},
                '2': {variant: 'secondary', text: 'InProc.', key: 'inProc'},
                '1': {variant: 'success', text: 'Succ.', key: 'succ'},
                '0': {variant: 'warning', text: 'Запл.', key: 'planned'},
            },
            myTasks: {
                busy: false,
                fields: ['list','date'],
                items: [],
            },
            myProspects: {
                busy: false,
                fields: [
                    {key: 'name', label: 'Наименование'},
                    {key: 'task', label: 'Задача'},
                    {key: 'status', label: 'Статус'},
                    
                // {
                //     key: 'isActive',
                //     label: 'is Active',
                //     formatter: (value) => {
                //     return value ? 'Yes' : 'No'
                //     },
                //     sortable: true,
                //     sortByFormatted: true,
                //     filterByFormatted: true
                // },
                // { key: 'actions', label: 'Actions' }
                ],
                items: [],
            },
            vidgets: {
                tasks: {
                    name: 'Задачи',
                    data: 10,
                    variant: 'default',
                },
                prospects: {
                    name: 'Проспекты',
                    data: 10,
                    variant: 'default',
                },
                callsPF: {
                    name: 'Звонки план/факт',
                    data: 10,
                    variant: 'default',
                },
                meetingsPF: {
                    name: 'Встречи план/факт',
                    data: 10,
                    variant: 'default',
                },
            }
        }
    },
    methods: {
        getStatus(result, type) {
            if(!result) return {text: 'Не отработан', variant: 'secondary'}
            if(!type) return {text: 'Не отработан', variant: 'secondary'}
            if(result == 1 && type == 1) return {text: 'Успешно', variant: 'success'}
            if(result == -1) return {text: 'Неуспешно', variant: 'success'}
            else return {text: 'В работе', variant: 'warning'}
        }
    },
    mounted() {
        if(this.myProspects.busy) return false;
        this.myProspects.busy = true;
        axios.get(`/includes/classes/3xxx/controllers/fabric.php?controller=get_my_prospects&uid=${this.user.counter}`)
            .then(data => {
                let res = data.data || [];
                this.myProspects.items = res;
            })
            .catch(err => console.log(err))
            .finally(() => {
                this.myProspects.busy = false;
            })
    }
}
</script>

<style>
    .rm-table {
        font-size: 12px;
        white-space: nowrap;
    }

    .rm-table thead tr th {
        padding: .3rem!important;
        font-size: 14px;
        border-top: 2px solid #eee;
        border-bottom: 2px solid #eee;
    }

    .rm-table tbody tr td {
        padding: .1rem!important;
        text-align: center;
        border-top: 1px solid #eee;
    }
</style>