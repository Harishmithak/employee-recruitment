<!-- 
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
</script> -->



<template>
  <div>
    <div v-if="!isLoggedIn">
      <h3>Login</h3>
      <form @submit.prevent="performLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" v-model="email" type="email" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input id="password" v-model="password" type="password" class="form-control" required />
        </div>
        <!-- <div class="form-group">
          <label for="usertype">User Type:</label>
          <select id="usertype" v-model="usertype" class="form-control" required>
            <option value="user">User</option>
            <option value="company">Company</option>
          </select>
        </div> -->
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>

    <!-- <div v-if="isLoggedIn">
      <p>Welcome, {{ userEmail }}</p>
      <button @click="performLogout" class="btn btn-secondary">Logout</button>
    </div> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';


export default {
  computed: {
    ...mapState(['isLoggedIn', 'userEmail']),
  },
  data() {
    return {
      email: '',
      password: '',
      //usertype: 'user', 
    };
  },
  methods: {
    ...mapActions(['performLogin', 'performLogout']),
    performLogin() {
      
      if (!this.email || !this.password) {
        console.error('Please fill in all fields.');
        return;
      }

      const userData = {
        email: this.email,
        password: this.password,
        // usertype: this.usertype,
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

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
}

.login-form {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 8px;
  box-sizing: border-box;
}

button {
  background-color: #4CAF50;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
   background-color: #4CAF50;
}
</style>




