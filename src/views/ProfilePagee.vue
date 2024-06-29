<template>

  <section id="main-image">
    <div class="wrapper">
      <h2>"L'aventure vers une meilleure forme physique commence ici,<br><strong>rejoignez SportFirst, le leader du coaching sportif."</strong></h2>
      <a href="/signup" class="btn-inscrivez-vous">Inscrivez-vous</a>
    </div>
  </section>

  <section class="profil" id="profil">
    <div class="wrapper">
      <h2>Profil</h2>
      <p>Nom + Prénom</p>
      <p>Vous êtes un particulier et vous souhaitez bénéficier de nos services ?</p>
      <p>Créez votre compte dès maintenant et commencez votre aventure avec SportFirst.</p>
    </div>
  </section>

  <section class="login" id="login-form">
    <div class="wrapper">
      <div v-if="loginError" class="alert alert-danger">{{ loginError }}</div>
      <form @submit.prevent="submitLogin" class="login-form">
        <div class="form-group">
          <input
              type="text"
              class="form-control"
              placeholder="Adresse e-mail"
              v-model="loginDetails.email"
              required
          />
        </div>
        <div class="form-group password-group">
          <input
              :type="isPasswordVisible ? 'text' : 'password'"
              class="form-control"
              placeholder="Mot de passe"
              v-model="loginDetails.password"
              required
          />
          <span class="toggle-password" @click="togglePasswordVisibility">👁</span>
        </div>

        <div class="form-group">
          <button type="submit" class="btn btn-primary">Se connecter</button>
        </div>
      </form>

      <div class="link-container">
        <a href="/signup" class="create-account-link"><strong>Vous n'avez pas de compte ?</strong></a>
        <a href="/forgotpassword" class="forgot-password-link" @click.prevent="showModal = true"><strong>Mot de passe oublié ?</strong></a>
      </div>
    </div>
  </section>

  <ForgotPasswordModal v-if="showModal" @close="showModal = false"/>

</template>


<script>
import axios from 'axios';
import ForgotPasswordModal from '../components/ForgotPassword.vue';

export default {
  name: 'HomePage',
  components: {
    ForgotPasswordModal
  },
  data() {
    return {
      loginDetails: {
        email: '',
        password: ''
      },
      showModal: false,
      loginError: '',
      isPasswordVisible: false,
    };
  },
  methods: {
    async submitLogin() {
      try {

        const response = await axios.post('http://localhost:5000/login', this.loginDetails);

        if (response.status === 200) {
          sessionStorage.setItem('userFirstname', response.data.userFirstname);
          sessionStorage.setItem('userId', response.data.userID);

          this.$router.push({ name: 'ProfilePage', params: { userId: response.data.userID } });
        } else {

          this.loginError = "Une erreur est survenue. Veuillez réessayer.";
        }
      } catch (error) {
        if (error.response) {

          this.loginError = error.response.data.error;
        } else {

          this.loginError = "Erreur de connexion au serveur. Veuillez réessayer plus tard.";
        }
      }
    },
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
  },
};
</script>


<style scoped>
small{
  font-size: 15px;
  font-style: italic;
}

h4{
  font-size: 20px;
  color: black;
}

p{
  line-height: 20px;
}

.clear{
  clear: both;
}

.overlay{
  font-size: 15px;
}

#main-image{
  height: 750px;
  background: url('../assets/background2.jpg') center center no-repeat;
  background-size: cover; /* Cette propriété assure que l'image couvre entièrement l'espace disponible, tout en conservant ses proportions */
}

#main-image .wrapper h2 {
  font-weight: normal;
  text-transform: uppercase;
  text-align: center;
  color: #fff;
  padding: 200px 80px 40px 80px;
  margin-bottom: 300px;
}

.btn-inscrivez-vous{
  display: block;
  width: 120px;
  height:50px;
  background:  #FFD700;
  color:#000000;
  font-size:15px;
  margin: 400px auto;
  line-height: 50px;
  text-align: center;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
}
.btn-inscrivez-vous:hover{
  background:  #f4d03f
}

