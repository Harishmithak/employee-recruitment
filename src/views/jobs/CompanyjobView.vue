<template>
  <h1></h1>
  <button
    @click="openJobCreationModal"
    class="btn btn-success ms-auto"
    data-toggle="modal"
    data-target="#createJobModal"
  >
    Create Job <i class="fa-solid fa-plus"></i>
  </button>
  <div>
    <h1></h1>
    <div
      class="modal fade"
      id="createJobModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="createJobModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createJobModalLabel">Create New Job</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createJob">
              <label for="jobPosition">Job Position:</label>
              <input
                v-model="newJob.job_position"
                type="text"
                id="jobPosition"
                required
              />

              <br />
              <label for="jobDescription">Job Description:</label>
              <textarea
                v-model="newJob.job_description"
                id="jobDescription"
                required
              ></textarea>
              <br />
              <label for="basicQualification">Basic Qualification:</label>
              <input
                v-model="newJob.basic_qualification"
                type="text"
                id="basicQualification"
                required
              />
              <br />
              <label for="skillsRequired">Skills Required:</label>
              <textarea
                v-model="newJob.skills_required"
                id="skillsRequired"
                required
              ></textarea>
              <br />
              <label for="applicationStartDate">Application Start Date:</label>
              <input
                v-model="newJob.application_start_date"
                type="date"
                id="applicationStartDate"
                required
              />
              <br />
              <label for="applicationEndDate">Application End Date:</label>
              <input
                v-model="newJob.application_end_date"
                type="date"
                id="applicationEndDate"
                required
              />
              <br />
              <button type="submit" class="btn btn-secondary">
                Create Job
              </button>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- <ag-grid-vue
      style="width: 100%; height: 300px"
      class="ag-theme-alpine"
      :rowData="jobs"
      :columnDefs="columnDefs"
      :pagination="true"
      :animateRows="true"
      :frameworkComponents="frameworkComponents"
       
    >
    </ag-grid-vue> -->
    <div class="table-responsive">
        <table id="jobsTable" class="table">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Job Position</th>
            <th>Job Description</th>
            <th>Basic Qualification</th>
            <th>Skills Required</th>
            <th>Application Start Date</th>
            <th>Application End Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="job in jobs" :key="job.id">
            <td>{{ job.company_name }}</td>
            <td>{{ job.job_position }}</td>
            <td>{{ job.job_description }}</td>
            <td>{{ job.basic_qualification }}</td>
            <td>{{ job.skills_required }}</td>
            <td>{{ job.application_start_date }}</td>
            <td>{{ job.application_end_date }}</td>
            <td>
              <a href="#" class="btn btn-danger" @click.prevent="handleDeleteClick(job.id)">
                Delete
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
// import $ from "jquery";
// import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
// import "datatables.net-bs4/js/dataTables.bootstrap4.min";
// import { AgGridVue } from "ag-grid-vue3";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

import store from "@/store";

export default {
  components: {
    // AgGridVue,
  },
  computed: {
    ...mapState(["userEmail"]),
  },
  data() {
    return {
      jobs: [],
      newJob: {
        job_position: "",
        job_description: "",
        basic_qualification: "",
        skills_required: "",
        application_start_date: "",
        application_end_date: "",
      },

      // frameworkComponents: {
      //   agGridColumn: AgGridVue.AgGridColumn,
      // },

//       columnDefs: [
//         {
//           headerName: "Company Name",
//           field: "company_name",
//           sortable: true,
//           filter: true,
//         },
//         {
//           headerName: "Job Position",
//           field: "job_position",
//           sortable: true,
//           filter: true,
//         },
//         {
//           headerName: "Job Description",
//           field: "job_description",
//           sortable: true,
//           filter: true,
//         },
//         {
//           headerName: "Basic Qualification",
//           field: "basic_qualification",
//           sortable: true,
//           filter: true,
//         },
//         {
//           headerName: "Skills Required",
//           field: "skills_required",
//           sortable: true,
//           filter: true,
//         },
//         {
//           headerName: "Application start date",
//           field: "application_start_date",
//           sortable: true,
//           filter: true,
//         },
//         {
//           headerName: "Application  End date",
//           field: "application_end_date",
//           sortable: true,
//           filter: true,
//         },
//         {
//   headerName: "Delete",
//    field: "id",
//   sortable: false,
//   filter: false,
// cellRenderer: function (params) {
//     return `<a href="#" class="btn btn-danger" @click.prevent="handleDeleteClick(${params.data.id})">Delete</a>`;
//   },
// },

      
//       ],
    };
  },
  mounted() {
    this.fetchJobs();
  //     this.$nextTick(() => {
  //   this.initDataTable();
  // });
  },

  methods: {
//     initDataTable() {
//   const jobsTable = $("#jobsTable");
//   if ($.fn.DataTable.isDataTable(jobsTable)) {
//     jobsTable.DataTable().destroy();
//   }

//   jobsTable.DataTable({
//     paging: true,
//     searching: true,
//     lengthChange: true,
//     pageLength: 2,
//     // ... other DataTables options ...
//   });
// },
    
     handleDeleteClick(jobId) {
       console.log("Deleting job with ID:", jobId);

    axios
      .delete(`${store.state.baseUrl}jobs/${jobId}`)
      .then(() => {
       
        
      })
      .catch((error) => {
        console.error("Error deleting job:", error);
      });
  },
    fetchJobs() {
      const loggedInEmail = this.userEmail;
      axios
        .get(`${store.state.baseUrl}jobs`, {
          params: {
            company_email: loggedInEmail,
          },
        })
        .then((response) => {
          this.jobs = response.data.jobs;
        })
        .catch((error) => {
          console.error("Error fetching job data:", error);
        });
    },
    createJob() {
      const loggedInEmail = this.userEmail;

      axios
        .post(`${store.state.baseUrl}jobs`, {
          company_email: loggedInEmail,
          job_position: this.newJob.job_position,
          job_description: this.newJob.job_description,
          basic_qualification: this.newJob.basic_qualification,
          skills_required: this.newJob.skills_required,
          application_start_date: this.newJob.application_start_date,
          application_end_date: this.newJob.application_end_date,
          status: this.newJob.status || "default_status",
        })
        .then((response) => {
          console.log(this.jobs);
          this.jobs.push(response.data.job);
          this.newJob.job_position = "";
          this.newJob.job_description = "";
          this.newJob.basic_qualification = "";
          this.newJob.skills_required = "";
          this.newJob.application_start_date = "";
          this.newJob.application_end_date = "";
        })
        .catch((error) => {
          console.error("Error creating job:", error);
          console.error("Error response:", error.response);
        });
    },
  },
};
</script>

<style>
@import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
.btn-success {
  width: 10%;
  margin-left: 200px;
}
</style>




