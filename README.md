# SimToolReal Research Seminar

English HTML slides following the supplied white-and-teal academic template and the previous A2A presentation. Main talk: 33 slides, plus 6 backup slides. Suggested length: 35–40 minutes plus discussion.

## Open the presentation

- [Slides](slides.html): animations and local videos. Open in Chrome or Edge.
- [PDF](SimToolReal_slides.pdf): all builds visible, with video stills.
- [Presenter page](index.html): English speaker notes and navigation.
- [Speaker notes](speaker_notes.md).
- [Detailed paper reading and narrative assessment (Chinese)](paper/narrative_assessment_zh.md).
- [Published per-rollout data transcribed from Table II](paper/real_world_results.csv).

No web connection is required to present the HTML deck. Keep `slides.html`, `assets/` and `index.html` together. The ZIP preserves this structure. If local-file media is restricted by your browser, serve this directory using any local static-file server.

## Controls

Right / Space advances a build or a slide. Left reverses a build. `A` reveals the current slide. `F` enters fullscreen. `V` plays or pauses the slide's video. Videos never autoplay and pause when leaving their slide. Native controls remain available. Click a paper figure to enlarge; Escape closes it. The bottom toolbar appears on hover.

Videos are silent excerpts at original speed, at most 30 seconds each. Original source links are on each video slide and in `assets/videos/README.md`. PDF cannot play videos.

## Content boundaries

All paper results refer to arXiv v2 (24 February 2026). Real-robot and simulation evidence are labeled separately. Task Progress is not functional task success. The three proposed extensions are explicitly labeled as presenter hypotheses. The detailed assessment explains the role of human demonstration, semi-automated perception and the intended meaning of zero-shot transfer.

## Edit and rebuild

Source files are in `src/`. `src/build.mjs` holds the slide content and speaker notes. `src/visuals.mjs` contains editable SVG scientific schematics and the Table II data. `src/style.css` and `src/navigation.js` define appearance and interaction.

```bash
npm install
npm run build
```

Rebuilding HTML does not update the PDF automatically. Export with browser print at the supplied CSS page size (1280 × 720), background graphics enabled, margins disabled. The included PDF was exported with headless Chrome.

## Sources

[Paper](https://arxiv.org/abs/2602.16863v2) · [RSS proceedings](https://www.roboticsproceedings.org/rss22/p151.html) · [Project](https://simtoolreal.github.io/) · [Code](https://github.com/tylerlum/simtoolreal)

This is an independent academic presentation, not an official author deck. See [third-party notices](THIRD_PARTY_NOTICES.md).
