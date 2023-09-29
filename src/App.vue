<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
       <router-link to="/companyuser">company Register</router-link> |
          <router-link to="/login">Login</router-link> |
             <router-link to="/user">User Register</router-link> |
               <router-link to="/companyjob">jobs company </router-link> |
               <router-link to="/userjob">All jobs  </router-link> 
  
  </nav> -->
   <section class="NAVBAR">
        <nav class="navbar navbar-expand-lg navbar-light" id="nav">
            <div class="container-md">
                <div class="d-flex flex-grow-1">
                    <span class="w-75 d-lg-none d-block">
                        <!-- hidden spacer to center brand on mobile --></span>
                    <a id="pic" class="navbar-brand d-none d-lg-inline-block" href="#">
                    <img id="pic"
                            src="https://cdn-icons-png.flaticon.com/128/4133/4133274.png" alt="logo" width="60%"></a>
                    <!-- mobile logo -->
                    <a class="navbar-brand-two d-lg-none d-inline-block mt-2" href="#" id="mob-logo">
                        <img src="https://cdn-icons-png.flaticon.com/128/4133/4133274.png" alt="logo" width="60%">
                    </a>
                    <div class="w-100 text-right">
                        <button class="navbar-toggler bg-warning mt-sm-2" type="button" data-bs-toggle="collapse"
                            data-bs-target="#myNavbar">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>
                <div class="collapse navbar-collapse text-right" id="myNavbar">
                    <ul class="navbar-nav ms-auto ">
                        <li class="nav-item">
                            <a href="#" class="nav-link m-2 menu-item ps-2"> <router-link to="/">HOME</router-link> </a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle m-2 menu-item ps-2" href="#" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false" id="login">
                             <router-link to="/" >REGISTER</router-link> 
                            </a>
                            <ul class="dropdown-menu w-25 m-2 border-1 border-light" id="nav">
                                <li><a class="dropdown-item" href="#"><router-link to="/user" >sign up as User</router-link> </a></li>
                                <li><a class="dropdown-item" href="#"><router-link to="/companyuser" >sign up as Company</router-link> </a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link m-2 menu-item ps-2"><router-link to="/about" >ABOUT</router-link> </a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link m-2 menu-item ps-2"><router-link to="/userjob" >ALL JOBS</router-link> </a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link m-2 menu-item ps-2"><router-link to="/companyjob" >JOBS</router-link> </a>
                        </li>
                            <li class="nav-item">
                            <a href="#" class="nav-link m-2 menu-item ps-2"><router-link to="/login" >LOGIN</router-link> </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </section>
  <router-view/>
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
/* NAVBAR MEDIA */
@media (min-width: 768px) {
    .navbar-brand.abs {
        position: absolute;
        width: auto;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
    }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.dropdown-item:hover {
    background-color: white !important;
    color: black !important;
}

.dropdown-item {
    color: #FEC100 !important;
}

#nav {
    background-color: #363c4e;
}
#mob-logo{
    margin-left: -2em;
}
.menu-item {
    border-radius: 20px;
    color: #FEC100 !important;
     

}

.menu-item:hover {
    background-color: white;
    color: black !important;
    border-radius: 19px;
}






a{
  text-decoration:none;
  color: #FEC100;
}
a:hover{
   color: black !important;
}

@media (max-width:767px){
    #foot-logo{
        width: 60px;
    }
}

</style>
