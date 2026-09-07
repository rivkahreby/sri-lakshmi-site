# Sri Lakshmi Mobile — Deployment & Handover Guide

Follow this in order. Check each box as you complete it.

---

## PART 1 — Database (MongoDB Atlas)

- [ ] Create account at mongodb.com/cloud/atlas
- [ ] Create free M0 cluster (region: Mumbai / ap-south-1)
- [ ] Create a database user (save the username + password somewhere safe)
- [ ] Network Access → Allow access from anywhere (0.0.0.0/0)
- [ ] Copy the connection string (Connect → Drivers → Node.js)

---

## PART 2 — Backend (local test first)

- [ ] `cd sri-lakshmi-backend`
- [ ] Copy `.env.example` → `.env`
- [ ] Fill in `.env`:
  - `MONGO_URI` = your Atlas connection string (with real password, no `<>`)
  - `JWT_SECRET` = any long random string
  - `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` = the shop owner's login (choose something they'll remember, but not easily guessable)
- [ ] `npm install`
- [ ] `node utils/seedAdmin.js` — creates the shop owner's admin login (run this only once)
- [ ] `npm run dev` — confirm it says "Server running on port 5000" and "MongoDB connected"
- [ ] Test in browser: open `http://localhost:5000` — should show `{"message":"Sri Lakshmi Mobile Service Center API is running"}`

---

## PART 3 — Backend (deploy to Render — makes it live)

- [ ] Push `sri-lakshmi-backend` folder to a GitHub repo
- [ ] Sign up at render.com (GitHub login is fine)
- [ ] New → Web Service → connect your backend repo
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Add all the same `.env` values as Environment Variables in Render's dashboard
- [ ] Deploy — wait for the live URL (e.g. `https://sri-lakshmi-backend.onrender.com`)
- [ ] Once live, run the seed script once more from Render's Shell tab: `node utils/seedAdmin.js`
- [ ] Test: open the live URL in browser — should show the same API running message

⚠️ Note: Render's free tier "sleeps" after inactivity — first request after idle time can take ~30-60 seconds to wake up. Mention this to the shop manager so they're not confused if the site feels slow the first time each day.

---

## PART 4 — Frontend

- [ ] In `sri-lakshmi-site/js/config.js`, set:
  ```js
  const API_BASE_URL = "https://sri-lakshmi-backend.onrender.com"; // your Render URL
  ```
- [ ] Add real frames to `assets/frames/`
- [ ] Add real logo + PhonePe QR to `assets/images/`
- [ ] Update phone number, address, hours in `index.html` (Contact section)
- [ ] Update job listings in Careers section if needed
- [ ] Test locally with Live Server — booking form should submit successfully now (connected to live backend)
- [ ] Push `sri-lakshmi-site` folder to a GitHub repo
- [ ] Sign up at netlify.com (GitHub login fine)
- [ ] Add new site → Import from GitHub → select the frontend repo → Deploy
- [ ] Note the live URL (e.g. `https://sri-lakshmi-mobile.netlify.app`)

---

## PART 5 — Connect the two (CORS)

- [ ] In Render dashboard, update the backend's `CLIENT_URL` environment variable to your Netlify URL (e.g. `https://sri-lakshmi-mobile.netlify.app`)
- [ ] Redeploy backend (Render usually does this automatically when env vars change)
- [ ] Test the full flow end-to-end (see Part 6)

---

## PART 6 — Full test before handover

- [ ] Open the live site link on a phone and a laptop
- [ ] Scroll through hero — animation plays smoothly
- [ ] Submit a test booking through the form
- [ ] Open `your-site-url/admin.html`, log in with the shop owner's credentials
- [ ] Confirm the test booking appears
- [ ] Click Approve / Reject — confirm status updates
- [ ] Delete/ignore the test booking data (or leave it — shop owner can ignore old test entries)

---

## PART 7 — Handover to shop manager

Give them:
1. **Public site link** — `https://sri-lakshmi-mobile.netlify.app` (share this for customers, put it on visiting cards / Google listing)
2. **Admin link** — `https://sri-lakshmi-mobile.netlify.app/admin.html` (bookmark only, not public)
3. **Login email + password** (the ADMIN_EMAIL / ADMIN_PASSWORD you set in Part 2)
4. The separate **"How to Use" guide** (see companion file) — simple, non-technical

Also keep for yourself (not for the shop manager):
- GitHub repo access (for future changes)
- Render + Netlify + MongoDB Atlas login (for maintenance)
- This checklist, for reference if anything needs re-deploying

---

## Ongoing maintenance (for you, not the shop)
- Free tiers (Render/Netlify/Atlas) are fine for a small shop's traffic — no cost unless it scales up significantly
- If the shop wants a custom domain (e.g. srilakshmimobile.com) later, that's a small additional step in Netlify's settings + buying the domain
- Payment gateway integration is a future add-on, not part of this handover
