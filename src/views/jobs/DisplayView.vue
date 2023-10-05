
<template>
  <div>
    <h1>Candidate Details</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
         <!-- <th>Company ID</th>
          <th>Job ID</th>  -->
          <th>Name</th>
          <th>Email</th>
          <th>Date of Birth</th>
          <th>Candidate Image</th>
          <th>Signature Image</th>
          <th>Resume</th>
          <th>Qualification</th>
          <th>College Name</th>
          <th>Year of Passing (College)</th>
          <th>Percentage (College)</th>
          <th>Skills</th>
          <th>Job Position</th>
            <th>Years of Experience</th>
          <th>Previous Company</th>
          <th>Previous Job Position</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="detail in details" :key="detail.id">
          <td>{{ detail.id }}</td>
           <!-- <td>{{ detail.company_id }}</td>
          <td>{{ detail.job_id }}</td>  -->
          <td>{{ detail.name }}</td>
          <td>{{ detail.email }}</td>
          <td>{{ detail.dob }}</td>
          <td>
            <img :src="getImageUrl(detail.candidate_image)" :alt="`Candidate Image`" />
          </td>
          <td>
            <img :src="getImageUrls(detail.signature_image)" :alt="`Signature Image`" />
          </td>
          <td>
            <a :href="getResumeUrls(detail.resume)" target="_blank">View Resume</a>
          </td>
          <td>{{ detail.academicDetails ? detail.academicDetails.Qualification : '' }}</td>
          <td>{{ detail.academicDetails ? detail.academicDetails.college_name : '' }}</td>
          <td>{{ detail.academicDetails ? detail.academicDetails.year_of_passing_college : '' }}</td>
          <td>{{ detail.academicDetails ? detail.academicDetails.percentage_college : '' }}</td>
          <td>{{ detail.academicDetails ? detail.academicDetails.skills : '' }}</td>
          <td>{{ detail.academicDetails ? detail.academicDetails.job_position : '' }}</td>
          <td>{{ detail.experienceDetails ? detail.experienceDetails.year_of_experience : '' }}</td>
          <td>{{ detail.experienceDetails ? detail.experienceDetails.previous_company_name : '' }}</td>
          <td>{{ detail.experienceDetails ? detail.experienceDetails.previous_job_position : '' }}</td>
          <td>
         
        <button  @click="sendEmail(detail.email)" >sortlisted</button>
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
      details: [],
      selectedCandidate: null,
      
    };
  },
  mounted() {
    this.fetchDetails();
  },
  methods: {

     
     sendEmail(email) {
     
 axios.post(`${store.state.baseUrl}send-email/${email}`)
    .then(response => {
      console.log('Email sent successfully:', response.data);
    })
    .catch(error => {
      console.error('Error sending email:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    });
},
     fetchDetails() {
      axios
        .get(`${store.state.baseUrl}candidatedetails`)
        .then((response) => {
          console.log('API Response:', response.data);
          this.details = response.data.details.map(candidate => ({
            ...candidate,
            academicDetails: null,
            experienceDetails: null,
          }));
          this.fetchAcademicDetails();
        })
        .catch((error) => {
          console.error('Error fetching candidate details:', error);
        });
    },
    fetchAcademicDetails() {
      this.details.forEach(candidate => {
        axios
          .get(`${store.state.baseUrl}academicdetails/${candidate.id}`)
          .then(response => {
            console.log('Academic Details:', response.data);
            candidate.academicDetails = response.data.academicDetails;
            this.fetchExperienceDetails(candidate); 
          })
          .catch(error => {
            console.error('Error fetching academic details:', error);
          });
      });
    },
       fetchExperienceDetails() {
      this.details.forEach(candidate => {
        axios
          .get(`${store.state.baseUrl}experiencedetails/${candidate.id}`)
          .then(response => {
            console.log('Experience Details:', response.data);
            candidate.experienceDetails = response.data.experienceDetails;
           
          })
          .catch(error => {
            console.error('Error fetching candidate details:', error);
          });
      });
    },

    getImageUrl(imagePath) {
      return imagePath ? `http://localhost:8000/storage/${imagePath}` : '';
    },
    getImageUrls(imagePathSign) {
      return imagePathSign ? `http://localhost:8000/storage/${imagePathSign}` : '';
    },
    getResumeUrls(imagePathResume) {
      return imagePathResume ? `http://localhost:8000/storage/${imagePathResume}` : '';
    },
  },
};
</script>

<style>
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .modal table {
    width: 80%;
    margin: 20px;
    background-color: white;
    border-collapse: collapse;
  }

  .modal th, .modal td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  .modal th {
    background-color: #4CAF50;
    color: white;
  }

  .modal h2 {
    color: white;
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
 
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
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


  
  td {
    padding: 10px;
  }


  img {
    max-width: 100px;
    max-height: 100px;
  }


  a {
    text-decoration: none;
   
  }



</style>
