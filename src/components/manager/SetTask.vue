<template>
    <div class="main">
        <b-card>
        <template v-slot:header>
            <h4 class="mb-0">Поставить задачу хантерам</h4>
        </template>
            <div style="padding:10px; text-align:left;">
                <div style='padding:10px;'>

                    <b-form-group label="Название задачи">
                        <b-form-input
                        required
                        v-model="name"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group
                        label="Список ИННов"
                        description="Список ИНН с любым разделителем"
                    >
                        <b-form-textarea
                        rows="3"
                        v-model="inns"
                        max-rows="6"
                        ></b-form-textarea>
                    </b-form-group>

                    <b-form-group label="Cубрегион">
                        <b-form-select
                        :options="regions"
                        v-model="region"
                        required
                        ></b-form-select>
                    </b-form-group>

                    <b-form-group label="Дэдлайн">
                        <b-form-datepicker id="example-datepicker" v-model="deadline" class="mb-2" locale="ru" start-weekday=1></b-form-datepicker>
                    </b-form-group>

                    <b-button variant="outline-secondary" @click="saveTask">
                        <b-spinner small label="Small Spinner" v-if="saving"></b-spinner>
                        <span v-else>Сохранить</span>
                    </b-button>
                </div>
            </div>
        </b-card>
        <br>
        <b-card>
        <template v-slot:header>
            <h4 class="mb-0">Ваши задачи</h4>
        </template>
            <div style="padding:10px; text-align:left;">
                <div style='padding:10px;'>
                    <b-table
                        sticky-header="500px"
                        responsive
                        small
                        hover
                        class="text-center table-activities"
                        :items="myTasks"
                        :fields="myTaskFields"
                    >
                        <!-- <template v-slot:cell(fio)="row">
                        <i>{{ fioToShort(row.value) }}</i>
                        </template>
                        <template v-slot:cell(act_type)="row">
                        <b-badge :variant="(tabsActivityResults[row.value] || {variant: 'secondary'}).variant">{{(tabsActivityResults[row.value] || {text: 'N/A'}).text}}</b-badge>
                        </template>
                        <template v-slot:cell(act_result)="row">
                        <b-badge :variant="(tabsActivityResults[row.value] || {variant: 'secondary'}).variant">{{(tabsActivityResults[row.value] || {text: 'N/A'}).text}}</b-badge>
                        </template>
                        <template v-slot:cell(act_end_time)="row">
                        <span>{{ dateFormat(row.value, 'HH:mm DD-MM-YYYY') }}</span>
                        </template>
                        <template v-slot:cell(a_id)="row">
                        <b-badge variant="info" style="cursor:pointer;" @click="showActDetails(row.value)">+</b-badge>
                        </template> -->
                    </b-table>
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'SetTask',
    props: {user: Object},
    components: {
        
    },
    data() {
        return {
            regions: [
                {
                    label: 'Субрегион',
                    options: [
                        //{ value: { C: '3PO' }, text: 'Option with object value' },
                        //{ value: { R: '2D2' }, text: 'Another option with object value' }
                    ]
                },
            ],
            myTasks: [],
            myTaskFields: [
                { key: 'name', label: 'Название', sortable: true, sortDirection: 'asc' },
                { key: 'subregion', label: 'Субрегион', sortable: true, sortDirection: 'asc' },
                { key: 'inns', label: 'Иннов', sortable: true, sortDirection: 'asc' },
                { key: 'deadline', label: 'Дэдлайн', sortable: true, sortDirection: 'asc' },
                { key: 'id', label: 'Дет.' },
            ],
            deadline: '',
            name: '',
            inns: '',
            region: 1,
            saving: false,
        }
    },
    methods: {
        saveTask: function() {
            if(this.saving) return false;

            if(!this.name) {
                alert('Заполните все поля - Пустое название');
                return false;
            }
            if(!this.inns) {
                alert('Заполните все поля - Пустой список ИННов');
                return false;
            }
            if(!this.region) {
                alert('Заполните все поля - пустой регион');
                return false;
            }
            if(!this.deadline) {
                alert('Заполните все поля - пустой дэдлайн');
                return false;
            }


            this.saving = true;
            let formData = new FormData();
            formData.append('deadline', this.deadline);
            formData.append('inns', this.inns);
            formData.append('name', this.name);
            formData.append('region', this.region);
            formData.append('uid', this.user.counter);
            axios.post('/includes/classes/3xxx/controllers/fabric.php?controller=savetask', formData)
                .then(data => {
                    let res = data.data;
                    if(res === 'success') {
                        alert('Сохранено!');
                        location.reload();
                    } else {
                        alert(`Ошибка: ${res}`);
                        return false;
                    }
                })
                .catch(err => {
                    console.log(err);
                    alert(`Ошибка: ${err}`);
                })
                .finally(() => {
                    this.saving = false;
                })
        }
    },
    mounted() {
        axios.get(`/includes/classes/3xxx/controllers/fabric.php?controller=getmytasks&counter=${this.user.counter}`)
            .then(data => {
                let res = data.data || [];
                this.myTasks = res;
                console.log(res)
            })
            .catch(err => {
                alert(`Ошибка: ${err}`)
            })

        axios.get(`/includes/classes/3xxx/controllers/fabric.php?controller=getsrs`)
            .then(data => {
                let res = data.data || {regs: [], sregs: []};
                this.regions[0].options = res.sregs;
            })
            .catch(err => {
                alert(`Ошибка: ${err}`)
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