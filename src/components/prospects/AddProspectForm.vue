<template>
    <div class="add-prospect-form">
        <b-card>
        <template v-slot:header>
            <h4 class="mb-0">Добавление проспекта по ИНН</h4>
        </template>
        <b-alert
            :show="dismissCountDown"
            dismissible
            variant="warning"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
            >
            Такой ИНН Уже есть:
            <ul style="list-style-type: none; text-align: left;">
                <li v-for="prospect in foundProspects" :key="prospect.id">
                    <a :href="'/../?page=3003&client_id='+prospect.client_id" target="_blank"><b>{{prospect.inn}}</b> {{prospect.name}}</a>
                </li>
            </ul>
        </b-alert>
            <hr>
            <div style="padding:10px; text-align:left;">
                <small>Введите ИНН:</small>
                <b-form inline
                    label="Введите ИНН"
                >
                    <b-form-input v-model="searchString" trim placeholder="ИНН..."></b-form-input>
                    <b-button variant="primary" @click="searchInn">
                        <b-spinner v-if="loading" small></b-spinner>
                        <span v-else>Добавить</span>
                    </b-button>
                </b-form>
            </div>
        </b-card>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'AddProspectForm',
    props: {user: Object},
    components: {
      
    },
    data() {
      return {
          searchString: '',
          loading: false,
          foundProspects: [],
          dismissSecs: 20,
            dismissCountDown: 0,
      }
    },
    methods: {
        searchInn: function() {
            if(this.loading) return false;
            if(!this.searchString) return false;
            this.loading = true;
            let innStr = this.searchString.trim();
            axios.get('/includes/classes/3xxx/controllers/fabric.php?controller=search_prospect&inn='+innStr)
                .then(data => {
                    let res = data.data || [];
                    if(res.length === 0) {
                        alert(`Инн ${innStr} добавлен!`);
                        location.reload();
                    } else {
                        this.showAlert()
                        this.foundProspects = res;
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
                })
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        }
    }
}
</script>

<style>

</style>