<template>
    <div class="add-prospect-form">
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
                    <b-form-select @change="getRegions" v-model="selectedMonth" :options="reportMonths" size="sm" style="font-size:12px;"></b-form-select>
                </div>
                <div class="col-sm-9" style="padding:10px; font-size:12px;">
                    <label>Поиск (Субрегион, Менеджер, Проспект)</label>
                    <b-form-input size="sm" style="font-size:12px;"></b-form-input>
                </div>
            </div>
            <div class="text-left px-2">
                <small><b @click="itemsCopy = items; step = 0;" style="cursor:pointer;">x Сбросить</b></small>
            </div>
            <DashboardTable v-on:setregion="setRegion($event)"
            v-on:setsubregion="setSubRegion($event)"
            v-on:setmanager="setManager($event)" 
            :table="{items: itemsCopy, fields: fields, busy: busy, step: step}"
            />
        </b-card>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment-timezone'
import DashboardTable from './DashboardTable.vue'

export default {
    name: 'Dashboard',
    props: {user: Object},
    components: {
      DashboardTable,
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
          itemsCopy: [],
          step: 0,
          fields: [
            {key:'region', sortable: true, label: 'Регион', class: 'text-left pl-10-i'}, 
            {key:'subregion', sortable: true, label: 'Субрегион', class: 'text-left pl-10-i'}, 
            {key:'fio', sortable: true, label: 'Менеджер', class: 'text-left pl-10-i'}, 
            {key:'plan', sortable: true, label: 'План'},
            {key:'fact', sortable: true, label: 'Факт'},
            {key: 'strikeRate', sortable: true, label: 'Выполнение'},
            {key:'factRej', sortable: true, label: 'Факт rej.'},
            {key:'factSucc', sortable: true, label: 'Факт succ.'},
            {key:'factInProc', sortable: true, label: 'Факт in proc.'},
             
            ],
          busy: false,
          tabsActivityTypes: {
                '-1': {variant: 'danger', text: 'Rej.', key: 'rej'},
                '2': {variant: 'secondary', text: 'InProc.', key: 'inProc'},
                '1': {variant: 'success', text: 'Succ.', key: 'succ'},
                '0': {variant: 'warning', text: 'Запл.', key: 'planned'},
            },
            planSize: 40,
      }
    },
    methods: {
        getRegions: function() {
            if(this.busy) return false;
            this.busy = true;
            let formData = new FormData();
            formData.append('month', this.selectedMonth);
            axios.post('/includes/classes/3xxx/controllers/fabric.php?controller=get_regions_table', formData)
                .then(data => {
                    let res = data.data || [];
                    if(res.length === 0) {
                        this.showErr('Нет данных!');
                        this.items = [];
                        this.itemsCopy = [];
                        this.step = 0;
                        return false;
                    }
                    console.log(res);
                    this.items = this.reduceTableData(res);
                    this.itemsCopy = this.reduceTableData(res);
                    this.step = 0;
                })
                .catch(err => {
                    this.showErr(err);
                })
                .finally(() => {
                    this.busy = false;
                })
        },
        setRegion:function(region) {
            this.itemsCopy = this.items.find(e => e.region === region).subregions
            this.step = 1;
        },
        setSubRegion:function(subregion) {
            this.itemsCopy = this.itemsCopy.find(e => e.subregion === subregion).managers
            this.step = 2;
        },
        setManager:function(manager) {
            this.itemsCopy = this.itemsCopy.find(e => e.manager === manager).prospects
            this.step = 3;
        },
        showErr: function(err) {
            this.errorTable.show = true;
            this.errorTable.message = err;
        },
        setMonths: function() {
            this.reportMonths = Array.apply(0, Array(12)).map(function(_,i){return moment().month(i).format('YYYY-MM')})
            this.selectedMonth = moment().format('YYYY-MM')
            console.log(this.reportMonths);
        },
        reduceTableData(data) {
            let planSize = this.planSize;
            let regions = data.reduce((prev, next) => {
                let foundRegion = prev.find(e => e.region === next['region']);
                if(typeof foundRegion === 'undefined') {
                    let region = {
                        region: next['region'],
                        plan: {total: 0},
                        fact: {total: 0, succ: 0, rej: 0, inProc: 0, planned: 0},
                        subregions: [],
                    }
                    this.increaseActivity(region, next);
                    prev.push(region);
                } else {
                    
                    this.increaseActivity(foundRegion, next);
                }

                foundRegion = prev.find(e => e.region === next['region']);
                let foundSubregion = foundRegion.subregions.find(e => e.subregion === next['subregion']);
                if(typeof foundSubregion === 'undefined') {
                    let subregion = {
                        region: next['region'],
                        subregion: next['subregion'],
                        plan: {total: 0},
                        fact: {total: 0, succ: 0, rej: 0, inProc: 0, planned: 0},
                        managers: [],
                    }
                    this.increaseActivity(subregion, next);
                    foundRegion.subregions.push(subregion);
                } else {
                    this.increaseActivity(foundSubregion, next);
                }

                foundSubregion = foundRegion.subregions.find(e => e.subregion === next['subregion']);
                let foundManagers = foundSubregion.managers.find(e => e.manager === next['fio']);
                if(typeof foundManagers === 'undefined') {
                    let manager = {
                        region: next['region'],
                        subregion: next['subregion'],
                        manager: next['fio'],
                        hasPlan: true,
                        plan: {total: planSize},
                        fact: {total: 0, succ: 0, rej: 0, inProc: 0, planned: 0},
                        prospects: [],
                    }
                    this.increaseActivity(manager, next);
                    foundSubregion.managers.push(manager);
                } else {
                    this.increaseActivity(foundManagers, next);
                }

                return prev;
            }, []);
            console.log(regions);

            regions.forEach(e => {
                let planTtl = 0;
                e.subregions.forEach(k => {
                    let addPlan = planSize * k.managers.filter(p => p.hasPlan).length;
                    k.plan.total += addPlan;
                    planTtl += addPlan;
                })
                e.plan.total += planTtl;
            })

            return regions;
        },
        increaseActivity(obj, next) {
            if(!next.a_id) return false;
            obj.fact.total ++;
            // console.log(obj.fact, obj.fact[this.tabsActivityTypes[next['act_result']].key], this.tabsActivityTypes[next['act_result']].key)
            obj.fact[this.tabsActivityTypes[next['act_result']].key] += 1;
        },
    },
    mounted() {
        this.setMonths()
        this.getRegions()
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