import { createStore } from 'vuex'
import axios from 'axios'; 
import store from '@/store'; 
import Swal from 'sweetalert2';

export default createStore({
  state: {
    isLoggedIn: false,
    userEmail: '',
    userType: '', 
    baseUrl: 'http://127.0.0.1:8000/api/',
  },

  mutations: {
    SET_IS_LOGGED_IN(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    SET_USER_EMAIL(state, userEmail) {
      state.userEmail = userEmail;
    },
    SET_USER_TYPE(state,userType){
      state.userType = userType;
    }
  },

  actions: {
    performLogin({ commit }, userData) {
      axios
        .post(`${store.state.baseUrl}login`, userData)
        .then((response) => {
          if (response.status === 200 && response.data.success) {
            // Assuming your API returns a 'success' key in the response data for successful logins
            Swal.fire({
              icon: 'success',
              title: 'Login Successful',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
            });
            commit('SET_IS_LOGGED_IN', true);
            commit('SET_USER_EMAIL', userData.email);
            commit('SET_USER_TYPE', response.data.userType);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Login Failed',
              text: 'Invalid email or password. Please try again.',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'An error occurred. Please try again later.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
          });
  
          if (error.response && error.response.status === 422) {
            const validationErrors = error.response.data.errors;
            console.error('Validation errors', validationErrors);
          }
  
          console.error('Login error', error);
        });
    },
    logout({ commit }) {
      Swal.fire({
        icon: 'success',
        title: 'Logout Successful',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000, 
      });
      commit('SET_IS_LOGGED_IN', false);
      commit('SET_USER_EMAIL', '');
      commit('SET_USER_TYPE', '');
    },
  },
});








