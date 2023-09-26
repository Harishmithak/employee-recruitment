<!-- <template>
  <form @submit.prevent="registerCompanyUser">
    <label>Company Name:</label>
    <input v-model="companyUser.company_name" type="text" required />
    <label>Company Email:</label>
    <input v-model="companyUser.company_email" type="email" required />
    <label>Password:</label>
    <input v-model="companyUser.company_password" type="password" required />
    <label>Confirm Password:</label>
    <input v-model="confirmPassword" type="password" required />
    <button type="submit">Register</button>
  </form>
</template> -->
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
    </div>
    <button class="btn btn-primary" type="submit">Register</button>
  </form>
</template>

<script>
import axios from 'axios'; 
export default {
  data() {
    return {
      companyUser: {
        company_name: '',
        company_email: '',
        company_password: '',
      },
      confirmPassword: '',
    };
  },
  methods: {
    registerCompanyUser() {
      if (this.companyUser.company_password !== this.confirmPassword) {
      
        alert('Passwords do not match.');
        return;
      }
      
      axios.post('http://127.0.0.1:8000/api/companyusers', this.companyUser)
        .then(response => {
              console.log('Registration successful', response.data);
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