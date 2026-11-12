# REIGNSEED — The Living Kingdom
## Pass 28 · The Enchanted Edition · v0.28.0

A playable, portrait-phone-first, offline-friendly fantasy kingdom builder, complete five-act interactive campaign, tactical RPG, and regional strategy game, delivered as a **static GitHub Pages website**. This release is a **visual and accessibility refinement**, not another story expansion. The five-act story, eight ending routes and New Game+ introduced through Pass 26 remain intact.

### What's improved in Pass 28

- **Enchanted settlement rendering:** The original isometric Canvas town now features a softly illuminated sky, distant hamlets, river crossing, wooden bridge, village footpaths, inhabited streetlamps, foliage texture, and seasonal atmospheric cues. The scene is procedural and original; no remote images or expensive third-party rendering libraries are needed.
- **Scenic / Plan toggle:** A new town control switches from the immersive picture to a clearly numbered 30-parcel layout, with a **keyboard-accessible parcel list**. The list can open the relevant building inspection or construction menu without requiring precision taps on the canvas. Includes a **recenter** camera button and existing zoom/pan controls.
- **Power-aware animation:** Town canvas redraws at an approximately 30 FPS ceiling on animated devices. Reduced-motion mode avoids ambient loops. Tab return resumes the drawing without duplicating animation frames; canceled pointer interactions release cleanly.
- **Adventure atmosphere:** Procedural scenery uses layered mist, architectural arches, better illumination, deeper shadows and subtle rune/light movement. Forest, river, ruins, quarry and boss scenes keep their established variants. Motion stops in reduced-motion mode.
- **Tactical combat readability:** The original hero/enemy Canvas adds subtle battle markers, ambient particles and a phase-aware elite telegraph. Clearer selected target outlines, a single-tap **Jump to actions** control, and improved attack/resolve button treatment. The action shortcut does not cover the battlefield or other controls.
- **UI consistency:** Improved header, navigation, resource chips, cards, scene captions and small-screen spacing. Main tabs can be opened with keyboard numbers **1–5**, but not while a modal is open or the user is typing.
- **No rule changes:** No new resources, story unlocks, prestige bonuses, automatic week advancement or save schema migrations. Everything remains accessible in the five-tab phone layout.

### Existing gameplay retained

All **five playable acts**, **eight earnable endings** and cosmetic New Game+, **41 unique story expeditions plus two repeatable contracts**, **76 research nodes**, **34 building families**, **16 registered resources**, four recruitable heroes, strategic military combat, faction diplomacy, settlements, trading caravans, equipment and more. The originally planned full continental-scale 36-sector sandbox remains future scope.

**Save compatibility:** Pass 28 deliberately retains **schema version 17** and **content version `founding-p26`**. Reigns from Pass 26 and Pass 27 are understood by the same state format; older migration support remains available. Export important saves as a precaution. The compiled game version is `0.28.0`, but historical progress is never deliberately reset.

## Play and deployment

1. **Back up Pass 27 reigns** using Settings → Export This Reign or Back Up All Reigns. Keep the older deployment ZIP as a fallback.
2. Extract `Reignseed_Pass_28_GitHub_Pages_Site.zip`. Upload the **contents** to your repository's GitHub Pages publication directory. Keep `index.html` directly at the publishing root and retain `scripts/`, `styles/`, `static/`, `.nojekyll`, `manifest.webmanifest` and `service-worker.js` beside it.
3. Confirm your Pages branch and folder at repository Settings → Pages. Visit its HTTPS URL. If a service-worker update is waiting, use Settings to activate it after completing and backing up the current session.
4. On your own phone, actually create a save, reload, export/import, launch an expedition, restart the browser, test offline after first load, and restore connectivity. These real-origin checks were **not** possible to certify in the test environment.

### New kingdom map controls

- **✦ Scenic / ▦ Plan:** Switch between an uncluttered painted valley and numbered parcels.
- **⌖:** Recenter camera. **− / +:** Zoom out/in. Drag on the town canvas to pan.
- In Plan mode, expand **Accessible parcel list** below the scene. Numbered buttons open the building inspector for an occupied parcel or the construction planner for an empty one.
- The scene is decorative; the construction menu and building management remain accessible without the canvas.
- Keyboard: **1 Kingdom, 2 Council, 3 World, 4 Progress, 5 Chronicle**. These keys are ignored in dialogs and text fields.

## Safes, saves, and offline behavior

All local save tools from Pass 27 are retained: three IndexedDB slots, individual and all-reigns JSON export/import, a prior-snapshot recovery center, and a separate cosmetic endings library. The worker's cache name has been upgraded to `reignseed-p28-v1` so updated CSS and compiled scene code aren't mixed with the old release. It waits for explicit update activation rather than forcing a reload mid-reign. No accounts or cloud synchronization are provided.

## Building and testing source

Requires Node.js and a TypeScript compiler (`tsc`). The **compiled website requires neither**.

```sh
npm run typecheck
npm run build
npm test
node tests/pass26.mjs
node tests/pass27.mjs
node tests/pass28.mjs
node tests/pass28_offline.mjs
node tests/stress.mjs
python tests/audit_release.py
TEST_WIDTH=390 python tests/pass28_ui.py
python tests/pass28_battle_ui.py
```

Earlier mechanics tests from `tests/pass11.mjs` through `tests/pass25.mjs` remain included. The current release passed all those scripts and phone-sized smoke checks at **320, 360, 390 and 430 CSS pixels**. Browser interaction tests inject a simulated save layer into Chromium; offline-shell caching was tested with a service-worker simulation. Attempts at normal HTTPS browser-origin navigation hit `net::ERR_BLOCKED_BY_ADMINISTRATOR`, so **native IndexedDB, actual service-worker offline updates, iOS Safari and Android physical-device testing, and live GitHub Pages deployment are not verified**. See `docs/TEST_RESULTS.md` and `docs/DEVICE_QA_CHECKLIST.md`.

## Suggested next pass

Pass 29 should prioritize live-site testing with real phones, full accessibility and device QA, continuous gameplay/long-session resource profiling, and extending art/animations across the **remaining continental-scale sandbox**, not pretending procedural polishing alone constitutes AAA final-production art.
