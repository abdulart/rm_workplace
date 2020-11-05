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
        <div class="tab-pane fade" :class="{ 'active show': isActive('home') }" id="action">Action</div>
        <div class="tab-pane fade" :class="{ 'active show': isActive('profile') }" id="corp">Corp</div>
        <div class="tab-pane fade" :class="{ 'active show': isActive('contact') }" id="other">Other</div>
      </div>

    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "InAddition",
  data(){
    return {
      id: '',
      activeItem: '',
      comments: ''
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
    }
  },
  mounted() {
    this.id = this.$route.params.id
  }
}
</script>

<style scoped>

</style>
