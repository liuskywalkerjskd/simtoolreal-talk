#!/bin/sh
set -eu

cd "$(dirname "$0")/.."

for name in cover_montage training inference brush hammer marker eraser spatula screwdriver recovery; do
  ffmpeg -y -v error -i "assets/videos/${name}.mp4" \
    -filter_complex "fps=18,scale=720:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=256:stats_mode=diff[p];[s1][p]paletteuse=dither=sierra2_4a:diff_mode=rectangle" \
    -loop 0 "assets/videos/${name}.gif"
done
