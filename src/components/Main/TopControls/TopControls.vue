<template>
  <div class="top-controls is-flex is-justify-content-center">
    <FilterControl />
    <AddBurgerButton />
  </div>
</template>

<script>
import FilterControl from './FilterControl.vue';
import AddBurgerButton from './AddBurgerButton.vue';

export default {
  name: 'TopControls',
  components: {
    FilterControl,
    AddBurgerButton,
  },
}
</script>