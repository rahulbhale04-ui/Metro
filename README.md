# Metro — Local Service Finder (Expo / React Native)

Find and book trusted local services — Electrician, Plumber, Maid, Cook, Tutor,
AC Repair, Carpenter, Driver, Beautician, Painter.

This is a **working demo app**: phone login (OTP = 1234, any 10-digit number),
12 sample providers, favorites, booking with date/time/address, my bookings,
provider registration, dark mode — all saved on the phone (no server needed).

## Build the APK with Expo (from your phone)

1. Go to github.com → New repository (public or private) → upload every file
   and folder from this project as-is (keep the `src` folder structure).
2. Go to expo.dev → your project → Configuration → connect it to that GitHub repo.
3. In `app.json`, replace `npm install --global eas-cli && npx create-expo-app metro && cd metro && eas init --id 6046a462-fa26-4cce-8273-844399854efc` with your real
   Expo project ID (shown on the project page) before uploading, or edit it
   directly on GitHub after uploading.
4. Trigger a build: EAS Build → Android → profile **preview** (this makes an
   installable .apk, not the Play Store .aab format).
5. When the build finishes, download the .apk from the Expo build page and
   install it on an Android phone (allow "install unknown apps" if asked).

## Notes

- All data is demo/local — nothing is shared between phones. To make it a
  real multi-user app later, add a backend (Firebase is a common choice) and
  swap the functions in `src/store.js` for real network calls.
- Replace the provider phone numbers in `src/data.js` before sharing publicly.
