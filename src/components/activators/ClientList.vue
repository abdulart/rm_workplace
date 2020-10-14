<template>
  <div class="client_list">
    <b-card>
      <template v-slot:header>
        <h4 class="mb-0">Клиенты новой базы на активации
          <b-button variant="success" style="float:right;font-size: 10px;" size="sm" @click="toExcel">
            <b-icon icon="file-earmark-spreadsheet" aria-hidden="true"></b-icon>
          </b-button>&nbsp;
          <!-- <b-button style="float:right;font-size: 10px;" size="sm" @click="updateClients">
            <b-spinner v-if="clientsUpdating" small></b-spinner>
            <b-icon v-else icon="arrow-clockwise" aria-hidden="true"></b-icon>
          </b-button> -->
        </h4>
      </template>
      <b-table  
      striped
      hover 
      responsive
      sticky-header="700px"
      :busy="busy"
      :fields="fields"
      :items="items" class="rm-table">
        <template v-slot:thead-top>
          <b-tr >
            <b-th style="background:#bdbdbd; text-align:left;" colspan="10">Всего: {{items.length}}</b-th>
            <b-th style="background:#bdbdbd;" colspan="1">{{items.filter(e => e.status > 0).length}}</b-th>
            <b-th style="background:#bdbdbd;" colspan="1">{{items.filter(e => e.status == 2).length}}</b-th>
            <b-th style="background:#bdbdbd;" colspan="1">{{items.filter(e => e.activeStatus === 'active').length}}</b-th>
          </b-tr>
        </template>
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>&nbsp;<strong>Загрузка...</strong>
        </div>
      </template>
      <template v-slot:cell(status)="data">
        <b-badge :variant="workStatuses[data.item.status || 0].variant" style="cursor:pointer" @click="getClientsWorkObject({id: data.item.clientId, name: data.item.name_short, inn: data.item.uniquetin, status: data.item.status})">{{workStatuses[data.item.status || 0].text}}</b-badge>
      </template>
      <template v-slot:cell(worked)="data">
        <span class="fio">{{ data.value }}</span>
      </template>
      <template v-slot:cell(presentation)="data">
        <span class="fio">{{ data.value }}</span>
      </template>
      <template v-slot:cell(rmName)="data">
        <span class="fio">{{ fioToShort(data.value) }}</span>
      </template>
      <template v-slot:cell(fio)="data">
        <span class="fio">{{ fioToShort(data.value) }}</span>
      </template>
      <template v-slot:cell(name_short)="data">
        <span v-if="data.value.length < 20">
          {{ cutNameIfLongerThan(data.value, 20) }}</span>
        <span v-b-popover.hover.right="data.value" title="Клиент" v-else>
          {{ cutNameIfLongerThan(data.value, 20) }}</span>
      </template>
      <template v-slot:cell(groupname)="data">
        <span v-if="data.value.length < 20">
          {{ cutNameIfLongerThan(data.value, 20) }}</span>
        <span v-b-popover.hover.right="data.value" title="Группа" v-else>
          {{ cutNameIfLongerThan(data.value, 20) }}</span>
      </template>
      </b-table>
    </b-card>
    <b-modal v-model="showModal" id="modal-lg" size="lg" title="Статус отработки">
      <div class="modal-content-actv">
        <p>Инн: <b>{{selectedClient.inn}}</b></p>
        <p>Название: <b>{{selectedClient.name}}</b></p>
        <b-form-group
          label="Последний статус"
          class="mt-3"
        >
          <b-form-select  size="sm" v-model="modalSelect" :options="options"></b-form-select>
        </b-form-group>
        <b-form-group
          label="Комментарий"
        >
          <b-form-textarea
            v-model="modalText"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
        <div style="
        font-size: 10px;
        background: #f7f7f7;
        padding: 10px;
        ">
        <p><b>История:</b></p>
          <div style="
          max-height: 200px;
          overflow-y: scroll;
          ">
            <ul style="list-style-type: none;">
              <li v-for="act in selectedClient.prevActs" :key="act.id">
                <p style="margin-bottom:0!important;margin-top:5px;">{{act.ts_created.date.split('.')[0]}} <b>{{workStatuses[act.status || 0].text}}</b> <span style="text-transform: capitalize;">{{fioToShort(act.fio)}}</span></p><i style="margin-left: 5px; white-space: pre-wrap;">{{act.comment}}</i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button @click="showModal = false" variant="danger" style="float:left;">Отмена</b-button>
          <b-button @click="saveClientWork" variant="success" style="float:right;">Сохранить</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
  const axios = require('axios');
  export default {
    name: 'ClientList',
    props: {user: Object},
    data() {
      return {
        busy: false,
        clientsUpdating: false,
        items: [],
        fields: [
          {key:'status', sortable: true, label: 'Статус'}, 
          {key:'fio', sortable: true, label: 'Активатор'},
          {key:'groupname', sortable: true, label: 'Группа'},
          {key:'name_short', sortable: true, label: 'Название'},
          {key:'uniquetin', sortable: true, label: 'ИНН'},
          {key:'region', sortable: true, label: 'М.Рег'}, 
          {key:'subregion', sortable: true, label: 'С.Рег'},
          {key:'subsegment', sortable: true, label: 'Сегмент'},
          {key:'rmName', sortable: true, label: 'PCRU'},
          {key:'fdateopen', sortable: true, label: 'Дата откр.'},
          {key:'worked', sortable: true, label: 'Отработали'},
          {key:'presentation', sortable: true, label: 'Преза'},
          {key:'activeStatus', sortable: true, label: 'Активен'},
        ],
        options: [
          { value: null, text: 'Не связывались' },
          { value: 1, text: 'В работе' },
          { value: 2, text: 'Провели презу' },
          { value: 3, text: 'On hold' },
        ],
        showModal: false,
        modalSelect: null,
        modalText: '',
        selectedClientId: null,
        selectedClient: {
          id: null,
          inn: null,
          name: null,
          prevActs: [],
        },
        workStatuses: {0: {text: 'Не связывались', variant: 'danger'}, 1: {text: 'В работе', variant: 'warning'}, 2: {text: 'Провели презу', variant: 'success'}, 3: {text: 'On hold', variant: 'secondary'}}
      }
    },
    methods: {
      updateClients() {
        if(this.clientsUpdating) return false;
        this.clientsUpdating = true;
        axios.get(`/includes/classes/3xxx/controllers/fabric.php?controller=update_activators_list`)
              .then(data => {
                if(data.data === 'success') {
                  alert('Обновлено!');
                  location.reload();
                } else {
                  alert('Ошибка обновления!');
                  return false;
                }
              })
              .catch(err => {
                alert('Ошибка: ' + err);
                return false;
              })
              .finally(() => {
                this.clientsUpdating = false;
              })
      },
      toExcel() {

      },
      fioToShort(fio, del = ' ') {
        try {
            if(!fio) return '';
            let [a, b, c] = fio.split(del);
            
            return `${a || ''}${(b ? ' '+b.substr(0,1)+'.' : '')}${(c ? ' '+c.substr(0,1)+'.' : '')}`.toLowerCase();
        } catch (e) {
            console.log(e, fio);
            return fio;
        }
      },
      cutNameIfLongerThan(string, length = 30, ending = '...')
      {
        if(string.length < length) return string;
        else {
          return string.substr(0, length)+ending;
        }
      },
      getClientsWorkObject(obj = {id: null, name: null, inn: null, status: null})
      {
        this.selectedClientId = obj.id;
        this.selectedClient.id = obj.id;
        this.selectedClient.inn = obj.inn;
        this.selectedClient.name = obj.name;
        this.modalSelect = obj.status;
        axios.get(`/includes/classes/3xxx/controllers/fabric.php?controller=get_clients_work&id=${this.selectedClientId}`)
          .then(data => {
            this.selectedClient.prevActs = data.data;
            this.showModal = true;
          })
          .catch(err => {
            console.log(err);
            alert('Ошибка!');
          })
      },
      saveClientWork()
      {
        if(confirm('Вы уверены, что хотите сохранить новую активность?')) {
          if(!this.selectedClient.id) {
            alert('Ошибка клиентского id');
            return false;
          } else {
            let formData = new FormData();
            formData.append('status', this.modalSelect);
            formData.append('comment', this.modalText);
            axios.post(`/includes/classes/3xxx/controllers/fabric.php?controller=save_clients_work&id=${this.selectedClient.id}&portal_counter=${this.user.counter}`,formData)
              .then(data => {
                if(data.data === 'success') {
                  alert('Ок!');
                  location.reload();
                } else {
                  alert('Ошибка сохранения активности!');
                  return false;
                }
              })
              .catch(err => {
                alert('Ошибка: ' + err);
                return false;
              })
            }
        
        }
      }
    },
    mounted() {
        this.busy = true;
        axios.get('/includes/classes/3xxx/controllers/fabric.php?controller=get_activators')
            .then(data => {
                console.log(data)
                let res = data.data || [];
                res = res.map(e => {
                  e.fdateopen = e.fdateopen ? e.fdateopen.date.split(' ')[0] : ''
                  return e
                })
                this.items = res;
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                this.busy = false;
            })
    }
  }
</script>

<style >
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
        padding: .1rem!important;
        text-align: center;
        border-top: 1px solid #eee;
    }

</style>