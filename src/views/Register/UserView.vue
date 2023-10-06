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

  },
};
</script>



