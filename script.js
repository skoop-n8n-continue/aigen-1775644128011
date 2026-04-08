document.addEventListener('DOMContentLoaded', () => {
    // Clock Elements
    const hourHand = document.getElementById('hour-hand');
    const minuteHand = document.getElementById('minute-hand');
    const secondHand = document.getElementById('second-hand');
    const digitalTime = document.getElementById('digital-time');
    const currentDateDisplay = document.getElementById('current-date');

    // Stopwatch Elements
    const stopwatchDisplay = document.getElementById('stopwatch-display');
    const startStopBtn = document.getElementById('start-stop-btn');
    const resetBtn = document.getElementById('reset-btn');

    // State
    let stopwatchInterval;
    let stopwatchStartTime;
    let stopwatchElapsedTime = 0;
    let isStopwatchRunning = false;

    // --- Clock Logic ---
    function updateClock() {
        const now = new Date();

        // Analog Calculations
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();

        const secondsDegrees = (seconds / 60) * 360;
        const minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
        const hoursDegrees = (hours % 12 / 12) * 360 + (minutes / 60) * 30;

        secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
        minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
        hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

        // Digital Formatting
        const displayHours = String(hours).padStart(2, '0');
        const displayMinutes = String(minutes).padStart(2, '0');
        const displaySeconds = String(seconds).padStart(2, '0');
        digitalTime.textContent = `${displayHours}:${displayMinutes}:${displaySeconds}`;

        // Date Display
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDateDisplay.textContent = now.toLocaleDateString(undefined, options);
    }

    // Run clock immediately and then every second
    updateClock();
    setInterval(updateClock, 1000);

    // --- Stopwatch Logic ---
    function formatStopwatch(time) {
        const h = Math.floor(time / 3600000);
        const m = Math.floor((time % 3600000) / 60000);
        const s = Math.floor((time % 60000) / 1000);
        const ms = Math.floor((time % 1000) / 10);

        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
    }

    function startStopwatch() {
        stopwatchStartTime = Date.now() - stopwatchElapsedTime;
        stopwatchInterval = setInterval(() => {
            stopwatchElapsedTime = Date.now() - stopwatchStartTime;
            stopwatchDisplay.textContent = formatStopwatch(stopwatchElapsedTime);
        }, 10);

        startStopStopStyle(true);
    }

    function stopStopwatch() {
        clearInterval(stopwatchInterval);
        startStopStopStyle(false);
    }

    function startStopStopStyle(running) {
        if (running) {
            startStopBtn.textContent = 'Stop';
            startStopBtn.classList.add('running');
            startStopBtn.style.backgroundColor = '#ff4b2b'; // Red-ish for stop
        } else {
            startStopBtn.textContent = 'Start';
            startStopBtn.classList.remove('running');
            startStopBtn.style.backgroundColor = ''; // Back to primary teal
        }
    }

    startStopBtn.addEventListener('click', () => {
        if (isStopwatchRunning) {
            stopStopwatch();
        } else {
            startStopwatch();
        }
        isStopwatchRunning = !isStopwatchRunning;
    });

    resetBtn.addEventListener('click', () => {
        stopStopwatch();
        isStopwatchRunning = false;
        stopwatchElapsedTime = 0;
        stopwatchDisplay.textContent = '00:00:00.00';
        startStopStopStyle(false);
    });
});
