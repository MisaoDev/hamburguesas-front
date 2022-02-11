<template>
  <footer class="has-background-grey-lighter py-4 mt-auto has-text-centered">
    <div class="container">
      <p>Prueba FrontEnd @ {{currentYear}} Elías Ugarte</p>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'Footer',

    data() {
      return {
        currentYear: new Date().getFullYear()
      }
    }
  }
</script>
