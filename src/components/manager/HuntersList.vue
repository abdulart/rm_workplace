<template>
    <div class="main">
        <b-card>
        <template v-slot:header>
            <h4 class="mb-0">Список хантеров</h4>
        </template>
            <div style="padding:10px; text-align:left;">
                <div style='padding:10px;'>
                    <b-table
                        sticky-header="500px"
                        responsive
                        small
                        hover
                        class="text-center table-activities"
                        :items="hunters"
                        :fields="huntersFields"
                    >
                        <!-- <template v-slot:cell(fio)="row">
                        <i>{{ fioToShort(row.value) }}</i>
                        </template>
                        <template v-slot:cell(act_type)="row">
                        <b-badge :variant="(tabsActivityResults[row.value] || {variant: 'secondary'}).variant">{{(tabsActivityResults[row.value] || {text: 'N/A'}).text}}</b-badge>
                        </template>
                        <template v-slot:cell(act_result)="row">
                        <b-badge :variant="(tabsActivityResults[row.value] || {variant: 'secondary'}).variant">{{(tabsActivityResults[row.value] || {text: 'N/A'}).text}}</b-badge>
                        </template> --> 
                        <template v-slot:cell(sr_id)="row">
                            <b-input-group size="sm">
                                <b-form-select
                                    :options="huntersObj[row.item.id].options"
                                    v-model="huntersObj[row.item.id].sr_id"
                                    required
                                ></b-form-select>
                                <b-input-group-append>
                                    <b-button @click="updateSr(huntersObj[row.item.id].sr_id, row.item.id)">
                                        Обн.
                                    </b-button>
                                </b-input-group-append>
                            </b-input-group>
                            <!-- <span>{{ dateFormat(row.value, 'DD-MM-YYYY') }}</span> -->
                        </template>
                        <template v-slot:cell(id)="row">
                            <b-badge variant="info" style="cursor:pointer;" :value="row.value">+</b-badge>
                        </template> 
                    </b-table>
                   
                </div>
            </div>
        </b-card>

    </div>
</template>

<script>
import axios from 'axios'
// import moment from 'moment'

export default {
    name: 'HuntersList',
    props: {user: Object},
    components: {
        
    },
    data() {
        return {
            huntersObj: {},
            hunters: [],
            huntersFields: [
                { key: 'name', label: 'ФИО', sortable: true, sortDirection: 'asc' },
                { key: 'position', label: 'Должность', sortable: true, sortDirection: 'asc' },
                { key: 'sr_id', label: 'Субрегион', sortable: true, sortDirection: 'asc' },
                // { key: 'deadline', label: 'Дэдлайн', sortable: true, sortDirection: 'asc' },
                { key: 'id', label: 'Дет.' },
            ],
            regions: [
                {
                    label: 'Субрегион',
                    options: [
                        //{ value: { C: '3PO' }, text: 'Option with object value' },
                        //{ value: { R: '2D2' }, text: 'Another option with object value' }
                    ]
                },
            ],
            disabled: [],
        }
    },
    methods: {
        
        updateSr: function(e, id) {
            axios.get(`/includes/classes/3xxx/controllers/fabric.php?controller=updatehuntersr&man=${id}&sr=${e}`)
                .then(data => {
                    console.log(data)
                    alert('Ок')
                })
                .catch(err => console.log(err))
        },

        returnSr: function(id) {
            return this.huntersObj[id]
        }
    },
    mounted() {
        
        axios.get(`/includes/classes/3xxx/controllers/fabric.php?controller=getsrs`)
            .then(data => {
                let res = data.data || {regs: [], sregs: []};
                this.regions[0].options = res.sregs;
                return axios.get(`/includes/classes/3xxx/controllers/fabric.php?controller=gethunterslist`)
            })
            .then(data => {
                let res = data.data || [];
                this.hunters = res;
                res.forEach(e => {
                    this.huntersObj[e.id] = { sr_id: e.sr_id, options: this.regions[0].options.filter(Boolean).map(k => {
                        if(k.sr_id == e.sr_id) k.selected = true
                        return k
                    }) };
                })
                console.log(res, this.huntersObj)
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