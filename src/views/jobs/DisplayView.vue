<!-- 
<template>
  <div>
    <h1>Candidate Details</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Company ID</th>
          <th>Job ID</th>  
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
            <td>{{ detail.company_id }}</td>
          <td>{{ detail.job_id }}</td>
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
</template> -->
<template>
  <div>
    <h1>Candidate Details</h1>
     <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Date of Birth</th>
    
          <th>Candidate Image</th>
          <th>Signature Image</th>
          <th>Resume</th>
          <th>Status</th>
          <th>Academic Details</th>
          <th>Experience Details</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="detail in details" :key="detail.id">
          <td>{{ detail.id }}</td>
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
            <a :href="getResumeUrls(detail.resume)" target="_blank" id="resume">View Resume</a>
          </td>
             <td>
           {{ detail.status }}
          </td>
          <td>
            <button @click="toggleAcademicDetails(detail)">show Academic Details</button>
          </td>
          <td>
            <button @click="toggleExperienceDetails(detail)">show Experience Details</button>
          </td>
         <td v-if="detail.status !== 'Shortlisted'">
  <button @click="showTextBox">Show Text Box</button>
</td>
<td v-else>
 
  <span>Already Shortlisted</span>
</td>
    
    <div v-if="showShortlistButton && detail.status !== 'Shortlisted'">
      <input type="text" v-model="shortlistReason" placeholder="Enter shortlisting reason" />
      <button @click="sendEmail(detail.email, shortlistReason)">Shortlisted</button>
    </div>

        </tr>
      </tbody>
    </table>
    </div>
    
    <div v-if="selectedCandidate && selectedCandidate.showAcademic">
      <h2>Academic Details</h2>
        <div class="table-responsive">
      <table class="table">

        <tr>
          <th>Qualification</th>
          <th>College Name</th>
          <th>Year of Passing (College)</th>
          <th>Percentage (College)</th>
          <th>Skills</th>
          <th>Job Position</th>
        </tr>
        <tr>
          <td>{{ selectedCandidate.academicDetails ? selectedCandidate.academicDetails.Qualification : '' }}</td>
          <td>{{ selectedCandidate.academicDetails ? selectedCandidate.academicDetails.college_name : '' }}</td>
          <td>{{ selectedCandidate.academicDetails ? selectedCandidate.academicDetails.year_of_passing_college : '' }}</td>
          <td>{{ selectedCandidate.academicDetails ? selectedCandidate.academicDetails.percentage_college : '' }}</td>
          <td>{{ selectedCandidate.academicDetails ? selectedCandidate.academicDetails.skills : '' }}</td>
          <td>{{ selectedCandidate.academicDetails ? selectedCandidate.academicDetails.job_position : '' }}</td>
        </tr>
      </table>
      </div>
    </div>

    <div v-if="selectedCandidate && selectedCandidate.showExperience">
      <h2>Experience Details</h2>
        <div class="table-responsive">
      <table class="table">
 
        <tr>
          <th>Years of Experience</th>
          <th>Previous Company</th>
          <th>Previous Job Position</th>
        </tr>
        <tr>
          <td>{{ selectedCandidate.experienceDetails ? selectedCandidate.experienceDetails.year_of_experience : '' }}</td>
          <td>{{ selectedCandidate.experienceDetails ? selectedCandidate.experienceDetails.previous_company_name : '' }}</td>
          <td>{{ selectedCandidate.experienceDetails ? selectedCandidate.experienceDetails.previous_job_position : '' }}</td>
        </tr>
      </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import store from '@/store';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      details: [],
       jobs: [], 
      selectedCandidate: null,
       showShortlistButton: false,
      shortlistReason: '',
    };
  },
  mounted() {
    if (store.state.isLoggedIn) {
  
      this.fetchDetails();
    }
  },
  methods: {
      showTextBox() {
      this.showShortlistButton = true;
    },

       toggleAcademicDetails(candidate) {
      this.selectedCandidate = candidate;
      this.selectedCandidate.showAcademic = !this.selectedCandidate.showAcademic;
      this.selectedCandidate.showExperience = false;
      if (this.selectedCandidate.showAcademic) {
        this.fetchAcademicDetails();
      }
    },
    toggleExperienceDetails(candidate) {
      this.selectedCandidate = candidate;
      this.selectedCandidate.showExperience = !this.selectedCandidate.showExperience;
      this.selectedCandidate.showAcademic = false;
      if (this.selectedCandidate.showExperience) {
        this.fetchExperienceDetails();
      }
    },
     sendEmail(email,shortlistReason) {
     
      console.log('Shortlist Reason:', shortlistReason);
 axios.post(`${store.state.baseUrl}send-email/${email}/${shortlistReason }` )
    .then(response => {
      console.log('Email sent successfully:', response.data);
       Swal.fire({
            icon: 'success',
            title: 'Email Sent Successfully!',
            text: 'The email has been sent successfully.',
          });
    })
    .catch(error => {
      console.error('Error sending email:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
       Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to send the email. Please try again.',
          });
    });
},
     fetchDetails() {
       const userEmail = store.state.userEmail;
      axios
        .get(`${store.state.baseUrl}candidatedetails/${userEmail}`)
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
#resume{
  color:black;
}
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

  div.th {
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
