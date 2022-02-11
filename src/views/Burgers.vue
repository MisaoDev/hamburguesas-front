<!--
  The FilterBar component passes an argument to this component with the current
  filter key, entered on the search input.

  This component then passes that value to the BurgerList component so that it
  can render a filtered list of burgers.
 -->
<template>
  <NavBar />

  <section class="content">
    <div class="container">
      <div class="is-flex is-justify-content-center" id="filter-bar">
        <FilterBar @queryChanged="handleQueryChanged" />
        <button @click="handleNewBurger" class="button is-primary ml-5 px-5">Nueva hamburguesa</button>
      </div>
      <BurgerList :filterQuery="filterQuery" />
    </div>
  </section>

  <Footer />
</template>

<script>
import NavBar from '@/components/NavBar/NavBar.vue'
import Footer from '@/components/Footer.vue'
import FilterBar from '@/components/FilterBar.vue'
import BurgerList from '@/components/BurgerList/BurgerList.vue'

export default {
  name: 'Burgers',
  components: {
    NavBar,
    Footer,
    FilterBar,
    BurgerList,
  },

  data() {
    return {
      filterQuery: ''
    }
  },

  methods: {
    handleQueryChanged(newQuery) {
      this.filterQuery = newQuery;
    },

    handleNewBurger() {
      
    }
  }
}
</script>

<style scoped lang="scss">

.filter-bar {
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