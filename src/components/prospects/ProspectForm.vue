<template>
  <div class="prospect">
    <prospect-bank></prospect-bank>
    <br>
    <business-line></business-line>
    <br>
    <attribute-company></attribute-company>
    <br>
    <financial-info></financial-info>
    <br>
    <Structure></Structure>
    <br>
    <Contacts></Contacts>
    <br>
    <in-addition></in-addition>
    <br>
    <meeting></meeting>
    <br>


    <b-modal id="modal-1" title="Добавить активность" hide-footer>
      <Meeting :id="parseInt(queryId)" :uid="uid"/>
      <b-button class="mt-3" block @click="$bvModal.hide('modal-1')">Отмена</b-button>
    </b-modal>
  </div>
</template>

<script>
import ProspectBank from "@/components/prospects/prospect/ProspectBank";
import BusinessLine from "@/components/prospects/prospect/BusinessLine";
import AttributeCompany from "@/components/prospects/prospect/AttributeCompany";
import FinancialInfo from "@/components/prospects/prospect/FinancialInfo";
import Structure from "@/components/prospects/prospect/Structure";
import Contacts from "@/components/prospects/prospect/Contacts";
import InAddition from "@/components/prospects/prospect/InAddition";
import Meeting from "@/components/prospects/prospect/Meeting";
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'ProspectForm',
  components: {
    FinancialInfo,
    ProspectBank,
    BusinessLine,
    AttributeCompany,
    Structure,
    Contacts,
    InAddition,
    Meeting,
  },
  data() {
    return {
      name: 'ООО "Эколайн"',
      id: 40454,

      filter: '',
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
      activities: [],
      activitiesFields: [
        { key: 'act_end_time', label: 'Дата', sortable: true, sortDirection: 'asc' },
        { key: 'fio', label: 'Имя КМ', sortable: true, sortDirection: 'asc' },
        { key: 'act_type', label: 'Тип', sortable: true, sortDirection: 'asc' },
        { key: 'act_result', label: 'Статус', sortable: true, sortDirection: 'asc' },

        { key: 'a_id', label: 'Дет.' },
      ],
      tabsActivityResults: {
        '-1': {variant: 'danger', text: 'Rej.', key: 'rej'},
        '2': {variant: 'secondary', text: 'InProc.', key: 'inProc'},
        '1': {variant: 'success', text: 'Succ.', key: 'succ'},
        '0': {variant: 'warning', text: 'Plan.', key: 'planned'},
      },
      tabsActivityTypes: {
        '0': {variant: 'secondary', text: 'Звонок', key: 'call'},
        '1': {variant: 'primary', text: 'Встреча', key: 'meeting'},
      }
    }
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
    showActDetails(id) {
      console.log(id);
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
  mounted() {
    this.id = this.$route.params.id || null;
    this.queryId = this.$route.params.id || null;
    this.uid = this.$cookies.get('corp_counter') || -1;
    let form_data = new FormData();
    form_data.append('id', this.queryId);
    axios.post('/includes/classes/3xxx/controllers/fabric.php?controller=getprospect', form_data)
      .then(data => {
        let res = data.data || [];
        res = res[0] || [];
        this.fields.forEach(e => {
          this.prospect.push({
            name: e['name'],
            value: res[e.key],
            key: e.key,
          })
        })
      })
      .catch(err => {
        console.log(err);
        this.fields.forEach(e => {
          this.prospect.push({
            name: e['name'],
            value: '',
            key: e.key,
          })
        })
      })

    axios.post('/includes/classes/3xxx/controllers/fabric.php?controller=getprospectactivities', form_data)
      .then(data => {
          this.activities = data.data.done;
      })
      .catch(err => {
          console.log(err);
          /**
           * to remove
           */
          import('@/helpers/dummyroutes')
            .then(data => {
              this.activities = data.pAct
            })
          // console.log(this.doneActivities);
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
