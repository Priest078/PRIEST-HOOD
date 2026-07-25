let is24HourFormat = true;

function updateClocks() {
    const now = new Date();

    // Define time zones with their UTC offsets
    const timeZones = {
        'clock-ny': 'America/New_York',
        'clock-london': 'Europe/London',
        'clock-tokyo': 'Asia/Tokyo',
        'clock-sydney': 'Australia/Sydney',
        'clock-dubai': 'Asia/Dubai',
        'clock-singapore': 'Asia/Singapore',
        'clock-la': 'America/Los_Angeles',
        'clock-paris': 'Europe/Paris'
    };

    // Update each clock
    for (const [elementId, timezone] of Object.entries(timeZones)) {
        const timeInZone = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
        const timeString = formatTime(timeInZone);
        document.getElementById(elementId).textContent = timeString;
    }
}

function formatTime(date) {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    if (!is24HourFormat) {
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const hoursStr = String(hours).padStart(2, '0');
        return `${hoursStr}:${minutes}:${seconds} ${period}`;
    } else {
        const hoursStr = String(hours).padStart(2, '0');
        return `${hoursStr}:${minutes}:${seconds}`;
    }
}

function toggleFormat() {
    is24HourFormat = !is24HourFormat;
    updateClocks();
}

// Update clocks immediately and then every second
updateClocks();
setInterval(updateClocks, 1000);