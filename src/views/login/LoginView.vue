
<template>
  <div>
    <div v-if="!isLoggedIn">
      <h2>Login</h2>
      <form @submit.prevent="performLogin">
                     <div class="form-group">
        <label>Email:</label>
        <input v-model="email" type="email" required />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input v-model="password" type="password" required />
      </div>
      <div class="form-group">
        <label>User Type:</label>
        <select v-model="usertype" required>
          <option value="user">User</option>
          <option value="company">Company</option>
        </select>
      </div>
        <button type="submit">Login</button>
      </form>
    </div>

    <div v-if="isLoggedIn">
      <p>Welcome, {{ userEmail }}</p>
      <button @click="performLogout">Logout</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['isLoggedIn', 'userEmail']),
  },
  methods: {
    ...mapActions(['performLogin', 'performLogout']),
    performLogin() {
      const userData = {
        email: this.email,
        password: this.password,
        usertype: this.usertype,
      };

   
      this.$store.dispatch('performLogin', userData)
        .then(() => {
       
        })
        .catch((error) => {
       
          console.error('Login error', error);
        });
    },
        performLogout() {
   
      this.$store.dispatch('logout')
        .then(() => {
       
        })
        .catch((error) => {
          console.error('Logout error', error);
        });
    },
  },
};
</script>







