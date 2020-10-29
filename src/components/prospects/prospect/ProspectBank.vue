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
        {{ name }}<br>
        Статус: {{ status }}<br>
        Важная информация: {{ importantInformation }}<br>
        CORP менеджер: {{ CORPManager }}<br>
        <b-btn v-on:click="enrichData">Обогатить данные</b-btn>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "ProspectBank",
  data(){
    return {
      name: 'ООО "Эколайн"',
      id: null,
      status: 'Free',
      importantInformation: 'Отсутствует',
      CORPManager: 'Отсутствует',
    }
  },
  methods: {
    enrichData() {
      console.log('Enrich data')
    },
  },
  mounted() {
    this.id = this.$route.params.id
  }
}
</script>

<style scoped>

</style>
