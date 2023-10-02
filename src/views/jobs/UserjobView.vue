
<template>
  <div>
    <h1>Job Listings</h1>
     <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <table>
      
      <thead>
        <tr>
          <th>Company Name</th>
          <th>Job Position</th>
          <th>Job Description</th>
          <th>Apply Now</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="job in jobs" :key="job.id">
          <td>{{ job.company_name }}</td>
          <td>{{ job.job_position }}</td>
          <td>{{ job.job_description }}</td>
          <td>
            <button @click="showApplicationForm(job)">Apply Now</button>
        
            <div v-if="job.showForm">
 
          
              <form @submit.prevent="submitApplication(job)">
             
                <input type="text" v-model="job.name" placeholder="Name" />
                <input type="email" v-model="job.email" placeholder="Email" />
                <input type="date" v-model="job.dob" placeholder="Date of Birth" />
       
                 <input type="hidden" :value="job.company_id" name="company_id" />
                 <input type="hidden" :value="job.id" name="job_id" /> 
                <button type="submit">Save and move next</button>
              </form>
        
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>





<script>
import axios from 'axios';
import store from '@/store'; 

export default {
  data() {
    return {
      jobs: [],
       
    };
  },
  mounted() {
    this.fetchJobs();
  },
  methods: {
    fetchJobs() {
      axios
         .get(`${store.state.baseUrl}alljobs`)
 
        .then((response) => {
          this.jobs = response.data.jobs;
        
          this.jobs.forEach((job) => {
            job.showForm = false;
            job.name = '';
            job.email = '';
            job.dob = '';
            // job.photo = '';
            // job.Resume = '';
          });
           if (this.jobs.length === 0) {
        
          this.errorMessage = 'No records found.';
        }
        })
        .catch((error) => {
          console.error('Error fetching job data:', error);
             this.errorMessage = 'Failed to fetch job data. Please try again later.';
        });
    },
    showApplicationForm(job) {
    
      job.showForm = !job.showForm;
      
    },
  submitApplication(job) {
  const formData = {
    company_id: job.company_id,
    job_id: job.id,
    name: job.name,
    email: job.email,
    dob: job.dob,
  };

  axios
    .post(`${store.state.baseUrl}apply`, formData)
    .then((response) => {
    
      if (response.status === 200) {
        console.log('Application submitted successfully', response);
          const candidateId = response.data.candidate_id;

                  
                    this.$router.push({ name: 'academic', params: { candidate_id: candidateId , company_id: response.data.company_id,
    job_id: response.data.job_id} });
      } else {
        
        console.error('Application submission failed with status code:', response.status);
      }
    })
    .catch((error) => {
       console.error('Error submitting application:', error);
    if (error.response) {
      console.error('Response Data:', error.response.data);
      console.error('Response Status:', error.response.status);
    }
    });

},

  },
};
</script>
<style>
.error-message {
  color: red;
  margin-top: 5px;
}

</style>