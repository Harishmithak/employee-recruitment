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
        <button type="submit" class="custom-btn btn-10">Login</button>
      </form>
    </div>
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
.btn-10 {
  background: rgb(22,9,240);
background: linear-gradient(0deg, rgba(22,9,240,1) 0%, rgba(49,110,244,1) 100%);
  color: #fff;
  border: none;
  transition: all 0.3s ease;
  overflow: hidden;
}
.btn-10:after {
  position: absolute;
  content: " ";
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
  -webkit-transform: scale(.1);
  transform: scale(.1);
}
.btn-10:hover {
  color: #fff;
  border: none;
  background: transparent;
}
.btn-10:hover:after {
  background: rgb(0,3,255);
background: linear-gradient(0deg, rgba(2,126,251,1) 0%,  rgba(0,3,255,1)100%);
  -webkit-transform: scale(1);
  transform: scale(1);
}
body {
  background: #e0e5ec;
}
h1 {
  position: relative;
  text-align: center;
  color: #353535;
  font-size: 50px;
  font-family: "Cormorant Garamond", serif;
}

p {
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  text-align: center;
  font-size: 18px;
  color: #676767;
}
.frame {
  width: 90%;
  margin: 40px auto;
  text-align: center;
}
button {
  margin: 20px;
}
.custom-btn {
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background:rgb(22,9,240);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
   box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  outline: none;
}
</style>




