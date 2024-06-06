<template>
  <div class="profile-page">
    <div class="form-container">
      <form @submit.prevent="submitForm" class="form-style">
        <div class="form-row">
          <div class="form-group">

            <input type="text" id="firstName" placeholder="Prénom">
          </div>
          <div class="form-group">

            <input type="text" id="lastName" placeholder="Nom">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">

            <div class="radio-group">
              <input type="radio" id="female" name="gender" value="female">
              <label for="female">Féminin</label>

              <input type="radio" id="male" name="gender" value="male">
              <label for="male">Masculin</label>

              <input type="radio" id="other" name="gender" value="other">
              <label for="other">Autre</label>
            </div>
          </div>
          <div class="form-group">

            <input type="date" id="birthdate">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">

            <input type="email" id="email" placeholder="Email">
          </div>
          <div class="form-group">

            <input type="tel" id="phone" placeholder="Téléphone">
          </div>
        </div>

        <div class="form-group full-width">

          <input type="text" id="address" placeholder="Adresse">
        </div>

        <div class="form-row">
          <div class="form-group">

            <input type="text" id="postalCode" placeholder="Code Postal">
          </div>
          <div class="form-group">

            <input type="text" id="city" placeholder="Ville">
          </div>
        </div>

        <button type="submit">Envoyer</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormComponent',
  methods: {
    submitForm() {

      console.log("Formulaire soumis");
    }
  }
}
</script>

<style>
.profile-page {
  width: 100%;
  height: 100vh;
  background-image: url('../assets/backgroundsignup1.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
.form-container {
  max-width: 600px;
  margin: 200px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.9);
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  background-color: white;
}

#firstName{
  margin-top: 20px;
}

#lastName{
  margin-top: 20px;
}

#address{
  margin-left: 5px;

}

.form-style {
  border: 1px solid grey;
  padding: 15px;
  border-radius: 10px;
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 5px;
}

.form-group {
  flex: 1;
  margin-right: 10px;
}

.form-group:last-child {
  margin-right: 0;
}

.full-width {
  flex: 0 0 100%;
}

label {
  display: block;
  margin-bottom: 3px;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="date"] {
  outline: none;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid black;
  border-radius: 5px;
}

.radio-group {
  display: flex;
  align-items: center;
}

.radio-group input[type="radio"] {
  margin-right: 5px;
}

.radio-group label {
  margin-right: 10px;
}

button {
  padding: 8px 15px;
  background-color: #FFD700;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 0 auto;
}

button:hover {
  background-color:#f4d03f ;
}
</style>
