/* ============================================================
   RideLink - map.js
   Leaflet / OpenStreetMap map utilities
   ============================================================ */

const DEFAULT_COORDS = [11.0168, 76.9558]; // Coimbatore
const DEFAULT_ZOOM   = 12;

/* ---- Custom icon helper ---- */
function createIcon(color, label = '') {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        background:${color};
        width:36px; height:36px;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        border:3px solid #fff;
        box-shadow:0 2px 8px rgba(0,0,0,0.4);
        display:flex; align-items:center; justify-content:center;
      ">
        <span style="transform:rotate(45deg);color:#fff;font-size:14px;font-weight:700">
          ${label}
        </span>
      </div>`,
    iconSize:   [36, 36],
    iconAnchor: [18, 36],
    popupAnchor:[0, -38]
  });
}

const icons = {
  user:   createIcon('#00C896', '📍'),
  pickup: createIcon('#00C896', '📍'),
  dest:   createIcon('#FF6B35', '🏁'),
  driver: createIcon('#58A6FF', '🚲'),
  pillion:createIcon('#D29922', '🧍')
};

/* ---- Initialize a basic map ---- */
function initMap(elementId, coords = DEFAULT_COORDS, zoom = DEFAULT_ZOOM) {
  const map = L.map(elementId, {
    center: coords, zoom,
    zoomControl: true, attributionControl: true
  });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(map);
  return map;
}

/* ---- Get user location ---- */
function getUserLocation(onSuccess, onError) {
  if (!navigator.geolocation) { if (onError) onError('not supported'); return; }
  navigator.geolocation.getCurrentPosition(
    pos => onSuccess([pos.coords.latitude, pos.coords.longitude]),
    err => { if (onError) onError(err.message); else onSuccess(DEFAULT_COORDS); },
    { timeout: 8000 }
  );
}

/* ---- Add "You are here" marker ---- */
function addUserMarker(map, coords) {
  const marker = L.marker(coords, { icon: icons.user })
    .addTo(map).bindPopup('<b>📍 You are here</b>').openPopup();
  map.setView(coords, 14);
  return marker;
}

/* ---- Draw route, returns control + calls onFound({distance, time, coords[]}) ---- */
function drawRoute(map, from, to, onFound) {
  if (map._routeControl) {
    try { map.removeControl(map._routeControl); } catch(e) {}
  }

  const control = L.Routing.control({
    waypoints: [L.latLng(from), L.latLng(to)],
    routeWhileDragging: false,
    showAlternatives: false,
    fitSelectedRoutes: true,
    show: false,
    lineOptions: { styles: [{ color: '#00C896', weight: 5, opacity: 0.85 }] },
    createMarker: () => null
  }).addTo(map);

  map._routeControl = control;

  control.on('routesfound', e => {
    const route   = e.routes[0];
    const summary = route.summary;
    const coords  = route.coordinates; // array of LatLng along the actual road
    if (onFound) {
      onFound({
        distance: (summary.totalDistance / 1000).toFixed(1) + ' km',
        time:     Math.round(summary.totalTime / 60) + ' min',
        coords:   coords  // <-- actual road waypoints
      });
    }
  });

  return control;
}

/* ---- Move marker along actual road route coords ---- */
function animateAlongRoute(routeCoords, markerRef, map, intervalMs, onComplete) {
  if (!routeCoords || routeCoords.length < 2) { if (onComplete) onComplete(); return; }

  // Sample every Nth point so animation isn't too slow on long routes
  const total   = routeCoords.length;
  const step    = Math.max(1, Math.floor(total / 60)); // ~60 animation frames
  let   index   = 0;

  const timer = setInterval(() => {
    if (index >= total) {
      clearInterval(timer);
      // Snap to exact destination
      const last = routeCoords[total - 1];
      markerRef.setLatLng([last.lat, last.lng]);
      if (onComplete) onComplete();
      return;
    }
    const pt = routeCoords[index];
    markerRef.setLatLng([pt.lat, pt.lng]);
    // Keep map centred on moving marker
    map.panTo([pt.lat, pt.lng], { animate: true, duration: 0.5 });
    index += step;
  }, intervalMs);

  return timer;
}

/* ---- Legacy straight-line movement (kept for backward compat) ---- */
function simulateMovement(map, start, end, markerRef, steps, intervalMs) {
  const latStep = (end[0] - start[0]) / steps;
  const lngStep = (end[1] - start[1]) / steps;
  let   current = 0;
  const timer = setInterval(() => {
    if (current >= steps) { clearInterval(timer); return; }
    current++;
    markerRef.setLatLng([start[0] + latStep * current, start[1] + lngStep * current]);
  }, intervalMs);
  return timer;
}
