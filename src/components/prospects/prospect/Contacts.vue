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
              <td>Телефон(ы):</td>
            </tr>
          </tbody>
        </table>
        <small class="text-left"><i><a class="dot">+ Добавить контакт</a></i></small>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
name: "Contacts"
}
</script>

<style scoped>
  A.dot {
    text-decoration: none; /* Убираем подчеркивание */
    border-bottom: 1px dashed #000080; /* Добавляем свою линию */
  }
</style>
