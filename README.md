# SimToolReal Research Seminar

English HTML slides following the supplied white-and-teal academic template and the previous A2A presentation. Main talk: 24 slides, plus 1 reference backup slide. Suggested length: 32–37 minutes including videos, plus discussion.

The methodology-focused narrative starts with an open brainstorm, then examines demonstration bottlenecks. It restores the animated 6D pose sequence and explains simulation training before real deployment. The LSTM discussion covers observations, recurrent memory and arm/hand action processing. A looping simulation GIF leads into the gap between simulator ground truth and real state estimation. Six tool categories provide qualitative evidence, followed by one numerical overview and a combined discussion of three research directions.

## Open the presentation

- [Slides](slides.html): animations and local looping GIFs. Open in Chrome or Edge.
- [PDF](SimToolReal_slides.pdf): all builds visible, with static poster frames for GIFs.
- [Presenter page](index.html): English speaker notes and navigation.
- [Speaker notes](speaker_notes.md).
- [Chinese slide-matched presentation script](speaker_notes_zh.md).
- [Detailed paper reading and narrative assessment (Chinese)](paper/narrative_assessment_zh.md).
- [Published per-rollout data transcribed from Table II](paper/real_world_results.csv).
- Editable diagrams: [simulation pipeline](assets/simulation_pipeline.svg), [SAPG split–aggregate](assets/sapg.svg), [LSTM memory](assets/lstm_memory.svg), [real deployment](assets/deployment_pipeline.svg).
- [Combined system overview from the previous revision](assets/system_architecture.svg), retained as a reference asset.

No web connection is required to present the HTML deck. Keep `slides.html`, `assets/` and `index.html` together. The ZIP preserves this structure. If local-file media is restricted by your browser, serve this directory using any local static-file server.

## Controls

Right / Space advances a build or a slide. Left reverses a build. `A` reveals the current slide. `F` enters fullscreen. All experiment GIFs play and loop automatically, so no media controls are required. Click a paper figure to enlarge; Escape closes it. The bottom toolbar appears on hover.

The cover automatically loops a silent 10-second GIF assembled from the official brush, hammer, marker and spatula experiments. The main talk uses nine silent looping GIFs at original speed: simulation, inference, brush, hammer, marker, eraser, spatula, screwdriver and recovery. Each GIF is 720 pixels wide at 18 fps and uses a per-clip optimized 256-color palette. The original MP4 presentation copies remain alongside the GIFs for provenance and regeneration. The earlier difficulty clip remains an optional MP4 asset. Original source links and the cover transformation are documented in `assets/videos/README.md`. The category montages illustrate behavior and are not random evaluation samples. PDF uses static poster frames.

## Talk map

- 1–3: cover, open brainstorm and demonstration bottlenecks.
- 4–5: pose-reaching abstraction and animated position/orientation sequence.
- 6–13: simulation-only pipeline, two-step SAPG explanation, controlled SAPG–PPO comparison, procedural tools, reward construction, LSTM policy, action processing and simulation video.
- 14–17: ground-truth-to-estimation transition, real pipeline, event-driven goals and inference video.
- 18–22: six-category video gallery, one quantitative overview, recovery and scope.
- 23–24: three research directions followed by one broad presenter reflection.
- 25: references and source material. The pose metric remains integrated into the reward-construction page.

## Content boundaries

All paper results refer to arXiv v2 (24 February 2026). Real-robot and simulation evidence are labeled separately. Task Progress is not functional task success. The three proposed extensions are explicitly labeled as presenter hypotheses. The detailed assessment explains the role of human demonstration, semi-automated perception and the intended meaning of zero-shot transfer.

## Edit and rebuild

Source files are in `src/`. `src/build.mjs` holds the slide content and English notes; `src/speaker-notes-zh.mjs` holds the page-aligned Chinese script. `src/visuals.mjs` contains editable SVG scientific schematics and the Table II data. `src/style.css` and `src/navigation.js` define appearance and interaction.

```bash
npm install
npm run build
npm run media:gif
```

`npm run media:gif` requires `ffmpeg` and regenerates the ten GIFs used by the deck. Rebuilding HTML does not update the PDF automatically. Export with browser print at the supplied CSS page size (1280 × 720), background graphics enabled, margins disabled. The included PDF was exported with headless Chrome.

## Sources

[Paper](https://arxiv.org/abs/2602.16863v2) · [RSS proceedings](https://www.roboticsproceedings.org/rss22/p151.html) · [Project](https://simtoolreal.github.io/) · [Code](https://github.com/tylerlum/simtoolreal)

This is an independent academic presentation, not an official author deck. See [third-party notices](THIRD_PARTY_NOTICES.md).
