<template>
  <div class="modal is-active">
    <div @click="isViewModalActive = false" class="modal-background"></div>
    <div class="modal-content">
      <BurgerDetailsCard />
    </div>
    <button @click="isViewModalActive = false" class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
import BurgerDetailsCard from './BurgerDetailsCard.vue';

export default {
  name: 'ViewBurgerModal',
  components: {
    BurgerDetailsCard,
  },

  computed: {
    isViewModalActive: {
      get() { return this.$store.state.burgerList.isViewModalActive; },
      set(v) {
        this.$store.commit('SET_VIEW_MODAL', { value: v });
      },
    }
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