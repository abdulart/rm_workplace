<template>
    <div class="add-prospect-form">
        <br>
        <b-alert :show="errorTable.show" dismissible variant="danger">
            Ошибка! {{errorTable.message}}
        </b-alert>
        <b-card>
        <template v-slot:header>
            <h4 class="mb-0">Отчет по хантерам</h4>
        </template>
            <div class="row" style="margin:0;">
                <div class="col-sm-3" style="padding:10px; font-size:12px;">
                    <label>Месяц отчета</label>
                    <b-form-select @change="setMonthReport" v-model="selectedMonth" :options="reportMonths" size="sm" style="font-size:12px;"></b-form-select>
                </div>
                <div class="col-sm-9" style="padding:10px; font-size:12px;">
                    <label>Поиск (Субрегион, Менеджер, Проспект)</label>
                    <b-form-input size="sm" style="font-size:12px;" v-model="search"></b-form-input>
                </div>
            </div>
            <b-table
                sticky-header="500px"
                responsive
                small
                hover
                class="text-center table-activities rm-table"
                :items="items.filter(e => e.fio.indexOf(search) != -1)"
                :fields="fields"
            >
                <template v-slot:cell(fio)="row">
                <i>{{ fioToShort(row.value) }}</i>
                </template>
                <!-- 
                <template v-slot:cell(act_type)="row">
                <b-badge :variant="(tabsActivityResults[row.value] || {variant: 'secondary'}).variant">{{(tabsActivityResults[row.value] || {text: 'N/A'}).text}}</b-badge>
                </template>
                <template v-slot:cell(act_result)="row">
                <b-badge :variant="(tabsActivityResults[row.value] || {variant: 'secondary'}).variant">{{(tabsActivityResults[row.value] || {text: 'N/A'}).text}}</b-badge>
                </template> -->
                <!-- <template v-slot:cell(deadline)="row">
                    <span>{{ dateFormat(row.value, 'DD-MM-YYYY') }}</span>
                </template>
                <template v-slot:cell(id)="row">
                    <b-badge variant="info" style="cursor:pointer;" :value="row.value">+</b-badge>
                </template> -->
                <template v-slot:cell(mFact)="row">
                    <span>{{ parseInt(row.value) }}</span>
                </template>
                <template v-slot:cell(cFact)="row">
                    <span>{{ parseInt(row.value) }}</span>
                </template>
            </b-table>
        </b-card>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment-timezone'
import helpers from '@/helpers'

export default {
    name: 'Dashboard',
    props: {user: Object},
    components: {
    },
    data() {
      return {
          selectedMonth: null,
          reportMonths: [],
          errorTable: {
              show: false,
              message: '',
          },
          items: [],
          fields: [
            {key:'region', sortable: true, label: 'Регион', class: 'text-left pl-10-i'}, 
            {key:'subregion', sortable: true, label: 'Субрегион', class: 'text-left pl-10-i'}, 
            {key:'fio', sortable: true, label: 'Менеджер', class: 'text-left pl-10-i'}, 
            {key:'cPlan', sortable: true, label: 'План зв.'},
            {key:'cfact', sortable: true, label: 'Факт зв.'},
            {key:'mPlan', sortable: true, label: 'План вст.'},
            {key:'mfact', sortable: true, label: 'Факт вст.'},
            // {key: 'strikeRate', sortable: true, label: 'Выполнение'},
            // {key:'factRej', sortable: true, label: 'Факт rej.'},
            // {key:'factSucc', sortable: true, label: 'Факт succ.'},
            // {key:'factInProc', sortable: true, label: 'Факт in proc.'},     
            ],
          busy: false,
          tabsActivityTypes: {
                '-1': {variant: 'danger', text: 'Rej.', key: 'rej'},
                '2': {variant: 'secondary', text: 'InProc.', key: 'inProc'},
                '1': {variant: 'success', text: 'Succ.', key: 'succ'},
                '0': {variant: 'warning', text: 'Запл.', key: 'planned'},
            },
            search: '',
      }
    },
    methods: {
        fioToShort: helpers.fioToShort,
        showErr: function(err) {
            this.errorTable.show = true;
            this.errorTable.message = err;
        },
        setMonths: function() {
            this.reportMonths = Array.apply(0, Array(12)).map(function(_,i){return moment().month(i).format('YYYY-MM')})
            this.selectedMonth = moment().format('YYYY-MM')
            console.log(this.reportMonths);
        },
        setMonthReport: function() {
            axios.get(`/includes/classes/3xxx/controllers/fabric.php?controller=getactstotal&month=${this.selectedMonth}`)
                .then(data => {
                    let res = data.data || [];
                    this.items = res;
                })
                .catch(err => this.showErr(err))
        }
    },
    mounted() {
        this.setMonths()
        this.setMonthReport()
    }
}
</script>

<style>
    .pl-10-i {
        padding-left: 10px!important;
    }


    .rm-table {
        font-size: 10px;
        white-space: nowrap;
    }

    .rm-table thead tr th {
        padding: .3rem!important;
        font-size: 12px;
        border-top: 2px solid #eee;
        border-bottom: 2px solid #eee;
    }

    .rm-table tbody tr td {
        padding: .1rem;
        text-align: center;
        border-top: 1px solid #eee;
    }

    .progress {
        text-align:center;
        position: relative;
    }
    .progress-value {
        position:absolute;
        right:0;
        left:0;
    }

</style>