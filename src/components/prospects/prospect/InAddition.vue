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
          Свободный комментарий CORP
        </div>
      </div>

    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "InAddition"
}
</script>

<style scoped>

</style>
