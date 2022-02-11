<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="title is-3">{{ prettierBurger.name }}</p>
    </header>
    <section class="modal-card-body is-flex is-justify-content-space-between">

      <!-- Information -->
      <div class="modal-left-side">
        <p class="title is-4 mb-3">Ingredientes</p>
        <ul>
          <li v-for="(ingr, i) in prettierBurger.ingredients" :key="ingr + i">
            {{ ingr }}
          </li>
        </ul>
        <p class="title is-4 mt-5 mb-3">Calorías</p>
        <p class="is-size-4">{{ burger.calories }} kcal</p>
      </div>

      <!-- Image -->
      <div class="modal-right-side">
        <img :src="burger.image" alt="sanguchito" class="burger-modal-image" />
      </div>

    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
export default {
  name: 'BurgerDetailsCard',

  computed: {
    burger() {
      return this.$store.state.burgerList.selectedBurger;
    },

    prettierBurger() {
      console.log(this.burger);
      return {
        name: this.beautify(this.burger.name),
        ingredients: this.burger.ingredients.map(ing => this.beautify(ing)),
      }
    }
  },

  methods: {
    beautify(str) {
      console.log(str);
      str = str.trim();
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  }
}
</script>

<style scoped lang="scss">
@media screen and (max-width: 768px) {
  .modal-card {
    margin: 0;
  }
}

$modal-content-height: calc(70vh - 150px);

.modal-left-side {
  max-height: $modal-content-height;
  min-width: 200px;
  overflow-y: auto;
  flex-grow: 1;
  margin-right: 10px;
}

.burger-modal-image {
  height: $modal-content-height;
  max-width: 300px;
  border-radius: 10px;
  object-fit: cover;
  animation: 7s ease-in-out 0s infinite alternate slide-modal-image;
}

@keyframes slide-modal-image {
  from {
    object-position: 0%;
  }
  to {
    object-position: 50%;
  }
}
</style>