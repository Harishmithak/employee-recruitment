// import { createStore } from 'vuex'

// export default createStore({
//   state: {
    
//   },
//   getters: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
// store.js

import { createStore } from 'vuex'
import axios from 'axios'; // Import Axios



export default createStore({
  state: {
    isLoggedIn: false,
    userEmail: '',
  },
  mutations: {
    SET_IS_LOGGED_IN(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    SET_USER_EMAIL(state, userEmail) {
      state.userEmail = userEmail;
    },
  },
  actions: {
    performLogin({ commit }, userData) {
      // Make the API request using Axios
      axios
        .post('http://127.0.0.1:8000/api/login', userData)
        .then((response) => {
          console.log('Login successful', response.data);
          // Update state after successful login
          commit('SET_IS_LOGGED_IN', true);
          commit('SET_USER_EMAIL', userData.email);
        })
        .catch((error) => {
            if (error.response.status === 422) {
                // Handle validation errors here
                const validationErrors = error.response.data.errors;
                console.error('Validation errors', validationErrors);
                // You can set up a state property to store validation errors and display them in your template
              } else {
                console.error('Login error', error);
                // Handle other errors here
              }
        });
    },
    logout({ commit }) {
      // Perform logout logic and update state
      commit('SET_IS_LOGGED_IN', false);
      commit('SET_USER_EMAIL', '');
    },
  },
});








