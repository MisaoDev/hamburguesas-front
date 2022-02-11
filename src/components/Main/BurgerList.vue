<template>
  <div
    v-cloak
    class="columns is-multiline is-centered is-variable is-7"
    :class="{ 'is-hidden': errorFetchingBurgers }"
  >
    <GridLayout />
    <ViewBurgerModal v-if="isViewModalActive" />
    <DeleteBurgerModal v-if="isDeleteModalActive" />
    <EditBurgerModal v-if="isEditModalActive || isNewModalActive" />
  </div>

  <div
    class="has-text-centered is-size-4 is-family-secondary"
    :class="{ 'is-hidden': !errorFetchingBurgers }"
  >
    <p>Error al cargar los datos :(</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import GridLayout from './GridLayout.vue';
import ViewBurgerModal from './Modals/ViewBurgerModal.vue';
import EditBurgerModal from './Modals/EditBurgerModal.vue';
import DeleteBurgerModal from './Modals/DeleteBurgerModal.vue';

export default {
  name: 'BurgerList',
  components: {
    GridLayout,
    ViewBurgerModal,
    EditBurgerModal,
    DeleteBurgerModal
},

  computed: {
    ...mapState({
      errorFetchingBurgers: (state) => state.burgerList.errorFetchingBurgers,
      isViewModalActive: (state) => state.burgerList.isViewModalActive,
      isDeleteModalActive: (state) => state.burgerList.isDeleteModalActive,
      isEditModalActive: (state) => state.burgerList.isEditModalActive,
      isNewModalActive: (state) => state.burgerList.isNewModalActive,
    }),
  },

  created() {
    this.$store.dispatch('fetchBurgers');
  }
}
</script>

<style scoped lang="scss">
[v-cloak] {
  display: none;
}
</style>