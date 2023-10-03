<template>
  <div>
    <form @submit.prevent="submitForm">
<h2 style=color:green;font-family:sans-serif;>Academic details</h2>
 <input type="hidden" v-model="formData.candidate_id" name="candidate_id" />

      <input type="hidden" v-model="formData.company_id" name="company_id" />
      <input type="hidden" v-model="formData.job_id" name="job_id" /> 

     
      <label>Qualification:</label>
      <input v-model="formData.Qualification" type="text" required />

      <label>College Name:</label>
      <input v-model="formData.college_name" type="text" required />

      <label>Year of Passing (College):</label>
      <input v-model="formData.year_of_passing_college" type="number" required />

      <label>Percentage (College):</label>
      <input v-model="formData.percentage_college" type="number" step="0.01" required />

      <label>School Name (10th):</label>
      <input v-model="formData.school_name_tenth" type="text" required />

      <label>Year of Passing (10th):</label>
      <input v-model="formData.year_of_passing_tenth" type="number" required />

      <label>Percentage (10th):</label>
      <input v-model="formData.percentage_tenth" type="number" step="0.01" required />

      <label>School Name (12th):</label>
      <input v-model="formData.school_name_twelfth" type="text" required />

      <label>Year of Passing (12th):</label>
      <input v-model="formData.year_of_passing_twelfth" type="number" required />

      <label>Percentage (12th):</label>
      <input v-model="formData.percentage_twelfth" type="number" step="0.01" required />

      <label>Skills:</label>
      <input v-model="formData.skills" type="text" required />

      <label>Job Position:</label>
      <input v-model="formData.job_position" type="text" required />

      <button type="submit">Submit and move</button>
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
        company_id: null,
        job_id: null,
        Qualification: '',
        college_name: '',
        year_of_passing_college: null,
        percentage_college: null,
        school_name_tenth: '',
        year_of_passing_tenth: null,
        percentage_tenth: null,
        school_name_twelfth: '',
        year_of_passing_twelfth: null,
        percentage_twelfth: null,
        skills: '',
        job_position: '',
      },
    };
  },
 created() {
  
  this.formData.candidate_id = this.$route.params.candidate_id || null;
   this.formData.company_id = this.$route.params.company_id || null;
    this.formData.job_id = this.$route.params.job_id || null;

},
  methods: {
    submitForm() {
     
     axios.post(`${store.state.baseUrl}academicdetail`, this.formData)

        .then(response => {
          console.log(response.data);
           if (response.status === 200) {
        console.log('Application submitted successfully', response);
          const candidateId = response.data.candidate_id;

                   
                    this.$router.push({ name: 'experience', params: { candidate_id: candidateId ,academic_id: response.data.academic_id, company_id: response.data.company_id,
    job_id: response.data.job_id} });
      } else {
        
        console.error('Application submission failed with status code:', response.status);
      }
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
  p{
     font-family: 'Arial', sans-serif;
  }
</style>

