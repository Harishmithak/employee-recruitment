
<template>
  <div>
    <h1>Job Listings</h1>
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
                <button type="submit">Submit Application</button>
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
        .get('http://127.0.0.1:8000/api/alljobs')
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
        })
        .catch((error) => {
          console.error('Error fetching job data:', error);
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
    .post('http://127.0.0.1:8000/api/apply', formData)
    .then((response) => {
    
      if (response.status === 200) {
        console.log('Application submitted successfully', response);
      } else {
        
        console.error('Application submission failed with status code:', response.status);
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 422) {

        const validationErrors = error.response.data.errors;
        console.error('Validation errors:', validationErrors);
      
      } else {
        console.error('Error submitting application:', error);
      }
    });
},
  },
};
</script>
