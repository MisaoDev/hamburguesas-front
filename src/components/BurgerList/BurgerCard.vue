<template>
  <div class="card">
    <CardHeader :burgerName="burgerName" :burgerId="burgerId" />

    <div class="card-content p-3">
      <div class="is-flex">
        <div class="is-flex is-flex-direction-column">
          <img :src="burgerImage" alt="pansito" class="burger-image" />
          <p>{{ burgerCalories }} calorías</p>
        </div>
        <div class="ingredient-list">
          <ul>
            <li v-for="ingredient in burgerIngredients" :key="ingredient">{{ ingredient }}</li>
          </ul>
        </div>
      </div>
    </div>

    <footer class="card-footer">
      <button @click="$emit('viewBurger', burgerId)" class="button card-footer-item">Ver</button>
      <button @click="$emit('editBurger', burgerId)" class="button card-footer-item">Editar</button>
      <button @click="$emit('deleteBurger', burgerId)" class="button card-footer-item">Eliminar</button>
    </footer>
    
  </div>
</template>

<script>
import CardHeader from './CardHeader.vue'

export default {
  name: 'BurgerCard',
  components: {
    CardHeader,
  },
  props: [
    'burgerId',
    'burgerName',
    'burgerIngredients',
    'burgerCalories',
    'burgerImage',
  ],
  emits: [
    'viewBurger',
    'editBurger',
    'deleteBurger',
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