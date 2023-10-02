

import { createStore } from 'vuex'
import axios from 'axios'; 
import store from '@/store'; 



export default createStore({
  state: {
    isLoggedIn: false,
    userEmail: '',
  
    baseUrl: 'http://127.0.0.1:8000/api/',
  },
  mutations: {
    SET_IS_LOGGED_IN(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    SET_USER_EMAIL(state, userEmail) {
      state.userEmail = userEmail;
    },
   
    // SET_USER_TYPE(state, usertype) {
    //   console.log('Setting usertype:', usertype);
    //   state.usertype = usertype;
    // },
  },
  actions: {
    performLogin({ commit }, userData) {
   
      axios
        .post(`${store.state.baseUrl}login`, userData)
        .then((response) => {
          console.log('Login successful', response.data);
          alert('login successfull');
          commit('SET_IS_LOGGED_IN', true);
          commit('SET_USER_EMAIL', userData.email);
         
          // commit('SET_USER_TYPE', userData.usertype);
        })
        .catch((error) => {

         // alert('Invalid credentials');

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
    //  commit('SET_USER_TYPE', '');
  
    },

      
  },
});








