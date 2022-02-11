<template>
  <div
    class="column is-half is-one-third-widescreen mb-5"
    v-for="burger in filteredData"
    :key="burger.id"
  >
    <BurgerCard :burger="burger" />
  </div>
</template>

<script>
import BurgerCard from './BurgerCard/BurgerCard.vue';

export default {
  name: 'GridLayout',
  components: {
    BurgerCard
  },

  computed: {
    filteredData() {
      return this.$store.getters.getFilteredBurgers;
    }
  }
}
</script>

