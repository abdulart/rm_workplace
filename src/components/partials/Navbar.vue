<template>
  <div class="nb">
    <b-navbar class="rm-nav" type="light" variant="light">
      <b-navbar-nav class="logo-container">
        <b-nav-item href="#" class="rm-nav-header" v-b-toggle.sidebar-1>
          <img class="logo-img" src="img/burger.svg">
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item href="#" class="rm-nav-header">ProPortal</b-nav-item>
        <b-nav-item to="/" class="rm-nav-link">Главная</b-nav-item>
        <!-- <b-nav-item href="#" class="rm-nav-link">Профиль</b-nav-item> -->
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
    name: 'Navbar',
}
</script>

<style>

.rm-nav {
    background-color: hsla(0,0%,100%,.96)!important;
    border-bottom: 1px solid rgba(0,0,0,.1);
}

.rm-nav-header {
  font-weight: 700;
  color: rgb(20, 20, 20)!important;
}

.rm-nav-link {
  font-weight: 300;
}

.nb {
  position:absolute;
  width:100%;
}

.logo-img {
  height: 25px;
  width: 25px;
}

.navbar {
  padding: .5rem .5rem!important;
}
</style>