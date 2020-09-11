<template>
  <div class="reorder-talbe">
    <b-card
      title="Распределение клиентов для активаторов"
    >
    <hr>
    <b-button variant="success" @click="saveDistribution">
      <b-spinner v-if="saving" small></b-spinner>
      <span v-else>Сохранить распределение</span>
     </b-button>
    <hr>
    <div class="row" style="margin: auto;">
      <div class="col" style="margin: 0 auto;" v-for="activator in activators" :key="activator.portal_counter">
        <b style="text-transform: capitalize;">{{fioToShort(activator.fio)}}</b>
        <draggable
          class="dragArea list-group"
          :list="activator.activatorsClients"
          @start="drag = true" 
          @end="drag = false"
          group="people"
        >
          <div class="list-group-item" style="font-size: 10px;" v-for="element in activator.activatorsClients" :key="element.uniquetin">
            <b>{{ cutNameIfLongerThan(element.name_short,20) }}</b> {{element.inn}} <i style="cursor:help;" :id="element.inn+'inf'"><b>?</b></i>
            <b-popover :target="element.inn+'inf'" style="font-size: 10px;">
              <template v-slot:title>{{element.name_short}}</template>
              Инн: {{element.inn}}
            </b-popover>
          </div>
        </draggable>
      </div>

    </div>
    </b-card>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import axios from 'axios'
  import helpers from '@/helpers'

let idGlobal = 8;
  export default {
    name: 'ReorderActivatorsTable',
    props: {user: Object},
    components: {
      draggable,
    },
    data() {
      return {
        list1: [
          { name: "Jesus", id: 1 },
          { name: "Paul", id: 2 },
          { name: "Peter", id: 3 }
        ],
        list2: [
          { name: "Luc", id: 5 },
          { name: "Thomas", id: 6 },
          { name: "John", id: 7 }
        ],
        controlOnStart: true,
        activators: [],
        clients: [],
        drag: false,
        saving: false,
      }
    },
    methods: {
      clone({ name }) {
        return { name, id: idGlobal++ };
      },
      pullFunction() {
        return this.controlOnStart ? "clone" : true;
      },
      start({ originalEvent }) {
        this.controlOnStart = originalEvent.ctrlKey;
      },
      saveDistribution()
      {
        if(this.saving) return false;
        
        let reducedClients = this.activators.reduce((prev, next) => {
          prev = prev.concat(next.activatorsClients.map(e => {
            let objRed = {};
            objRed.activatorCounter = next['counter'];
            objRed.inn = e['inn'];
            return objRed;
          }));
          return prev;
        },[]);
        

        let formData = new FormData();
        formData.append('clients', JSON.stringify(reducedClients));
        
        this.saving = true;
        axios.post(`/includes/classes/3xxx/controllers/fabric.php?controller=save_activators_clients`, formData)
          .then(data => {
            if(data.data =='success') {
              alert('Сохранено!');
              location.reload();
            } else {
              alert('Ошибка')
            }
          })
          .catch(err => {
            alert('Err: '+err);
          })
          .finally(() => this.saving = false)
      },
      fioToShort: helpers.fioToShort,
      cutNameIfLongerThan: helpers.cutNameIfLongerThan,
    },
    mounted() {
      axios.get(`/includes/classes/3xxx/controllers/fabric.php?controller=get_activators_clients`)
        .then(data => {
          let res = data.data || {activators: [], clients: []};
          this.clients = res.clients;
          this.activators = res.activators.map(e => {
            e.activatorsClients = this.clients.filter(client => client.portal_counter == e.counter);


            return e;
          });
          console.log(this.activators);
        })
        .catch(err => {
          console.log(err);
          alert('Ошибка!');
        })
    }
  }
</script>

<style >
   .list-group {
     display: block;
    min-height: 100px;
    background: #f7f7f7;
    padding-bottom: 20px;
   }
</style>