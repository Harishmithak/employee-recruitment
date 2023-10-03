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
            <img :src="getImageUrl(detail.candidate_image)" :alt="`Candidate Image `" />
          </td>
           <td>
            <img :src="getImageUrls(detail.signature_image)" :alt="` Signature Image `" />
          </td>
            
           
          <td>
  <a :href="getResumeUrls(detail.resume)" target="_blank">View Resume</a>
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
    };
  },
  mounted() {
    this.fetchDetails();
  },
  methods: {
    fetchDetails() {
      axios
        .get(`${store.state.baseUrl}candidatedetails`)
        .then((response) => {
          console.log('API Response:', response.data);
          this.details = response.data.details;
        })
        .catch((error) => {
          console.error('Error fetching candidate details:', error);
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

</style>
