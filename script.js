// LeaveRight Calculator
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('leave-calculator');
    const result = document.getElementById('result');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const distance = parseFloat(document.getElementById('distance').value);
        const transport = document.getElementById('transport').value;
        const arrivalTime = document.getElementById('arrival-time').value;

        if (!distance || !arrivalTime) {
            result.textContent = '⚠️ Please fill in all fields';
            return;
        }

        // Average speeds (km/h)
        const speeds = {
            walking: 5,
            driving: 50,
            transit: 30
        };

        const speed = speeds[transport];
        const travelTimeHours = distance / speed;
        const buffer = 0.25; // 15 minutes buffer
        const totalTimeHours = travelTimeHours + buffer;

        // Parse arrival time
        const [hours, minutes] = arrivalTime.split(':').map(Number);
        const arrivalMinutes = hours * 60 + minutes;
        const departureMinutes = arrivalMinutes - (totalTimeHours * 60);

        // Handle case where departure is on previous day
        let displayDepartureMinutes = departureMinutes;
        let dayInfo = '';
        if (departureMinutes < 0) {
            displayDepartureMinutes = 1440 + departureMinutes; // 1440 = 24 hours in minutes
            dayInfo = ' (previous day)';
        }

        const departureHours = Math.floor(displayDepartureMinutes / 60);
        const departureMins = Math.floor(displayDepartureMinutes % 60);
        const formattedHours = String(departureHours).padStart(2, '0');
        const formattedMins = String(departureMins).padStart(2, '0');

        result.textContent = `⏰ Leave at: ${formattedHours}:${formattedMins}${dayInfo}`;
    });
});