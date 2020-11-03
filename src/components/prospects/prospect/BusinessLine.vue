<template>
  <div>
    <b-card
        header="header"
        header-bg-variant="default"
        bg-variant="light"
        class="text-center"
    >
      <template #header >
        Другие бизнес-линии
      </template>
      <b-card-text
          class="text-left"
      >
        <div>
          Малый бизнес менеджер 1 ({{ managers.one.length }}) <small><i v-if="managers.one.length > 0" v-on:click="showManagers.one = !showManagers.one">Развернуть</i></small><br>
          <small v-for="itemOne in managers.one" :key="itemOne.name"><u v-if="showManagers.one">{{ itemOne.name }}</u><br v-if="showManagers.one"></small>
        </div>
        <div>
          Малый бизнес менеджер 2 ({{ managers.two.length }}) <small><i v-if="managers.two.length > 0" v-on:click="showManagers.two = !showManagers.two">Развернуть</i></small><br>
          <small v-for="itemTwo in managers.two" :key="itemTwo.name"><u v-if="showManagers.two">{{ itemTwo.name }}</u><br v-if="showManagers.two"></small>
        </div>
        <div>
          Малый бизнес дистанционный менеджер (DRM) ({{ managers.tree.length }}) <small><i v-if="managers.tree.length > 0" v-on:click="showManagers.tree = !showManagers.tree">Развернуть</i></small><br>
          <small v-for="itemTree in managers.tree" :key="itemTree.name"><u v-if="showManagers.tree">{{ itemTree.name }}</u><br v-if="showManagers.tree"></small>
        </div>
        <div>
          Payroll привлечение (ТО) ({{ managers.four.length }}) <small><i v-if="managers.four.length > 0" v-on:click="showManagers.four = !showManagers.four">Развернуть</i></small><br>
          <small v-for="itemFour in managers.four" :key="itemFour.name"><u v-if="showManagers.four">{{ itemFour.name }}</u><br v-if="showManagers.four"></small>
        </div>
        <div>
          Payroll Key RPM ({{ managers.five.length }}) <small><i v-if="managers.five.length > 0" v-on:click="showManagers.five = !showManagers.five">Развернуть</i></small><br>
          <small v-for="itemFive in managers.five" :key="itemFive.name"><u v-if="showManagers.five">{{ itemFive.name }}</u><br v-if="showManagers.five"></small>
        </div>
        <div>
          Payroll Federal Support ({{ managers.six.length }}) <small><i v-if="managers.six.length > 0" v-on:click="showManagers.six = !showManagers.six">Развернуть</i></small><br>
          <small v-for="itemSix in managers.six" :key="itemSix.name"><u v-if="showManagers.six">{{ itemSix.name }}</u><br v-if="showManagers.six"></small>
        </div>
        <div>
          МDSA (ТО и город) ({{ managers.seven.length }}) <small><i v-if="managers.seven.length > 0" v-on:click="showManagers.seven = !showManagers.se">Развернуть</i></small><br>
          <small v-for="itemSeven in managers.seven" :key="itemSeven.name"><u v-if="showManagers.seven">{{ itemSeven.name }}</u><br v-if="showManagers.seven"></small>
        </div>
        <div>
          Payroll Support Запад ({{ managers.eight.length }}) <small><i v-if="managers.eight.length > 0" v-on:click="showManagers.eight = !showManagers.eight">Развернуть</i></small><br>
          <small v-for="itemEight in managers.eight" :key="itemEight.name"><u v-if="showManagers.eight">{{ itemEight.name }}</u><br v-if="showManagers.eight"></small>
        </div>
        <div>
          Payroll Support Восток ({{ managers.nine.length }}) <small><i v-if="managers.nine.length > 0" v-on:click="showManagers.nine = !showManagers.nine">Развернуть</i></small><br>
          <small v-for="itemNine in managers.nine" :key="itemNine.name"><u v-if="showManagers.nine">{{ itemNine.name }}</u><br v-if="showManagers.nine"></small>
        </div>
        <div>
          Payroll RPM (ТО и город) ({{ managers.ten.length }}) <small><i v-if="managers.ten.length > 0" v-on:click="showManagers.ten = !showManagers.ten">Развернуть</i></small><br>
          <small v-for="itemTen in managers.ten" :key="itemTen.name"><u v-if="showManagers.ten">{{ itemTen.name }}</u><br v-if="showManagers.ten"></small>
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "BusinessLine",
  data(){
    return {
      id: null,
      managers:{
        one:[
          {name: 'test1'},
          {name: 'test2'}
        ],
        two:[
          {name: 'ssfgsdfgsfgfsf'},
          {name: 'wdssdfsadfdsf'},
          {name: 'sdgffgsdfgsdfg'}
        ],
        tree:[],
        four:[],
        five:[],
        six:[],
        seven:[],
        eight:[],
        nine:[],
        ten:[]
      },
      showManagers:{
        one:false,
        two:false,
        tree:false,
        four:false,
        five:false,
        six:false,
        seven:false,
        eight:false,
        nine:false,
        ten:false
      },
    }
  },
  mounted() {
    this.id = this.$route.params.id
  }
}
</script>

<style scoped>

</style>
