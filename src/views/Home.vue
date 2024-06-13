<template>

  <section id="main-image">
    <div class="wrapper">
      <h2>"L'aventure vers une meilleure forme physique commence ici,<br><strong>rejoignez SportFirst, le leader du coaching sportif."</strong></h2>
      <a href="/signup" class="btn-inscrivez-vous">Inscrivez-vous</a>
    </div>
  </section>


  <section id="steps">
    <div class="wrapper">
      <ul>
        <li id="step-1"><h4>Coaching Personnalisé</h4><p>Programmes sur mesure pour vos objectifs et niveau.</p></li>
        <li id="step-2"><h4>Flexibilité des Horaires</h4><p>Séances adaptées à votre emploi du temps.</p></li>
        <li id="step-3"><h4>Suivi des Progrès</h4><p>Évaluations régulières pour mesurer vos avancées.</p></li>
        <li id="step-4"><h4>Motivation et Soutien</h4><p>Accompagnement continu pour votre réussite.</p></li>
        <div class="clear"></div>
      </ul>
    </div>
  </section>

  <section id="steps2">
    <div class="wrapper">
      <article class="article1">
        <div class="overlay">
          <p>
            <small>Je suis Jonathan, votre entraîneur sportif. <br>Diplômé en sciences du sport et certifié en coaching et nutrition sportive,<br>Je vous offre des conseils personnalisés pour vous aider à atteindre vos objectifs.
            </small></p>
        </div>
      </article>
      <div class="clear"></div>
    </div>
  </section>

  <section id="pricing">
    <div id="pricing-page">
      <div class="pricing-header">
        <h1>Choisissez Votre Forfait</h1>
        <p>Des séances de coaching personnalisées pour atteindre vos objectifs.</p>
      </div>

      <div class="pricing-container">
        <div class="pricing-card" id="hourly-plan">
          <h2>Session Individuelle</h2>
          <p class="price">80€<span>/heure</span></p>
          <ul class="features">
            <li>Coaching sur mesure</li>
            <li>Conseils nutritionnels</li>
          </ul>
        </div>

        <div class="pricing-card" id="package-plan">
          <h2>Forfait 5 Séances</h2>
          <p class="price">375€<span>/forfait</span></p>
          <ul class="features">
            <li>5 sessions personnalisées</li>
            <li>Suivi des progrès</li>
          </ul>
        </div>

        <div class="pricing-card" id="ten-sessions-plan">
          <h2>Forfait 10 Séances</h2>
          <p class="price">700€<span>/forfait</span></p>
          <ul class="features">
            <li>10 sessions + suivi complet</li>
            <li>Support étendu</li>
          </ul>
        </div>
      </div>
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

        const response = await axios.post('http://localhost:8082/login', this.loginDetails);

        if (response.status === 200) {
          sessionStorage.setItem('userFirstname', response.data.userFirstname);
          sessionStorage.setItem('userId', response.data.userID);

          this.$router.push({ name: 'Session', params: { userId: response.data.userID } });
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

#steps ul{
  margin: 20px 0 0 39px;
  list-style-type: none;
}

#steps ul li{
  width: 300px;
  float: left;
  padding-top: 140px;
  text-align: center;
  margin-right: 160px;
}

#steps h4{
  text-transform: uppercase;
  margin-top: -50px;
}

#steps p {
  margin-bottom: 20px;
}

#step-1, #step-2, #step-3, #step-4 {
  background-size: 75px 75px !important;
}

#step-1{
  background: url("../assets/haltere2.png") no-repeat top center;
}

#step-2{
  background: url("../assets/horloge.png") no-repeat top  center;
}

#step-3{
  background: url("../assets/performance.png") no-repeat top center;
}

#step-4{
  background: url("../assets/motivation.png") no-repeat top center;
}

.article1{
  background-image: url("../assets/coach1.jpg");
  background-size: contain;
  height: 500px;
  background-repeat: no-repeat;
  background-position: right;
}

#steps2{
  background-color: #efefef;
  padding:80px 0 0 250px;
  margin: 20px 0;
  height: 500px;
}

#steps2 article{
  width: 460px;
  height:320px ;
  float: left;
}

#steps2 article:first-child{
  margin-right: 200px;
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

#pricing-page {
  text-align: center;
  padding: 50px 20px;
}

.pricing-header h1 {
  font-size: 2.5em;
  margin-top: 60px;
}

.pricing-header p {
  font-size: 1.2em;
  color: #666;
}

.pricing-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: -5px;
}

