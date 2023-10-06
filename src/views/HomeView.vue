<template>
  <div class="main-home">
    <div class="container">
      <div class="row gy-4" id="main-row">
        <div class="col-md-6">
          <video playsinline autoplay muted loop poster="" id="home-bg-video">
            <source src="../assets/interview.mp4" type="video/mp4">
          </video>
        </div>
        <div class="col-md-6" id="main-sec-col">
          <p>"Build Your Professional Identity. Connect with Opportunities. Propel Your Career Forward."</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body{
    background-color:#b6ccd8;
}

.container {
  margin-top: 20px;
  
  }

#main-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#home-bg-video {
  width: 100%;
  height: 500px;
}

#main-sec-col {
  text-align: center;
   font-family:cursive;
   font-size :30px;
}

@media (max-width: 768px) {
  #main-row {
    flex-direction: column;
  }
}
</style>

<script>
import $ from 'jquery';

export default {
  mounted() {

    $("#main-sec-col").hide().fadeIn(3000);

   
  },
};
</script>