.article1{
  background-image: url("../assets/coach1.jpg");
  background-size: contain;
  height: 500px;
  background-repeat: no-repeat;
  background-position: right;
}

.overlay{
  background: rgba(255,255,255);
  height: 100%;
  width: 200px;
  padding: 20px;
}

.article1 .overlay p{
  text-align: left;
}

.price {
  font-size: 2.5em;
  margin: 20px 0;
}

.price span {
  font-size: 1em;
}

.features {
  list-style: none;
  padding: 0;
  text-align: left;
}

.features li {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.login {
  padding: 60px 0;
  text-align: center;
  border-radius: 10px;
}

.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}


.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.form-control:focus {
  outline: none;
  border-color: black;
  box-shadow: 0 0 0 2px black;
}

.btn-primary {
  background:  #FFD700;
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
}

.forgot-password-link {
  text-decoration: none;
  color: black;
  font-size: 13px;
}

.forgot-password-link:hover {
  text-decoration: underline;
}

.create-account-link{
  text-decoration: none;
  color: black;
  font-size: 13px;
  margin-right: 30px;
}

.create-account-link:hover {
  text-decoration: underline;
}

.toggle-password {
  /* position: absolute; */
  cursor: pointer;
  /* right: 10px; */
  /* top: 50%; */
  /* transform: translateY(-0%);  */
  margin-left: 390px;
}

/* Responsive design 280px-319px*/
@media (min-width:280px) and (max-width:319px) {

  small {
    font-size: 13px;
    line-height: 0.9;
    font-style: italic;
  }

  h4 {
    font-size: 10px;
    color: black;
  }

  p {
    line-height: 10px;
  }

  h2{
    font-size: 20px;
  }

  .clear {
    clear: both;
  }

  .overlay {
    font-size: 7px;
  }

  #main-image {
    height: 650px;
    background: url('../assets/background2.jpg') center center no-repeat;
    background-size: cover; /* Cette propriété assure que l'image couvre entièrement l'espace disponible, tout en conservant ses proportions */
  }

  #main-image .wrapper h2 {
    font-weight: normal;
    text-transform: uppercase;
    text-align: center;
    color: #fff;
    padding: 250px 80px 40px 80px;
    margin-bottom: 300px;
  }

  .btn-inscrivez-vous {
    display: block;
    width: 120px;
    height: 50px;
    background: #FFD700;
    color: #000000;
    font-size: 15px;
    margin: -250px auto;

    line-height: 50px;
    text-align: center;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
  }

  .btn-inscrivez-vous:hover {
    background: #f4d03f
  }

  .article1 {
    flex:1;
    margin-bottom: 250px;
    margin-left: -260px;
    background-image: url("../assets/coach1.jpg");
    background-size: 200px; /* Ajustez cette taille selon vos besoins */
    height: 150px;
    background-repeat: no-repeat;
    background-position: center; /* Centrer l'image dans l'élément */
  }

  .overlay {
    margin-top: 150px;
    background: rgba(255, 255, 255);
    height: 75%;
    width: 135px;
    padding: 15px;
  }

  .article1 .overlay p {
    text-align: left;
  }

  .login {
    padding: 60px 0;
    text-align: center;
    border-radius: 10px;
  }

  .login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  .btn-primary {
    background: #FFD700;
    color: black;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
  }

  .forgot-password-link {
    text-decoration: none;
    color: black;
    font-size: 13px;
  }

  .forgot-password-link:hover {
    text-decoration: underline;

  }

  .create-account-link {
    text-decoration: none;
    color: black;
    font-size: 13px;
    margin-right: 30px;
  }

  .create-account-link:hover {
    text-decoration: underline;
  }
}


