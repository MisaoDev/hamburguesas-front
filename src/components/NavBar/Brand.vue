<template>
  <div class="navbar-brand is-size-3 is-align-items-center">
    <router-link to="/hamburguesas" class="navbar-item">
      <HamburgerIcon size="50" />
      <span class="is-family-secondary pt-2">Hamburguesitas</span>
    </router-link>
  </div>
</template>

<script>
import HamburgerIcon from "vue-material-design-icons/Hamburger.vue";
import "@/scss/vue-icons-custom.scss";

export default {
  name: "Brand",
  components: {
    HamburgerIcon,
  },
};
</script>

<style lang="scss">
</style>
