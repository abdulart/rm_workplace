<template>
  <div class="sidebar">
    <b-sidebar text-variant="light" id="sidebar-1" title="Sidebar" shadow backdrop backdrop-variant="transparent">
        <template slot="title">
            <b-avatar class="mr-2" size="sm"></b-avatar>
            <span class="mr-auto rm-fio" style="text-transform: capitalize;">{{fioToShort(user.name,'+')}}</span>
        </template>
        <div class="px-3 py-2 sidebar-navi-block">
            <div v-for="particle in particles" :key="particle.id">
                <span class="mx-2 font-weight-light" style="font-size: 12px;">{{particle.name}}</span>
                <ul class="navi-list">
                    <router-link 
                        v-for="path in paths.filter(e => e.key === particle.key)"
                        v-bind:key="path.name"
                        tag="li" :to="path.route" :class="$route.path === path.route ? 'navi-list-link-active' : ''" class="navi-list-link">{{path.name}}</router-link>
                </ul>
                <hr class="mx-2" style="border-top:1px solid #535d6b;margin-top: 1rem;margin-bottom:1rem!important;">
            </div>
        </div>
    </b-sidebar>
  </div>
</template>

<script>
import helpers from '@/helpers';
export default {
    name: 'Sidebar',
    props: {user: Object},
    data: function() {
        return {
            paths: [
                {route: '/', name: 'Главная', key: 'main'},
                {route: '/activate', name: 'Активация клиентов', key: 'activators'},
                {route: '/reorderactivators', name: 'Распределение клиентов', key: 'activators'},
                {route: '/profile', name: 'Профиль', key: 'main'},
                {route: '/settings', name: 'Настройки', key: 'main'},
                {route: '/prospects/main', name: 'Дэшборд хантер', key: 'prospects'},
                {route: '/prospectsdashboard', name: 'Отчет хантеры', key: 'prospects'},
                {route: '/addprospect', name: 'Добавить проспект', key: 'prospects'},
                {route: '/manager/tasks', name: 'Поставить задачу', key: 'manager'},
                // {route: '/manager/region', name: 'Руководитель региона', key: 'manager'},
                // {route: '/manager/subregion', name: 'Руководитель субрегиона', key: 'manager'},
            ],
            particles: [                
                {id: 1, name: 'Активаторы', key: 'activators'},
                {id: 2, name: 'Проспекты', key: 'prospects'},
                {id: 3, name: 'Руководитель', key: 'manager'},
                // {id: 999, name: 'Основные', key: 'main'},
            ],
            nameShort: 'Иванов И.И.',
        }
    },
    methods: {
        fioToShort: helpers.fioToShort,
    }
}
</script>

<style>
.b-sidebar {
  margin-top: 58px !important;
  background: #024369 !important;
}

.navi-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
}

.b-sidebar-header {
    font-size: 1rem !important;
}

.rm-fio {
    vertical-align: bottom;
    line-height: 1.4;
}

.sidebar-navi-block {
    border-top: 1px solid white;
}

.navi-list-link {
    margin: 5px 0 0 0;
    border-radius: 4px;
    text-transform: uppercase;
    line-height: 30px;
    font-size: 12px;
    font-weight: 600;
    padding: .5rem 1rem !important;
    white-space: nowrap;
}

.navi-list-link-active {
    background-color: #dddb;
}

.navi-list-link:hover {
    background-color: #dddb;
    cursor:pointer;
}
</style>