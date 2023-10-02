
<template>
  <form class="registration-form" @submit.prevent="registerCompanyUser">
    <div class="form-group">
      <label for="companyName">Company Name</label>
      <input
        id="companyName"
        class="form-control"
        v-model="companyUser.company_name"
        type="text"
        required
      />
      <div v-if="!companyUser.company_name" class="error-message">Company Name is required.</div>
    </div>

    <div class="form-group">
      <label for="companyEmail">Company Email</label>
      <input
        id="companyEmail"
        class="form-control"
        v-model="companyUser.company_email"
        type="email"
        required
      />
      <div v-if="!isValidEmail(companyUser.company_email)" class="error-message">Please enter a valid email address.</div>
    </div>

    <div class="form-group">
      <label for="companyPassword">Password</label>
      <input
        id="companyPassword"
        class="form-control"
        v-model="companyUser.company_password"
        type="password"
        required
      />
      <div v-if="companyUser.company_password.length < 8" class="error-message">Password must be at least 8 characters long.</div>
    </div>

    <div class="form-group">
      <label for="confirmPassword">Confirm Password</label>
      <input
        id="confirmPassword"
        class="form-control"
        v-model="confirmPassword"
        type="password"
        required
      />
      <div v-if="companyUser.company_password !== confirmPassword" class="error-message">Passwords do not match.</div>
    </div>

    <button class="btn btn-primary" type="submit">Register</button>
  </form>
</template>

<script>
import axios from 'axios'; 
import store from '@/store'; 

export default {
  data() {
    return {
      companyUser: {
        company_name: '',
        company_email: '',
        company_password: '',
      },
      confirmPassword: '',
       registrationAttempted: false,
    };
  },
  methods: {
    isValidEmail(email) {

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    validateForm() {
      if (
        !this.companyUser.company_name ||
        !this.companyUser.company_email ||
        !this.companyUser.company_password ||
        !this.confirmPassword
      ) {
        return false;
      }

      if (!this.isValidEmail(this.companyUser.company_email)) {
        return false;
      }

      if (this.companyUser.company_password.length < 8) {
        return false;
      }

      if (this.companyUser.company_password !== this.confirmPassword) {
        return false;
      }

      return true;
    },
    registerCompanyUser() {
      if (!this.validateForm()) {
        return;
      }

      axios.post(`${store.state.baseUrl}companyusers`, this.companyUser)
        .then(response => {
          console.log('Registration successful', response.data);
          this.$router.push({ path: '/' });
        })
        .catch(error => {
          console.error('Registration error', error.response.data);
        });
    },
  },
};
</script>



<style>
.registration-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background-color: #fff;
}

.form-group {
  margin-bottom: 20px;
}
.error-message {
  color: red;
  margin-top: 5px;
}
label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 16px;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>