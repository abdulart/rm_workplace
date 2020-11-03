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
              {{ this.cSubSegment }}
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
import axios from "axios";

export default {
name: "AttributeCompany",
  data(){
    return {
      id: null,
      attribute:{
        inn: '',
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
        revenueForTheYear: ''
      },
    }
  },
  mounted() {
    this.id = this.$route.params.id
    axios.get('/includes/classes/3xxx/controllers/fabric.php?controller=attributecompany&client_id=' . this.$route.params.id)
        .then(response => {
          this.attribute.inn = response.data.inn
          this.attribute.region = response.data.corp_region
          this.attribute.subRegion = response.data.corp_sub_region
          this.attribute.city = response.data.corp_city
          this.attribute.subSegment = ''
          this.attribute.group = response.data.corp_group
          this.attribute.subjectMSP = ''
          this.attribute.program85 = ''
          this.attribute.costImport = response.data.import
          this.attribute.costExport = response.data.export
          this.attribute.banksVED = response.data.banks
          this.attribute.typeOfActivity = response.data.okved_vid_deyatelnosti
          this.attribute.dopInfo = response.data.corp_additional_data
          this.attribute.revenueForTheYear = response.data.vyruchkaZaGod
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
  },
  computed:{
    cSubSegment: function (){
      if(this.attribute.revenueForTheYear <= 40000000)
        this.attribute.subSegment = 'PRO'
      else if(this.attribute.revenueForTheYear > 40000000 && this.attribute.revenueForTheYear <= 4000000000)
        this.attribute.subSegment = 'MidCap'
      else if(this.attribute.revenueForTheYear > 4000000000 && this.attribute.revenueForTheYear <= 16000000000)
        this.attribute.subSegment = 'Tier 2'
      else if(this.attribute.revenueForTheYear > 16000000000 && this.attribute.revenueForTheYear <= 500000000000)
        this.attribute.subSegment = 'Tier 1.2'
      else
        this.attribute.subSegment = 'Tier 1.1'
    }
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
