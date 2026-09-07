# Getting Sri Lakshmi Mobile to Show Up in Google Search / Maps

Being honest upfront: the website code alone will NOT make you show up
first when someone searches "mobile repair near me". That's controlled
mainly by **Google Business Profile** — a free, separate Google service.
The website changes (Maps embed, structured data) help, but the profile
below is what actually gets you into Google Maps / local search results.

---

## Step 1 — Create your Google Business Profile

1. Go to https://business.google.com
2. Sign in with the **shop's Gmail account**
3. Click "Manage now" and search for your business name
4. If it doesn't exist yet, click "Add your business to Google"
5. Enter:
   - Business name: Sri Lakshmi Mobile Service Center
   - Category: "Mobile Phone Repair Shop" (or closest match)
   - Address: your real shop address (this is what puts the pin on the map)
   - Phone number, website URL (your Netlify link once deployed)
6. **Verify your business** — Google will usually send a postcard with a
   code to your shop address, or offer phone/email verification depending
   on your area. This can take a few days for postcard verification.

## Step 2 — Fill out the profile completely
The more complete, the better your ranking:
- [ ] Add photos (shop front, inside, your work)
- [ ] Set accurate opening hours
- [ ] Add services offered (screen repair, battery replacement, etc.)
- [ ] Write a business description

## Step 3 — Get reviews
This matters A LOT for ranking. After a repair, ask happy customers to
leave a Google review. You can share a direct review link (Google gives
you one from your Business Profile dashboard → "Ask for reviews").

## Step 4 — Keep it consistent
Make sure your **Name, Address, Phone number (NAP)** are IDENTICAL
everywhere — website, Google Business Profile, any other directory
listing (JustDial, Sulekha, etc). Inconsistency hurts ranking.

## Step 5 — Update the website once verified
Once your Business Profile is live:
1. Get your Maps embed link: search your shop on Google Maps → Share →
   Embed a map → copy the `src` URL
2. Paste it into `index.html`, replacing the placeholder `iframe src` in
   the Contact section
3. Update the `application/ld+json` structured data block in `index.html`
   `<head>` with your real address, phone number, and PIN code

---

## Realistic expectations
- Ranking #1 takes time (weeks to months) and depends on reviews,
  competition in your area, and profile completeness — no one can
  guarantee a #1 spot, including paid ads
- A complete profile + real reviews will get you found by nearby
  customers far more than website SEO tricks alone
- Google Ads (paid) is a separate, faster way to appear at the top, if
  you want to explore that later — but that's a paid option, not this
  guide's scope
