<template>

  <div class="menu-toggle">
    <h2 class="welcome-message">Bienvenue {{ userProfile.firstname }}</h2>
    <span class="menu-icon" @click="toggleMenu()"><i class="fas fa-bars"></i></span>
    <div class="menu" :class="{ 'show-menu': showMenu }">
      <ul class="menu-list">
        <li>
          <i class="fa-regular fa-calendar"></i>
          <a @click="showReservation">Vos réservations</a>
        </li>
        <li>
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
          <a @click="logout">Déconnexion</a>
        </li>
      </ul>

    </div>
  </div>

  <div class="flex-container">

    <div class="infos-container">
      <div class="infos">
        <h3>Informations</h3>
        <p> Prénom : {{ userProfile.firstname }}</p>
        <p> Nom : {{ userProfile.lastname }}</p>
        <p> Téléphone : {{ userProfile.phone }}</p>
        <p> Email : {{ userProfile.email }}</p>
        <button class="btn btn-infos" @click="showModal = true">Modifier</button>

      </div>
    </div>

    <div class="content-container">
      <div class="calendar">
        <h3>Réservation en ligne</h3>
        <FullCalendar ref="calendar" :options="calendarOptions" class="custom-calendar" />
      </div>
    </div>
  </div>

  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <h3>Informations Personnelles</h3>
      <input v-model="userProfile.firstname" :readonly="!isEditing">
      <input v-model="userProfile.lastname" :readonly="!isEditing">
      <input v-model="userProfile.phone" :readonly="!isEditing">
      <input v-model="userProfile.email" :readonly="!isEditing" type="email">
      <input v-model="userProfile.password" :readonly="!isEditing" type="password">
      <button class="btn btn-primary" v-if="!isEditing" @click="editProfile">Modifier</button>
      <button class="btn btn-primary" v-if="isEditing" @click="saveProfile">Enregistrer</button>
      <button class="btn btn-secondary" @click="closeModal">Fermer</button>
    </div>
  </div>

</template>

<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import axios from 'axios';

