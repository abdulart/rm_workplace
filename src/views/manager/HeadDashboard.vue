<template>
  <div class="dashboard">
    <br>
    <h4 class="deck-header">Дэшборд руководитель</h4>
    <div class="month-container">
      <b-form-select @change="setVidgets" v-model="selectedMonth" :options="months" size="sm" class="mb-3" style="width: 200px;"></b-form-select>
    </div>
    <b-card-group deck>

      <b-card class="dash-vidget">
        <b class="float-left">Открытые счета</b> <b class="float-right text-muted">{{accounts}} / 10</b>
      </b-card>
      <b-card class="dash-vidget">
        <b class="float-left">Звонки (факт/план)</b> <b class="float-right text-muted">{{calls}} / 160</b>
      </b-card>
      <b-card class="dash-vidget">
        <b class="float-left">Встречи (факт/план)</b> <b class="float-right text-muted">{{meetings}} / 40</b>
      </b-card>
    </b-card-group>
    <br>
    <div class="month-container">
      <h6>Встречи текущего месяца</h6>
    </div>
    <b-card-group deck>
      <b-card no-body class="dash-vidget noborder">
          <b-list-group style="border: none; max-height:300px;overflow-y:scroll" v-if="activities.length > 0">
            <b-list-group-item class="text-left act-list-item"  target="_blank" ref="link" :to="`/prospect/${act.client_id}`" v-for="act in activities" :key="act.a_id" style="border: none; border-bottom: 1px solid #ddd; padding: .75rem;">
              <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-0">{{act.name}} (<small>{{act.inn || 'no inn'}}</small>)</h6>
                <small class="text-muted">{{getDateFromUnix(act.act_end_time)}}</small>
              </div>
              <p class="mb-0">
                <small style="text-transform:capitalize;" class="text-muted">{{fioToShort(act.fio)}}</small>
              </p>
              <p class="mb-0">
                <small class="text-muted"><i>{{act.act_zametka_text}}</i></small>
              </p>
              <b-badge :variant="resArr[act.act_result].variant">{{resArr[act.act_result].text}}</b-badge>
              &nbsp;<b-badge variant="primary">Счёт открыт</b-badge>
            </b-list-group-item>
          </b-list-group>
          <h4 v-else>Нет встреч в этом месяце</h4>
      </b-card>
    </b-card-group>
    <br>
    <div class="month-container">
      <h6>Звонки текущего месяца</h6>
    </div>
    <b-card-group deck>
      <b-card no-body class="dash-vidget noborder">
          <b-list-group style="border: none;" v-if="callsarr.length > 0">
            <b-list-group-item class="text-left act-list-item"  target="_blank" ref="link" :to="`/prospect/${act.client_id}`" v-for="act in callsarr" :key="act.a_id" style="border: none; padding: .75rem;">
              <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-0">{{act.name}}</h6>
                <small class="text-muted">{{getDateFromUnix(act.act_end_time)}}</small>
              </div>
              <p class="mb-0">
                <small style="text-transform:capitalize;" class="text-muted">{{fioToShort(act.fio)}}</small>
              </p>
              <p class="mb-0">
                <small class="text-muted">{{act.inn || 'no inn'}}</small>
              </p>
              <b-badge :variant="resArr[act.act_result].variant">{{resArr[act.act_result].text}}</b-badge>
            </b-list-group-item>
          </b-list-group>
          <h4 v-else>Нет звонков в этом месяце</h4>
      </b-card>
    </b-card-group>
    <br>
    <div class="month-container">
      <h6>Мои задачи</h6>
    </div>
    <b-card-group deck>
      <!-- <b-card no-body class="dash-vidget noborder">
          <b-table  
          striped
          hover 
          responsive
          sticky-header="300px"
          :busy="busy"
          :fields="myProspectsFields"
          :items="myProspects" class="rm-table">
            <template v-slot:table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>&nbsp;<strong>Загрузка...</strong>
              </div>
            </template>
            <template v-slot:cell(name)="data">
              <router-link target="_blank" :to="`/prospect/${data.item.client_id}`"><b>{{data.item.name}}</b></router-link>
            </template>
            <template v-slot:cell(unpin)="data">
              <b-badge :variant="'secondary'" style="cursor:pointer" @click="unpinProspect(data)">Откр.</b-badge>
            </template>
        </b-table>
      </b-card> -->


    </b-card-group>
  </div>
</template>

