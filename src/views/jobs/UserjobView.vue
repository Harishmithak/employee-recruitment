<template>
  <div>
    <h1>Job Listings</h1>
    <table>
      <thead>
        <tr>
          <th>Company Name</th>
          <th>Job Position</th>
          <th>Job Description</th>
       
        </tr>
      </thead>
      <tbody>
        <tr v-for="job in jobs" :key="job.id">
          <td>{{ job.company_name }}</td>
          <td>{{ job.job_position }}</td>
          <td>{{ job.job_description }}</td>
        
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
      axios.get('http://127.0.0.1:8000/api/alljobs')
        .then((response) => {
 
          this.jobs = response.data.jobs;
        })
        .catch((error) => {
          console.error('Error fetching job data:', error);
        });
    },
  },
};

</script>