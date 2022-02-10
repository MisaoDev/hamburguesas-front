<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <WelcomeComponent :algo="unaVariable"/>
  </div>
</template>

<script>
// @ is an alias to /src
import WelcomeComponent from '@/components/WelcomeComponent.vue'

export default {
  name: 'Home',
  components: {
    WelcomeComponent
  },
  data() {
    return {
      unaVariable: 'una cosa cualquiera'
    }
  }
}
</script>

<style scoped>
  .home {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: #2c3e50;
  }
</style>
