
<template>
  <div>
    <h1>Jobs</h1>
     <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <div class="table-container">
    <table>
      
      <thead>
        <tr>
          <th>Company Name</th>
          <th>Job Position</th>
          <th>Job Description</th>
          <th>Basic Qualification</th>
            <th>Skills Required</th>
            <th>Application start date</th>
            <th>Application End date</th>
          <th>Apply Now</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="job in jobs" :key="job.id">
          <td>{{ job.company_name }}</td>
          <td>{{ job.job_position }}</td>
          <td>{{ job.job_description }}</td>
          <td>{{ job.basic_qualification }}</td>
          <td>{{ job.skills_required}}</td>
          <td>{{ job.application_start_date}}</td>
          <td>{{ job.application_end_date}}</td>
          <td>
            <button @click="showApplicationForm(job)">Apply Now</button>
        
            <div v-if="job.showForm">
 
          
           <form @submit.prevent="submitApplication(job)" enctype="multipart/form-data">
             
                <input type="text" v-model="job.name" placeholder="Name" />
                <input type="email" v-model="job.email" placeholder="Email" />
                <input type="date" v-model="job.dob" placeholder="Date of Birth" />

                <label for="candidate_image">Candidate Image:</label>
                <input type="file" name="candidate_image" v-on:change="onImageChange(job, $event)" id="candidate_image" />

                <label for="signature_image">Signature Image:</label>
                <input type="file" name="signature_image" v-on:change="onImageChanges(job, $event)" id="signature_image" />

                <label for="resume">Resume:</label>
                <input type="file" name="resume" v-on:change="onResumeChanges(job, $event)" id="resume" />
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
  </div>
</template>

<script>
import axios from 'axios';
import store from '@/store'; 

export default {
  data() {
    return {
      jobs: [],
      formData: {
        company_id: '',
        job_id: '',
        name: '',
        email: '',
        dob: '',
        candidate_image: null, 
        signature_image: null, 
        resume: null, 
      },
    };
  },
  mounted() {
    this.fetchJobs();
  },
  methods: {
    onImageChange(job, e) {
      this.formData.candidate_image = e.target.files[0];
          
    },
      onImageChanges(job, e) {

          this.formData.signature_image = e.target.files[0];
    },
          onResumeChanges(job, e) {

          this.formData.resume = e.target.files[0];
    },
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

      const formData = new FormData();
      formData.append('company_id', job.company_id);
      formData.append('job_id', job.id);
      formData.append('name', job.name);
      formData.append('email', job.email);
      formData.append('dob', job.dob);
      formData.append('candidate_image', this.formData.candidate_image);
       formData.append('signature_image', this.formData.signature_image);
       formData.append('resume', this.formData.resume);

      axios
        .post(`${store.state.baseUrl}apply`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log('Application submitted successfully', response);
            const candidateId = response.data.candidate_id;
            this.$router.push({
              name: 'academic',
              params: {
                candidate_id: candidateId,
                company_id: response.data.company_id,
                job_id: response.data.job_id,
              },
            });
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


  body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
  }


  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }


  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #4CAF50;
    color: white;
  }


  button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 8px 12px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
  }
  form {
    margin-top: 10px;
  }

  input {
    width: 100%;
    padding: 10px;
    margin: 8px 0;
    box-sizing: border-box;
  }

  input[type="hidden"] {
    display: none;
  }


  button[type="submit"] {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button[type="submit"]:hover {
    background-color: #45a049;
  }

  .error-message {
    color: red;
    margin-top: 5px;
  }
</style>
