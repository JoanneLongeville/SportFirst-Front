<template>
  <div class="outer-container">
    <div class="container">
      <div v-if="confirmationMessage || errorMessage" class="modal">
        <div class="modal-content">

          <span :class="{'success-message': confirmationMessage, 'error-messages': errorMessage}">
      {{ confirmationMessage || errorMessage }}
    </span>
        </div>
      </div>

      <form class="signup-form" @submit.prevent="createAccount">
        <h2 class="form-title">FORMULAIRE D'INSCRIPTION</h2>

        <div class="form-group">
          <input class="custom-input" v-model="userData.firstname" type="text" placeholder="Prénom" required>
        </div>
        <div class="form-group">
          <input class="custom-input" v-model="userData.lastname" type="text" placeholder="Nom" required>
        </div>
        <div class="form-group">
          <input class="custom-input" v-model="userData.phone" type="tel" placeholder="Téléphone" required>
        </div>
        <div class="form-group">
          <input class="custom-input" v-model="userData.email" type="email" placeholder="E-mail" required>
        </div>

        <div class="form-group">
          <div class="password-container">
            <input class="custom-input" id="custom-input" :type="showPassword ? 'text' : 'password'" v-model="userData.password" placeholder="Mot de passe" @input="validatePassword" required>
            <span class="eye-button" @click="togglePasswordVisibility">&#128065;</span>
          </div>
          <ul class="password-criteria" v-if="userData.password.length > 0 && !allCriteriaMet">
            <li :class="{ valid: passwordCriteria.length }">Au moins 8 caractères</li>
            <li :class="{ valid: passwordCriteria.upperCase }">Au moins une majuscule</li>
            <li :class="{ valid: passwordCriteria.lowerCase }">Au moins une minuscule</li>
            <li :class="{ valid: passwordCriteria.number }">Au moins un chiffre</li>
            <li :class="{ valid: passwordCriteria.specialChar }">Au moins un caractère spécial (ex. .,;:!@#)</li>
          </ul>
        </div>

        <div class="form-group">
          <div class="password-container">
            <input class="custom-input" id="custom-input" :type="showPassword ? 'text' : 'password'" v-model="confirmPassword" placeholder="Confirmer le mot de passe" @input="checkPasswordsMatch" required>
            <span class="eye-button" @click="togglePasswordVisibility">&#128065;</span>
          </div>
          <div v-if="passwordMatchError" class="error-message">{{ passwordMatchError }}</div>
        </div>

        <button type="submit" class="create-account-button">Créer un compte</button>
      </form>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'SignUp',
  data() {
    return {
      userData: {
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        password: ''
      },
      confirmPassword: '',
      showPassword: false,
      passwordCriteria: {
        length: false,
        upperCase: false,
        lowerCase: false,
        number: false,
        specialChar: false
      },
      allCriteriaMet: false,
      confirmationMessage: '',
      errorMessage: '',
      passwordMatchError: ''
    };
  },
  methods: {
    validatePassword() {
      const password = this.userData.password;
      this.passwordCriteria.length = password.length >= 8;
      this.passwordCriteria.upperCase = /[A-Z]/.test(password);
      this.passwordCriteria.lowerCase = /[a-z]/.test(password);
      this.passwordCriteria.number = /[0-9]/.test(password);
      this.passwordCriteria.specialChar = /[.,;:!@#$%^&*()_+\-=[\]{}'"\\|<>/?]+/.test(password);
      this.allCriteriaMet = Object.values(this.passwordCriteria).every(criteria => criteria);
    },

    checkPasswordsMatch() {
      this.passwordMatchError = '';
      if (this.confirmPassword.length > 0 && this.userData.password !== this.confirmPassword) {
        this.passwordMatchError = 'Le mot de passe et la confirmation du mot de passe ne sont pas identiques.';
      }
    },

    isFormValid() {
      return this.allCriteriaMet && this.userData.password === this.confirmPassword;
    },

    createAccount() {
      if (!this.isFormValid()) {
        alert('Veuillez corriger les erreurs avant de soumettre le formulaire.');
        return;
      }

      axios.post('http://localhost:5000/accounts', this.userData)
          .then(() => {
            this.confirmationMessage = "Votre compte a bien été créé. Vous allez être redirigé vers la page d'accueil.";
            setTimeout(() => {
              this.$router.push('/');
              this.resetForm();
            }, 2000);
          })

          .catch(error => {
            if (error.response && error.response.status === 409) {
              this.errorMessage = "Vous avez déjà un compte. Vous allez être redirigé vers la page d'accueil.";
              setTimeout(() => {
                this.$router.push('/');
                this.resetForm();
              }, 3000);
            } else if (error.request) {
              this.errorMessage = "Aucune réponse du serveur. Veuillez réessayer plus tard."
            } else {
              this.errorMessage = error.response ? error.response.data.error || 'Erreur lors de la création du compte.' : "Erreur de connexion au serveur.";
            }
          });
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    resetForm() {
      this.userData = { firstname: '', lastname: '', phone: '', email: '', password: '' };
      this.confirmPassword = '';
      this.showPassword = false;
      this.passwordCriteria = { length: false, upperCase: false, lowerCase: false, number: false, specialChar: false };
      this.allCriteriaMet = false;
      this.confirmationMessage = '';
      this.errorMessage = '';
      this.passwordMatchError = '';
    },
  }
};
</script>


<style scoped>

.outer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background-image: url('../assets/backgroundsignup3.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.container {
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 35px;
  margin-top: 80px;
  max-width: 700px;
}
.custom-input {
  border-color: #000 !important;
  border: 1px solid;
  border-radius: 4px;
  width: 100%;
  padding-right: 10px;
}

.form-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  text-align: center;
  color: black;
  font-size: 19px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 5px;
}

.success-message {
  color:#4CAF50 ;
}

.error-messages {
  color:  #E53935;
}

.error-message {
  color: red;
}

input[type="text"].custom-input,
input[type="password"].custom-input,
input[type="firstname"].custom-input,
input[type="lastname"].custom-input,
input[type="phone"].custom-input {
  margin-right: 100px;
  width: 100%;
  padding: 11px;
  border: 1px solid;
  border-radius: 4px;
  font-size: 13px;
  outline: none;
  border-color: #000 !important;
}

input[type="email"]{
  padding: 10px;
}

.password-container {
padding-right: 20px;
  padding-top:7px ;
  position: relative;
}

#custom-input{
  padding-right: 30px;
}

