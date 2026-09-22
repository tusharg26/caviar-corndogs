# Caviar & Corndogs — coming soon

A one-screen holding site: the teaser film full-bleed, the mark, and an email
signup. Nothing else. No build step, no dependencies.

```
caviar-and-corndogs/
├── index.html              the whole site (styles, script, poster frame)
├── hero.mp4                the teaser — silent, seamless 19s loop
├── google-apps-script.gs   paste into your Sheet to collect signups
├── README.md
├── .nojekyll               GitHub Pages: skip Jekyll
├── .gitattributes
└── compress-video.sh       if you ever re-cut the film
```

The site works the moment you unzip it. Open `index.html` in a browser.
**The one thing left to do is step 3** — connect the signup form.

---

## 1. Put it on GitHub

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
For a custom domain, add it under Settings → Pages, and add a file named
`CNAME` containing just the domain.

---

## 2. About the film

Already done — nothing to change:

| | |
|---|---|
| Audio | **removed entirely.** There is no audio track in the file at all. |
| Loop | **seamless.** The last second dissolves into the first, so it cycles with no visible cut. |
| Length | 19s (from your 20s original — the overlap is the dissolve) |
| Size | 4.8 MB, down from 22.4 MB |
| Encoding | H.264, 1600×900, `+faststart` so it plays before it finishes downloading |
| Poster | the film's own first frame, embedded in `index.html` — so there is never a blank rectangle while it loads, and no jump when it starts |

If a browser blocks autoplay or can't load the file, the poster frame stays up
and the page still reads correctly. It degrades, it doesn't break.

To swap in a different cut later, run `./compress-video.sh your-new-cut.mov` —
it strips audio and encodes with the same settings.

---

## 3. Connect the signup form ← **do this**

Signups land in a Google Sheet you own. No account limits, no monthly cap,
nothing expires.

1. **Make a Sheet.** New blank spreadsheet at sheets.google.com. Name it
   whatever you like — the script creates a `Signups` tab inside it.

2. **Add the script.** In that Sheet: **Extensions → Apps Script**. Delete the
   placeholder code, paste in the whole of `google-apps-script.gs`, save.

   *Optional:* set `NOTIFY_EMAIL` at the top to your address and you'll get an
   email each time someone signs up.

3. **Deploy it.** **Deploy → New deployment → ⚙ → Web app**, then:

   - Description: anything
   - Execute as: **Me**
   - Who has access: **Anyone** ← must be "Anyone", *not* "Anyone with a Google account"

   Click Deploy. Google will ask you to authorise it — it'll warn that the app
   isn't verified, which is normal for your own scripts. Choose **Advanced →
   Go to (project name)** and allow.

4. **Copy the Web app URL.** It ends in `/exec`. Paste it into `index.html`:

   ```js
   const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfy.../exec";
   ```

5. **Test it.** Open the page, enter an address, submit. A row should appear in
   the Sheet within a second or two.

**Where you see the signups:** in that Sheet — timestamp, email, source — one
row each. It's yours; export it, sort it, feed it into a mailing tool later.
Duplicate addresses are ignored, so nobody clutters it by submitting twice.

> If you re-edit the Apps Script later, you must **Deploy → Manage deployments
> → edit → New version** for changes to take effect. Saving alone does nothing
> to the live endpoint. This trips up everyone once.

Until you set `FORM_ENDPOINT`, the form says it isn't connected rather than
quietly swallowing addresses.

---

## Editing the page

All of it is plain text in `index.html`.

**Copy on the page:** `CAVIAR / and / CORNDOGS`, `Opening soon`, `Join the list`,
and the button, `Sign up`. That's everything.

> The Vision deck cover reads "August 2026," which looks like the date the deck
> was written rather than an opening date — so the page claims no date. Swap
> "Opening soon" for a real one when you have it.

**Colours** — the `:root` block at the top:

| Token | Hex | |
|---|---|---|
| `--ivory` | `#F6F1E7` | the ground, and the wash over the film |
| `--ink` | `#1E2A3A` | all type and the button |
| `--brass` | `#96793F` | the crown, focus rings |

**Type** — Palatino where the visitor already has it, EB Garamond from Google
Fonts otherwise. One family, no sans anywhere.

**The wash** — the `.wash` rule is what keeps the navy type readable over
moving footage. It's an ivory bloom, denser at the centre, thinning toward the
edges so the film still breathes. If you change the film for something darker,
raise those alpha values or the type will start to disappear.
