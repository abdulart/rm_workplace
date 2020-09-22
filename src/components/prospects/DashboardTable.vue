<template>
  <div>
            <b-table  
                striped
                hover 
                responsive
                sticky-header="700px"
                :busy="table.busy"
                :fields="table.fields"
                :items="table.items" class="rm-table">
            <template v-slot:table-busy>
                <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>&nbsp;<strong>Загрузка...</strong>
                </div>
            </template>
            <template v-slot:cell(region)="data" v-if="table.step === 0">
                <span class=".pl-10-i" @click="$emit('setregion', data.item.region)" style="cursor:pointer;"><b>{{data.value}}</b></span>
            </template>
            <template v-slot:cell(subregion)="data" v-if="table.step === 1">
                <span class="" @click="$emit('setsubregion', data.item.subregion)" style="cursor:pointer;"><b>{{data.value}}</b></span>
            </template>
            <template v-slot:cell(fio)="data" v-if="table.step === 2">
                <span class="fio" ><b>{{fioToShort(data.item.manager)}}</b></span>
            </template>
            <template v-slot:cell(plan)="data">
                <span class="">{{ data.item.plan.total }}</span>
            </template>
            <template v-slot:cell(fact)="data">
                <span class="">{{ data.item.fact.total }}</span>
            </template>
            <template v-slot:cell(strikeRate)="data">
                <b-progress :striped="striped">
                    <b-progress-bar :variant="
                        getStrikeRate(data.item.plan.total,data.item.fact.total) < 40 ? 'danger'
                        : (
                            getStrikeRate(data.item.plan.total,data.item.fact.total) < 85 ? 'warning' : 'success'
                        )
                    " :value="getStrikeRate(data.item.plan.total,data.item.fact.total)"  >
                        <span style="font-weight:bold;color:#000;left: 0;right: 0;position: absolute;">{{data.item.fact.total}} / {{data.item.plan.total}}</span>
                    </b-progress-bar>
                </b-progress>
            </template>
            <template v-slot:cell(factRej)="data">
                <span class="">{{ data.item.fact.rej }}</span>
            </template>
            <template v-slot:cell(factSucc)="data">
                <span class="">{{ data.item.fact.succ }}</span>
            </template>
            <template v-slot:cell(factInProc)="data">
                <span class="">{{ data.item.fact.inProc }}</span>
            </template>
        </b-table>
  </div>
</template>

<script>
import helpers from '@/helpers'
export default {
    name: 'DashboardTable',
    props: {
        table: Object,
    },
    methods: {
        getStrikeRate(plan, fact) {
            let rel = fact/Math.ceil(plan || 1);
            return Math.ceil(100*( rel > 1 ? 1 : rel ));
        },
        fioToShort: helpers.fioToShort,
    }
}
</script>

<style>

</style>