<template>
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

    <!-- Buttons -->
    <div class="field is-grouped is-justify-content-space-between">
      <div class="control">
        <button
          @click="updateBurger"
          class="button is-success"
          :class="{ 'is-hidden': !isEditModalActive }"
        >Guardar cambios</button>
        <button
          @click="createBurger"
          class="button is-success"
          :class="{ 'is-hidden': !isNewModalActive }"
        >Crear hamburguesa</button>
      </div>
      <div class="control">
        <button @click="closeCard" class="button is-danger">Cancelar</button>
      </div>
    </div>

    <div v-if="errorBurgerExists" class="notification is-primary">
      <button @click="errorBurgerExists = false" class="delete"></button>
      Error: ya existe una hamburguesa con este ID
    </div>
  </div>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                                   Script                                   */

import { mapActions } from 'vuex';

/* -------------------------------------------------------------------------- */
export default {
  name: 'EditBurgerForm',
  components: {

  },

  props: [
    'isNewBurgerModal',
  ],

  data() {
    return {
      editId: '',
      editName: '',
      editCalories: '',
      editIngredients: '',
    }
  },

  watch: {
    editId(newId, oldId) {
      (newId !== oldId) && (this.errorBurgerExists = false);
    }
  },

  /* ---------------------------- Computed / Store ---------------------------- */
  computed: {

    isEditModalActive: {
      get() { return this.$store.state.burgerList.isEditModalActive; },
      set(v) {
        this.$store.state.burgerList.isEditModalActive = v;
        this.$store.commit('SET_EDIT_MODAL', { value: v });
      },
    },

    isNewModalActive: {
      get() { return this.$store.state.burgerList.isNewModalActive; },
      set(v) {
        this.$store.commit('SET_NEW_MODAL', { value: v });
      },
    },

    errorBurgerExists: {
      get() { return this.$store.state.burgerList.errorBurgerExists; },
      set(v) {
        this.$store.commit('SET_ERROR_BURGER_EXISTS', { value: v })
      },
    },

    selectedBurger() { return this.$store.state.burgerList.selectedBurger; },

  },

  /* --------------------------------- Methods -------------------------------- */
  methods: {

    ...mapActions({
      requestAddBurger: 'addBurger',
      requestUpdateBurger: 'updateBurger',
    }),

    burgerIdExists(id) { return this.$store.getters.burgerIdExists(id); },

    closeCard() {
      this.isNewModalActive = this.isEditModalActive = false;
    },

    validateId(currentId, newId) {
      if (newId !== currentId && this.burgerIdExists(newId)) {
        this.errorBurgerExists = true;
        return false;
      }
      return true;
    },

    updateBurger() {
      const currentId = this.selectedBurger.id;
      const newId = Number(this.editId);
      if (!this.validateId(currentId, newId)) return;

      const newBurger = this.getBurgerFromInput();
      this.requestUpdateBurger({ id: currentId, burger: newBurger });
      // this.$store.commit('UPDATE_BURGER', { id: currentId, burger: newBurger });
      this.closeCard();
    },

    createBurger() {
      const newId = Number(this.editId);
      if (!this.validateId(null, newId)) return;

      if (this.burgerIdExists(newId)) {
        this.errorBurgerExists = true;
        return;
      }

      const newBurger = this.getBurgerFromInput();
      this.requestAddBurger({ burger: newBurger });
      // this.$store.commit('ADD_BURGER', { burger: newBurger });

      this.closeCard();
    },

    getBurgerFromInput() {
      return {
        ...this.selectedBurger,
        id: this.editId,
        name: this.editName,
        calories: this.editCalories,
        ingredients: this.editIngredients.split(/[\r\n]+/),
      };
    },

    clearForm() {
      this.editId = '';
      this.editName = '';
      this.editCalories = '';
      this.editIngredients = [];
    },

    fillFormWithSelectedBurger() {
      const b = this.selectedBurger;
      this.editId = b.id;
      this.editName = b.name;
      this.editCalories = b.calories;
      this.editIngredients = b.ingredients.join('\n');
    },

  },

  /* -------------------------------- Lifecycle ------------------------------- */
  created() {
    this.isNewBurgerModal ? this.clearForm() : this.fillFormWithSelectedBurger();
  }
}

</script>