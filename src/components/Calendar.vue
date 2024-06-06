<template>
    <div>
      <FullCalendar :options="calendarOptions" ref="calendarRef" class="custom-calendar" />
    </div>
</template>
  
<script>
import { ref } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';

export default {
name: 'UserCalendar',
components: {
    FullCalendar
},
setup() {
    const calendarRef = ref(null);
    return { calendarRef };
},
data() {
    return {
    calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'timeGridWeek',
        columnHeaderFormat: { weekday: 'long', day: 'numeric', month: 'short' },
        slotMinTime: '08:00:00',
        slotMaxTime: '21:00:00',
        events: [],
        locale: frLocale,
        allDaySlot: false,
        slotDuration: '01:00:00',
        selectable: true,
        businessHours: [
        { daysOfWeek: [1, 2, 3, 4, 5, 6], startTime: '09:00', endTime: '12:00' },
        { daysOfWeek: [1, 2, 3, 4, 5, 6], startTime: '14:00', endTime: '21:00' }
        ],
    }
    };
},
};
</script>

<style scoped>
.custom-calendar {
width: 70%;
height: 420px;
margin: auto;
}
</style>