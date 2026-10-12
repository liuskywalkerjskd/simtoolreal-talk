# Video sources

Official SimToolReal project: https://simtoolreal.github.io/

The local MP4 files are silent, 1280px-wide presentation copies. Time is unchanged (1x). Clips longer than 30 seconds are trimmed to their first 30 seconds. These illustrative project videos are not new experimental evidence. Copyright remains with the original authors.

The deck displays looping GIF conversions for `cover_montage`, `training`, `inference`, `brush`, `hammer`, `marker`, `eraser`, `spatula`, `screwdriver` and `recovery`. Each GIF is 720 pixels wide at 18 fps, loops indefinitely and uses a clip-specific 256-color palette with Lanczos scaling and Sierra dithering. This resolution exceeds the largest on-slide display size while avoiding the extreme size of full-resolution 30–60 fps GIFs. Regenerate them with `npm run media:gif`.

- difficulty.mp4: https://simtoolreal.github.io/static/videos/ToolManipHard.mp4
- training.mp4: https://simtoolreal.github.io/static/videos/training.mp4
- inference.mp4: https://simtoolreal.github.io/static/videos/inference.mp4
- brush.mp4: https://simtoolreal.github.io/static/videos/Brush_1080p_compressed.mp4
- recovery.mp4: https://simtoolreal.github.io/static/videos/failureRecovery.m4v
- hammer.mp4: https://simtoolreal.github.io/static/videos/Hammer_1080p_compressed.mp4
- marker.mp4: https://simtoolreal.github.io/static/videos/Marker_1080p_compressed.mp4
- eraser.mp4: https://simtoolreal.github.io/static/videos/Eraser_1080p_compressed.mp4
- spatula.mp4: https://simtoolreal.github.io/static/videos/Spatula_1080p_compressed.mp4
- screwdriver.mp4: https://simtoolreal.github.io/static/videos/Screwdriver_1080p_compressed.mp4

`cover_montage.mp4` is a silent 10-second presentation montage assembled from 2.5-second, original-speed excerpts of the official brush, hammer, marker and spatula files above. It introduces no new footage or experimental evidence. `cover_montage.jpg` combines one real-robot frame from each of those four category videos for PDF export.

The six category clips are author-created montages that retain their original titles and task labels. They are qualitative examples, not random evaluation samples. The screwdriver category demonstrates free-space spinning. Nine looping experiment GIFs plus the cover montage appear in the deck; `difficulty.mp4` remains an optional asset. Each category clip is shorter than 15 seconds and is included in full, without time compression.

## Related work — slide 23

- `poise.mp4` / `poise.gif` / `poise.jpg`: POISE, *Learning In-Hand Object Reaching to General 6D Poses*, Lin et al., September 2026. Paper: https://arxiv.org/abs/2609.13761 ; project: https://junxiaolin.github.io/poise-website/ . Official source: https://junxiaolin.github.io/poise-website/assets/videos/hammer-user-spe.mp4?v=e11e5c97812f . The excerpt is 00:00–00:18 of “Reaching User-Specified Targets: Hammer, Main view,” a real-robot demonstration. The wrist is fixed while the fingers change the object's palm-relative pose.
- `hoi_retarget.mp4` / `hoi_retarget.gif` / `hoi_retarget.jpg`: *HOI-Retarget: Contact-Centric Retargeting for Human-Object Interaction*, Shin et al., ETH Zürich, September 2026. Paper: https://arxiv.org/abs/2609.34674 ; project: https://shinben0327.github.io/hoi-retarget/ . Official source: https://shinben0327.github.io/hoi-retarget/static/videos/teaser_montage.mp4 . The full 15-second project teaser shows human motions and their G1/H2 retargets. These are kinematic retargeting visualizations, not real-robot execution or a new physical evaluation.

Both presentation MP4s are silent, scaled to 1280 pixels wide and retain source timing. GIFs use 720-pixel width, 18 fps, a per-clip palette and infinite looping. No temporal acceleration or spatial crop is applied. PDF poster frames are sampled at 00:02 in each presentation clip. Sources accessed 11 October 2026; rights remain with the original authors. These qualitative demonstrations illustrate related ideas, not a controlled comparison with SimToolReal.
