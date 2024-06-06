<template>
  <div class="hamburger-container" @click="toggleMenu">
    <div class="hamburger-icon" :class="{ open: isOpen }">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="dropdown-content" v-if="isOpen">
      <a href="#" @click="showProfile">Profil</a>
      <a href="#" @click="showReservations">Réservation</a>
      <a href="#" @click="logOff">Déconnexion</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    showProfile() {
      // Logique pour afficher le profil
    },
    showReservations() {
      // Logique pour afficher les réservations
    },
    logOff() {
      // Logique pour la déconnexion
    }
  }
};
</script>

<style scoped>
.hamburger-container {
  cursor: pointer;
}

.hamburger-icon {
  /* Styles pour l'icône hamburger */
}

.hamburger-icon.open span:nth-child(1) {
  /* Styles pour transformer le hamburger en "X" */
}

.hamburger-icon.open span:nth-child(2) {
  /* Styles pour transformer le hamburger en "X" */
}

.hamburger-icon.open span:nth-child(3) {
  /* Styles pour transformer le hamburger en "X" */
}

.dropdown-content {
  /* Styles pour le contenu déroulant */
}
</style>
