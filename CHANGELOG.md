# Changelog

## [3.2.0] - 2026-09-20

### Features

- Add a main-talk SAPG explainer immediately after the simulation training pipeline.
- Use two reveals to separate environment and policy splitting from importance-weighted experience aggregation.
- Add an editable SAPG diagram and matching English and Chinese speaker notes.

### Design Rationale

- Explain the optimizer when it first appears instead of leaving SAPG as an unexplained acronym.
- Keep the visual focused on the leader–follower data flow rather than reproducing the full algorithm pseudocode.

### Notes & Caveats

- The diagram is schematic: π₁ through πM denotes a general policy population, not the literal number of boxes drawn.
- SAPG retains PPO-style actor–critic updates; the new slide focuses on exploration and data reuse.
- The deck now contains 24 main slides and 2 backup slides.

## [3.1.0] - 2026-09-20

### Features

- Reduce backup material from five pages to two, retaining only RL ablations and references.
- Expand the training-signal page with the exact smoothness, approach, lift and goal-reaching reward constructions.
- Integrate the four-keypoint pose distance into the reward explanation instead of isolating it in backup.
- Add a detailed, slide-matched Chinese presentation script for all 25 pages.

### Design Rationale

- Keep the methodology complete while removing secondary baseline and specialist comparisons from the live deck.
- Distinguish environment reward terms from the SAPG/PPO actor–critic optimization objective.
- Make the script follow every reveal, video cue and evidence boundary in the English slides.

### Notes & Caveats

- The deleted baseline and specialist slides remain covered by the paper assessment and source data; they are not part of the presentation.
- The reward page explains the paper's shaping terms, not a decomposition of the neural-network loss.
- Backup pages are now slides 24–25.

## [3.0.0] - 2026-09-20

### Features

- Rebalance to 23 main slides and 5 backup pages, emphasizing methodology over numerical evaluation.
- Begin with an open tool-learning brainstorm and restore the animated tool pose sequence.
- Separate simulation training from real-world perception, with a simulation video before the ground-truth-to-estimation transition.
- Expand the LSTM policy into observation features, recurrent memory and arm/hand action processing.
- Add separate editable simulation and deployment diagrams.
- Add five category clips to cover all six tool families, with independent paired-video controls.
- Combine the three research inspirations on one discussion page and move most quantitative comparisons to backup.

### Design Rationale

- The previous compression removed too much method detail. Allocate space by explanatory importance, not minimum page count.
- Explain what the controller learns before introducing how deployment obtains its inputs.
- Let videos illustrate contact behavior while keeping the benchmark metric and its limits explicit.

### Notes & Caveats

- The recurrent diagram explains standard LSTM state flow. It does not claim novel gates or measured physical parameter estimates.
- Simulator ground truth exists, but the actor trains on noisy, delayed observations while the critic receives privileged state.
- Tool videos are selected author demonstrations at original speed. Screwdriver trials show free-space spinning, not fastening.
- Only one main page summarizes numerical performance. Additional comparisons remain available in backup and the full CSV.

## [2.0.0] - 2026-09-20

### Features

- Shorten the presentation from 39 to 21 slides, with 17 main pages and 4 backup pages.
- Reorder the opening around manipulation difficulties, an IL brainstorm, and a standalone core idea.
- Add a simplified, editable system architecture and an actor input/output diagram with staged reveals.
- Consolidate evaluation and discussion while retaining two offline videos, source data and technical backup.
- Refresh the PDF, English notes and Chinese document's slide map.

### Design Rationale

- Keep the main seminar within roughly 20–25 minutes and remove repeated explanations.
- Separate simulation training, task setup and closed-loop execution without reproducing the dense paper architecture.
- Distinguish action-data and embodiment bottlenecks from an unsupported claim that imitation learning cannot work.

### Notes & Caveats

- Task Progress measures pose-trajectory completion, not functional success.
- Untested extensions remain presenter hypotheses. Zero-shot policy transfer still requires demonstration and perception setup.
- HTML supports animations and video. The PDF contains complete builds and still images.
- All five original media excerpts remain available, although only two appear in the concise deck.

## [1.0.0] - 2026-09-19

### Features

- 39 English seminar slides: 33 main slides and 6 backup pages.
- Five offline video excerpts, stepwise reveals, figure lightbox and printable PDF.
- English presenter notes, Chinese narrative assessment and transcribed result data.
- Editable scientific diagrams and exact-source quantitative comparisons.

### Design Rationale

- Preserve the prior A2A deck's white-and-teal visual language while using more large visual explanations.
- Begin with technical-route choices, then derive the object-centric interface before explaining implementation.
- Separate paper evidence from proposed extensions, and trajectory metrics from functional completion.

### Notes & Caveats

- Videos are silent, original-speed excerpts; PDF contains still frames only.
- No robot experiments were reproduced. Aggregates are calculated from published rounded data.
- The HTML source is editable; the PDF is a static export.
