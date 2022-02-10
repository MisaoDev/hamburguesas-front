<template>
  <NavBar />
  <!-- <div>
    <FilterBar />
    <BurgerList />
  </div> -->
  <Footer />
</template>

<script>
import NavBar from '@/components/NavBar/NavBar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Burgers',
  components: {
    NavBar,
    Footer,
  }
}
</script>
