# Caviar & Corndogs — coming soon

One screen: the teaser film full-bleed, the mark, and the words "Coming soon."
Nothing else. No build step, no dependencies, no form.

```
caviar-and-corndogs/
├── index.html          the whole site (styles, script, logo and poster embedded)
├── hero.mp4            the teaser — silent, seamless 19s loop
├── logo.png            the mark on its own, transparent background
├── README.md
├── .nojekyll           GitHub Pages: skip Jekyll
├── .gitattributes
└── compress-video.sh   if you ever re-cut the film
```

It works the moment you unzip it — open `index.html` in a browser. There is
nothing left to configure.

---

## Put it on GitHub

```bash
cd caviar-and-corndogs
git init
git add .
git commit -m "Coming soon"
git branch -M main
git remote add origin git@github.com:tusharg26/caviar-and-corndogs.git
git push -u origin main
```

**Settings → Pages → Deploy from a branch → `main` / `(root)`.**

Live at `https://tusharg26.github.io/caviar-and-corndogs/` in about a minute.
For a custom domain, add it under Settings → Pages and add a file named
`CNAME` containing just the domain.

---

## The film

Already processed — nothing to change:

| | |
|---|---|
| Audio | **removed entirely.** There is no audio track in the file. |
| Loop | **seamless.** The last second dissolves into the first, so it cycles with no visible cut. |
| Length | 19s (from the 20s original — the overlap is the dissolve) |
| Size | 4.8 MB, down from 22.4 MB |
| Encoding | H.264, 1600×900, `+faststart` so it plays before it finishes downloading |
| Poster | the film's own first frame, embedded in `index.html` — no blank rectangle while it loads, no jump when it starts |

If a browser blocks autoplay or can't load the file, the poster frame stays and
the page still reads correctly. It degrades, it doesn't break.

To swap in a different cut: `./compress-video.sh your-new-cut.mov` applies the
same settings and writes `hero.mp4`.

---

## The mark

`logo.png` — transparent, trimmed tight to the artwork: tin, type, corndog.
1064 × 347.

> **Resolution ceiling.** This was cut from a screenshot of the Brookwood Place
> PDF, so ~1064px wide is all there is. It's sharp enough for web use up to
> about 500px displayed, which covers this site. **It is not enough for print
> or large format** — get the original artwork for anything beyond the screen.

On the page the mark carries a `drop-shadow` filter rather than a solid plate
behind it. Because drop-shadow follows the alpha channel, the ivory halo hugs
the letterforms and the tin instead of sitting in a visible box.

---

## Editing the page

All plain text in `index.html`.

**Copy:** the mark, and `Coming soon`. That's the entire page. Swap that line
for a real date when you have one.

> The Vision deck cover reads "August 2026," which looks like the date the deck
> was written rather than an opening date — so the page claims no date.

**Colours** — the `:root` block at the top:

| Token | Hex | |
|---|---|---|
| `--ivory` | `#F6F1E7` | the ground, and the wash over the film |
| `--ink` | `#1E2A3A` | "Coming soon" |
| `--brass` | `#96793F` | focus rings |

**Type** — Palatino where the visitor already has it, EB Garamond from Google
Fonts otherwise. One family, no sans.

**The wash** — the `.wash` rule is the ivory bloom that keeps the mark legible
over moving footage. It is deliberately small and soft so the film stays
visible to the edges. If you swap in darker footage, raise those alpha values
or the mark will start to disappear.

**Signup form** — removed. If you want it back, the Google Sheet setup (an Apps
Script that appends each address to a spreadsheet you own) can be restored; ask
and it takes a minute.
