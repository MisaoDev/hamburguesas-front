<template>
  <header class="card-header">
    <p class="card-header-title is-family-secondary is-size-4 mb-0 pb-0 pt-2">{{ burgerName }}</p>
    <p class="card-header-icon pt-3 pb-2"># {{ burgerId }}</p>
  </header>
</template>

<script>
export default {
  name: 'CardHeader',
  props: [
    'burgerName',
    'burgerId',
  ]
}
</script>