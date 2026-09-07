# Pre-Launch Audit — Sri Lakshmi Mobile Website

Status key: ✅ Done &nbsp; ⚠️ Needs your input before launch &nbsp; 🔲 Optional / later

---

## 📁 Project structure audit — ✅
Backend and frontend are cleanly separated (MVC-style backend: models/
routes/controllers/middleware; frontend: plain HTML/CSS/JS with clear file
names). No structural issues found.

## 🔍 SEO check — ⚠️
- ✅ Meta description, Open Graph tags, `LocalBusiness` structured data added
- ✅ `robots.txt` and `sitemap.xml` added (just now)
- ⚠️ **You still need to:** replace placeholder values in `index.html`
  (`<head>` JSON-LD block) with your real phone number, address, and once
  deployed, your real site URL in `robots.txt` / `sitemap.xml`
- 🔲 No favicon yet — cosmetic, add `assets/images/favicon.ico` + a
  `<link rel="icon">` tag later if you want a browser-tab icon

## 🔐 Security check — ✅ (with 2 notes)
- ✅ Password hashing (bcrypt), JWT auth, rate limiting, Helmet headers,
  input validation, body size limits, `.gitignore` for `.env`
- ✅ Just fixed: admin login now rejects non-string email/password (blocks
  a NoSQL-injection trick where a JSON object is passed instead of text)
- ⚠️ **CORS note:** `server.js` falls back to `origin: "*"` (allow
  everyone) if `CLIENT_URL` isn't set. Make sure you set the real
  `CLIENT_URL` env var on Render — don't deploy without it
- ⚠️ **Admin password strength:** make sure the shop owner's password
  (`ADMIN_PASSWORD`) is reasonably strong — not just 6 characters

## 🛑 404 + error handling — ✅
- ✅ Backend: proper 404 JSON handler + generic error handler (no stack
  traces leaked to clients)
- ✅ Frontend: custom `404.html` page added (just now) — Netlify serves
  this automatically for unmatched routes

## 📱 Mobile responsiveness — ✅ (verify visually)
- ✅ Responsive nav (hamburger menu), responsive grids (services, factors,
  testimonials), responsive contact section
- ⚠️ **Please manually check on an actual phone (or Chrome DevTools
  device mode)** once frames are added: the hero scroll animation and text
  overlay readability on small screens — this is the one area worth eyeballing
  yourself since animation timing can feel different on mobile

## ⚡ Performance — 🔲 (fine for launch, can improve later)
- ✅ Frame preloading is progressive (doesn't block page load)
- 🔲 Compress your animation frames (TinyPNG or similar) before uploading —
  40 frames at full quality can add up in size
- 🔲 Consider lazy-loading below-the-fold images later if you add more photos
- Not urgent for a small local business site's traffic level

## 🗄️ MongoDB production setup — ✅
- ✅ Free M0 Atlas cluster, connection working
- ✅ Network access configured
- 🔲 Atlas free tier has basic automatic backups only — fine for this
  scale; if the business grows, a paid tier gives more robust backups

## 🔑 `.env` / API secrets — ✅
- ✅ `.gitignore` added for both projects — `.env` will never be committed
- ⚠️ **Reminder:** when you set up Render/Netlify, you paste these values
  directly into their dashboards (Environment Variables section) — never
  into any file that gets pushed to GitHub

## 🚀 Best hosting தேர்வு — ✅ (already decided, good fit)
Render (backend) + Netlify (frontend) — both free tiers, both fine for a
small shop's traffic. Only downside: Render's free tier "sleeps" after
inactivity (~30-60 sec wake-up on first request each day) — already noted
in your deployment checklist to mention to the shop manager.

## 🌐 Domain + SSL — ✅ (automatic) / 🔲 (optional upgrade)
- ✅ Netlify and Render both provide free HTTPS/SSL automatically — no
  extra setup needed
- 🔲 Custom domain (e.g. srilakshmimobile.com) is optional — costs ~₹500-900/year,
  can be added anytime later in Netlify's domain settings without
  rebuilding anything

## 🧪 Post-deployment testing — ✅ (checklist already exists)
Covered in `DEPLOYMENT_CHECKLIST.md` Part 6 — booking submission, admin
login, approve/reject, mobile + desktop check.

## 📊 Google Search Console + sitemap — ⚠️ (do after deploying)
- ✅ `sitemap.xml` file ready
- ⚠️ **After deploying**, do this:
  1. Go to https://search.google.com/search-console
  2. Add your property (your Netlify URL)
  3. Verify ownership (Netlify makes this easy via HTML tag or DNS)
  4. Submit `https://your-site-url.netlify.app/sitemap.xml`
  5. This is separate from (but complements) the Google Business Profile
     covered in `GOOGLE_VISIBILITY_GUIDE.md`

## ✅ Final handover checklist — ✅
Already covered in `DEPLOYMENT_CHECKLIST.md` (Part 7) and
`SHOP_MANAGER_GUIDE.md`.

---

## Summary — what YOU need to do before deploying
1. Fill in real phone/address in `index.html` (JSON-LD block + Contact section)
2. Set a proper `CLIENT_URL` on Render (not left as `*`)
3. Choose a reasonably strong `ADMIN_PASSWORD`
4. Compress your frame images before uploading (optional but recommended)
5. After going live: Search Console submission + Google Business Profile

Everything else is done and doesn't block deployment.
