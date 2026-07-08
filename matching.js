/* ============================================================
   RideLink - matching.js
   Ride match screen logic
   ============================================================ */

function initMatchPage() {
  const ride  = JSON.parse(sessionStorage.getItem('selectedRide') || 'null');
  const score = sessionStorage.getItem('matchScore') || '88';

  if (!ride) { navigateTo('findRide.html'); return; }

  // Animate match score counter
  let current = 0;
  const target = parseInt(score);
  const el = document.getElementById('match-score-val');
  if (el) {
    const t = setInterval(() => {
      current += 3;
      if (current >= target) { current = target; clearInterval(t); }
      el.textContent = current + '%';
    }, 20);
  }

  // Fill in ride info
  const fill = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  fill('match-driver',  ride.driver);
  fill('match-vehicle', ride.vehicle);
  fill('match-bike',    ride.bikeNumber);
  fill('match-pickup',  ride.pickup);
  fill('match-dest',    ride.destination);
  fill('match-time',    ride.time);
  fill('match-price',   formatPrice(ride.price));
  fill('match-rating',  formatRating(ride.rating));

  const avatarEl = document.getElementById('match-avatar');
  if (avatarEl) avatarEl.textContent = ride.driverInitial;

  // Accept button — passenger requests the ride → goes to waiting screen
  const acceptBtn = document.getElementById('accept-btn');
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      showToast('Ride requested! Waiting for driver confirmation 🚲', 'success');
      sessionStorage.setItem('rideAccepted', JSON.stringify(ride));
      setTimeout(() => navigateTo('pillionWaiting.html'), 1200);
    });
  }

  // Cancel button
  const cancelBtn = document.getElementById('cancel-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => navigateTo('rideResults.html'));
  }
}
