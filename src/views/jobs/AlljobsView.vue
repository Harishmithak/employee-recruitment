<template>
 <ag-grid-vue
  style="width: 100%; height: 300px;"
  class="ag-theme-alpine"
  :rowData="jobs"
  :columnDefs="columnDefs"
  :pagination="true"
  :animateRows="true" 
  :frameworkComponents="frameworkComponents"
>
</ag-grid-vue>

</template>

<script>
import axios from 'axios';
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import store from "@/store";
export default {
  components: {
    AgGridVue,
  },
  data() {
    return {
      jobs: [],

      frameworkComponents: {
        agGridColumn: AgGridVue.AgGridColumn,
      },
        columnDefs: [
        { headerName: 'Company Name', field: 'company_name',sortable:true,filter:true },
        { headerName: 'Job Position', field: 'job_position',sortable:true,filter:true },
        { headerName: 'Job Description', field: 'job_description',sortable:true,filter:true },
        { headerName: 'Basic Qualification', field: 'basic_qualification',sortable:true,filter:true },
        { headerName: 'Skills Required', field: 'skills_required',sortable:true,filter:true },
        { headerName: 'Application start date', field: 'application_start_date',sortable:true,filter:true },
        { headerName: 'Application  End date', field: 'application_end_date' ,sortable:true,filter:true},    
        ]
    };
  },
  mounted() {
    this.fetchJobs();
  },
  methods: {
    fetchJobs() {
      axios.get(`${store.state.baseUrl}alljobs`, {
        params: {
        },
      })
        .then((response) => {
          this.jobs = response.data.jobs;
        })
        .catch((error) => {
          console.error('Error fetching job data:', error);
          console.error("Error fetching job data:", error);
        });
    },
  }
  };
</script>

<style>
.btn-success {
  width: 10%;
 margin-left:200px;
  margin-left: 200px;
}
</style>