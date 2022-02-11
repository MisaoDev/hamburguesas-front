<template>
  <div class="card-content p-3">
    <div class="is-flex">

      <!-- Image -->
      <div class="is-flex is-flex-direction-column">
        <img :src="burger.image" alt="pansito" class="burger-image" />
        <p>{{ burger.calories }} calorías</p>
      </div>

      <!-- Ingredients -->
      <div class="ingredient-list">
        <ul>
          <li
            v-for="(ingredient, index) in burger.ingredients"
            :key="ingredient + index"
          >
            {{ ingredient }}
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'CardContent',
  props: [
    'burger'
  ]
}
</script>

<style scoped lang="scss">
.burger-image {
  height: 120px;
  width: 120px;
  object-fit: cover;
}

.ingredient-list {
  ul {
    margin: 0 30px;
  }

  li {
    line-height: 1;
  }
}
</style>