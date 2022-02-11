<template>
  <footer class="card-footer">
    <button @click="viewBurger" class="button card-footer-item">Ver</button>
    <button @click="editBurger" class="button card-footer-item">Editar</button>
    <button @click="deleteBurger" class="button card-footer-item">Eliminar</button>
  </footer>
</template>

<script>
export default {
  name: 'CardFooter',
  props: [
    'burger'
  ],

  methods: {
    setSelectedBurger() {
      this.$store.commit('SET_SELECTED_BURGER', { burger: this.burger });
    },

    viewBurger() {
      this.setSelectedBurger();
      this.$store.commit('SET_VIEW_MODAL', { value: true });
    },

    editBurger() {
      this.setSelectedBurger();
      this.$store.commit('SET_EDIT_MODAL', { value: true });
    },

    deleteBurger() {
      this.setSelectedBurger();
      this.$store.commit('SET_DELETE_MODAL', { value: true });
    },
  },
}
</script>