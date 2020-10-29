<template>
  <div>
    <b-card
        header="header"
        header-bg-variant="default"
        bg-variant="light"
        class="text-center"
    >
      <template #header >
        Финансовая информация
      </template>
      <b-card-text
          class="text-left"
      >
        <div class="container">
          <hr>
          <div class="row">
            <div class="col-sm text-right">
              Выручка
            </div>
            <div class="col-sm text-right">
              Размер
            </div>
            <div class="col-sm text-right">
              Количество сотрудников
            </div>
            <div class="col-sm text-right">
              Кредитный рейтинг
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm text-right">
              Текущий ФОТ
            </div>
            <div class="col-sm text-right">
              Текущий ЗП Банка
            </div>
            <div class="col-sm text-right"></div>
            <div class="col-sm text-right"></div>
          </div>
          <div class="row">
            Счета в других банках (Найдено )
          </div>
        </div>

      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "FinancialInfo",
  data(){
    return {
      id: null
    }
  },
  mounted() {
    this.id = this.$route.params.id
  }
}
</script>

<style scoped>

</style>
