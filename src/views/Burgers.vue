<template>
  <NavBar />
  <MainSection />
  <Footer />
</template>

<script>
import NavBar from '@/components/NavBar/NavBar.vue'
import Footer from '@/components/Footer.vue'
import MainSection from '@/components/Main/MainSection.vue'

export default {
  name: 'Burgers',
  components: {
    NavBar,
    Footer,
    MainSection,
  },
}
</script>