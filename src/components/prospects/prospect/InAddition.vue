<template>
  <b-card
      header="header"
      header-bg-variant="default"
      bg-variant="light"
      class="text-center"
  >
    <template #header >
      Дополнительно
    </template>
    <b-card-text>
      <hr>
      <div class="row">
        <div class="col-sm text-right">
          Долговая нагрузка (EBITDA/Капитал)<br>

        </div>
        <div class="col-sm text-right">
          Динамика продаж<br>

        </div>
        <div class="col-sm text-right">
          Динамика операционных продаж

        </div>
        <div class="col-sm text-right">
          Текущая ликвидность

        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-sm text-left">
          Свободный комментарий CORP<br>
          <textarea class="form-control" rows="4" v-model="comments"></textarea>
          <b-btn v-on:click="save">Сохранить</b-btn>
        </div>
      </div>

      <ul class="nav nav-tabs nav-justified">
        <li class="nav-item">
          <a class="nav-link" @click.prevent="setActive('home')" :class="{ active: isActive('home') }" href="#action">Запланированные активности</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="setActive('profile')" :class="{ active: isActive('profile') }" href="#corp">Завершенные активности CORP</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="setActive('contact')" :class="{ active: isActive('contact') }" href="#other">Завершенные активности Other</a>
        </li>
      </ul>
      <div class="tab-content py-3" id="myTabContent">
        <div class="tab-pane fade" :class="{ 'active show': isActive('home') }" id="action">
          <div class="container">
            <ul>
              <li class="text-left" v-for="item in this.activityPlan" :key="item" >{{ getDate(item.act_start_tiem) }} {{ item.executor_fio }} {{ item.executor_terofis }} {{ actResult(item.act_result) }} {{ item.act_zametka_text }}</li>
            </ul>
          </div>
        </div>
        <div class="tab-pane fade" :class="{ 'active show': isActive('profile') }" id="corp">
          <div class="container">
            <ul>
              <li class="text-left" v-for="item in this.activityCORP" :key="item" >{{ getDate(item.act_start_tiem) }} {{ item.executor_fio }} {{ item.executor_terofis }} {{ actResult(item.act_result) }} {{ item.act_zametka_text }}</li>
            </ul>
          </div>
        </div>
        <div class="tab-pane fade" :class="{ 'active show': isActive('contact') }" id="other">
          <div class="container">
            <ul>
              <li class="text-left" v-for="item in this.activityOther" :key="item" >{{ getDate(item.act_start_tiem) }} {{ item.executor_fio }} {{ item.executor_terofis }} {{ actResult(item.act_result) }} {{ item.act_zametka_text }}</li>
            </ul>
          </div>
        </div>
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
import axios from "axios";

export default {
  name: "InAddition",
  data(){
    return {
      id: '',
      activeItem: '',
      comments: '',
      activity: []
    }
  },
  methods: {
    isActive (menuItem) {
      return this.activeItem === menuItem
    },
    setActive (menuItem) {
      this.activeItem = menuItem
    },
    save(){
      console.log('save')
    },
    getDate(time){
      let date = new Date(time * 1000)
      return (date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear())
    },
    actResult(type){
      if(type === -1)
        return 'безуспешно'
      else if(type === 1)
        return 'успешно'
      else if(type === 2)
        return 'в работе'
    }
  },
  computed:{
    activityPlan: function (){
      return []
      //return this.activity.filter(i => i.act_result === 2)
    },
    activityCORP: function (){
      return this.activity.filter(i => i.act_result === 2)
    },
    activityOther: function (){
      return this.activity.filter(i => (i.act_result === 1 || i.act_result === -1))
    }
  },
  mounted() {
    this.id = this.$route.params.id
    axios.get('/includes/classes/3xxx/controllers/fabric.php?controller=getactivity&client_id=' . this.$route.params.id)
        .then(response => {
          this.activity = response.data
        })
        .catch(error => {
          console.log(error);
        })
  }
}
</script>

<style scoped>

</style>
