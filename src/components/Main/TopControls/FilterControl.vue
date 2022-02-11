<template>
  <div class="field filter-field">
    <div class="control has-icons-left">
      <input
        type="text"
        name="filter"
        id="filter"
        class="input"
        placeholder="Filtrar..."
        v-model="query"
      />
      <span class="icon is-left">
        <i class="fas fa-search"></i>
      </span>
    </div>

    <p class="help">Escribe ingredientes o el nombre de tu hamburguesa</p>
  </div>
</template>

<script>
export default {
  name: 'FilterControl',

  computed: {
    query: {
      get() { return this.$store.state.filterQuery },
      set(v) {
        return this.$store.commit('UPDATE_QUERY', { query: v });
      }
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