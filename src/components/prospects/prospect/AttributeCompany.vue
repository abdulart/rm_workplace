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
            Детали <small><i v-if="!detailShow" v-on:click="detailShow = !detailShow">Развернуть</i></small><br>
            <small><i v-if="detailShow" v-on:click="detailShow = !detailShow">Скрыть</i></small><br>
            <div><br>
              <ul v-show="this.detailShow">
                <li>ОГРН: {{ this.attribute.ogrn }}</li>
                <li>ОКВЭД: {{ this.attribute.okved }}</li>
                <li>Номер проспекта: {{ this.attribute.numberProspect }}</li>
                <li>КПП: {{ this.attribute.kpp }}</li>
                <li>ОКПО: {{ this.attribute.okpo }}</li>
                <li>ОКОПФ: {{ this.attribute.okopf }}</li>
                <li>ОКТМО: {{ this.attribute.oktmo }}</li>
                <li>ОКФС: {{ this.attribute.okfs }}</li>
                <li>ОКОГУ: {{ this.attribute.okogu }}</li>
                <li>ОКАТО: {{ this.attribute.okato }}</li>
              </ul>
            </div>
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
        revenueForTheYear: '',
        cSubSegment: '',
        ogrn: '',
        okved: '',
        numberProspect: '',
        kpp: '',
        okpo: '',
        okopf: '',
        oktmo: '',
        okfs: '',
        okogu: '',
        okato: '',
      },
      listShow: false,
      detailShow: false
    }
  },
  mounted() {
    this.id = this.$route.params.id ? this.$route.params.id : null
        this.attribute.numberProspect = '№' + this.id
    axios.get('/includes/classes/3xxx/controllers/fabric.php?controller=attributecompany&client_id=' + this.id)
        .then(response => {
          this.attribute.inn = response.data[0].inn
          this.attribute.region = response.data[0].corp_region
          this.attribute.subRegion = response.data[0].corp_sub_region
          this.attribute.city = response.data[0].corp_city
          this.attribute.subSegment = ''
          this.attribute.group = response.data[0].corp_group
          this.attribute.subjectMSP = ''
          this.attribute.program85 = ''
          this.attribute.costImport = response.data[0].import
          this.attribute.costExport = response.data[0].export
          this.attribute.banksVED = response.data[0].banks
          this.attribute.typeOfActivity = response.data[0].okved_vid_deyatelnosti
          this.attribute.dopInfo = response.data[0].corp_additional_data
          this.attribute.revenueForTheYear = response.data[0].vyruchkaZaGod
          this.attribute.ogrn = response.data[0].ogrn
          this.attribute.okved = response.data[0].okved_all
          this.attribute.kpp = response.data[0].code_kpp
          this.attribute.okpo = response.data[0].code_okpo
          this.attribute.okopf = response.data[0].code_okopf
          this.attribute.oktmo = response.data[0].code_oktmo
          this.attribute.okfs = response.data[0].code_okfs
          this.attribute.okogu = response.data[0].code_okogu
          this.attribute.okato = response.data[0].code_okato
        })
        .catch(error => {
          console.log(error);
        })
  },
  computed:{
    cSubSegment: function (){
      let cSubSeg = ''
      if(this.attribute.revenueForTheYear <= 40000000)
        cSubSeg = 'PRO'
      else if(this.attribute.revenueForTheYear > 40000000 && this.attribute.revenueForTheYear <= 4000000000)
        cSubSeg = 'MidCap'
      else if(this.attribute.revenueForTheYear > 4000000000 && this.attribute.revenueForTheYear <= 16000000000)
        cSubSeg = 'Tier 2'
      else if(this.attribute.revenueForTheYear > 16000000000 && this.attribute.revenueForTheYear <= 500000000000)
        cSubSeg = 'Tier 1.2'
      else
        cSubSeg = 'Tier 1.1'

      return cSubSeg
    }
  },
  methods:{
    saveDopInfo(){

      let form_data = new FormData();
      form_data.append('additional_data', this.attribute.dopInfo)
      form_data.append('clientid', this.id)

      axios.post('/includes/classes/3xxx/controllers/fabric.php?controller=saveadditionaldata', form_data)
          .then(data => {
            console.log(data);
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            location.reload();
          })
    }
  }
}
</script>

<style scoped>

</style>
