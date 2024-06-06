<template>
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

    <div class="signup-button-container">
      <button @click="navigateToSignUp">S'inscrire</button>
    </div>

  </div>
</template>


<script>
export default {
  methods: {
    navigateToSignUp() {
      this.$router.push({ name: 'SignUp' }); // Utilisez le nom de la route configurée pour SignUp.vue
    }
  }
}
</script>
<style scoped>
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
  height: 400px;
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

.signup-button-container {
  margin-top: 40px;
}

.signup-button-container button {
  background: #FFD700;
  font-weight: bold;
  color: black;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
}

.signup-button-container button:hover {
  background:  #f4d03f;
}
.signup-button-container button:focus {
  outline: none;
}
/* Responsive design */
@media (max-width: 960px) {
  .pricing-container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
