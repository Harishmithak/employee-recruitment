<template>
  <section class="NAVBAR">
    <nav class="navbar navbar-expand-lg navbar-light" id="nav">
      <div class="container-md">
        <div class="d-flex flex-grow-1">
          <span class="w-75 d-lg-none d-block">
            <!-- hidden spacer to center brand on mobile --></span
          >
          <a id="pic" class="navbar-brand d-none d-lg-inline-block" href="#">
            <img
              id="pic"
              src="https://cdn-icons-png.flaticon.com/128/4133/4133274.png"
              alt="logo"
              width="60%"
          /></a>
          <!-- mobile logo -->
          <a
            class="navbar-brand-two d-lg-none d-inline-block mt-2"
            href="#"
            id="mob-logo"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/4133/4133274.png"
              alt="logo"
              width="60%"
            />
          </a>
          <div class="w-100 text-right">
            <button
              class="navbar-toggler bg-warning mt-sm-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#myNavbar"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
        <div class="collapse navbar-collapse text-right" id="myNavbar">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a href="#" class="nav-link m-2 menu-item ps-2">
                <router-link to="/">HOME</router-link>
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle m-2 menu-item ps-2"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="login"
              >
                <router-link to="/">REGISTER</router-link>
              </a>
              <ul class="dropdown-menu w-25 m-2 border-1 border-light" id="nav">
                <li>
                  <a class="dropdown-item" href="#"
                    ><router-link to="/user">sign up as User</router-link>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#"
                    ><router-link to="/companyuser"
                      >sign up as Company</router-link
                    >
                  </a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link m-2 menu-item ps-2"
                ><router-link to="/about">ABOUT</router-link>
              </a>
            </li>
            <li class="nav-item" v-if="isLoggedIn && isCompanyUser">
              <a href="#" class="nav-link m-2 menu-item ps-2"
                ><router-link to="/display">DETAILS</router-link>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link m-2 menu-item ps-2"
                ><router-link to="/userjob">ALL JOBS</router-link>
              </a>
            </li>
            <li class="nav-item" v-if="isLoggedIn && isCompanyUser">
              <a href="#" class="nav-link m-2 menu-item ps-2"
                ><router-link to="/companyjob">JOBS</router-link></a
              >
            </li>

            <div>
              <li class="nav-item" v-if="!isLoggedIn">
                <a href="#" class="nav-link m-2 menu-item ps-2"
                  ><router-link to="/login">LOGIN</router-link></a
                >
              </li>
              <div v-else>
                <button
                  @click="performLogout"
                  class="nav-link m-2 menu-item ps-2"
                >
                  Logout
                </button>
                <p id="welcome">Welcome, {{ userEmail }}</p>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  </section>
  <router-view />
</template>

<style>
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
  color:#b6ccd8 !important;
}

#nav {
  background-color: #00668c;
}
#mob-logo {
  margin-left: -2em;
}
.menu-item {
  border-radius: 20px;
  color:#b6ccd8!important;
}
#welcome {
  color: white;
}
.menu-item:hover {
  background-color: white;
  color: black !important;
  border-radius: 19px;
}

a {
  text-decoration: none;
  color: #b6ccd8;
}
a:hover {
  color: black !important;
}

@media (max-width: 767px) {
  #foot-logo {
    width: 60px;
  }
}
@media (max-width: 991px) {
  .navbar-collapse {
    text-align: center;
  }

  .navbar-nav {
    margin-top: 10px;
  }

  .menu-item {
    display: block;
    width: 100%;
    text-align: center;
    margin: 8px 0;
  }

  .navbar-toggler {
    margin-top: 10px;
  }

  .navbar-brand,
  .navbar-brand-two {
    text-align: center;
  }
}

@media (max-width: 767px) {
  .navbar-toggler {
    margin-top: 10px;
  }

  .menu-item {
     display: block;
    width: 100%;
    margin: 8px 0;
    padding: 10px;
    border-radius: 5px;
  }

  #mob-logo {
    margin-left: auto;
  }
}



</style>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["isLoggedIn", "userEmail", "userType"]),
    isCompanyUser() {
      return this.userType.trim().toLowerCase() === "company";
    },
   
  },
  data() {
    return {
      email: "",
      password: "",
      //userType: '',
    };
  },
  mounted() {
   
    console.log("userType:", this.userType);
  },
  methods: {
    ...mapActions(["performLogin", "performLogout"]),

    performLogout() {
      this.$store
        .dispatch("logout")
        .then(() => {})
        .catch((error) => {
          console.error("Logout error", error);
        });
    },
  },
};
</script>
