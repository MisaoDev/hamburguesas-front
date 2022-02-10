<template>
  <nav class="navbar is-primary">
    <div class="container">
      <Brand />
    </div>
  </nav>
</template>

<script>
import Brand from '@/components/NavBar/Brand.vue'

export default {
  name: 'NavBar',
  components: {
    Brand
  }
}
</script>