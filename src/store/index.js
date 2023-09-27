

import { createStore } from 'vuex'
import axios from 'axios'; 



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
   
      axios
        .post('http://127.0.0.1:8000/api/login', userData)
        .then((response) => {
          console.log('Login successful', response.data);
      
          commit('SET_IS_LOGGED_IN', true);
          commit('SET_USER_EMAIL', userData.email);
        })
        .catch((error) => {
            if (error.response.status === 422) {
              
                const validationErrors = error.response.data.errors;
                console.error('Validation errors', validationErrors);
                
              } else {
                console.error('Login error', error);
                
              }
        });
    },
    logout({ commit }) {
     
      commit('SET_IS_LOGGED_IN', false);
      commit('SET_USER_EMAIL', '');
    },

      
  },
});








