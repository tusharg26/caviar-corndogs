#!/usr/bin/env bash
# Compress a video down to a web-sized, looping, silent hero.mp4.
#   usage:  ./compress-video.sh my-original-clip.mov
#
# Target is under 10 MB. If the result is still too big, raise CRF (34, 36).
# If it looks soft, lower it (28, 26).

set -euo pipefail

SRC="${1:-}"
CRF="${CRF:-30}"
WIDTH="${WIDTH:-1280}"
OUT="hero.mp4"

if [ -z "$SRC" ]; then
  echo "usage: ./compress-video.sh <input-video>" >&2
  exit 1
fi

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found. On a Mac:  brew install ffmpeg" >&2
  echo "Or use the app at https://handbrake.fr (tick 'Web Optimized')." >&2
  exit 1
fi

echo "Compressing $SRC  (crf=$CRF, width=$WIDTH) ..."
ffmpeg -hide_banner -loglevel warning -stats -y \
  -i "$SRC" \
  -vcodec libx264 -crf "$CRF" -preset slow \
  -an -movflags +faststart \
  -vf "scale=${WIDTH}:-2" \
  "$OUT"

SIZE=$(du -h "$OUT" | cut -f1)
echo
echo "Done: $OUT  ($SIZE)"
echo "Under 10 MB? Commit it. Over 40 MB? Re-run with:  CRF=34 ./compress-video.sh $SRC"
