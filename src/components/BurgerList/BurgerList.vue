<template>
  <button @click="handleNewBurger" class="button is-primary is-block mx-auto mb-5 px-5">Nueva hamburguesa</button>
  <div
    v-cloak
    class="columns is-multiline is-centered is-variable is-7"
    :class="{ 'is-hidden': hasRequestError }"
  >

    <!-- Loop through the data to display each burger -->
    <div class="column is-half is-one-third-widescreen mb-5" v-for="b in filteredData" :key="b.id">
      <BurgerCard
        :burgerId="b.id"
        :burgerName="b.name"
        :burgerIngredients="b.ingredients"
        :burgerCalories="b.calories"
        :burgerImage="b.image"
        @viewBurger="handleView"
        @editBurger="handleEdit"
        @deleteBurger="handleDelete"
      />
    </div>

    <div class="modal" :class="{ 'is-active': viewing }" v-if="selectedBurger">
      <div @click="viewing = false" class="modal-background"></div>
      <div class="modal-content">
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="title is-3">{{ selectedBurger.name }}</p>
          </header>
          <section class="modal-card-body is-flex is-justify-content-space-between">
            <div class="modal-left-side">
              <p class="title is-4 mb-3">Ingredientes</p>
              <ul>
                <li
                  v-for="(ingredient, index) in selectedBurger.ingredients"
                  :key="ingredient + index"
                >{{ ingredient }}</li>
              </ul>
              <p class="title is-4 mt-5 mb-3">Calorías</p>
              <p class="is-size-4">{{ selectedBurger.calories }} kcal</p>
            </div>
            <div class="modal-right-side">
              <img :src="selectedBurger.image" alt="sanguchito" class="burger-modal-image" />
            </div>
          </section>
          <footer class="modal-card-foot"></footer>
        </div>
      </div>
      <button @click="viewing = false" class="modal-close is-large" aria-label="close"></button>
    </div>

    <!-- Edit burger modal -->
    <div class="modal" :class="{ 'is-active': editing || creating }" v-if="selectedBurger || creating">
      <div @click="editing = false" class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <!-- ID -->
          <div class="field">
            <label for="editId" class="label">Id</label>
            <div class="control">
              <input type="text" class="input" name="editId" v-model="editId" />
            </div>
          </div>

          <!-- Name -->
          <div class="field">
            <label for="editName" class="label">Nombre</label>
            <div class="control">
              <input type="text" class="input" name="editName" v-model="editName" />
            </div>
          </div>

          <!-- Calories -->
          <div class="field">
            <label for="editCalories" class="label">Calorías</label>
            <div class="control">
              <input type="text" class="input" name="editCalories" v-model="editCalories" />
            </div>
          </div>

          <!-- Ingredient (new) -->
          <div class="field">
            <label for="editIngredients" class="label">Ingredientes</label>
            <div class="control">
              <textarea
                name="editIngredients"
                rows="6"
                class="textarea has-fixed-size"
                v-model="editIngredients"
              ></textarea>
            </div>
          </div>

          <div class="field is-grouped is-justify-content-space-between">
            <div class="control">
              <button @click="saveBurgerChanges" class="button is-success" :class="{'is-hidden' : ! editing}">Guardar</button>
              <button @click="createNewBurger" class="button is-success" :class="{'is-hidden' : ! creating}">Crear</button>
            </div>
            <div class="control">
              <button @click="editing = false" class="button is-danger">Cancelar</button>
            </div>
          </div>

          <div v-if="showWarningIdExists" class="notification is-primary">
            <button @click="showWarningIdExists = false" class="delete"></button>
            Error: ya existe una hamburguesa con este ID
          </div>
          
        </div>
      </div>
      <button @click="editing = false" class="modal-close is-large" aria-label="close"></button>
    </div>

  </div>

  <div
    class="has-text-centered is-size-4 is-family-secondary"
    :class="{ 'is-hidden': !hasRequestError }"
  >
    <p>Error al cargar los datos :(</p>
  </div>
</template>

<script>
import BurgerCard from '@/components/BurgerList/BurgerCard.vue';

export default {
  name: 'BurgerList',
  components: {
    BurgerCard,
  },

  props: [
    'filterQuery'
  ],

  data() {
    return {
      hasRequestError: false,
      burgerListData: [],
      viewing: false,
      editing: false,
      deleting: false,
      creating: false,
      selectedBurger: null,
      editId: '',
      editName: '',
      editCalories: '',
      editIngredients: '',
      showWarningIdExists: false,
    }
  },

  watch: {
    editing(newVal) {
      if (newVal === false) {
        this.showWarningIdExists = false;
      }
    }
  },

  computed: {
    filteredData() {
      const queryWords = this.filterQuery.trim().split(' ');
      return this.burgerListData.filter(burger => {

        // Any word in the query matches the burger name
        const burgerNameMatches = queryWords.some(word => {
          return burger.name
            .toLowerCase()
            .includes(word.toLowerCase())
        });

        // Every word in the query matches any ingredient in the same burger
        const ingredientMatches = queryWords.every(word => {
          return burger.ingredients.some(ingr => {
            return ingr
              .toLowerCase()
              .includes(word.toLowerCase())
          })
        });

        return burgerNameMatches || ingredientMatches;
      });
    },

  },

  methods: {
    getBurgerListData() {
      this.axios.get('https://prueba-hamburguesas.herokuapp.com/burger/')
        .then(res => {

          res.data.forEach(async burger => {
            const newBurger = this.translateBurger(burger);
            newBurger.image = await this.getRandomImage();
            this.burgerListData.push(newBurger);
          });

        })
        .catch((err) => {
          // Log the error and set the flag to true to display an error message
          console.log(err);
          this.hasRequestError = true;
        })
    },

    beautifyText(str) {
      str = str.trim();
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    getRandomImage() {
      return new Promise((resolve, reject) => {
        this.axios.get('https://foodish-api.herokuapp.com/api/images/burger')
          .then(res => {
            resolve(res.data.image);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },

    translateBurger(burger) {
      return {
        id: burger.id,
        name: this.beautifyText(burger.nombre),
        ingredients: burger.ingredientes.map(i => this.beautifyText(i)),
        calories: burger.calorias,
      };
    },

    selectBurgerWithId(id) {
      this.selectedBurger = this.burgerListData.find(b => b.id === id);
    },

    handleNewBurger() {
      this.editId = '';
      this.editName = '';
      this.editCalories = '';
      this.editIngredients = [];
      this.creating = true;
    },

    handleView(id) {
      this.selectBurgerWithId(id);
      this.viewing = true;
    },

    handleEdit(id) {
      this.selectBurgerWithId(id);
      this.editId = this.selectedBurger.id;
      this.editName = this.selectedBurger.name;
      this.editCalories = this.selectedBurger.calories;
      this.editIngredients = this.selectedBurger.ingredients.join('\n');
      this.editing = true;
    },

    handleDelete(id) {
      this.burgerListData = this.burgerListData.filter(b => b.id !== id);
      /* -------------------- TODO: send delete request to API -------------------- */
    },

    idExists(id) {
      return this.burgerListData.some(b => b.id == id);
    },

    saveBurgerChanges() {
      const currentId = this.selectedBurger ? this.selectedBurger.id : null;
      const newId = this.editId;

      if (newId !== currentId && this.idExists(newId)) {
        this.showWarningIdExists = true;
        return;
      }

      const newBurger = this.getBurgerFromInput();

      const index = this.burgerListData.findIndex(b => b.id == currentId);
      this.burgerListData.splice(index, 1, newBurger);
      this.editing = false;

      /* -------------------- TODO: send update request to API -------------------- */
    },

    createNewBurger() {
      const newId = this.editId;

      if (this.idExists(newId)) {
        this.showWarningIdExists = true;
        return;
      }

      const newBurger = this.getBurgerFromInput();
      this.burgerListData.push(newBurger);
      this.creating = false;

      /* --------------------- TODO: send post request to API --------------------- */
    },

    getBurgerFromInput() {
      return {
        ...this.selectedBurger,
        id: this.editId,
        name: this.editName,
        calories: this.editCalories,
        ingredients: this.editIngredients.split(/\s+/),
      };
    },

  },

  created() {
    this.getBurgerListData();
  }
}
</script>

<style scoped lang="scss">
[v-cloak] {
  display: none;
}

@media screen and (max-width: 768px) {
  .modal-content {
    padding: 0 20px;
  }

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