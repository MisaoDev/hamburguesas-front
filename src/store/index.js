import { createStore } from 'vuex';
import axios from 'axios';

const BURGER_ENDPOINT = 'https://prueba-hamburguesas.herokuapp.com/burger';
const IMG_ENDPOINT = 'https://foodish-api.herokuapp.com/api/images/burger';


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */
const state = () => {
  return {
    burgers: [],

    burgerList: {
      errorFetchingBurgers: false,
      errorBurgerExists: false,

      isViewModalActive: false,
      isEditModalActive: false,
      isNewModalActive: false,
      isDeleteModalActive: false,
      selectedBurger: null,
    },

    filterQuery: '',
  }
};

/* -------------------------------------------------------------------------- */
/*                                   Getters                                  */
/* -------------------------------------------------------------------------- */
const getters = {
  getBurgers: state => {
    return state.burgers;
  },

  getFilteredBurgers: state => {
    const queryWords = state.filterQuery.trim().split(' ');
    return state.burgers.filter(burger => {

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

  burgerIdExists: state => id => {
    return state.burgers.some(b => b.id === id);
  },
};

/* -------------------------------------------------------------------------- */
/*                                  Mutations                                 */
/* -------------------------------------------------------------------------- */
const mutations = {
  DROP_BURGERS: (state) => {
    state.burgers = [];
  },

  ADD_BURGER: (state, { burger }) => {
    state.burgers.push(burger);
  },

  UPDATE_BURGER: (state, { id, burger }) => {
    const index = state.burgers.findIndex(b => b.id == id);
    state.burgers.splice(index, 1, burger);
  },

  REMOVE_BURGER: (state, { id }) => {
    const index = state.burgers.findIndex(b => b.id == id);
    state.burgers.splice(index, 1);
  },

  SET_ERROR_FETCH_BURGERS: (state, { value }) => {
    state.burgerList.errorFetchingBurgers = value;
  },

  SET_ERROR_BURGER_EXISTS: (state, { value }) => {
    state.burgerList.errorBurgerExists = value;
  },

  SET_SELECTED_BURGER: (state, { burger }) => {
    state.burgerList.selectedBurger = burger;
  },

  SET_VIEW_MODAL: (state, { value }) => {
    state.burgerList.isViewModalActive = value;
  },

  SET_EDIT_MODAL: (state, { value }) => {
    state.burgerList.isEditModalActive = value;
  },

  SET_NEW_MODAL: (state, { value }) => {
    state.burgerList.isNewModalActive = value;
  },

  SET_DELETE_MODAL: (state, { value }) => {
    state.burgerList.isDeleteModalActive = value;
  },

  UPDATE_QUERY: (state, { query }) => {
    state.filterQuery = query;
  },

};

/* -------------------------------------------------------------------------- */
/*                                   Actions                                  */
/* -------------------------------------------------------------------------- */
const actions = {

  fetchBurgers: async ({ commit }) => {
    commit('DROP_BURGERS');
    axios.get(BURGER_ENDPOINT)

      .then(res => {
        res.data.forEach(async burger => {
          const newBurger = burgerToLocal(burger);
          newBurger.image = await getRandomImage();
          commit('ADD_BURGER', { burger: newBurger });
        });
      })

      .catch(err => {
        commit('SET_ERROR_FETCH_BURGERS', { value: true, error: err });
        console.log(err);
      });
  },

  addBurger: async ({ commit }, { burger }) => {
    axios.post(BURGER_ENDPOINT + '/', burgerToAPI(burger))
      .then(async res => {
        burger.image = await getRandomImage();
        commit('ADD_BURGER', { burger });
        console.log(res);
      })
      .catch(err => {
        // TODO
        console.log(err);
      });
  },

  updateBurger: async ({ commit }, { id, burger }) => {
    axios.put(`${BURGER_ENDPOINT}/${id}/`, burgerToAPI(burger))
      .then(res => {
        commit('UPDATE_BURGER', { id, burger });
        console.log(res);
      })
      .catch(err => {
        // TODO
        console.log(err);
      });
  },

  removeBurger: async ({ commit }, { id }) => {
    axios.delete(`${BURGER_ENDPOINT}/${id}`)
      .then(res => {
        commit('REMOVE_BURGER', { id });
        console.log(res);
      })
      .catch(err => {
        // TODO
        console.log(err);
      });
  },

};

/* -------------------------------------------------------------------------- */
/*                               Helper methods                               */
/* -------------------------------------------------------------------------- */
/**
 * Fetches a random image from a Burger API
 * @returns a Promise that resolves to the image URL
 */
function getRandomImage() {
  return new Promise((resolve, reject) => {
    axios.get(IMG_ENDPOINT)
      .then(res => {
        resolve(res.data.image);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * Translates burger properties from the API to local format
 * @param {*} burger 
 * @returns the new burger object
 */
function burgerToLocal(burger) {
  return {
    id: burger.id,
    name: burger.nombre,
    ingredients: burger.ingredientes,
    calories: burger.calorias,
  };
}

/**
 * Translates burger properties to the API format
 * @param {*} burger 
 * @returns the new burger object
 */
 function burgerToAPI(burger) {
  return {
    id: burger.id,
    nombre: burger.name,
    ingredientes: burger.ingredients,
    calorias: burger.calories,
  };
}

/* -------------------------------------------------------------------------- */
export const store = createStore({
  state,
  mutations,
  getters,
  actions,
});
