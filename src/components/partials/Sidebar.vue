<template>
  <div class="sidebar">
    <b-sidebar text-variant="light" id="sidebar-1" title="Sidebar" shadow backdrop backdrop-variant="transparent">
        <template slot="title">
            <b-avatar class="mr-2" size="sm"></b-avatar>
            <span class="mr-auto rm-fio">{{nameShort}}</span>
        </template>
        <div class="px-3 py-2 sidebar-navi-block">
            <ul class="navi-list">
                <router-link 
                    v-for="path in paths"
                    v-bind:key="path.name"
                    tag="li" :to="path.route" :class="$route.path === path.route ? 'navi-list-link-active' : ''" class="navi-list-link">{{path.name}}</router-link>
            </ul>
        </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
    name: 'Sidebar',
    data: function() {
        return {
            paths: [
                {route: '/', name: 'Главная'},
                {route: '/activate', name: 'Активация клиентов'},
            ],
            nameShort: 'Иванов И.И.',
        }
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