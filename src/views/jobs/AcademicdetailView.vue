<template>
  <div>
    <form @submit.prevent="submitForm">
      <!-- Candidate Details -->
      <!-- <label>Candidate ID:</label> -->
 <input type="hidden" v-model="formData.candidate_id" name="candidate_id" />

      <input type="hidden" v-model="formData.company_id" name="company_id" />
      <input type="hidden" v-model="formData.job_id" name="job_id" /> 

      <!-- Company Details -->
      <!-- <label>Company ID:</label> -->
      <!-- <input v-model="formData.company_id" type="number" required />

      <label>Job ID:</label>
      <input v-model="formData.job_id" type="number" required /> -->

      <!-- Academic Details -->
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
