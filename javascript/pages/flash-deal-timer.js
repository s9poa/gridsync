document.addEventListener('DOMContentLoaded', () => {
    const hoursEl = document.querySelector('.ticker.hours');
    const minutesEl = document.querySelector('.ticker.minutes');
    const secondsEl = document.querySelector('.ticker.seconds');
  
    // Total countdown duration: 12 hours in milliseconds.
    const totalDuration = 12 * 60 * 60 * 1000;
    let targetTime = Date.now() + totalDuration;
  
    function updateTimerDisplay(timeLeft) {
      const totalSeconds = Math.ceil(timeLeft / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      hoursEl.textContent = hours.toString().padStart(2, '0');
      minutesEl.textContent = minutes.toString().padStart(2, '0');
      secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
  
    function tick() {
      const now = Date.now();
      let timeLeft = targetTime - now;
      if (timeLeft <= 0) {
        // Reset the timer when time runs out.
        targetTime = now + totalDuration;
        timeLeft = totalDuration;
      }
      updateTimerDisplay(timeLeft);
      // Calculate the delay until the next whole second.
      const delay = 1000 - (now % 1000);
      setTimeout(tick, delay);
    }
  
    tick();
  });
  