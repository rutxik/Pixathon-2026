# Casefile CAPTCHA

A playable, hand-illustrated browser prototype for the "Reimagine CAPTCHA"
hackathon prompt: instead of picking blurry crosswalks, you solve a tiny
mystery. One of three fictional crime scenes loads at random, you click the
objects that are actual evidence, and a 30-second timer keeps it CAPTCHA-fast.

This is a game prototype, not real security — the UI never claims to detect
bots or verify identity. Pass/fail is a gameplay result based on clue
selection and the timer, and the "Detective Instinct" score is explicitly
labeled a playful demo metric.

## Files created

```
index.html          Page shell: header, briefing screen, case panel, scene, checklist, result modal
css/styles.css       Evidence-board visual system, motion, responsive layout
js/cases.js          Data model for the 3 cases + their illustrated SVG scenes and clue hotspots
js/app.js            Game logic: briefing flow, random case pick, timer, selection, pass/fail, restart
js/sfx.js            Synthesized sound effects + ambient music (Web Audio API, no audio files)
.claude/launch.json  Dev-server config used while building (python -m http.server)
```

No build tooling, no npm packages, no external image/font URLs, no backend —
everything is plain HTML/CSS/JS so the demo can't break from a flaky network
on stage.

## How to run it

It's a static site — any local file server works. Two options:

```bash
# Option 1: Python (no install needed on most systems)
python -m http.server 5173
# then open http://localhost:5173
```

```bash
# Option 2: Node, if you have it
npx serve .
```

You can also just double-click `index.html`, but some browsers restrict
`file://` script loading — a local server is the reliable path for the demo.

## How it works

**Briefing screen** — on load, and whenever "Try another case" is pressed,
the player first sees a briefing panel with the case title, setup, and
rules, and nothing is timed yet. The timer only starts once they click
"Start Investigation" — this both gives them time to read and satisfies
browser autoplay rules, since that click is the user gesture that unlocks
audio. "Restart challenge" skips the briefing (the player already read it)
and drops straight back into a fresh timed round for the same case.

**Random case logic** — `CasefileData.CASES` in `js/cases.js` holds the three
cases. `pickRandomCase()` in `js/app.js` picks one uniformly at random on
boot and on "Try another case"; repeats are allowed by design, same as a real
CAPTCHA.

**Clue hotspot system** — each case's scene is a hand-built SVG (no raster
images). Every clickable object is an SVG `<g class="hotspot" data-clue="id"
data-required="true|false" tabindex="0" role="button" aria-label="...">`
containing: a generous invisible hit-rect (so small drawn objects stay easy
to tap), the visible shape, a dashed focus ring for keyboard users, and a
marker ring + checkmark that fade in when selected. Because hotspots are
real SVG elements positioned in the same coordinate space as the artwork,
they stay perfectly aligned as the scene scales with the viewport — no
separate normalized-coordinate overlay needed. Required clues toggle
on/off; non-required "red herring" objects (the snake, the damaged plug,
the torn folder, the open window) give gentle "Not a clue — keep looking"
feedback and never count. Each scene also has a layer of purely decorative
clutter with no click handling at all (picture frames, a wall clock, a
rug, a sideboard, an armchair, a potted plant, and more) — it adds visual
noise on top of the red herrings so the real evidence doesn't just jump
out at a glance.

**Sound** — `js/sfx.js` synthesizes every sound with the Web Audio API
(short tones built from oscillators + gain envelopes), so there are no
audio files to fetch and nothing can fail to load on stage. It plays a
chime when a real clue is found, a soft blip when one is deselected, a
buzz for a red herring, a rising arpeggio on a solve, a falling tone on a
loss, and a quiet ambient drone with the occasional random "ping" while a
round is live. Everything starts only after "Start Investigation" is
clicked (the required user gesture for autoplay), and the speaker icon in
the header mutes/unmutes it at any time.

**Timer** — a single `setInterval` drives a 30-second countdown
(`00:30` format). `clearTimer()` is always called before a new one starts
(on load, restart, and new case) so timers never stack. The display pulses
red in the last 10 seconds. Reaching zero ends the round as a loss if it
hasn't already been won.

**Pass/fail rules** — "Submit Case" is disabled until every required clue
for the current case is selected; submitting then (or running out the
remaining clock first) ends the round. Success shows "CASE SOLVED —
VERIFICATION PASSED" with the case's reveal text; running out of time with
clues still missing shows "CASE UNSOLVED — TRY AGAIN" with the same reveal
text so the player learns the intended story either way. "Restart
challenge" replays the same case with a fresh timer and empty selection;
"Try another case" re-rolls the random case. Neither reloads the page.

## Known limitations for the demo

- Illustrations are flat SVG shapes (bathtub, dinner table, library), not
  photoreal art — deliberately simple so every clue silhouette stays legible
  and clickable on a projector or a phone.
- Only one difficulty tier (5 required clues, 30 seconds) — no easy/hard
  variants.
- The "Detective Instinct" score is a toy formula (time remaining + a small
  accuracy bonus); it's cosmetic flavor, not a calibrated metric.
- No persistence — refreshing the page starts a brand-new random case, by
  design (matches normal CAPTCHA behavior).
