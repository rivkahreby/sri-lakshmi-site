# Sri Lakshmi Mobile Service Center — Website (Frontend)

## Structure
```
sri-lakshmi-site/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── bgCanvas.js        # starry/network animated background
│   ├── scrollAnimation.js # scroll-scrubbed frame-sequence phone animation
│   └── main.js            # nav toggle + misc UI
└── assets/
    ├── frames/             # put your exploded-phone animation frames here (see README inside)
    └── images/             # logo.png, phonepe-qr.png go here

admin.html                  # Shop owner login + booking management dashboard
css/admin.css                # Styles for admin.html
js/config.js                 # Backend API URL — update this after deploying the backend
js/booking.js                 # Handles the customer booking form submission
js/admin.js                   # Handles admin login, viewing & approving/rejecting bookings
```

## Backend required
This site's booking form and admin dashboard need the **Sri Lakshmi backend**
(the booking API) running and reachable. See the separate backend project
README for setup. Once it's running (locally or deployed), update
`js/config.js`:
```js
const API_BASE_URL = "http://localhost:5000"; // <- change to your deployed backend URL
```

## Admin access
Shop owner logs in at `admin.html` (not linked in the public nav — bookmark
it directly) using the email/password created via the backend's
`utils/seedAdmin.js` script.

## How to run locally
1. Open this folder in VS Code
2. Install the **Live Server** extension (if not already)
3. Right-click `index.html` → "Open with Live Server"

No build step needed — plain HTML/CSS/JS + GSAP via CDN.

## Before going live — replace placeholders
- [ ] Add real logo → `assets/images/logo.png`
- [ ] Add PhonePe QR code → `assets/images/phonepe-qr.png`
- [ ] Add animation frames → `assets/frames/` (see `assets/frames/README.md`)
- [ ] Update `FRAME_COUNT` in `js/scrollAnimation.js` to match your frame count
- [ ] Update phone number and address in the Contact section (`index.html`)
- [ ] Update job listings in the Careers section as needed

## Sections included
1. Navbar (Home, About Us, Services, Careers, Contact Us)
2. Hero with scroll-scrubbed exploded phone animation
3. About / Introduction
4. Service Factor cards (Why Choose Us)
5. Services & Special Offers (incl. free tempered glass highlight)
6. Testimonials
7. Careers / job vacancies
8. Contact & Payment (PhonePe QR)
9. Footer

## Next steps (per your roadmap)
- Backend (if needed — e.g. for a contact form or job applications) comes next
- Deployment: Azure App Service via GitHub Actions CI/CD
