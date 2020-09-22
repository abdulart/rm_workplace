<template>
    <div class="meeting">
        <div class="text-left">
            <label>Тип встречи</label>
            <b-form-select selec v-model="selectedType" :options="types"></b-form-select>
            <label v-if="selectedType !== 2">Результат</label>
            <b-form-select v-if="selectedType !== 2" v-model="selectedResult" :options="results"></b-form-select>
            <label >Дата</label>
            <b-form-datepicker v-model="date" class="mb-2"></b-form-datepicker>
            <label >Продукты</label>
            <multiselect open-direction="bottom" :close-on-select="false" multiple v-model="productsSelected" :options="products"></multiselect>
            <p></p>
            <label >Участники</label>
            <b-form-textarea
                v-model="participants"
                rows="3"
            ></b-form-textarea>
            <label >Комментарий</label>
            <b-form-textarea
                v-model="comment"
                rows="3"
            ></b-form-textarea>
            <p></p>
            <b-button @click="saveActivity" variant="success">
                <b-spinner small v-if="loading"></b-spinner>
                <span v-else>Сохранить</span>
            </b-button>
        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import moment from 'moment'
import axios from 'axios';

export default {
    
  name: 'Meeting',
  components: {
      Multiselect,
  },
  props: {
    id: Number,
    uid: Number,
  },
  data() {
    return {
        productsSelected: [],
        products: ['РКО', 'Карточные продукты', 'Депозиты', 'Кредит', 'Гарантии', 'Лизинг', 'Факторинг', 'CMIB', 'Payroll'],
        participants: null,
        comment: null,
        types: [{value: 1, text: 'Встреча'},{value: 0, text: 'Звонок'}],
        selectedType: 0,
        results: [{value: 1, text: 'Success'},{value: 2, text: 'InProcess'},{value: -1, text: 'Reject'}],
        selectedResult: 2,
        date: null,
        doneActivities: [],
        loading: false,
    }
  },
  methods: {
      saveActivity() {
        this.loading = true;
        let form_data = new FormData();
        form_data.append('type', this.selectedType);
        form_data.append('result', this.selectedResult);
        form_data.append('products', JSON.stringify(this.productsSelected));
        form_data.append('comment', this.comment);
        form_data.append('participants', this.participants);
        form_data.append('date', this.date);
        form_data.append('clientId', this.id);
        form_data.append('counter', this.uid);

        axios.post('/includes/classes/3xxx/controllers/fabric.php?controller=add_corp_activity', form_data)
            .then(data => {
                console.log(data);
                alert(data.data === 'success' ? 'Успешно добавлен' : 'Ошибка');
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                this.loading = false;
                location.reload();
            })
      },
      finishActivity() {

      }
  },
  mounted() {
      this.date = moment().format('YYYY-MM-DD');
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
  
</style>