.eye-button {
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-55%);
  cursor: pointer;
  font-size: 20px;
  color: black;
}

.password-criteria {
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
}

.password-criteria li {
  margin-bottom: 5px;
  color: red;
}

.password-criteria .valid {
  color: #4CAF50;
}

.create-account-button {
  background-color: #FFD700;
  font-weight: bold;
  color: black;
  border: none;
  border-radius: 4px;
  padding: 15px 20px;
  font-size: 13px;
  cursor: pointer;
  width: 50%;
  margin: 10px auto;
  display: block;
}

.create-account-button:hover {
  background-color:#f4d03f ;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  text-align: center;
}

.modal-content button:hover {
  background-color: #f4d03f ;
}

@media (min-width:280px) and (max-width:319px) {
  .container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    margin-top: 200px;
    max-width: 370px;
  }

  input[type="text"].custom-input,
  input[type="email"],
  input[type="password"].custom-input,
  input[type="firstname"].custom-input,
  input[type="lastname"].custom-input,
  input[type="phone"].custom-input {
    width: 100%;
    padding: 5px;
    border: 1px solid;
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    border-color: #000 !important;
  }
}

@media (min-width:320px) and (max-width:479px) {
  .container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    margin-top: 180px;
    max-width: 370px;
  }
}

@media (min-width:480px) and (max-width:729px) {
}

@media (min-width:730px) and (max-width:859px) {
}

@media (min-width:860px) and (max-width:999px) {
}

@media (min-width:1000px) and (max-width:1199px) {
}

@media (min-width:1200px) and (max-width:1384px) {
}

@media (min-width:1385px) and (max-width:1569px) {
}

@media (min-width:1570px) and (max-width:1779px) {
}

@media (min-width:1780px) and (max-width:2000px) {
}

</style>