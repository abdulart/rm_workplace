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
              Выручка<br>
              {{ this.virychka }}
            </div>
            <div class="col-sm text-right">
              Размер<br>
              {{ this.razmerPredp }}
            </div>
            <div class="col-sm text-right">
              Количество сотрудников<br>
              {{ this.numberOfEmployeesRange }} (СПАРК) {{ this.empNum }} (ФНС)
            </div>
            <div class="col-sm text-right">
              Кредитный рейтинг<br>
              {{ this.credRating }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm text-right">
              Текущий ФОТ<br>
              {{ this.payrollFot }}
            </div>
            <div class="col-sm text-right">
              Текущий ЗП Банка<br>
              {{ this.currentPayrollBank }}
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
import axios from 'axios'

export default {
  name: "FinancialInfo",
  data(){
    return {
      id: null,
      virychka: '',
      razmerPredp: '',
      numberOfEmployeesRange: '',
      empNum: '',
      credRating: '',
      payrollFot: '',
      currentPayrollBank: ''
    }
  },
  mounted() {
    this.id = this.$route.params.id ? this.$route.params.id : null
        axios.get('/includes/classes/3xxx/controllers/fabric.php?controller=fininfo&client_id=' + this.id)
        .then(response => {
          this.virychka = response.data.vyruchka_za_god
          this.razmerPredp = response.data.razmer_predpriyatiya
          this.numberOfEmployeesRange = response.data.numberOfEmployeesRange
          this.empNum = response.data.empNUm
          this.credRating = response.data.cred_rating
          this.payrollFot = response.data.payroll_fot
          this.currentPayrollBank = response.data.current_payroll_bank
        })
        .catch(error => {
          console.log(error);
        })
  }
}
</script>

<style scoped>

</style>
