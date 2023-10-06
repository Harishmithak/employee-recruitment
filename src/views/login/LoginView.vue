
<template>
  <div>
    <div v-if="!isLoggedIn">
      <h4> LOGIN</h4>
      <form @submit.prevent="performLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="email" type="email" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input v-model="password" type="password" class="form-control" required />
        </div>
        <button type="submit" class="custom-btn btn-10">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
// import Swal from 'sweetalert2';
export default {
  setup() {
    const store = useStore();
    const isLoggedIn = store.state.isLoggedIn;
    const email = ref('');
    const password = ref('');
    const performLogin = () => {
      if (!email.value || !password.value) {
        console.error('Please fill in all fields.');
        return;
      }
      const userData = {
        email: email.value,
        password: password.value,
      };
      store.dispatch('performLogin', userData)
        .then(() => {
         
        })
        .catch((error) => {
          console.error('Login error', error);
        });
    };
    return {
      isLoggedIn,
      email,
      password,
      performLogin,
    };
  },
};
</script>
<style scoped>

.login-form {
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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




