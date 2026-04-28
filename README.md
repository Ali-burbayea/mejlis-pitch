# Mejlis Pitch — حجز الملاعب

Arabic-first (RTL) sports field booking prototype for Kuwait City — football and volleyball.

Built on the Mejlis design system: midnight canvas, saffron primary, Tajawal display, IBM Plex Sans Arabic body, eastern-Arabic numerals.

## Run

Open `index.html` in a browser, or serve the directory with any static server:

```bash
python -m http.server 8000
# then visit http://localhost:8000/
```

The HTML loads React, ReactDOM, and Babel from CDN — no build step.

## Screens

1. **الرئيسية** — greeting, location pill, sport picker, hero CTA, public-game banner, nearby fields
2. **الملاعب** — filterable list of fields
3. **تفاصيل** — hero illustration, specs, amenities, date strip
4. **الفترات** — team-size toggle, time-slot grid (متاح / محجوز / لعبة عامة), live total
5. **تأكيد** — cream paper receipt with notch holes, dashed dividers, barcode
6. **لعبات عامة** — public games to join, with players-progress bar

Both iOS and Android frames render side-by-side.

## Structure

```
index.html                entry point
styles.css                screen + component styles
ds/colors_and_type.css    Mejlis design tokens
ds/assets/                pattern + logo SVGs
components/Atoms.jsx      icons, buttons, cards, slot button, tab bar
components/Screens.jsx    six screens
frames/ios-frame.jsx      iOS 26 device frame
frames/android-frame.jsx  Material 3 device frame
```
