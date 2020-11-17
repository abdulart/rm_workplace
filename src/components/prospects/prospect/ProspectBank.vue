<template>
  <div>
    <p>{{ name }} [{{ id }}]</p>
    <b-card
        header="header"
        header-bg-variant="default"
        bg-variant="light"
        class="text-center"
    >
      <template #header >
        Проспект банка
      </template>
      <b-card-text
          class="text-left"
      >
        Название: {{ name }}<br>
        Статус: {{ status }}<br>
        Важная информация: {{ importantInformation }}<br>
        CORP менеджер: {{ CORPManager }}<br>
        <b-btn v-on:click="enrichData">Обогатить данные</b-btn>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProspectBank",
  data(){
    return {
      name: '',
      id: null,
      status: '',
      importantInformation: '',
      CORPManager: '',
    }
  },
  methods: {
    enrichData() {
      console.log('Enrich data')
    },
  },
  mounted() {
    this.id = this.$route.params.id ? this.$route.params.id : null
        axios.get('/includes/classes/3xxx/controllers/fabric.php?controller=getclientinfo&client_id=' + this.id)
        .then(response => {
          this.name = response.data.name
        })
        .catch(error => {
          console.log(error);
        })
  }
}
</script>

<style scoped>

</style>
