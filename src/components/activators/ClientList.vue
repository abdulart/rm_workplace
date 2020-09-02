<template>
  <div class="client_list">
    <b-card
      title="Клиенты новой базы на активации"
    >
    <hr>
      <b-table  
      striped
      hover 
      responsive
      sticky-header="400px"
      :busy="busy"
      :items="items" class="rm-table">
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>&nbsp;<strong>Загрузка...</strong>
        </div>
      </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: 'ClientList',
    data() {
      return {
        busy: false,
        items: [],
      }
    },
    mounted() {
        this.busy = true;
        setTimeout(() => {
            this.busy = false;
            this.items = [
                {id: 1, name: 'carl', secondName: 'ivanov'},
                {id: 403, name: 'ivan', secondName: 'daunischev'},
            ];
        }, 2000);
    }
  }
</script>

<style >
    .rm-table {
        font-size: 12px;
        text-align: center;
        white-space: nowrap;
    }

    .rm-table thead tr th {
        padding: .3rem!important;
        font-size: 14px;
        border-top: 2px solid #eee;
        border-bottom: 2px solid #eee;
    }

    .rm-table tbody tr td {
        padding: .1rem!important;
        border-top: 1px solid #eee;
    }
</style>