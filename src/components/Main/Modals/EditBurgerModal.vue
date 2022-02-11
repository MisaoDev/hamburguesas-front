<template>
  <div class="modal is-active">
    <div @click="closeModal" class="modal-background"></div>
    <div class="modal-content">
      <EditBurgerForm :isNewBurgerModal="isNewModalActive" />
    </div>
    <button @click="closeModal" class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
import EditBurgerForm from './EditBurgerForm.vue';

export default {
  name: 'EditBurgerModal',
  components: {
    EditBurgerForm,
  },

  computed: {
    isEditModalActive: {
      get() { return this.$store.state.burgerList.isEditModalActive; },
      set(v) {
        this.$store.commit('SET_EDIT_MODAL', { value: v });
      },
    },

    isNewModalActive: {
      get() { return this.$store.state.burgerList.isNewModalActive; },
      set(v) {
        this.$store.commit('SET_NEW_MODAL', { value: v });
      },
    },
  },

  methods: {
    closeModal() {
      this.isNewModalActive = this.isEditModalActive = false;
    },
  },
}
</script>

<style scoped lang="scss">
@media screen and (max-width: 768px) {
  .modal-content {
    padding: 0 20px;
  }
}
</style>