# RideLink 🚲
### Community Bike Ride Sharing Platform
*College Expo Demo Project*

---

## 📁 Project Structure

```
ridelink/
├── index.html              ← Splash screen (entry point)
├── login.html              ← Login / Sign Up
├── dashboard.html          ← Main dashboard with map
├── offerRide.html          ← Post a ride (driver)
├── findRide.html           ← Search for rides (passenger)
├── rideResults.html        ← Search results with match scores
├── rideDetails.html        ← Single ride detailed view + map
├── rideMatch.html          ← Match score animation + accept
├── driverPickup.html       ← Driver navigating to pickup
├── pillionWaiting.html     ← Passenger waiting screen + live map
├── rideInProgress.html     ← Active ride HUD + map
├── rideRating.html         ← 5-star rating after ride
├── navigate.html           ← Standalone navigation (no booking)
├── profile.html            ← Profile menu
├── editProfile.html        ← Edit name, phone, email, photo
├── driverVerification.html ← License & vehicle verification
├── myRides.html            ← Ride history (offered + requested)
├── emergencyContact.html   ← SOS contact setup
├── helpSupport.html        ← FAQ + support email
│
├── css/
│   └── style.css           ← Complete stylesheet (dark theme)
│
└── js/
    ├── app.js              ← Core state, demo data, utilities
    ├── map.js              ← Leaflet / OpenStreetMap helpers
    ├── rides.js            ← Ride rendering & search
    ├── matching.js         ← Match score logic
    └── navigation.js       ← Standalone nav page logic
```

---

## 🚀 How to Run Locally

### Option 1 — VS Code Live Server (Recommended)

1. Install [VS Code](https://code.visualstudio.com/)
2. Install the **Live Server** extension (Ritwick Dey)
3. Open the `ridelink/` folder in VS Code
4. Right-click `index.html` → **Open with Live Server**
5. Browser opens at `http://127.0.0.1:5500/index.html`

### Option 2 — Python HTTP Server

```bash
# Navigate to the ridelink folder
cd ridelink

# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```
Open: `http://localhost:8080`

### Option 3 — Node.js `serve`

```bash
npm install -g serve
cd ridelink
serve .
```
Open the URL shown in terminal.

### ⚠️ Important: Do NOT open index.html directly as file://
Maps require an HTTP server. `file://` URLs block Leaflet tile loading.

---

## 🎮 Demo Walkthrough

### As a Passenger (Find a Ride)
1. Open `index.html` → splash → redirects to login
2. Click **Login** (demo credentials pre-filled)
3. On Dashboard, tap **Find Ride** (orange button)
4. Enter pickup: `Anna Nagar`, destination: `IT Park`
5. Click **Search Rides**
6. See results with **match scores** (e.g. 92%)
7. Tap a ride card → **Ride Details** with map route
8. Click **Request This Ride** → **Ride Match** screen
9. Click **Accept Ride** → **Pillion Waiting** (live map, countdown)
10. Auto-advances to **Ride In Progress** after 8 cycles
11. Click **End Ride** → **Rate Your Ride** (5 stars)

### As a Driver (Offer a Ride)
1. Login → Dashboard → tap **Offer Ride** (green button)
2. First time: **Verification popup** appears
   - Click **Skip (Demo Only)** to bypass, OR
   - Click **Start Verification** → fill form → submit
3. On Offer Ride page: click map to set pickup & destination
4. Fill time, seats, price → **Post Ride**

### Navigate Without Booking
1. Tap the 🗺️ **Navigate** tab
2. Click map once → sets start point
3. Click map again → sets destination
4. Route draws with distance + ETA
5. Click **Reset Route** to clear

### Profile Features
- **Edit Profile** — change name, phone, email, photo
- **Driver Verification** — submit license & vehicle details
- **My Rides** — tabs: Offered / Requested history
- **Emergency Contact** — set SOS contact
- **Help & Support** — FAQ accordion + support email

---

## 🗺️ Map Technology

- **Leaflet.js 1.9.4** — open source map library
- **OpenStreetMap** — free tile server (no API key needed)
- **Leaflet Routing Machine** — route drawing between two points
- **Geolocation API** — detects user's real location (fallback: Chennai)

---

## 📱 Responsive Design

| Screen | Layout |
|--------|--------|
| Mobile (< 768px) | Single column, bottom nav bar |
| Tablet (768–991px) | Single column, bottom nav bar |
| Desktop (≥ 992px) | Two-column: sidebar + full-height map, top nav |

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | CSS3 + CSS Variables |
| Logic | Vanilla JavaScript (ES6+) |
| Maps | Leaflet.js + OpenStreetMap |
| Routing | Leaflet Routing Machine (OSRM) |
| Fonts | Google Fonts (Syne + DM Sans) |
| Data | In-memory JS arrays (no backend) |
| Storage | localStorage (profile, verification state) |

---

## 🎨 Design System

- **Theme**: Dark mode (`#0D1117` base)
- **Primary**: `#00C896` (green)
- **Accent**: `#FF6B35` (orange)
- **Display font**: Syne (700/800 weight)
- **Body font**: DM Sans

---

## 🧪 Demo Features

Since this is a prototype:
- No real payment processing
- No real backend or database
- Ride matching uses keyword similarity + random scoring
- Driver/passenger movement is simulated
- SOS alerts are shown as toast notifications
- All data resets on page refresh (sessionStorage)
- Profile/verification data persists via localStorage

---

*Built for College Expo · RideLink v1.0 · 2024*