export default {
  name: 'UserSession',

  components: {
    FullCalendar
  },
  props: {
    userId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      showModal: false,
      userProfile: {
        firstname : '',
        lastname: '',
        phone:'',
        email:'',
        password:'',
        isEditing:false,

      },
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'timeGridWeek',
        slotMinTime: '00:00:00',
        slotMaxTime: '24:00:00',
        locale: frLocale,
        allDaySlot: false,
        slotDuration: '01:00:00',
        selectable: true,
        businessHours: [
          { daysOfWeek: [1, 2, 3, 4, 5, 6], startTime: '09:00', endTime: '12:00' },
          { daysOfWeek: [1, 2, 3, 4, 5, 6], startTime: '15:00', endTime: '21:00' }
        ],
        // Events global colors
        eventBackgroundColor: '#228B22',
        eventTextColor: '#FFFFFF',
        // events: this.getAvailableSlots(),
        eventClick: this.handleEventClick,
        select: this.handleDateSelect,
        // events: this.getEvents()
      },
      showMenu: false
    };
  },

  created() {
    this.userProfile.firstname = sessionStorage.getItem('userFirstname') || 'Prénom';
    this.userProfile.lastname = sessionStorage.getItem('userLastname') || 'Nom';
    this.userProfile.phone = sessionStorage.getItem('userPhone') || 'Téléphone';
    this.userProfile.email = sessionStorage.getItem('userEmail') || 'E-mail';
    // this.loadReservations();
  },

  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    loadReservations() {
      axios.get('http://localhost:5000/reservations', {
        params: {
          userId: this.userId
        }
      }).then(response => {
        const events = response.data.map(event => ({
          title: 'Réservé',
          start: event.start,
          end: event.end,
          allDay: event.allDay,
          backgroundColor: event.isScheduled ? '#DDDDDD' : '#228B22',
          textColor: event.isScheduled ? '#888888' : '#FFFFFF'
        }));
        this.calendarOptions.events = events;
      }).catch(error => {
        console.error('Erreur lors de la récupération des événements :', error);
      });
    },
    handleDateSelect(selectInfo) {
      const now = new Date();
      const selectedStart = new Date(selectInfo.startStr);
      const selectedEnd = new Date(selectInfo.endStr);
      const fortyEightHoursLater = new Date(now.getTime() + 48 * 60 * 60 * 1000);

      if (selectedStart >= fortyEightHoursLater && this.isDuringBusinessHours(selectedStart, selectedStart)) {
        const startTimeStr = selectedStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const endTimeStr = selectedEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const confirmReservation = confirm(`Confirmez-vous la réservation pour le créneau de ${startTimeStr} à ${endTimeStr} ?`);

        if (confirmReservation) {
          selectInfo.view.calendar.addEvent({
            title: 'Réservé',
            start: selectInfo.start,
            end: selectInfo.end,
            allDay: selectInfo.allDay,
            eventBackgroundColor: '#228B22',
            eventTextColor: '#FFFFFF',
          });
          axios.post('http://localhost:5000/reservations', {
            userId: this.userId,
            start: selectInfo.start,
            end: selectInfo.end
          }).then(response => {
            console.log(response.data);
          }).catch(error => {
            console.log(error);
          });
        }
      } else {
        alert("Les réservations ne peuvent être effectuées que pendant les heures d'ouverture et au moins 48 heures à l'avance.");
      }
      selectInfo.view.calendar.unselect();
    },
    handleEventClick(info) {
      const now = new Date();
      const twoDaysLater = new Date(now.getTime() + 48 * 60 * 60 * 1000);
      if (info.event.start > twoDaysLater) {
        const confirmCancellation = confirm("Voulez-vous annuler cette réservation ?");
        if (confirmCancellation) {
          info.event.remove();

          const params = {
            userId: this.userId,
            start: info.event.start.toISOString(),
            end: info.event.end.toISOString()
          }
          axios.delete('http://localhost:5000/reservations', {
            params: params
          }).then(response => {
            console.log(response.data);
          }).catch(error => {
            console.log(error);
          });
        }
      } else {
        alert("L'annulation n'est autorisée que pour les événements prévus dans plus de 48 heures.");
      }
    },
    isDuringBusinessHours(start, end) {
      const businessHours = [
        { daysOfWeek: [1, 2, 3, 4, 5, 6], startTime: '09:00', endTime: '12:00' },
        { daysOfWeek: [1, 2, 3, 4, 5, 6], startTime: '15:00', endTime: '21:00' }
      ];

      const startHour = start.getHours();
      const endHour = end.getHours();

      // Check if selected time is between 12:00 and 15:00
      if ((startHour >= 12 && startHour < 15) || (endHour > 12 && endHour < 15)) {
        return false;
      }

      return businessHours.some(bh => {
        const dayOfWeek = start.getDay();
        if (bh.daysOfWeek.includes(dayOfWeek)) {
          const startBusinessHour = new Date(start);
          startBusinessHour.setHours(...bh.startTime.split(':'));
          const endBusinessHour = new Date(start);
          endBusinessHour.setHours(...bh.endTime.split(':'));

          return start >= startBusinessHour && end <= endBusinessHour;
        }
        return false;
      });
    },
    // getEvents() {
    //   return (fetchInfo, successCallback, failureCallback) => {
    //     axios.get('http://localhost:5000/reservations')
    //       .then(response => {
    //         const events = response.data.map(event => ({
    //           title: 'Réservé',
    //           start: event.start,
    //           end: event.end,
    //           allDay: event.allDay,
    //           backgroundColor: event.isScheduled ? '#DDDDDD' : '#228B22',
    //           textColor: event.isScheduled ? '#888888' : '#FFFFFF'
    //         }));
    //         successCallback(events);
    //       })
    //       .catch(error => {
    //         console.error('Erreur lors de la récupération des événements :', error);
    //         failureCallback(error);
    //       });
    //   };
    // },
    editProfile() {
      this.isEditing = true;
    },
    saveProfile() {
      // Logique d'enregistrement
      console.log("Profil sauvegardé", this.userProfile);
      this.isEditing = false;
      this.showModal = false;
    },
    closeModal() {
      this.isEditing = false;
      this.showModal = false;
    },
  }
};
</script>