/* Responsive design 320px-479px */
@media (min-width:320px) and (max-width:479px) {
  /*general*/
  small {
    font-size: 13px;
    line-height: 0.9;
    font-style: italic;
  }

  h4 {
    font-size: 10px;
    color: black;
  }

  p {
    line-height: 10px;
  }

  h2{
    font-size: 20px;
  }

  .clear {
    clear: both;
  }

  .overlay {
    font-size: 7px;
  }

  #main-image {
    height: 650px;
    background: url('../assets/background2.jpg') center center no-repeat;
    background-size: cover;
  }

  #main-image .wrapper h2 {
    font-weight: normal;
    text-transform: uppercase;
    text-align: center;
    color: #fff;
    padding: 250px 80px 40px 80px;
    margin-bottom: 300px;
  }

  .btn-inscrivez-vous {
    display: block;
    width: 120px;
    height: 50px;
    background: #FFD700;
    color: #000000;
    font-size: 15px;
    margin: -250px auto;
    line-height: 50px;
    text-align: center;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
  }

  .btn-inscrivez-vous:hover {
    background: #f4d03f
  }

  .article1 {
    flex:1;
    margin-bottom: 250px;
    margin-left: -240px;
    background-image: url("../assets/coach1.jpg");
    background-size: 200px;
    height: 150px;
    background-repeat: no-repeat;
    background-position: center;
  }

  .overlay {
    margin-top: 150px;
    background: rgba(255, 255, 255);
    height: 75%;
    width: 135px;
    padding: 15px;
  }

  .article1 .overlay p {
    text-align: left;
  }

  /*login*/
  .login {
    padding: 60px 0;
    text-align: center;
    border-radius: 10px;
  }

  .login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  .btn-primary {
    background: #FFD700;
    color: black;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
  }

  .forgot-password-link {
    text-decoration: none;
    color: black;
    font-size: 13px;
  }

  .forgot-password-link:hover {
    text-decoration: underline;
  }

  .create-account-link {
    text-decoration: none;
    color: black;
    font-size: 13px;
    margin-right: 30px;
  }

  .create-account-link:hover {
    text-decoration: underline;
  }
}


