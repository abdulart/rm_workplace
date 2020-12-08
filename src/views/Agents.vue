<template>
  <div class="agents">
    <br>
    <h4 class="deck-header">Агентская схема</h4>
    <b-card>
      <template v-slot:header>
        <h4 class="mb-0">Список агентов
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
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>&nbsp;<strong>Загрузка...</strong>
          </div>
        </template>
        <template v-slot:cell(options)="data">
          <b-badge :variant="'secondary'" style="cursor:pointer" @click="editAgent(data)">изм.</b-badge>
        </template>
        <!-- 
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
        </template> -->
        <template v-slot:cell(sum_type)="data">
          <span class="">{{ data.value ? 'Да' : 'Нет' }}</span>
        </template>
        <template v-slot:cell(weekends)="data">
          <span class="">{{ data.value ? 'Да' : 'Нет' }}</span>
        </template>
      </b-table>
    </b-card>
    <b-modal v-model="showModal" id="modal-lg" size="lg" :title="`Изменить агента ${currentAgent.data.name} ${currentAgent.data.inn}`">
      <b-form-group
        label="Код ставки за остатки"
      >
        <b-form-input v-model="currentAgent.options.rates" trim></b-form-input>
      </b-form-group>
      <b-form-group
        label="Включать в расчет остатки на выходных"
      >
        <b-form-select style="width: 150px;" v-model="currentAgent.options.weekends" :options="[{ value: 0, text: 'Нет' },{ value: 1, text: 'Да' }]"></b-form-select>
      </b-form-group>
      <b-form-group
        label="Считать вознаграждение по лидам отдельно"
      >
        <b-form-select style="width: 150px;" v-model="currentAgent.options.sumType" :options="[{ value: 0, text: 'Нет' },{ value: 1, text: 'Да' }]" ></b-form-select>
      </b-form-group>

      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button @click="showModal = false" variant="danger" style="float:left;">Отмена</b-button>
          <b-button @click="saveAgent" variant="success" style="float:right;">
            <b-spinner v-if="saving" small></b-spinner>
            <span v-else>Сохранить</span>
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
// import Calendar from '@/components/common/calendar/Calendar.vue'
import axios from 'axios';

export default {
  name: 'Agents',
  components: {
    // Calendar
  },
  data() {
    return {
      saving: false,
      currentAgent: {
        options: {
          rates: '',
          sumType: 0,
          weekends: 0,
        },
        data: {},
      },
      showModal: false,
      busy: false,
      items: [],
      fields: [
        {key:'options', sortable: false, label: 'Настройка'},
        {key:'name', sortable: true, label: 'Агент'}, 
        {key:'inn', sortable: true, label: 'ИНН'},
        {key:'weekends', label: 'Ост. на выходных'},
        {key:'sum_type', label: 'Возн. по лидам отдельно'},
        {key:'rates', label: 'Код ставок'},
        {key:'leadsAmount', sortable: true, label: 'Кол-во лидов'},
      ],
    }
  },
  methods: {
    editAgent: function(data) {
      this.currentAgent.data = data.item;
      this.currentAgent.options.weekends = data.item.weekends;
      this.currentAgent.options.sumType = data.item.sum_type;
      this.currentAgent.options.rates = data.item.rates;
      this.showModal = true;
      console.log(data)
    },
    saveAgent: function() {
      this.saving = true;
      let formData = new FormData();
      formData.append('inn', this.currentAgent.data.inn);
      formData.append('sumType', this.currentAgent.options.sumType);
      formData.append('weekends', this.currentAgent.options.weekends);
      formData.append('rates', this.currentAgent.options.rates);
      axios.post('/includes/classes/3xxx/controllers/fabric.php?controller=save_agent', formData)
        .then(data => {
          if(data.data == 'success') {
            alert('Сохранено!');
            this.showModal = false;
            this.loadAgents();
          } else {
            alert('Ошибка!');
          }
        })
        .catch(err => {
          alert(`Ошибка!`);
          console.log(err);
        })
        .finally( () => {
          this.saving = false;
        })
    },
    loadAgents: function() {
      this.busy = true;
      axios.get('/includes/classes/3xxx/controllers/fabric.php?controller=get_agents')
          .then(data => {
              console.log(data)
              let res = data.data || [];
              // res = res.map(e => {
              //   e.fdateopen = e.fdateopen ? e.fdateopen.date.split(' ')[0] : ''
              //   return e
              // })
              this.items = res;
          })
          .catch(err => {
              console.log(err)
          })
          .finally(() => {
              this.busy = false;
          })
    }
  },
  mounted() {
    this.loadAgents();
  }
}
</script>

<style>
  .deck-container {
    padding: 0.5rem 1.5rem 1.5rem 1.5rem;
    margin-right: 0;
    margin-left: 0;
    border-width: .2rem;
    border: solid #f8f9fa;
    background: #fff;
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