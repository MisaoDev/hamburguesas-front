<template>
  <div class="field filter-field">

    <div class="control has-icons-left">
      <input type="text" name="filter" id="filter" class="input" placeholder="Filtrar..." v-model="filterQuery"  />
      <span class="icon is-left">
        <i class="fas fa-search"></i>
      </span>
    </div>

    <p class="help">Escribe ingredientes o el nombre de tu hamburguesa</p>
    
  </div>
</template>

<script>
export default {
  name: 'FilterBar',
  emits: ['queryChanged'],

  data() {
    return {
      filterQuery: ''
    }
  },

  watch: {
    filterQuery(newQuery) {
      this.$emit('queryChanged', newQuery);
    }
  }
}
</script>

<style scoped lang="scss">
.filter-field {
  width: 65%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
}
</style>