/* Responsive design 480px-729px */
@media (min-width:480px) and (max-width:729px) {

  small {
    font-size: 18px;
    line-height: 0.9;
    font-style: italic;
  }

  h4 {
    font-size: 10px;
    color: black;
  }

  p {
    line-height: 13px;
  }

  h2 {
    font-size: 20px;
  }

  .clear {
    clear: both;
  }

  .overlay {
    font-size: 7px;
  }

  #main-image {
    height: 650px;
    background: url('../assets/background2.jpg') center center no-repeat;
    background-size: cover;
  }

  #main-image .wrapper h2 {
    font-weight: normal;
    text-transform: uppercase;
    text-align: center;
    color: #fff;
    padding: 250px 80px 40px 80px;
    margin-bottom: 300px;
  }

  .btn-inscrivez-vous {
    display: block;
    width: 120px;
    height: 50px;
    background: #FFD700;
    color: #000000;
    font-size: 15px;
    margin: -100px auto;

    line-height: 50px;
    text-align: center;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
  }

  .btn-inscrivez-vous:hover {
    background: #f4d03f
  }

  .article1 {
    flex: 1;
    margin-bottom: 200px;
    margin-left: -180px;
    background-image: url("../assets/coach1.jpg");
    background-size: 250px;
    height: 150px;
    background-repeat: no-repeat;
    background-position: center;
  }

  .overlay {
    margin-top: 120px;
    background: rgba(255, 255, 255);
    height: 96%;
    width: 200px;
    padding: 15px;
  }

  .article1 .overlay p {
    text-align: left;
  }

  .login {
    padding: 60px 0;
    text-align: center;
    border-radius: 10px;

    .login-form {
      max-width: 400px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 10px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-control {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
    }

    .btn-primary {
      background: #FFD700;
      color: black;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      font-weight: bold;
    }

    .forgot-password-link {
      text-decoration: none;
      color: black;
      font-size: 13px;
    }

    .forgot-password-link:hover {
      text-decoration: underline;
    }

    .create-account-link {
      text-decoration: none;
      color: black;
      font-size: 13px;
      margin-right: 30px;
    }

    .create-account-link:hover {
      text-decoration: underline;
    }
  }

  /* Responsive design 730px-859px*/
  @media (min-width: 730px) and (max-width: 859px) {

    small {
      font-size: 18px;
      line-height: 0.9;
      font-style: italic;
    }

    h4 {
      font-size: 10px;
      color: black;
    }

    p {
      line-height: 13px;
    }

    h2 {
      font-size: 20px;
    }

    .clear {
      clear: both;
    }

    .overlay {
      font-size: 7px;
    }

    #main-image {
      height: 650px;
      background: url('../assets/background2.jpg') center center no-repeat;
      background-size: cover; /* Cette propriété assure que l'image couvre entièrement l'espace disponible, tout en conservant ses proportions */
    }

    #main-image .wrapper h2 {
      font-weight: normal;
      text-transform: uppercase;
      text-align: center;
      color: #fff;
      padding: 250px 80px 40px 80px;
      margin-bottom: 300px;
    }

    .btn-inscrivez-vous {
      display: block;
      width: 120px;
      height: 50px;
      background: #FFD700;
      color: #000000;
      font-size: 15px;
      margin: -60px auto;
      line-height: 50px;
      text-align: center;
      border-radius: 5px;
      text-decoration: none;
      font-weight: bold;
    }

    .btn-inscrivez-vous:hover {
      background: #f4d03f
    }

    .article1 {
      flex: 1;
      margin-bottom: -90px;
      margin-left: -180px;
      background-image: url("../assets/coach1.jpg");
      background-size: 250px; /* Ajustez cette taille selon vos besoins */
      height: 150px;
      background-repeat: no-repeat;
      background-position: center; /* Centrer l'image dans l'élément */
    }

    .overlay {
      margin-top: 120px;
      background: rgba(255, 255, 255);
      height: 96%;
      width: 200px;
      padding: 15px;
    }

    .article1 .overlay p {
      text-align: left;
    }

    .login {
      padding: 60px 0;
      text-align: center;
      border-radius: 10px;
    }

    .login-form {
      max-width: 400px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 10px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-control {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
    }

    .btn-primary {
      background: #FFD700;
      color: black;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      font-weight: bold;
    }

    .forgot-password-link {
      text-decoration: none;
      color: black;
      font-size: 13px;
    }

    .forgot-password-link:hover {
      text-decoration: underline;
    }

    .create-account-link {
      text-decoration: none;
      color: black;
      font-size: 13px;
      margin-right: 30px;
    }

    .create-account-link:hover {
      text-decoration: underline;
    }
  }


  /* Responsive design 860px-999px */
  @media (min-width: 860px) and (max-width: 999px) {

    small {
      font-size: 18px;
      line-height: 0.9;
      font-style: italic;
    }

    h4 {
      font-size: 10px;
      color: black;
    }

    p {
      line-height: 13px;
    }

    h2 {
      font-size: 20px;
    }

    .clear {
      clear: both;
    }

    .overlay {
      font-size: 7px;
    }

    #main-image {
      height: 650px;
      background: url('../assets/background2.jpg') center center no-repeat;
      background-size: cover; /* Cette propriété assure que l'image couvre entièrement l'espace disponible, tout en conservant ses proportions */
    }

    #main-image .wrapper h2 {
      font-weight: normal;
      text-transform: uppercase;
      text-align: center;
      color: #fff;
      padding: 250px 80px 40px 80px;
      margin-bottom: 300px;
    }

    .btn-inscrivez-vous {
      display: block;
      width: 120px;
      height: 50px;
      background: #FFD700;
      color: #000000;
      font-size: 15px;
      margin: -30px auto;

      line-height: 50px;
      text-align: center;
      border-radius: 5px;
      text-decoration: none;
      font-weight: bold;
    }

    .btn-inscrivez-vous:hover {
      background: #f4d03f
    }

      .article1 {
        flex: 1;
        margin-bottom: 190px;
        margin-left: -180px;
        background-image: url("../assets/coach1.jpg");
        background-size: 250px;
        height: 150px;
        background-repeat: no-repeat;
        background-position: center;
      }

      .overlay {
        margin-top: 120px;
        background: rgba(255, 255, 255);
        height: 96%;
        width: 200px;
        padding: 15px;
      }

      .article1 .overlay p {
        text-align: left;
      }
      
      /*login*/
      .login {
        padding: 60px 0;
        text-align: center;
        border-radius: 10px;
      }

      .login-form {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
      }

      .form-group {
        margin-bottom: 20px;
      }

      .form-control {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
      }

      .btn-primary {
        background: #FFD700;
        color: black;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        font-weight: bold;
      }

      .forgot-password-link {
        text-decoration: none;
        color: black;
        font-size: 13px;
      }

      .forgot-password-link:hover {
        text-decoration: underline;
      }

      .create-account-link {
        text-decoration: none;
        color: black;
        font-size: 13px;
        margin-right: 30px;
      }

      .create-account-link:hover {
        text-decoration: underline;
      }
    }

    /* Responsive design 1000px-1199px */
    @media (min-width: 1000px) and (max-width: 1199px) {

      small {
        font-size: 18px;
        line-height: 0.9;
        font-style: italic;
      }

      h4 {
        font-size: 10px;
        color: black;
      }

      p {
        line-height: 13px;
      }

      .clear {
        clear: both;
      }

      .overlay {
        font-size: 7px;
      }

      #main-image {
        height: 730px;
        background: url('../assets/background2.jpg') center center no-repeat;
        background-size: cover; /* Cette propriété assure que l'image couvre entièrement l'espace disponible, tout en conservant ses proportions */
      }

      #main-image .wrapper h2 {
        font-weight: normal;
        text-transform: uppercase;
        text-align: center;
        color: #fff;
        padding: 200px 80px 40px 80px;
        margin-bottom: 300px;
      }

      .btn-inscrivez-vous {
        display: block;
        width: 120px;
        height: 50px;
        background: #FFD700;
        color: #000000;
        font-size: 15px;
        margin: 40px auto;

        line-height: 50px;
        text-align: center;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
      }

      .btn-inscrivez-vous:hover {
        background: #f4d03f
      }

      .article1 {
        flex: 1;
        margin-bottom: 170px;
        margin-left: -180px;
        background-image: url("../assets/coach1.jpg");
        background-size: 250px;
        height: 150px;
        background-repeat: no-repeat;
        background-position: center;
      }

      .overlay {
        margin-top: 120px;
        background: rgba(255, 255, 255);
        height: 96%;
        width: 200px;
        padding: 15px;
      }

      .article1 .overlay p {
        text-align: left;
      }

      .login {
        padding: 60px 0;
        text-align: center;
        border-radius: 10px;
      }

      .login-form {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
      }

      .form-group {
        margin-bottom: 20px;
      }

      .form-control {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
      }

      .btn-primary {
        background: #FFD700;
        color: black;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        font-weight: bold;
      }

      .forgot-password-link {
        text-decoration: none;
        color: black;
        font-size: 13px;
      }

      .forgot-password-link:hover {
        text-decoration: underline;
      }

      .create-account-link {
        text-decoration: none;
        color: black;
        font-size: 13px;
        margin-right: 30px;
      }

      .create-account-link:hover {
        text-decoration: underline;
      }
    }

    /* Responsive design 1200px-1384px */
    @media (min-width: 1200px) and (max-width: 1384px) {

      small {
        font-size: 18px;
        line-height: 0.9;
        font-style: italic;
      }

      h4 {
        font-size: 11px;
        color: black;
      }

      p {
        line-height: 13px;
      }

      .clear {
        clear: both;
      }

      .overlay {
        font-size: 7px;
      }

      #main-image {
        height: 730px;
        background: url('../assets/background2.jpg') center center no-repeat;
        background-size: cover;
      }

      #main-image .wrapper h2 {
        font-weight: normal;
        text-transform: uppercase;
        text-align: center;
        color: #fff;
        padding: 200px 80px 40px 80px;
        margin-bottom: 300px;
      }

      .btn-inscrivez-vous {
        display: block;
        width: 120px;
        height: 50px;
        background: #FFD700;
        color: #000000;
        font-size: 15px;
        margin: 40px auto;

        line-height: 50px;
        text-align: center;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
      }

      .btn-inscrivez-vous:hover {
        background: #f4d03f
      }

      .article1 {
        flex: 1;
        margin-bottom: 170px;
        margin-left: -120px;
        background-image: url("../assets/coach1.jpg");
        background-size: 300px;
        height: 150px;
        background-repeat: no-repeat;
        background-position: center;
      }

      .overlay {
        margin-top: 120px;
        background: rgba(255, 255, 255);
        height: 96%;
        width: 200px;
        padding: 15px;
      }

      .article1 .overlay p {
        text-align: left;
      }

      .login {
        padding: 60px 0;
        text-align: center;
        border-radius: 10px;
      }

      .login-form {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
      }

      .form-group {
        margin-bottom: 20px;
      }

      .form-control {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
      }

      .btn-primary {
        background: #FFD700;
        color: black;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        font-weight: bold;
      }

      .forgot-password-link {
        text-decoration: none;
        color: black;
        font-size: 13px;
      }

      .forgot-password-link:hover {
        text-decoration: underline;
      }

      .create-account-link {
        text-decoration: none;
        color: black;
        font-size: 13px;
        margin-right: 30px;
      }

      .create-account-link:hover {
        text-decoration: underline;
      }
    }

    /* Responsive design 1385px-1569px */
    @media (min-width: 1385px) and (max-width: 1569px) {

      small {
        font-size: 20px;
        line-height: 1;
        font-style: italic;
      }

      h4 {
        font-size: 11px;
        color: black;
      }

      p {
        line-height: 13px;
      }

      .clear {
        clear: both;
      }

      .overlay {
        font-size: 7px;
      }

      #main-image {
        height: 570px;
        background: url('../assets/background2.jpg') center center no-repeat;
        background-size: cover;
      }

      #main-image .wrapper h2 {
        font-size: 20px;
        font-weight: normal;
        text-transform: uppercase;
        text-align: center;
        color: #fff;
        padding: 150px 80px 40px 80px;
        margin-bottom: 300px;
      }

      .btn-inscrivez-vous {
        display: block;
        width: 120px;
        height: 50px;
        background: #FFD700;
        color: #000000;
        font-size: 15px;
        margin: 40px auto;

        line-height: 50px;
        text-align: center;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
      }

      .btn-inscrivez-vous:hover {
        background: #f4d03f
      }

      .article1 {
        flex: 1;
        margin-bottom: 170px;
        margin-left: -120px;
        background-image: url("../assets/coach1.jpg");
        background-size: 300px;
        height: 150px;
        background-repeat: no-repeat;
        background-position: center;
      }

      .overlay {
        margin-left: -20px;
        margin-top: 120px;
        background: rgba(255, 255, 255);
        height: 96%;
        width: 200px;
        padding: 15px;
      }

      .article1 .overlay p {
        text-align: left;
        margin-top: 20px;
      }

      .login {
        padding: 60px 0;
        text-align: center;
        border-radius: 10px;
      }

      .login-form {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
      }

      .form-group {
        margin-bottom: 20px;
      }

      .form-control {
        margin-left: 10px;
        width: 92%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
      }

      .btn-primary {
        background: #FFD700;
        color: black;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        font-weight: bold;
      }

      .forgot-password-link {
        text-decoration: none;
        color: black;
        font-size: 13px;
      }

      .forgot-password-link:hover {
        text-decoration: underline;
      }

      .create-account-link {
        text-decoration: none;
        color: black;
        font-size: 13px;
        margin-right: 85px;
      }

      .create-account-link:hover {
        text-decoration: underline;
      }
    }

    /* Responsive design 1570px-1779px */
    @media (min-width: 1570px) and (max-width: 1779px) {
      /*general*/
      small {
        font-size: 18px;
        line-height: 0.9;
        font-style: italic;
      }

      h4 {
        font-size: 12px;
        color: black;
      }

      p {
        line-height: 12px;
      }

      .clear {
        clear: both;
      }

      .overlay {
        font-size: 7px;
      }

      #main-image {
        height: 730px;
        background: url('../assets/background2.jpg') center center no-repeat;
        background-size: cover;
      }

      #main-image .wrapper h2 {
        font-weight: normal;
        text-transform: uppercase;
        text-align: center;
        color: #fff;
        padding: 200px 80px 40px 80px;
        margin-bottom: 300px;
      }

      .btn-inscrivez-vous {
        display: block;
        width: 120px;
        height: 50px;
        background: #FFD700;
        color: #000000;
        font-size: 15px;
        margin: 40px auto;
        line-height: 50px;
        text-align: center;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
      }

      .btn-inscrivez-vous:hover {
        background: #f4d03f
      }

      .article1 {
        flex: 1;
        margin-bottom: 80px;
        margin-left: -120px;
        background-image: url("../assets/coach1.jpg");
        background-size: contain;
        height: 200px;
        background-repeat: no-repeat;
        background-position: center;
      }

      .overlay {
        background: rgba(255, 255, 255);
        height: 100%;
        width: 200px;
        padding: 20px;
      }

      .article1 .overlay p {
        text-align: left;
      }

      .login {
        padding: 60px 0;
        text-align: center;
        border-radius: 10px;
      }

      .login-form {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
      }

      .form-group {
        margin-bottom: 20px;
      }

      .form-control {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
      }

      .btn-primary {
        background: #FFD700;
        color: black;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        font-weight: bold;
      }

      .forgot-password-link {
        text-decoration: none;
        color: black;
        font-size: 13px;
      }

      .forgot-password-link:hover {
        text-decoration: underline;
      }

      .create-account-link {
        text-decoration: none;
        color: black;
        font-size: 13px;
        margin-right: 30px;
      }

      .create-account-link:hover {
        text-decoration: underline;
      }
    }

    /* Responsive design 1780px-2000px */
    @media (min-width: 1780px) and (max-width: 2000px) {

      small {
        font-size: 18px;
        line-height: 0.9;
        font-style: italic;
      }

      h4 {
        font-size: 12px;
        color: black;
      }

      p {
        line-height: 12px;
      }

      .clear {
        clear: both;
      }

      .overlay {
        font-size: 7px;
      }

      #main-image {
        height: 730px;
        background: url('../assets/background2.jpg') center center no-repeat;
        background-size: cover;
      }

      #main-image .wrapper h2 {
        font-weight: normal;
        text-transform: uppercase;
        text-align: center;
        color: #fff;
        padding: 200px 80px 40px 80px;
        margin-bottom: 300px;
      }

      .btn-inscrivez-vous {
        display: block;
        width: 120px;
        height: 50px;
        background: #FFD700;
        color: #000000;
        font-size: 15px;
        margin: 40px auto;
        line-height: 50px;
        text-align: center;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
      }

      .btn-inscrivez-vous:hover {
        background: #f4d03f
      }

      .article1 {
        flex: 1;
        margin-left: -120px;
        background-image: url("../assets/coach1.jpg");
        background-size: contain;
        height: 200px;
        background-repeat: no-repeat;
        background-position: center;
      }

      .overlay {
        background: rgba(255, 255, 255);
        height: 100%;
        width: 200px;
        padding: 20px;
      }

      .article1 .overlay p {
        text-align: left;
      }

      .login {
        padding: 60px 0;
        text-align: center;
        border-radius: 10px;
      }

      .login-form {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
      }

      .form-group {
        margin-bottom: 20px;
      }

      .form-control {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
      }

      .btn-primary {
        background: #FFD700;
        color: black;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        font-weight: bold;
      }

      .forgot-password-link {
        text-decoration: none;
        color: black;
        font-size: 13px;
      }

      .forgot-password-link:hover {
        text-decoration: underline;
      }

      .create-account-link {
        text-decoration: none;
        color: black;
        font-size: 13px;
        margin-right: 30px;
      }

      .create-account-link:hover {
        text-decoration: underline;

      }
    }
  }

</style>


