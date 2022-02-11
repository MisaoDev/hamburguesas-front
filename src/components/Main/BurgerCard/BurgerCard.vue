<template>
  <div class="card">
    <CardHeader  :burgerName="burger.name" :burgerId="burger.id" />
    <CardContent :burger="burger" />
    <CardFooter  :burger="burger" />
  </div>
</template>

<script>
import CardHeader from './CardHeader.vue';
import CardContent from './CardContent.vue';
import CardFooter from './CardFooter.vue';

export default {
  name: 'BurgerCard',
  components: {
    CardHeader,
    CardContent,
    CardFooter,
  },
  props: [
    'burger'
  ],
}
</script>

