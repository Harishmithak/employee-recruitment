<template>
  <div>
    <div v-html="laravelViewContent"></div>
  </div>
</template>

<script>
//import axios from 'axios';

export default {
  data() {
    return {
      laravelViewContent: '', 
    };
  },
  mounted() {
    this.fetchLaravelView();
  },
  methods: {
    // fetchLaravelView() {
    //   axios
    //     .get('http://127.0.0.1:8000/api/register') 
    //     .then((response) => {
    //       this.laravelViewContent = response.data;
    //     })
    //     .catch((error) => {
    //       console.error('Error fetching Laravel view:', error);
    //     });
    // },
  },
};
</script>



