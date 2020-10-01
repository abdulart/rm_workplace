<template>
    <div class="main">
        <b-card>
        <template v-slot:header>
            <h4 class="mb-0">Руководитель региона. Главная страница</h4>
        </template>
            <div class="p-2">
                <b-card-group deck>
                    <b-card
                        v-for="vidget in vidgets1"
                        :key="vidget.name"
                        :bg-variant="vidget.variant"
                        text-variant="white"
                        :header="vidget.name" class="text-center">
                        <b-card-text>
                            <h1>{{vidget.data}}</h1>
                        </b-card-text>
                    </b-card>
                </b-card-group>
                <b-card-group deck class="mt-3">
                    <b-card
                        v-for="vidget in vidgets2"
                        :key="vidget.name"
                        :bg-variant="vidget.variant"
                        text-variant="white"
                        :header="vidget.name" class="text-center">
                        <b-card-text>
                            <h1>{{vidget.data}}</h1>
                        </b-card-text>
                    </b-card>
                </b-card-group>
                <div class="mt-3">
                    <strong>Проспекты команды</strong>
                    <b-table  
                        striped
                        hover 
                        responsive
                        sticky-header="200px"
                        :busy="myProspects.busy"
                        :fields="myProspects.fields"
                        :items="myProspects.items" class="rm-table">
                        <template v-slot:cell(name)="row">
                            <router-link tag="a" :to="`/prospect/${row.item.client_id}`" style="cursor:pointer;text-decoration:underline;" @click="row.toggleDetails">{{row.value}}</router-link>
                        </template>
                        <template v-slot:cell(fio)="">
                            <span>Иванов И.И.</span>
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
                 <div class="mt-3" >
                    <strong>Постановка задач</strong>
                    <div style="padding: 10px;
                            background: #eee;">
                        <b-form >
                            <b-form-group
                                label="Наименование задачи"   
                            >
                                <b-form-input
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group 
                                label="Дедлайн"
                            >
                                <b-form-datepicker class="mb-2"></b-form-datepicker>
                            </b-form-group>

                            <b-button type="submit" variant="primary">Подтвердить</b-button>
                        </b-form>
                    </div>
                </div>
            </div>
        </b-card>
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
            form: {
                email: '',
                name: '',
                food: null,
                checked: []
            },
            foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
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
                    {key: 'fio', label: 'Хантер'},
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
            vidgets1: {
                tasks: {
                    name: 'Задачи',
                    data: 10,
                    variant: 'primary',
                },
                calls: {
                    name: 'Мои Звонки',
                    data: '12 / 40',
                    variant: 'danger',
                },
                meetings: {
                    name: 'Мои Встречи',
                    data: '2 / 5',
                    variant: 'warning',
                }
            },
            vidgets2: {
                prospects: {
                    name: 'Проспекты команды',
                    data: 10,
                    variant: 'primary',
                },
                calls: {
                    name: 'Звонки команды',
                    data: '120 / 400',
                    variant: 'danger',
                },
                meetings: {
                    name: 'Встречи команды',
                    data: '20 / 50',
                    variant: 'warning',
                }
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