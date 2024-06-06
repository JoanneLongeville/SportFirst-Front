<template>
  <div class="reset-password-container">
    <h1>Réinitialiser le mot de passe</h1>
    <div class="password-field">
      <input v-model="newPassword" :type="passwordFieldType" placeholder="Nouveau mot de passe" @input="checkPasswordCriteria" />
      <span class="eye-icon" @click="togglePasswordVisibility">&#128065;</span>
    </div>
    <div class="password-field">
      <input v-model="newPassword" :type="passwordFieldType" placeholder="Nouveau mot de passe" @input="checkPasswordCriteria" />
      <span class="eye-icon" @click="togglePasswordVisibility">&#128065;</span>
    </div>
    <div class="password-field">
      <input v-model="confirmPassword" :type="passwordFieldType" placeholder="Confirmer le mot de passe" />
      <span class="eye-icon" @click="togglePasswordVisibility">&#128065;</span>
    </div>
    <div v-if="showPasswordCriteria" class="password-criteria">

      <ul>
        <li :class="{'valid': passwordCriteria.length}">Au moins 8 caractères</li>
        <li :class="{'valid': passwordCriteria.upperCase}">Une lettre majuscule</li>
        <li :class="{'valid': passwordCriteria.lowerCase}">Une lettre minuscule</li>
        <li :class="{'valid': passwordCriteria.number}">Un chiffre</li>
        <li :class="{'valid': passwordCriteria.specialChar}">Un caractère spécial</li>
      </ul>
    </div>
    <button @click="resetPassword">Réinitialiser le mot de passe</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ResetPassword",
  data() {
    return {
      token: '',
      newPassword: '',
      confirmPassword: '',
      message: '',
      showPasswordCriteria: false,
      passwordFieldType: 'password',
      passwordCriteria: {
        length: false,
        upperCase: false,
        lowerCase: false,
        number: false,
        specialChar: false
      }
    };
  },
  mounted() {
    this.token = this.$route.query.token;
    console.log("Token reçu:", this.token);

    if (!this.token) {
      this.message = "Token de réinitialisation manquant ou invalide.";
      console.log(this.message);
    }
  },
  methods: {
    resetPassword() {
      if (!this.newPassword || !this.confirmPassword) {
        this.message = "Veuillez entrer et confirmer votre nouveau mot de passe.";
        console.log(this.message);
        return;
      }

      if (this.newPassword !== this.confirmPassword) {
        this.message = "Les mots de passe ne correspondent pas.";
        console.log(this.message);
        return;
      }

      axios.post('http://localhost:8082/reset-password', {
        token: this.token,
        newPassword: this.newPassword
      }).then(() => {
        this.message = "Votre mot de passe a bien été réinitialisé. Vous allez être redirigé vers la page d'accueil.";
        console.log(this.message);
        setTimeout(() => this.$router.push('/'), 3000);
      }).catch(error => {
        this.message = "Erreur lors de la réinitialisation du mot de passe: " + error.message;
        console.error("Erreur lors de la réinitialisation du mot de passe:", error);
      });
    },
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    },
    checkPasswordCriteria() {
      this.showPasswordCriteria = true;
      const password = this.newPassword;
      this.passwordCriteria = {
        length: password.length >= 8,
        upperCase: /[A-Z]/.test(password),
        lowerCase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        specialChar: /[^A-Za-z0-9]/.test(password)
      };
    }
  }
};
</script>

<style scoped>
body, html {
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #f5f5f5;
}

.reset-password-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  width: 100%;
  padding: 6rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;
  margin: 80px auto 0;
}
.reset-password-container h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #261416;
}

.password-field {
  position: relative;
  width: 100%;
}

.reset-password-container input, .reset-password-container button {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 0.3rem;
  border: 1px solid #36454F;
}

.eye-icon {
  position: absolute;
  right: 5px;
  top: 30%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #261416;
}

.reset-password-container button {
  background-color: #f2e52e;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 5px;
  width: auto;
  padding: 0.5rem 1rem;
  font-size: 1rem;

}

.reset-password-container button:hover {
  background-color: #f2ea79;
}

.reset-password-container p {
  color: #261416;
  text-align: center;
}

.password-criteria ul {
  list-style-type: none;
  padding: 0;
}

.password-criteria li.valid {
  color: green;
}

.password-criteria li {
  color: red;
}

@media screen and (max-width: 600px) {
  .reset-password-container {
    padding: 0.5rem;
    margin: 0.2rem;
  }
}
</style>
