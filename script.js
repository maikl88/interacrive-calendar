document.addEventListener('DOMContentLoaded', function () {
    const monthYear = document.getElementById('monthYear');
    const dates = document.getElementById('dates');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const timeSlots = document.getElementById('timeSlots');

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    const availableDates = {
        '2024-08-09': ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
    };

    function generateCalendar(month, year) {
        dates.innerHTML = '';
        const firstDay = new Date(year, month).getDay();
        const daysInMonth = 32 - new Date(year, month, 32).getDate();

        const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        monthYear.textContent = `${monthNames[month]} ${year}`;

        for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
            dates.appendChild(document.createElement('div'));
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateDiv = document.createElement('div');
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            dateDiv.textContent = day;

            if (availableDates[dateStr]) {
                dateDiv.classList.add('available');
            }

            dateDiv.addEventListener('click', () => {
                document.querySelectorAll('.calendar-dates div').forEach(div => div.classList.remove('selected'));
                dateDiv.classList.add('selected');
                showTimeSlots(dateStr);
            });

            dates.appendChild(dateDiv);
        }
    }

    function showTimeSlots(dateStr) {
        timeSlots.innerHTML = '';
        const times = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
        times.forEach(time => {
            const timeDiv = document.createElement('div');
            timeDiv.textContent = time;
            if (availableDates[dateStr] && availableDates[dateStr].includes(time)) {
                timeDiv.classList.add('available');
            }
            timeSlots.appendChild(timeDiv);
        });
    }

    prev.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentMonth, currentYear);
    });

    next.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    });

    generateCalendar(currentMonth, currentYear);
});
