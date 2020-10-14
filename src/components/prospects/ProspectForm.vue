<template>
  <div class="prospect">
    <b-card bg-variant="light">
      <h4>Проспект</h4>
      <div class="details text-left">
        <div>
          <b-tabs content-class="mt-3">
            <b-tab title="Основная" active>
              
            </b-tab>
            <b-tab title="Инфо">
              
            </b-tab>
            <b-tab title="Бизнес линии">
              
            </b-tab>
          </b-tabs>
        </div>
        <div class="manager-pin-container">
          <b-badge variant="primary" v-if="pinnedManager">RM: {{fioToShort(pinnedManager.name)}}</b-badge>
          <b-badge variant="secondary" v-else>Свободный</b-badge>&nbsp;
          <b-badge variant="dark" @click="pinOnMe" style="cursor: pointer;" v-if="!pinnedManager || pinnedManager.uid != uid">
            <b-spinner v-if="managerLoading" small label="Small Spinner" type="grow"></b-spinner>
            <span v-else>Закр.</span>
          </b-badge>
        </div>
        <p v-for="item in prospect" :key="item.key" class="detail-p"><small><b class="detail-header">{{item.name}}:</b><span><i> {{item.value}}</i></span></small></p>
      </div>
    </b-card>
    <br>
    <b-card bg-variant="light">
      <h4>Встречи</h4>
      <b-table-simple sticky-header responsive small hover>
          <b-thead head-variant="light">
              <b-tr>
                  <b-th><small><b>Дата</b></small></b-th>
                  <b-th><small><b>RM</b></small></b-th>
                  <b-th><small><b>Результат</b></small></b-th>
                  <b-th><small><b>Тип</b></small></b-th>
                  <b-th><small><b>Коммент</b></small></b-th>
              </b-tr>
          </b-thead>
          <b-tbody>
              <b-tr v-if="!doneActivities.length">
                  <b-td colspan="2"><small><b>Ничего нет!</b></small></b-td>
              </b-tr>
              <b-tr v-else v-for="item in doneActivities" :key="item.id">
                  <b-td><small class="inline-text">{{dateFormat(item.act_end_time, 'DD-MM-YYYY')}}</small></b-td>
                  <b-td><small class="inline-text">{{fioToShort(item.fio)}}</small></b-td>
                  <b-td><b-badge :variant="item.act_result === -1 ? 'danger' : (item.act_result === 1 ? 'success' : 'warning')">{{item.act_result === -1 ? 'Reject' : (item.act_result === 1 ? 'Success' : 'InProcess')}}</b-badge></b-td>
                  <b-td><small class="inline-text">{{getActType(item.act_type)}}</small></b-td>
                  <b-td><small class="inline-text">{{item.act_zametka_text}}</small></b-td>
              </b-tr>
          </b-tbody>
      </b-table-simple>
    </b-card>
    <br>
    <b-card bg-variant="light">
      <h4>Добавить встречу</h4>
      <Meeting :id="queryId" :uid="uid"/>
    </b-card>
    <br>
  </div>
</template>

<script>
import Meeting from '@/components/partials/Meeting';
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'ProspectForm',
  components: {
    Meeting,
  },
  methods: {
    fioToShort(fio) {
      try {
          if(!fio) return '';
          let [a, b, c] = fio.split(' ');
          
          return `${a || ''}${(b ? ' '+b.substr(0,1)+'.' : '')}${(c ? ' '+c.substr(0,1)+'.' : '')}`;
      } catch (e) {
          console.log(e, fio);
          return fio;
      }
    },
    dateFormat(date, format = 'DD-MM-YYYY') {
      return moment.unix(date).format(format);
    },
    getActType(actType) {
      let actTypeFound = this.types.find(e => e.value === actType);
      return typeof actTypeFound === 'undefined' ? ' - ' : actTypeFound.text;
    },
    pinOnMe() {
      this.managerLoading = true;
      let form_data = new FormData();
      form_data.append('id', this.queryId);
      form_data.append('uid', this.uid);
      axios.post('/includes/classes/3xxx/controllers/fabric.php?controller=pinprospect', form_data)
        .then(data => {
          alert(data.data ? 'Успешно закреплен!' : 'Ошибка!')
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.managerLoading = false;
          location.reload();
        })
    }
  },
  data() {
    return {
      pinnedManager: null,
      queryId: null,
      uid: -1,
      managerLoading: false,
      types: [{value: 1, text: 'Встреча'},{value: 0, text: 'Звонок'},{value: 2, text: 'Запланировать'}],
      prospect: [],
      fields: [
        {key: 'name', name: 'Наименование'},
        {key: 'inn', name: 'ИНН'},
        {key: 'group_name', name: 'Группа'},
        {key: 'adres_reg', name: 'Адресс рег.'},
        {key: 'otrasl', name: 'Отрасль'},
        {key: 'corp_city', name: 'Субрегион'},
        {key: 'management_post', name: 'ЛПР должность'},
        {key: 'management_name', name: 'ЛПР фио'},
        {key: 'okved_all', name: 'Все коды оквед'},
      ],
      doneActivities: [],
    }
  },
  mounted() {
    this.queryId = this.$route.params.id || null;
    this.uid = this.$cookies.get('corp_counter') || -1;
    let form_data = new FormData();
    form_data.append('id', this.queryId);
    axios.post('/includes/classes/3xxx/controllers/fabric.php?controller=getprospect', form_data)
      .then(data => {
        this.fields.forEach(e => {
          this.prospect.push({
            name: e['name'],
            value: data.data[0][e.key],
            key: e.key,
          })
        })
      })
      .catch(err => {
        console.log(err);
        this.prospect = [];
      })

    axios.post('/includes/classes/3xxx/controllers/fabric.php?controller=getprospectactivities', form_data)
      .then(data => {
          this.doneActivities = data.data.done;
      })
      .catch(err => {
          console.log(err);
      })

    axios.post('/includes/classes/3xxx/controllers/fabric.php?controller=getmanagerofprospect', form_data)
      .then(data => {
          this.pinnedManager = data.data[0] || null;
      })
      .catch(err => {
          console.log(err);
      })


  }
}
</script>

<style >
  .inline-text {
    white-space: nowrap;
  }
  .prospect {
    padding-top: 20px;
  }

  .details {
    padding: 10px;
  }

  .detail-header {
    margin:0!important;
  }

  .detail-p {
    margin:0!important;
  }

  .card-body {
    padding: 1.25rem!important;
  }
</style>
