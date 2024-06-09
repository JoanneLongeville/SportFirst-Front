<template>
    <div id="app">
      <header v-if="isSessionPage" id="nav">
        <a href="/">
          <img src="./assets/logo.png" alt="SportFirst Logo" style="height: 85px;" /></a>
  
        <span style="margin-left: 5px;font-family: 'Crete Round', sans-serif;font-size: 25px ">SportFirst <span style="color: #FFD700;font-size:40px">.</span></span>
  
        <div class="nav-links nav-links-right">
          <router-link to="/profile-page" class="nav-link">Profil</router-link>
          <router-link to="#" class="nav-link" @click="showReservationsPopup">Mes réservations</router-link>
          <router-link to="/" class="nav-link" @click="logout">|Se déconnecter</router-link>
        </div>
        <!-- ... -->
      </header>
  
      <header v-else-if="!isResetPasswordPage && !isSignUpPage && !isPricingCoursePage && !isSessionPage && !isProfilePage " id="nav">
        <a href="/">
          <img src="./assets/logo.png" alt="SportFirst Logo" style="height: 70px;" /></a>
        <span style="margin-left: 5px;font-family: 'Crete Round', sans-serif;font-size: 25px ">SportFirst <span style="color: #FFD700;font-size:40px">.</span></span>
        <div class="nav-links">
          <router-link to="/" class="nav-link" @click="scrollToSteps2">Qui suis-je?</router-link>
          <router-link to="/pricing" class="nav-link">Tarifs</router-link>
          <router-link to="/" class="nav-link" @click="scrollToLoginForm">|Se connecter</router-link>
        </div>
      </header>
  
      <header v-else-if="isPricingCoursePage" id="nav">
        <a href="/">
          <img src="./assets/logo.png" alt="SportFirst Logo" style="height: 85px;" /></a>
        <span style="margin-left: 5px;font-family: 'Crete Round', sans-serif;font-size: 25px ">SportFirst <span style="color: #FFD700;font-size:40px">.</span></span>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Accueil</router-link>
        </div>
      </header>
  
      <header v-else-if="isSignUpPage" id="nav">
        <a href="/">
          <img src="./assets/logo.png" alt="SportFirst Logo" style="height: 70px;" /></a>
        <span style="margin-left: 5px;font-family: 'Crete Round', sans-serif;font-size: 25px ">SportFirst <span style="color: #FFD700;font-size:40px">.</span></span>
        <div class="nav-links">
          <router-link to="/" class="nav-link" style="margin-right: 20px">Accueil</router-link>
        </div>
      </header>
  
      <header v-else-if="isProfilePage" id="nav">
        <a href="/">
          <img src="./assets/logo.png" alt="SportFirst Logo" style="height: 85px;" /></a>
        <span style="margin-left: -5px;font-family: 'Crete Round', sans-serif;font-size: 25px ">SportFirst <span style="color: #FFD700;font-size:40px">.</span></span>
        <div class="nav-links">
          <router-link to="/session/123" class="nav-link">Retour sur votre session</router-link>
        </div>
      </header>
  
      <div v-if="isReservationsPopupVisible" class="popup-overlay">
        <div class="popup-content">
          <span class="close-btn" @click="hideReservationsPopup">&times;</span>
          <h2>Mes réservations</h2>
  
          <button @click="hideReservationsPopup">Fermer</button>
        </div>
      </div>

      <router-view></router-view>
  
      <footer v-if="!isResetPasswordPage && !isSignUpPage && !isProfilePage">
        <div class="social-icons">
          <a href="https://www.facebook.com/" target="_blank" aria-label="Facebook">
            <i class="fa-brands fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com/" target="_blank" aria-label="Instagram">
            <i class="fa-brands fa-instagram"></i>
          </a>
        </div>
        <p>
          <a href="mailto:mysportfirst@gmail.com" style="color: white; text-decoration: none;">mysportfirst@gmail.com</a> | Téléphone : 0615658975
        </p>
        <p>Heures d'ouverture : Du lundi au samedi, de 09h à 12h et de 15h à 21h</p>
        <p>Réservation possible 48h à l'avance. Annulation possible jusqu'à 48h avant la date du cours.</p>
        <div class="legal-links">
          <a href="URL_VERS_VOTRE_PDF_CGV" target="_blank" style="color: white; text-decoration: none;">CGV</a> |
          <a href="URL_VERS_VOTRE_PDF_CGU" target="_blank" style="color: white; text-decoration: none;">CGU</a>
        </div>
      </footer>
    </div>
  </template>
  
  
  <script>
  export default {
    name: 'App',
    data() {
      return {
        isMobile: false,
        isLoggedIn: false,
        isReservationsPopupVisible: false,
  
      };
    },
    computed: {
      isProfilePage() {
        return this.$route.name === 'ProfilePage';
      },
      isResetPasswordPage() {
        return this.$route.name === 'ResetPassword';
      },
      isSignUpPage() {
        return this.$route.name === 'SignUp';
      },
      isSessionPage() {
        return this.$route.name === 'Session';
      },
      isPricingCoursePage() {
        return this.$route.name === 'PricingCourse';
      },
    },
    mounted() {
      this.handleResize();
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      showReservationsPopup() {
        this.isReservationsPopupVisible = true;
      },
      hideReservationsPopup() {
        this.isReservationsPopupVisible = false;
      },
      handleResize() {
        this.isMobile = window.innerWidth <= 768;
      },
      handleScroll() {
        const nav = document.getElementById('nav');
        if (window.scrollY > 0) {
          nav.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        } else {
          nav.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        }
      },
      scrollToLoginForm() {
        const element = document.getElementById('login-form');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      },
      scrollToSteps2() {
        const element = document.getElementById('steps2');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      },
      logout() {
  
        this.isLoggedIn = false;
  
      },
    },
  };
  </script>
  

  <style>
  
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-family: 'Montserrat', sans-serif;
  }
  
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .popup-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    width: 80%;
    max-width: 500px;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
    font-size: 25px;
  }
  #app {
    display: flex;
    flex-direction: column;
    min-height: auto;
    height: auto;
  }
  
  .nav-links-right {
    margin-left: auto;
  }
  
  #nav {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 20px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    justify-content: flex-start;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
  
  .nav-link {
    font-weight: bold;
    margin-right: 10px;
    color: #261416;
    font-size: 15px;
    padding: 10px 15px;
    text-decoration: none;
    cursor: pointer;
  }
  
  .nav-link:hover {
    color:  #FFD700
  }
  
  .nav-links {
    margin-left: auto;
    display: flex;
    margin-right: 30px;
  }
  
  footer {
    background-color: #be1919;
    color: white;
    text-align: center;
    padding: 20px;
    margin-top: auto;
    width: 100%;
  }
  
  footer a {
    color: white;
    text-decoration: none;
  }
  
  .social-icons {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
  
  .social-icons a {
    margin: 0 10px;
  }
  
  .social-icons i {
    font-size: 24px;
    color: white;
  }
  
  footer p {
    margin: 10px 0;
  }
  
  @media (max-width: 768px) {
    #nav {
      flex-direction: column;
      align-items: center;
    }
  
    .nav-links {
      margin-left: 0;
      align-items: center;
      width: 100%;
    }
  
    .nav-link {
      text-align: center;
      width: 100%;
      padding: 5px;
    }
  
    footer {
      padding: 10px;
    }
  
    footer p {
      font-size: 14px;
    }
  
    .social-icons a {
      margin: 0 5px;
    }
  }
  
  </style>
  