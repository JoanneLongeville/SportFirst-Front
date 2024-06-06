<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <form @submit.prevent="resetPassword">
        <h3>Réinitialiser le mot de passe</h3>
        <div v-if="message" class="message">{{ message }}</div>
        <div v-else>
          <div class="form-group">

            <input type="email" id="email" v-model="email" required placeholder="Adresse email"/>
          </div>
          <button type="submit" class="btn">Réinitialiser</button>
        </div>
        <button type="button" @click="closeModal" class="btn btn-light">Fermer</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      message: '',
    };
  },
  methods: {
    resetPassword() {
      axios.post('http://localhost:8082/request-reset-password', { email: this.email })
          .then(() => {
            this.message = "Un lien de réinitialisation a été envoyé à votre adresse e-mail. Veuillez vérifier votre boîte de réception.";
          })
          .catch(error => {
            this.message = "L'adresse e-mail n'est pas enregistrée.";
            console.error("Erreur lors de la demande de réinitialisation :", error);
          });
    },
    closeModal() {
      this.$emit('close');
      this.message = '';
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 51, 102, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #FFFFFF;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
}
h3{
  margin-bottom:20px ;
  text-align: center;
  font-size: 20px;
}

@media (max-width: 600px) {
  .modal-content {
    padding: 15px;
    max-width: 90%;
  }
}
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #261416;
}

input[type="email"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #36454F;
  border-radius: 4px;
  box-sizing: border-box;
}

.btn {
  background-color: #FFD700;
  color: black;
  font-weight: bold;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
}

.btn:hover {
  background-color: #f4d03f;
}

.btn-light {
  background-color: #f5f5f5;
  color:#261416 ;
}

.btn-light:hover {
  background-color: #e0e0e0;
  color: #261416;
}

.message {
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  color: #261416;
  text-align: center;
}
</style>