<style scoped>

.menu-list li {
  list-style: none;
  margin-bottom: 15px;
}

.menu-list i {
  margin-right: 10px;
}

.menu-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-right: 50px;
  position: relative;
}

.menu-icon {
  margin-right: 50px;
  margin-top: 100px;
  color: #261416;
  cursor: pointer;
  font-size: 30px;
  position: relative;
}

.menu {
  display: none;
  position: absolute;
  top: calc(100% - 35px);
  right: 0;
  background-color: whitesmoke;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 200px;
  height: 140px;
  overflow-y: auto;
}

.show-menu {
  display: block;
}

.btn {
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-size:15px;
}

.btn-primary:hover{
  background:  #f4d03f
}

.btn-secondary:hover{
  background:  #000000
}

.menu-icon {
  margin-right: 80px;
  margin-top: 100px;
  color: #261416;
  cursor: pointer;
  font-size: 30px;
}

.btn-secondary {
  margin-left: 50px;
  margin-top: 15px;
  background-color: #6c757d;
}

.btn-primary {
  background-color: #f2e52e;
  color:#000000;
  margin-top: 15px;
  margin-left: 50px;
}
.btn-infos {
  background-color: #f2e52e;
  color:#000000;
  margin-top: 15px;
  margin-left: 330px;
}

.welcome-message {
  text-align: center;
  margin-top: 130px;
  font-size: calc(1em + 1vw);
  font-family: 'Arial', sans-serif;
  color: #261416;
  text-shadow: 1px 1px 2px black;
  padding: 10px;
  border-radius: 5px;
  flex-grow: 1;
}

.flex-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px;
}

.comments-section {
  flex: 1;
  max-width: 40%;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.comments-section .comment-image {
  width: 75%;
  max-width: 600px;
  height: auto;
  margin-bottom: 10px;
  border-radius: 2px;
  box-shadow: 0px 0px 10px #261416;
}

.comments-section textarea {
  margin-top: 30px;
  width: 80%;
  min-height: 250px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  box-shadow: 0px 0px 10px #261416;
  background-color: white;
}

.content-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 50%;
  height: 650px;
}

.infos-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 50%;
  height: 650px;
}

.infos {
  text-align: center;
  width: 85%;
  margin: auto;
}

.infos h3 {
  text-align: center;
  font-size: 24px;
  color: #261416;
  margin-bottom: 20px;
  padding: 10px;
}

.custom-calendar {
  height: 500px;
  border: 2px solid #261416;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #261416;
  overflow: hidden;
}

.calendar {
  width: 85%;
  margin: auto;
}

.calendar h3 {
  text-align: left;
  font-size: 24px;
  color: #261416;
  margin-bottom: 20px;
  padding: 10px;
}

.modal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.modal-content {
  margin: auto;
  width: 50%;
  border: 1px solid #888;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  padding: 10px;
}

@media (max-width: 768px) {
  .flex-container {
    flex-direction: column;
  }

  .comments-section, .infos-container, .content-container {
    width: 100%;
    max-width: 100%;
    margin: 10px 0;
  }

  .comments-section .comment-image {
    width: 100%;
    max-width: 100%;
  }

  .comments-section textarea {
    width: 100%;
  }

  .infos {
    width: 100%;
  }

  .calendar {
    width: 100%;
  }

  .modal-content {
    width: 80%;
  }
}
</style>
