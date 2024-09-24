<script lang="ts">
  import type { CalendarOptions } from 'svelte-fullcalendar';
  import FullCalendar from 'svelte-fullcalendar';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import listPlugin from '@fullcalendar/list';

  let options: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,listWeek'
    }
  };
</script>

<svelte:head>
  <title>Calendar Page</title>
</svelte:head>

<div class="w-[80%]">
  <h1 class="text-3xl font-bold">Calendar View</h1>

  <div>
    <FullCalendar {options} />
  </div>
</div>
