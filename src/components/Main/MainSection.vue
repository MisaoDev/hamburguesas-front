<template>
  <section class="content">
    <div class="container">
      <TopControls />
      <BurgerList />
    </div>
  </section>
</template>

<script>
import TopControls from './TopControls/TopControls.vue'
import BurgerList from './BurgerList.vue'

export default {
  name: 'MainSection',
  components: {
    TopControls,
    BurgerList,
  },

  data() {
    return {
      filterQuery: ''
    }
  },
}
</script>

<style scoped lang="scss">

.top-controls {
  margin-bottom: 24px;
}
.content {
  padding-top: 30px;
  padding-bottom: 20px;

  @media screen and (max-width: 1024px) {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>