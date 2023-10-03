<template>
  <div>
    <form @submit.prevent="submitForm">
    <h2 style=color:green;font-family:sans-serif;>Experience details</h2>
      <input type="hidden" v-model="formData.candidate_id" name="candidate_id" />
      <input type="hidden" v-model="formData.academic_id" name="academic_id" />
      <input type="hidden" v-model="formData.company_id" name="company_id" />
      <input type="hidden" v-model="formData.job_id" name="job_id" />

      
      <label>Year of Experience:</label>
      <input v-model="formData.year_of_experience" type="number" required />

      <label>Previous Company Name:</label>
      <input v-model="formData.previous_company_name" type="text" required />

      <label>Previous Job Position:</label>
      <input v-model="formData.previous_job_position" type="text" required />

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import store from '@/store';

export default {
  data() {
    return {
      formData: {
        candidate_id: null,
        academic_id: null,
        company_id: null,
        job_id: null,
        year_of_experience: null,
        previous_company_name: '',
        previous_job_position: '',
      },
    };
  },
  created() {
   
   this.formData.candidate_id = this.$route.params.candidate_id || null;
   this.formData.academic_id = this.$route.params.academic_id || null;
   this.formData.company_id = this.$route.params.company_id || null;
    this.formData.job_id = this.$route.params.job_id || null;
  },
  methods: {
    submitForm() {
   
      axios
        .post(`${store.state.baseUrl}experiencedetail`, this.formData)
        .then(response => {
          console.log(response.data);
       this.$router.push('/');
          
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          console.log('Response Status:', error.response.status);
          console.log('Response Data:', error.response.data);
        });
    },
  },
};
</script>
<style>
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
  }

  form {
    max-width: 600px;
    margin: 20px auto;
    background-color: #fff;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 16px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }

</style>
