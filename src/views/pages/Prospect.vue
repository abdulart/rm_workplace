<template>
  <div class="prospect">
    <br>
    <div class="month-container">
      <h6><b class="text-muted">{{prospect.name}}</b></h6>
    </div>
    <b-card-group deck>
      <b-card no-body class="dash-vidget noborder text-left">
         <h6 class="border-bottom border-gray pb-2 mb-0">Проспект</h6>
         <div class="media text-muted pt-1">
            <!-- <svg class="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg> -->
            <p class="media-body pb-1 mb-0 small lh-125 border-bottom border-gray">
              <strong class="d-block text-gray-dark">CORP-менеджер</strong>
              <span v-if="pinnedManager">{{pinnedManager.name}}<b v-if="pinnedManager.uid != this.user.counter" @click="pinOnMe" style="cursor:pointer;text-decoration:underline;"><i>&nbsp;Закрепить за собой</i></b></span>
              <span v-else><b @click="pinOnMe" style="cursor:pointer;text-decoration:underline;"><i>&nbsp;Закрепить за собой</i></b></span>
            </p>
          </div>
          <div class="media text-muted pt-1">
            <!-- <svg class="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg> -->
            <p class="media-body pb-1 mb-0 small lh-125 border-bottom border-gray">
              <strong class="d-block text-gray-dark">Статус взаимоотношений</strong>
              <!-- {{prospect.inn}} -->Проспект
            </p>
          </div>
          <div class="media text-muted pt-1">
            <!-- <svg class="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg> -->
            <p class="media-body pb-1 mb-0 small lh-125 border-bottom border-gray">
              <strong class="d-block text-gray-dark">Группа</strong>
              <!-- {{prospect.inn}} -->Неизвестно
            </p>
          </div>
          <div class="media text-muted pt-1">
            <!-- <svg class="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg> -->
            <p class="media-body pb-1 mb-0 small lh-125 border-bottom border-gray">
              <strong class="d-block text-gray-dark">Важная информация</strong>
              {{prospect.dadata ? (prospect.dadata.data ? (prospect.dadata.data.state ? (prospect.dadata.data.state.liquidation_date || 'Отсутствует') : 'Отсутствует') : 'Отсутствует') : 'Отсутствует'}}
            </p>
          </div>
          <div class="media text-muted pt-1">
            <p class="media-body pb-1 mb-0 small lh-125 border-bottom border-gray">
              <strong class="d-block text-gray-dark">Обслуживающие банки</strong>
              {{prospect.data.wed_banks}}
            </p>
          </div>
      </b-card>

      <b-card no-body class="dash-vidget noborder text-left">
        <!-- {{prospect.dadata}} -->
          <h6 class="border-bottom border-gray pb-2 mb-0">Информация</h6>
          <div class="media text-muted pt-1">
            <!-- <svg class="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg> -->
            <p class="media-body pb-1 mb-0 small lh-125 border-bottom border-gray">
              <strong class="d-block text-gray-dark">ИНН</strong>
              {{prospect.inn}}
            </p>
          </div>
          <div class="media text-muted pt-1">
            <p class="media-body pb-1 mb-0 small lh-125 border-bottom border-gray">
              <strong class="d-block text-gray-dark">Адрес</strong>
              {{prospect.dadata ? (prospect.dadata.data ? (prospect.dadata.data.address ? (prospect.dadata.data.address.value) : '') : '') : ''}}
            </p>
          </div>
          <div class="media text-muted pt-1">
            <p class="media-body pb-1 mb-0 small lh-125 border-bottom border-gray">
              <strong class="d-block text-gray-dark">ЛПР</strong>
              {{prospect.data.management_post}} {{prospect.data.management_name}}
            </p>
          </div>
          <div class="media text-muted pt-1">
            <!-- <svg class="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg> -->
            <p class="media-body pb-1 mb-0 small lh-125 border-bottom border-gray">
              <strong class="d-block text-gray-dark">Телефоны</strong>
              {{prospect.data.contact_phones_array ? 
              JSON.parse(prospect.data.contact_phones_array).map(e => "+"+e.phone).slice(0,3).join('; ')
              : ''
              }}
            </p>
          </div>
          <div class="media text-muted pt-1">
            <!-- <svg class="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg> -->
            <p class="media-body pb-1 mb-0 small lh-125 border-bottom border-gray">
              <strong class="d-block text-gray-dark">Вебсайт</strong>
              {{prospect.data.contact_website}}
            </p>
          </div>
          <div class="media text-muted pt-1">
            <!-- <svg class="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg> -->
            <p class="media-body pb-1 mb-0 small lh-125 border-bottom border-gray">
              <strong class="d-block text-gray-dark">Email</strong>
              {{prospect.data.contact_email}}
            </p>
          </div>
      </b-card>

    </b-card-group>

    <br>
    <div class="month-container">
      <h6><b class="text-muted">Активности</b></h6>
    </div>
    <b-card-group deck>
      <b-card no-body class="dash-vidget noborder text-center">
        <b-badge variant="primary" style="cursor: pointer;width: 90px;font-size: 14px;" v-b-modal.modal-add-activity>Добавить</b-badge>
        <b-table  
          striped
          hover 
          responsive
          sticky-header="300px"
          :busy="busy"
          :fields="activitiesFields"
          :items="activities" class="rm-table">
            <template v-slot:table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>&nbsp;<strong>Загрузка...</strong>
              </div>
            </template>
            <template v-slot:cell(act_end_time)="row">
              <span class="text-muted">{{getDateFromUnix(row.item.act_end_time)}}</span>
            </template>
            <template v-slot:cell(act_zametka_text)="row">
              <b-badge variant="secondary" v-b-popover.hover.top="row.value">комм.</b-badge>
            </template>
            <template v-slot:cell(fio)="row">
              <span style="text-transform: capitalize;">{{fioToShort(row.value)}} <small>({{businessLines[row.item.group_id]}})</small></span>
            </template>
            <template v-slot:cell(act_type)="row">
              <span class="text-muted">{{row.item.act_type ? 'Встреча' : 'Звонок'}}</span>
            </template>
            <template v-slot:cell(act_result)="row">
              <b-badge :variant="resArr[row.item.act_result].variant">{{resArr[row.item.act_result].text}}</b-badge>
            </template>
            <template #empty>
              <h4>Нет активностей</h4>
            </template>
        </b-table>
      </b-card>
    </b-card-group>


    <b-modal id="modal-add-activity" title="Добавить активность" hide-footer>
      <AddMeeting :id="parseInt(id)" :uid="user.counter"/>
      <b-button class="mt-3" block @click="$bvModal.hide('modal-add-activity')">Отмена</b-button>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
