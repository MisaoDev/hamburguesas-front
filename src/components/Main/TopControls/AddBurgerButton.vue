<template>
  <button @click="newBurger" class="button is-primary ml-5 px-5">Nueva hamburguesa</button>
</template>

<script>
export default {
  name: 'AddBurgerButton',

  methods: {
    newBurger() {
      this.$store.commit('SET_SELECTED_BURGER', { burger: null });
      this.$store.commit('SET_NEW_MODAL', { value: true });
    }
  },
}
</script>