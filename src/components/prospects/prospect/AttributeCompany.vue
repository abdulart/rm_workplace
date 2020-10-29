<template>
  <div>
    <b-card
        header="header"
        header-bg-variant="default"
        bg-variant="light"
        class="text-center"
    >
      <template #header >
        Атрибуты компании
      </template>
      <b-card-text
          class="text-left"
      >
        <div class="container">
          <hr>
          <div class="row">
            <hr>
            <div class="col-sm text-right">
              ИНН<br>
              {{ attribute.inn }}
            </div>
            <div class="col-sm text-right">
              Регион<br>
              {{attribute.region}}
            </div>
            <div class="col-sm text-right">
              Суб-регион<br>
              {{ attribute.subRegion}}
            </div>
            <div class="col-sm text-right">
              Город
              {{ attribute.city }}
            </div>
          </div>
          <hr>
          <div class="row">
            <hr>
            <div class="col-sm text-right">
              Потенциальный суб-сегмент<br>
              {{ attribute.subSegment }}
            </div>
            <div class="col-sm text-right">
              Группа<br>
              {{ attribute.group }}
            </div>
            <div class="col-sm text-right">
              Субъект МСП<br>
              {{ attribute.subjectMSP }}
            </div>
            <div class="col-sm text-right">
              Программа 8.5<br>
              {{ attribute.program85 }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm text-right">
              Стоимость импорта, USD<br>
              {{ attribute.costImport }}
            </div>
            <div class="col-sm text-right">
              Стоимость экспорта, USD
              {{ attribute.costExport }}
            </div>
            <div class="col-sm text-right">
              Банки, обсулижвающие ВЭД<br>
              {{ attribute.banksVED }}
            </div>
            <div class="col-sm text-right">
              Вид деятельности<br>
              {{ attribute.typeOfActivity }}
            </div>
          </div>
          <hr>
          <div class="row">
            Дополнительная информация<br>
            <textarea class="form-control" rows="4" v-model="attribute.dopInfo"></textarea>
            <b-btn v-on:click="saveDopInfo">Сохранить</b-btn>
          </div>
          <hr>
          <div class="row">
            Списки к проработке <small><i>Развернуть</i></small>
          </div>
          <hr>
          <div class="row">
            Детали <small><i>Развернуть</i></small>
          </div>
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
name: "AttributeCompany",
  data(){
    return {
      id: null,
      attribute:{
        inn: 234234324,
        region: '',
        subRegion: '',
        city: '',
        subSegment: '',
        group: '',
        subjectMSP: '',
        program85: '',
        costImport: '',
        costExport: '',
        banksVED: '',
        typeOfActivity: '',
        dopInfo: '',
      },
    }
  },
  mounted() {
    this.id = this.$route.params.id
  },
  methods:{
    saveDopInfo(){
      console.log('save')
    }
  }
}
</script>

<style scoped>

</style>
