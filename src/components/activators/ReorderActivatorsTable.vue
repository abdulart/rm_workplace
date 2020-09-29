<template>
  <div class="reorder-talbe">
    <b-card>
    <template v-slot:header>
            <h4 class="mb-0">Распределение клиентов для активаторов</h4>
        </template>
      <b-overlay :show="loadingActs" rounded="sm">
        <b-button variant="success" @click="saveDistribution">
          <b-spinner v-if="saving" small></b-spinner>
          <span v-else>Сохранить распределение</span>
        </b-button>
        <hr>
        <div class="row" style="margin: auto;">
          <div class="col" style="margin: 0 auto;" v-for="activator in activators" :key="activator.portal_counter">
            <b style="text-transform: capitalize;">{{fioToShort(activator.fio)}} ({{activator.activatorsClients.length}})</b>
            <draggable
              class="dragArea list-group"
              :list="activator.activatorsClients"
              @start="drag = true" 
              @end="drag = false"
              group="people"
            >
              <div :style="{backgroundColor: colors[element.status || 0]}" class="list-group-item" style="font-size: 10px;" v-for="element in activator.activatorsClients" :key="element.uniquetin">
                <b>{{ cutNameIfLongerThan(element.name_short,20) }}</b> {{element.inn}} <i style="cursor:help;" :id="element.inn+'inf'"><b>?</b></i>
                <b-popover :target="element.inn+'inf'" style="font-size: 10px;" triggers="hover">
                  <template v-slot:title>{{element.name_short}}</template>
                  Инн: {{element.inn}}
                </b-popover>
              </div>
            </draggable>
          </div>

        </div>
      </b-overlay>
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
        colors: ['#ff6a6a','#ffb13b','#62ff3b','#c1c1c1'],
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
        loadingActs: false,
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
      this.loadingActs = true;
      axios.get(`/includes/classes/3xxx/controllers/fabric.php?controller=get_activators_clients`)
        .then(data => {
          let res = data.data || {activators: [], clients: []};
          this.clients = res.clients;
          this.activators = res.activators.map(e => {
            e.activatorsClients = this.clients.filter(client => client.portal_counter == e.counter).sort((a,b) => a.status - b.status);


            return e;
          });
          console.log(this.activators);
        })
        .catch(err => {
          console.log(err);
          alert('Ошибка!');
        })
        .finally(() => this.loadingActs = false);
    }
  }
</script>

<style >
   .list-group {
     display: block;
    min-height: 100px;
    max-height: 700px;
    overflow-y: scroll;
    background: #f7f7f7;
    padding-bottom: 20px;
   }
</style>