//import ProspectForm from '@/components/prospects/ProspectForm.vue'
import AddMeeting from "@/components/partials/AddMeeting";
import axios from 'axios';
import moment from 'moment';
import helpers from '@/helpers';

export default {
  name: 'Prospect',
  props: {user: Object},
  components: {
    AddMeeting
  },
  data() {
    return {
      businessLines: {
        1: 'PRO',
        2: 'Payroll',
        3: 'Premium',
        4: 'CORP',
      },
      id: 0,
      busy: false,
      activities: [],
      activitiesFields: [
        {key: 'act_type', sortable: true, label: 'Тип'},
        {key: 'act_result', sortable: true, label: 'Результат'},
        {key: 'act_end_time', sortable: true, label: 'Дата'},
        {key: 'act_zametka_text', label: 'Коммент'},
        {key: 'fio', sortable: true, label: 'Менеджер + Б.Л.'}
      ],
      prospect: {
        name: '',
        inn: '',
        dadata: {},
        data: {},
      },
      resArr: {
        '1': {text: 'Успех', variant: 'success'},
        '-1': {text: 'Отказ', variant: 'danger'},
        '2': {text: 'В работе', variant: 'warning'},
      },
      pinnedManager: null,
    }
  },
  methods: {
    fioToShort: helpers.fioToShort,
    getDateFromUnix: function(unix, format='HH:mm DD.MM.YYYY') {
      return moment.unix(unix).format(format);
    },
    pinOnMe() {
      if(!confirm('Вы уверены, что хотите закрепить этот проспект за собой?')) return false;
      let form_data = new FormData();
      form_data.append('id', this.id);
      form_data.append('uid', this.user.counter);
      axios.post('/includes/classes/3xxx/controllers/fabric.php?controller=pinprospect', form_data)
        .then(data => {
          alert(data.data ? 'Успешно закреплен!' : 'Ошибка!')
          this.loadProspect(this.id);
        })
        .catch(err => {
          console.log(err);
        })
    },
    loadActivities: function() {
      this.busy = true;
      let formData = new FormData();
      formData.append('id', this.id);
      axios.post('/includes/classes/3xxx/controllers/fabric.php?controller=getprospectactivities', formData)
      .then(data => {
          this.activities = data.data.done || [];
      })
      .catch(err => {
          console.log(err);
      })
      .finally(() => {
        this.busy = false;
      })
    },
    loadProspect: function(id) {
      let formData = new FormData();
      formData.append('id', id);
      axios.post('/includes/classes/3xxx/controllers/fabric.php?controller=getmanagerofprospect', formData)
      .then(data => {
          this.pinnedManager = data.data[0] || null;
      })
      .catch(err => {
          console.log(err);
      })

      axios.post('/includes/classes/3xxx/controllers/fabric.php?controller=getprospect', formData)
        .then(data => {
          let res = data.data[0] || {};
          this.prospect.name = res.name;
          this.prospect.inn = res.inn;
          this.prospect.data = res;
          if(!res.inn) {
            alert('У данного проспекта отсутствует ИНН! Обратитесь к администратору.');
            return false;
          }
          console.log(res);
          const url = "https://hfl:8443/suggestions/api/4_1/rs/findById/party";
          const query = this.prospect.inn;

          let options = {
              method: "POST",
              mode: "cors",
              headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json",
              },
              body: JSON.stringify({query: query})
          }

          return fetch(url, options)
        })
        .then(response => response.text())
        .then(data => {
          this.prospect.dadata = JSON.parse(data).suggestions[0] || {};
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  mounted() {
    this.id = this.$route.params.id || 0;
    this.loadProspect(this.id);
    this.loadActivities();
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