<template>
  <div class="modal is-active">
    <div @click="closeModal" class="modal-background"></div>
    <div class="modal-content">
      <div class="box has-text-centered">
        <div>
          <p class="title is-4">Confirmación</p>
          <p>¿Seguro que desea eliminar esta hamburguesa?</p>
          <p>#{{ burger.id }} - {{ burger.name }}</p>
        </div>

        <div class="field is-grouped is-justify-content-center mt-6">
          <div class="control mr-6">
            <button @click="deleteBurger" class="button is-danger">Eliminar</button>
          </div>
          <div class="control">
            <button @click="closeModal" class="button is-black is-outlined">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
    <button @click="closeModal" class="modal-close is-large" aria-label="close"></button>
  </div>
</template>


<script>
export default {
  name: 'DeleteBurgerModal',

  computed: {
    isDeleteModalActive: {
      get() { return this.$store.state.burgerList.isDeleteModalActive; },
      set(v) {
        this.$store.commit('SET_DELETE_MODAL', { value: v });
      },
    },

    burger() { return this.$store.state.burgerList.selectedBurger; },
  },

  methods: {
    deleteBurger() {
      this.$store.dispatch('removeBurger', { id: this.burger.id });
      this.closeModal();
    },

    closeModal() {
      this.isDeleteModalActive = false;
    }
  }
}
</script>