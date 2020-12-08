<template>
  <div class="home">
    <br>
    <div class="deck-container">
      <h4 class="deck-header">Менеджеру</h4>
      <b-card-group deck>
        <b-card title="Title" header-tag="header" footer-tag="footer">
          <template #header>
            <h6 class="mb-0">Дэшборд хантер</h6>
          </template>
          <b-card-text>Header and footers using slots.</b-card-text>
          <br>
          <!-- <template #footer>
            <em>Footer Slot</em>
          </template> -->
        </b-card>
        <b-card title="Title" header-tag="header" footer-tag="footer">
          <template #header>
            <h6 class="mb-0">Агентская схема</h6>
          </template>
          <b-card-text>Header and footers using slots.</b-card-text>
          <br>
          <!-- <template #footer>
            <em>Footer Slot</em>
          </template> -->
        </b-card>
        <b-card title="Title" header-tag="header" footer-tag="footer">
          <template #header>
            <h6 class="mb-0">Отчет хантер</h6>
          </template>
          <b-card-text>Header and footers using slots.</b-card-text>
          <br>
          <!-- <template #footer>
            <em>Footer Slot</em>
          </template> -->
        </b-card>
      </b-card-group>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
// import Calendar from '@/components/common/calendar/Calendar.vue'

export default {
  name: 'Home',
  components: {
    // Calendar
  }
}
</script>

<style>
  .deck-container {
    padding: 0.5rem 1.5rem 1.5rem 1.5rem;
    margin-right: 0;
    margin-left: 0;
    border-width: .2rem;
    border: solid #f8f9fa;
    background: #fff;
  }

  .deck-header {
    margin-bottom: 1rem;
    text-align: left;
  }
</style>