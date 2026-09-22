# Changelog

## [3.4.1] - 2026-09-22

### Features

- Rebuild the demonstration-bottleneck slide around three presenter-provided images: a hardware-heavy teleoperation setup and a human-versus-robot hammer-grasp comparison.
- Simplify the reward page while preserving the construction of smoothness, grasp and goal-reaching terms.
- Remove repeated source footers, GIF playback metadata and auxiliary fine print from the visible slides.
- Remove the previous A2A seminar deck from the final design-reference text.

### Design Rationale

- Use concrete visual evidence to explain why dexterous action demonstrations and direct human-to-robot retargeting are difficult.
- Keep evidence boundaries and detailed equations in the speaker notes so the projected slides remain legible.

### Notes & Caveats

- The three new images are presenter-provided examples, not controlled experimental comparisons from the SimToolReal paper.
- Full citations and methodological caveats remain available in the English and Chinese speaker notes and the reference backup slide.

## [3.4.0] - 2026-09-20

### Features

- Merge the Discussion and Takeaway pages into one closing slide.
- Make structured simulation the primary conclusion and retain task interfaces and lightweight VLMs as two secondary research directions.
- Update the English and Chinese notes for the new 23-slide main talk.

### Design Rationale

- Remove the repetition between the first Discussion point and the separate Takeaway.
- Give the closing argument a clear hierarchy instead of presenting four apparent conclusions across two pages.

### Notes & Caveats

- The closing page continues to label all three ideas as presenter hypotheses.
- The main claim remains complementary to end-to-end action models rather than a demonstrated replacement.

## [3.3.1] - 2026-09-20

### Features

- Replace the three-item Takeaway recap with one broad presenter reflection.
- Reframe the conclusion around structured simulation as a complementary route to reusable robot skills.
- Update the Chinese presentation script to close on the same single idea.

### Design Rationale

- Let the preceding methodology and discussion pages carry the technical detail.
- End with a memorable research judgment instead of repeating the pipeline in abbreviated form.

### Notes & Caveats

- The final slide labels the claim as a presenter reflection.
- Autonomous task discovery and goal generation remain open problems rather than demonstrated paper results.

## [3.3.0] - 2026-09-20

### Features

- Convert the cover montage and all nine experiment clips used by the deck into automatically looping GIFs.
- Remove manual play buttons, native video controls and the V-key playback shortcut.
- Add a reproducible FFmpeg conversion script and retain static poster frames for PDF export.

### Design Rationale

- Keep experiment motion visible during the talk without requiring the presenter to start or switch media manually.
- Encode at the largest useful on-slide resolution rather than preserving unused source pixels.

### Notes & Caveats

- GIF supports only 256 colors. Per-clip palettes, Lanczos scaling and Sierra dithering reduce visible banding, but GIF cannot reproduce the source MP4 color depth exactly.
- The ten GIF files total about 126 MB. The original MP4 files remain available for provenance and regeneration.

## [3.2.2] - 2026-09-20

### Features

- Remove the standalone object-centric policy-input slide.
- Fold the essential input definition into the LSTM speaker notes.
- Realign the English and Chinese scripts to the new 25-slide deck.

### Design Rationale

- Avoid repeating information already established by the simulation pipeline and needed only briefly to interpret the LSTM input.

### Notes & Caveats

- The actor input details remain documented in the speaker notes, including the distinction between deployable features and privileged simulator state.

## [3.2.1] - 2026-09-20

### Features

- Move the RL ablation page directly after the SAPG explainer.
- Reframe the page as a controlled SAPG-versus-PPO comparison with two reveal steps.
- Keep only the references page in the backup section and realign both speaker-note files.

### Design Rationale

- Pair the algorithm mechanism with its experimental evidence before returning to the policy architecture.
- Separate the matched asymmetric-critic comparison from the additional symmetric-critic ablation.

### Notes & Caveats

- The comparison reports simulation training reward over 9B environment steps, not real-world functional success.
- The ablation supports the combined SAPG and asymmetric-critic recipe; it does not attribute every gain to SAPG alone.

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
