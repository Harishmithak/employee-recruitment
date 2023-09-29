<template>
  <div>
    <h1>Job Listings</h1>
        <form @submit.prevent="createJob">
      <label for="jobPosition">Job Position:</label>
      <input v-model="newJob.job_position" type="text" id="jobPosition" required>

      <label for="jobDescription">Job Description:</label>
      <textarea v-model="newJob.job_description" id="jobDescription" required></textarea>

      <label for="basicQualification">Basic Qualification:</label>
      <input v-model="newJob.basic_qualification" type="text" id="basicQualification" required>

      <label for="skillsRequired">Skills Required:</label>
      <textarea v-model="newJob.skills_required" id="skillsRequired" required></textarea>

      <label for="applicationStartDate">Application Start Date:</label>
      <input v-model="newJob.application_start_date" type="date" id="applicationStartDate" required>

      <label for="applicationEndDate">Application End Date:</label>
      <input v-model="newJob.application_end_date" type="date" id="applicationEndDate" required>

     

      <button type="submit">Create Job</button>
      </form>
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
import { mapState } from 'vuex';
// import { AgGridVue } from 'ag-grid-vue3';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

export default {
  computed: {
    ...mapState(['userEmail']),
  },
  data() {
    return {
      jobs: [],
      newJob: {
        job_position: '',
        job_description: '',
        basic_qualification: '',
        skills_required: '',
        application_start_date: '',
        application_end_date: '',
      
      },
    };
  },
  mounted() {
    this.fetchJobs();
  },
  methods: {
    fetchJobs() {
      const loggedInEmail = this.userEmail;

      axios.get('http://127.0.0.1:8000/api/jobs', {
        params: {
          company_email: loggedInEmail,
        },
      })
        .then((response) => {
          this.jobs = response.data.jobs;
        })
        .catch((error) => {
          console.error('Error fetching job data:', error);
        });
    },
createJob() {
  const loggedInEmail = this.userEmail;

  axios.post('http://127.0.0.1:8000/api/jobs', {
    company_email: loggedInEmail,
    job_position: this.newJob.job_position,
    job_description: this.newJob.job_description,
    basic_qualification: this.newJob.basic_qualification,
    skills_required: this.newJob.skills_required,
    application_start_date: this.newJob.application_start_date,
    application_end_date: this.newJob.application_end_date,
    status: this.newJob.status || 'default_status', 
  })
    .then((response) => {
      this.jobs.push(response.data.job);
   
      this.newJob.job_position = '';
      this.newJob.job_description = '';
      this.newJob.basic_qualification = '';
      this.newJob.skills_required = '';
      this.newJob.application_start_date = '';
      this.newJob.application_end_date = '';
      
    })
    .catch((error) => {
      console.error('Error creating job:', error);
      console.error('Error response:', error.response); 
    });
},


  },
};
</script>