<script>
// @ is an alias to /src
// import Calendar from '@/components/common/calendar/Calendar.vue'
import axios from 'axios';
import moment from 'moment';
import helpers from '@/helpers';

export default {
  name: 'Dashboard',
  props: {user: Object,},
  components: {
    // Calendar
  },
  data() {
    return {
      myProspects: [],
      myProspectsFields: [
        {key:'unpin', sortable: false, label: 'Открепить'},
        {key:'name', sortable: true, label: 'Наименование'}, 
        {key:'inn', sortable: true, label: 'ИНН'},
      ],
      busy: false,
      resArr: {
        '1': {text: 'Успех', variant: 'success'},
        '-1': {text: 'Отказ', variant: 'danger'},
        '2': {text: 'В работе', variant: 'warning'},
      },
      meetings: 0,
      calls: 0,
      callsarr: [],
      accounts: 0,
      activities: [],
      selectedMonth: 0,
      selectedMonthYM: '2020-01',
      currentMonth: 1,
      months: [
        {value: 1, text: 'Январь'},
        {value: 2, text: 'Февраль'},
        {value: 3, text: 'Март'},
        {value: 4, text: 'Апрель'},
        {value: 5, text: 'Май'},
        {value: 6, text: 'Июнь'},
        {value: 7, text: 'Июль'},
        {value: 8, text: 'Август'},
        {value: 9, text: 'Сентябрь'},
        {value: 10, text: 'Октябрь'},
        {value: 11, text: 'Ноябрь'},
        {value: 12, text: 'Декабрь'},
      ],
    }
  },
  methods: {
    fioToShort: helpers.fioToShort,
    unpinProspect: function(data) {
      if(confirm(`Вы уверены, что хотите открепить проспект ${data.item.name} (${data.item.inn})?`)) {
        let formData = new FormData();
        formData.append('uid', this.user.counter);
        formData.append('client_id', data.item.client_id);
        axios.post('/includes/classes/3xxx/controllers/fabric.php?controller=unpin_prospect', formData)
          .then(data => {
          if(data.data == 'success') {
              alert('Готово!');
              this.getMyProspects();
            } else {
              alert('Ошибка!');
            }
          })
          .catch(err => {
            alert(`Ошибка!`);
            console.log(err);
          })
      }
    },
    getDateFromUnix: function(unix, format='HH:mm DD.MM.YYYY') {
      return moment.unix(unix).format(format);
    },
    setCurrentMonth: function() {
      this.currentMonth = parseInt(moment().format('M'));
      this.selectedMonthYM = moment().format('Y-M');
      this.selectedMonth = this.currentMonth;
      console.log(this.currentMonth);
    },
    setVidgets: function() {
      console.log(this.selectedMonth);
      this.selectedMonthYM = moment().month(this.selectedMonth - 1).format('Y-MM');
      let formData = new FormData();
      formData.append('uid', this.user.counter);
      formData.append('month', this.selectedMonthYM);
      formData.append('firstMonthDay', moment().month(this.selectedMonth - 1).format('YYYYMM01'));
      axios.post('/includes/classes/3xxx/controllers/fabric.php?controller=get_vidgets', formData)
        .then(data => {
          let res = data.data || {};
          console.log(res);
          this.calls = res.calls.length || 0;
          this.meetings = res.meetings.length || 0;
          this.activities = res.activities;
          this.callsarr = res.callsarr;
        })
        .catch(err => {
          console.log(err);
        })

    },
    getMyProspects: function() {
      let formData = new FormData();
      formData.append('uid', this.user.counter);
      axios.post('/includes/classes/3xxx/controllers/fabric.php?controller=get_my_prospects&uid='+this.user.counter, formData)
        .then(data => {
          let res = data.data || {};
          this.myProspects = res;
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  mounted() {
    this.setCurrentMonth();
    this.setVidgets();
    this.getMyProspects();
  }
}
</script>

<style>
  .act-list-item:hover {
    background: #ddd!important;
    cursor: pointer;
  }

  .noborder {
    border: none;
    
  }

  .month-container {
    text-align: left;
    width:100%;
  }

  .deck-container {
    padding: 0.5rem 1.5rem 1.5rem 1.5rem;
    margin-right: 0;
    margin-left: 0;
    border-width: .2rem;
    border: solid #f8f9fa;
    background: #fff;
  }

  .dash-vidget {
    padding: 1rem;
    min-width: 250px;
  }

  .deck-header {
    margin-bottom: 1rem;
    text-align: left;
  }

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