<template>
  <div id="app">
    <Sidebar :user="user"/>
    <Navbar :pathName="pathName"/>
    <div class="page-container">
      <div class="container">
        <router-view :user="user"/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/partials/Sidebar';
import Navbar from './components/partials/Navbar';

export default {
  components: {
    Sidebar,
    Navbar
  },
  data() {
    return {
      pathName: 'CorPortal',
      user: {
        name: null,
        counter: null,
        roles: null,
      },
      pathNames: {
        manager: ''
      }
    }
  },
  mounted() {
    this.user.name = this.$cookies.get('corp_fio') || null;
    this.user.counter = this.$cookies.get('corp_counter') || null;
    this.user.roles = this.$cookies.get('corp_roles') || null;

    if(!this.user.name) {
      //location.href = '/../';
      //console.log(this.user.name); 
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
}

hr {
  margin-bottom: 0!important;
}

.page-container {
  height:100%;
  padding-top: 58px;
  margin: auto;
  text-align: center;
  background: rgba(203,203,210,.15);
}

.card-body {
      padding: 0!important;
  }

  .card {
      border: none;
      box-shadow: 0px 0px 5px 0px rgba(110,110,110,0.75);
      -webkit-box-shadow: 0px 0px 5px 0px rgba(110,110,110,0.75);
      -moz-box-shadow: 0px 0px 5px 0px rgba(110,110,110,0.75);
  }

  .container {
    max-width: 100%!important;
  }

  .fio {
    text-transform: capitalize;
  }

  h4 {
      /* Extra small devices (phones, less than 768px) */
      font-size: 18px;
      font-weight: bold;
  }
      /* Small devices (tablets, 768px and up) */
  @media (min-width: 768px) {
      h4 {
          /* Extra small devices (phones, less than 768px) */
          font-size: 18px;
      }
  }

  /* Medium devices (desktops, 992px and up) */
  @media (min-width: 992px) {
      h4 {
          /* Extra small devices (phones, less than 768px) */
          font-size: 20px;
      }
  }

  /* Large devices (large desktops, 1200px and up) */
  @media (min-width: 1200px) {
      h4 {
          /* Extra small devices (phones, less than 768px) */
          font-size: 20px;
      }
  }
</style>