.pricing-card {
  background: #f7f7f7;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  height: 200px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.pricing-card h2 {
  color: #333;
  font-size: 1.8em;
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

  #steps ul {
    margin: 60px 0 0 -34px;
    list-style-type: none; /* Supprime les puces */
  }

  #steps ul li {
    width: 300px;
    float: left;
    padding-left: 30px;
    padding-top: 140px;
    text-align: center;
    margin-left:-25px;
  }

  #steps h4 {
    text-transform: uppercase;
    margin-top: -50px;
  }

  #steps p {
    font-size: 10px;
    margin-bottom: 20px;
  }

  #step-1, #step-2, #step-3, #step-4 {
    background-size: 70px 70px !important; /* Force l'application de cette règle */
  }

  #step-1 {
    background: url("../assets/haltere2.png") no-repeat top center;
  }

  #step-2 {
    background: url("../assets/horloge.png") no-repeat top center;
  }

  #step-3 {
    background: url("../assets/performance.png") no-repeat top center;
  }

  #step-4 {
    background: url("../assets/motivation.png") no-repeat top center;
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

  #steps2 {
    align-items: center; /* Centre les éléments verticalement */
    display: flex;
    background-color: #efefef;
    padding: 80px 0 0 250px;
    margin: 20px 0; /* Ajoute de l'espace autour de la section, si nécessaire */
    height: 500px;
  }

  #steps2 article {
    flex: 1;
    width: 360px;
    height: 420px;
    float: left;
  }

  #steps2 article:first-child {
    margin-right: -130px;
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

  .pricing-container {
    flex-direction: column;
    align-items: center;
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

  /*steps*/
  #steps ul {
    margin: 60px 0 0 5px;
    list-style-type: none;
  }

  #steps ul li {
    width: 300px;
    float: left;
    padding-left: 30px;
    padding-top: 140px;
    text-align: center;
    margin-left:-25px;
  }

  #steps h4 {
    text-transform: uppercase;
    margin-top: -50px;
  }

  #steps p {
    font-size: 10px;
    margin-bottom: 20px;
  }

  #step-1, #step-2, #step-3, #step-4 {
    background-size: 70px 70px !important;
  }

  #step-1 {
    background: url("../assets/haltere2.png") no-repeat top center;
  }

  #step-2 {
    background: url("../assets/horloge.png") no-repeat top center;
  }

  #step-3 {
    background: url("../assets/performance.png") no-repeat top center;
  }

  #step-4 {
    background: url("../assets/motivation.png") no-repeat top center;
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

  #steps2 {
    align-items: center;
    display: flex;
    background-color: #efefef;
    padding: 80px 0 0 250px;
    margin: 20px 0;
    height: 500px;
  }

  #steps2 article {
    flex: 1;
    width: 460px;
    height: 420px;
    float: left;
  }

  #steps2 article:first-child {
    margin-right: -130px;
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

  .pricing-container {
    flex-direction: column;
    align-items: center;
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

  #steps ul {
    margin: 60px 0 0 70px;
    list-style-type: none; /* Supprime les puces */
  }

  #steps ul li {
    width: 300px;
    float: left;
    padding-left: 30px;
    padding-top: 140px;
    text-align: center;
    margin-left: -10px;
  }

  #steps h4 {
    text-transform: uppercase;
    margin-top: -50px;
  }

  #steps p {
    font-size: 10px;
    margin-bottom: 20px;
  }

  #step-1, #step-2, #step-3, #step-4 {
    background-size: 70px 70px !important;
  }

  #step-1 {
    background: url("../assets/haltere2.png") no-repeat top center;
  }

  #step-2 {
    background: url("../assets/horloge.png") no-repeat top center;
  }

  #step-3 {
    background: url("../assets/performance.png") no-repeat top center;
  }

  #step-4 {
    background: url("../assets/motivation.png") no-repeat top center;
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

  #steps2 {
    align-items: center;
    display: flex;
    background-color: #efefef;
    padding: 80px 0 0 250px;
    margin: 20px 0;
    height: 500px;
  }

  #steps2 article {
    flex: 1;
    width: 460px;
    height: 320px;
    float: left;
  }

  #steps2 article:first-child {
    margin-right: -130px;
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

  .pricing-container {
    flex-direction: column;
    align-items: center;
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

    #steps ul {
      margin: 60px 0 0 -10px;
      list-style-type: none;
    }

    #steps ul li {
      width: 300px;
      float: left;
      padding-left: 30px;
      padding-top: 140px;
      text-align: center;
      margin-right: 50px;
    }

    #steps h4 {
      text-transform: uppercase;
      margin-top: -50px;
    }

    #steps p {
      font-size: 10px;
      margin-bottom: 20px;
    }

    #step-1, #step-2, #step-3, #step-4 {
      background-size: 70px 70px !important; /* Force l'application de cette règle */
    }

    #step-1 {
      background: url("../assets/haltere2.png") no-repeat top center;
    }

    #step-2 {
      background: url("../assets/horloge.png") no-repeat top center;
    }

    #step-3 {
      background: url("../assets/performance.png") no-repeat top center;
    }

    #step-4 {
      background: url("../assets/motivation.png") no-repeat top center;
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

    #steps2 {
      align-items: center; /* Centre les éléments verticalement */
      display: flex;
      background-color: #efefef;
      padding: 80px 0 0 250px;
      margin: 20px 0; /* Ajoute de l'espace autour de la section, si nécessaire */
      height: 500px;
    }

    #steps2 article {
      flex: 1;
      width: 460px;
      height: 320px;
      float: left;
    }

    #steps2 article:first-child {
      margin-right: -130px;
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

    .pricing-container {
      flex-direction: column;
      align-items: center;
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

    #steps ul {
      margin: 60px 0 0 90px;
      list-style-type: none;
    }

    #steps ul li {
      width: 300px;
      float: left;
      padding-left: 30px;
      padding-top: 140px;
      text-align: center;
      margin-right: 50px;
    }

    #steps h4 {
      text-transform: uppercase;
      margin-top: -50px;
    }

    #steps p {
      font-size: 10px;
      margin-bottom: 20px;
    }

    #step-1, #step-2, #step-3, #step-4 {
      background-size: 70px 70px !important;

      #step-1 {
        background: url("../assets/haltere2.png") no-repeat top center;
      }

      #step-2 {
        background: url("../assets/horloge.png") no-repeat top center;
      }

      #step-3 {
        background: url("../assets/performance.png") no-repeat top center;
      }

      #step-4 {
        background: url("../assets/motivation.png") no-repeat top center;
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

      #steps2 {
        align-items: center;
        display: flex;
        background-color: #efefef;
        padding: 80px 0 0 250px;
        margin: 20px 0;
        height: 500px;
      }

      #steps2 article {
        flex: 1;
        width: 460px;
        height: 320px;
        float: left;
      }

      #steps2 article:first-child {
        margin-right: -130px;
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
      
      .pricing-container {
        flex-direction: column;
        align-items: center;
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

      #steps ul {
        margin: 60px 0 0 -45px;
        list-style-type: none;
      }

      #steps ul li {
        width: 300px;
        float: left;
        padding-top: 140px;
        text-align: center;
        margin-right: -50px;
      }

      #steps h4 {
        text-transform: uppercase;
        margin-top: -50px;
      }

      #steps p {
        font-size: 10px;
        margin-bottom: 20px;
      }

      #step-1, #step-2, #step-3, #step-4 {
        background-size: 65px 65px !important;
      }

      #step-1 {
        background: url("../assets/haltere2.png") no-repeat top center;
      }

      #step-2 {
        background: url("../assets/horloge.png") no-repeat top center;
      }

      #step-3 {
        background: url("../assets/performance.png") no-repeat top center;
      }

      #step-4 {
        background: url("../assets/motivation.png") no-repeat top center;
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

      #steps2 {
        align-items: center;
        display: flex;
        background-color: #efefef;
        padding: 80px 0 0 250px;
        margin: 20px 0;
        height: 500px;
      }

      #steps2 article {
        flex: 1;
        width: 460px;
        height: 320px;
        float: left;
      }

      #steps2 article:first-child {
        margin-right: -130px;
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

      .pricing-container {
        flex-direction: column;
        align-items: center;
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

      /*steps*/
      #steps ul {
        margin: 60px 0 0 -15px;
        list-style-type: none;
      }

      #steps ul li {
        width: 300px;
        float: left;
        padding-top: 140px;
        text-align: center;
        margin-right: -10px;
      }

      #steps h4 {
        text-transform: uppercase;
        margin-top: -50px;
      }

      #steps p {
        font-size: 12px;
        margin-bottom: 20px;
      }

      #step-1, #step-2, #step-3, #step-4 {
        background-size: 75px 75px !important;
      }

      #step-1 {
        background: url("../assets/haltere2.png") no-repeat top center;
      }

      #step-2 {
        background: url("../assets/horloge.png") no-repeat top center;
      }

      #step-3 {
        background: url("../assets/performance.png") no-repeat top center;
      }

      #step-4 {
        background: url("../assets/motivation.png") no-repeat top center;
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

      #steps2 {
        align-items: center;
        display: flex;
        background-color: #efefef;
        padding: 80px 0 0 250px;
        margin: 20px 0;
        height: 500px;
      }

      #steps2 article {
        flex: 1;
        width: 460px;
        height: 320px;
        float: left;
      }

      #steps2 article:first-child {
        margin-right: -130px;
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

      .pricing-container {
        flex-direction: column;
        align-items: center;
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

      #steps ul {
        margin: 60px 0 0 45px;
        list-style-type: none; /* Supprime les puces */
      }

      #steps ul li {
        width: 300px;
        float: left;
        padding-top: 130px;
        text-align: center;
        margin-right: 30px;
      }

      #steps h4 {
        text-transform: uppercase;
        margin-top: -50px;
      }

      #steps p {
        font-size: 12px;
        margin-bottom: 20px;
      }

      #step-1, #step-2, #step-3, #step-4 {
        background-size: 75px 75px !important; /* Force l'application de cette règle */
      }

      #step-1 {
        background: url("../assets/haltere2.png") no-repeat top center;
      }

      #step-2 {
        background: url("../assets/horloge.png") no-repeat top center;
      }

      #step-3 {
        background: url("../assets/performance.png") no-repeat top center;
      }

      #step-4 {
        background: url("../assets/motivation.png") no-repeat top center;
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

      #steps2 {
        align-items: center;
        display: flex;
        background-color: #efefef;
        padding: 80px 0 0 250px;
        margin: 20px 0;
        height: 500px;
      }

      #steps2 article {
        flex: 1;
        width: 460px;
        height: 320px;
        float: left;
      }

      #steps2 article:first-child {
        margin-right: 35px;
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

      .pricing-container {
        flex-direction: column;
        align-items: center;
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

      /*steps*/
      #steps ul {
        margin: 60px 0 0 120px;
        list-style-type: none;
      }

      #steps ul li {
        width: 300px;
        float: left;
        padding-top: 140px;
        text-align: center;
        margin-right: 30px;
      }

      #steps h4 {
        text-transform: uppercase;
        margin-top: -50px;
      }

      #steps p {
        margin-bottom: 20px;
      }

      #step-1, #step-2, #step-3, #step-4 {
        background-size: 75px 75px !important;
      }

      #step-1 {
        background: url("../assets/haltere2.png") no-repeat top center;
      }

      #step-2 {
        background: url("../assets/horloge.png") no-repeat top center;
      }

      #step-3 {
        background: url("../assets/performance.png") no-repeat top center;
      }

      #step-4 {
        background: url("../assets/motivation.png") no-repeat top center;
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

      #steps2 {
        align-items: center;
        display: flex;
        background-color: #efefef;
        padding: 80px 0 0 250px;
        margin: 20px 0;
        height: 500px;
      }

      #steps2 article {
        flex: 1;
        width: 460px;
        height: 320px;
        float: left;
      }

      #steps2 article:first-child {
        margin-right: 150px;
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

      .pricing-container {
        flex-direction: column;
        align-items: center;
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

      #steps ul {
        margin: 60px 0 0 140px;
        list-style-type: none;
      }

      #steps ul li {
        width: 300px;
        float: left;
        padding-top: 140px;
        text-align: center;
        margin-right: 100px;
      }

      #steps h4 {
        text-transform: uppercase;
        margin-top: -50px;
      }

      #steps p {
        margin-bottom: 20px;
      }

      #step-1, #step-2, #step-3, #step-4 {
        background-size: 75px 75px !important;

        #step-1 {
          background: url("../assets/haltere2.png") no-repeat top center;
        }

        #step-2 {
          background: url("../assets/horloge.png") no-repeat top center;
        }

        #step-3 {
          background: url("../assets/performance.png") no-repeat top center;
        }

        #step-4 {
          background: url("../assets/motivation.png") no-repeat top center;
        }
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

      #steps2 {
        align-items: center;
        display: flex;
        background-color: #efefef;
        padding: 80px 0 0 250px;
        margin: 20px 0;
        height: 500px;
      }

      #steps2 article {
        flex: 1;
        width: 460px;
        height: 320px;
        float: left;
      }

      #steps2 article:first-child {
        margin-right: 200px;
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

      .pricing-container {
        flex-direction: column;
        align-items: center;
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
}

</style>


