<template>
  <div>
    <b-card
        header="header"
        header-bg-variant="default"
        bg-variant="light"
        class="text-center"
    >
      <template #header >
        Контакты
      </template>
      <b-card-text>
        <table class="table table-bordered">
          <tbody>
            <tr>
              <td class="text-left">Телефон(ы): <b v-for="(item, index) in phones" :key="item.phone">{{item}}<b v-if="index +1 < phones.length">, </b></b></td>
            </tr>
            <tr>
              <td class="text-left" v-if="manName">{{ manName }}: {{ manPost }}</td>
            </tr>
            <tr>
              <td class="text-left">email: {{ email }}</td>
            </tr>
            <tr>
              <td class="text-left">сайт: {{ site }}</td>
            </tr>
            <tr>
              <td class="text-left">Адрес регистрации: {{ addReg }}</td>
            </tr>
            <tr>
              <td class="text-left">Тип района города (скоращенный): {{ type }}</td>
            </tr>
          </tbody>
        </table>
        <small class="text-left"><i><a class="dot">+ Добавить контакт</a></i></small>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
name: "Contacts",
  data(){
  return {
    id: null,
    phones: [],
    manPost: '',
    manName: '',
    email: '',
    site: '',
    addReg: '',
    type: ''
    }
  },
  mounted() {
    this.id = this.$route.params.id ? this.$route.params.id : null
        axios.get('/includes/classes/3xxx/controllers/fabric.php?controller=getcontacts&client_id=' + this.id)
        .then(response => {
          this.phones = response.data.contact_phones_array
          this.manPost = response.data.management_post
          this.manName = response.data.management_name
          this.email = response.data.contact_email
          this.site = response.data.contact_website
          this.addReg = response.data.adres_reg
          this.type = response.data.dadata_city_district_with_type
        })
        .catch(error => {
          console.log(error);
        })
  }
}
</script>

<style scoped>
  A.dot {
    text-decoration: none; /* Убираем подчеркивание */
    border-bottom: 1px dashed #000080; /* Добавляем свою линию */
  }
</style>
