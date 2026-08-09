# Dev.to · Long-Form Article Template

> **Target publish date:** Day 5–7 (after HN/V2EX data comes in)
> **Length:** ~1,800–2,500 words
> **Goal:** Long-tail SEO for "static site", "i18n", "leaflet", "github pages", "open source 公益"
> **Tags:** `github`, `opensource`, `webdev`, `javascript`, `i18n`, `socialgood`

---

## Title options

### A (Recommended — story-led)
```
How I built a global free food distribution map in 2026 — with zero backend
```

### B (Tech-led)
```
240 i18n keys, 60 food points, zero backend: the static site that ships in 90 seconds
```

### C (Data-led)
```
A static map of 60+ free food distribution points across 31 countries
```

---

## Cover image

Use the hero screenshot (1280×720 with the slogan "AI 时代, 重新设计分配").
Save as `cover.png` and upload in Dev.to's "Cover image" field.

---

## Markdown body

```markdown
# How I built a global free food distribution map in 2026 — with zero backend

![cover](cover.png)

> A static site. 60+ real food distribution points. 31 countries. Bilingual.
> Inspired by a 90s kid in LA giving free scallion pancakes to the homeless.

## Why I built this

April 2026. A young man from Henan, China — who doesn't speak English —
flies alone to Los Angeles. He goes by "Xiao Tang". In 2024 he set up
a stall selling Chinese scallion pancakes for $60 each. Foreigners lined
up, called them "Chinese pizza". $20K/month in revenue.

Then he was reported for operating without a license, betrayed by his
apprentice, and taken away by police. $130K in bail. Most people would
have gone home.

He didn't. He moved his stall into the slums and started giving pancakes
away for free. In April 2026, he actually announced his run for LA
Mayor in 2029. A month later he was invited to speak at San Gabriel's
city hall. His Douyin account @xiaotang688 gained hundreds of
thousands of followers in six months.

I watched this unfold on B 站 and Douyin and felt the same thing
millions of others felt: a kind of electric clarity. **In 2026, AI
can write poetry and drive cars. Yet 730M+ people still go hungry
and 1.3B tons of food are wasted every year.** Technology's greatest
good might be redesigning how we share.

So I built a map.

## What the site does

[Live demo → freefoodmap.github.io](https://freefoodmap.github.io)

The site is a single static page that does five things:

1. **Map** — 60+ real food distribution points across 31 countries
   (Feeding America, Trussell Trust, European Food Banks Federation,
   Oasis Food Bank, KFC food cabinets, Robin Hood Army, etc.),
   with Leaflet + OpenStreetMap dark tiles. Click a pin for hours,
   phone, website.

2. **Filter** — 8 types: food bank, food pantry, soup kitchen, street
   distribution, smart cabinet, school meal, drive-through, other.

3. **Video gallery** — 3 real B 站 videos of Xiao Tang (2.57M+ views
   on the top one) + 3 platform search shortcuts (YouTube, B 站,
   Douyin) for "free food bank" / "食物银行" / "免费发放".

4. **How-to-start guide** — 6 steps from "find your why" to "do it 3
   times, then think about scale", plus 4 tips on what to do when
   you get reported, how to not burn out, where to get money, and
   whether to register an NGO.

5. **Ambassadors** — 6 roles (engineer, local contact, translator,
   story collector, outreach, designer) with 1 filled founder card
   and 5 dashed "your slot" placeholders.

## The stack (and why I avoided complexity)

I'm going to be honest: this site doesn't need a backend. I considered
one. Cloudflare Workers + KV would have been 30 minutes of work for
form submissions. But I deliberately chose not to, for three reasons:

**Reason 1: The data changes faster than any backend can update.**
Food bank hours change weekly. By making the data a JS file in a
GitHub repo, anyone in any country can submit a PR and have it live
in 90 seconds. We trade real-time updates for participation.

**Reason 2: Most of the "build" is editorial, not technical.**
The hardest part was finding the right 60 points, not rendering them.
A static file forces me to be the curator; a backend would have
absolved me of that responsibility.

**Reason 3: Public-good projects should outlive any platform.**
A backend on Heroku dies when Heroku changes its free tier. A GitHub
Pages site under a GitHub org is, for practical purposes, forever.

### The actual files (12 total)

```
freefood/
├── index.html          ← 9 sections, all data-i18n attributed
├── app.js              ← init flow, map, filters, form, i18n apply
├── data.js             ← 60 points + TYPE_LABELS { zh, en } + TYPE_COLORS
├── i18n.js             ← 240 keys × 2 languages
├── style.css           ← custom CSS (chips, cards, map markers, reveal)
├── tailwind.css        ← pre-built locally, ~22KB, no CDN
├── tailwind.config.js  ← theme: crust/ember/ink/cream
├── tailwind.src.css    ← Tailwind entry
├── package.json        ← build:css script
├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
└── LICENSE             ← MIT
```

That's it. No `node_modules` in production, no build server, no
database. Total weight: ~50KB for the HTML+CSS+JS.

## Three things I learned (and might do differently next time)

### Lesson 1: Pre-build Tailwind, don't CDN

My first deploy tried `<link href="https://unpkg.com/tailwindcss">`.
The page worked in San Francisco and broke in Sichuan. CDNs are not
your friend when your audience is global and your server is in the
US.

Solution: `tailwindcss -i tailwind.src.css -o tailwind.css --minify`
once at build time. Adds 22KB. Removes a single point of failure.

### Lesson 2: i18n doesn't need a library

I almost pulled in `i18next`. For two languages and 240 keys, that's
overkill. The final implementation is ~150 lines:

```js
window.I18N = {
  zh: { /* 240 keys */ },
  en: { /* 240 keys */ }
};

function applyI18n() {
  const lang = new URLSearchParams(location.search).get('lang')
            || localStorage.getItem('freefood-lang')
            || 'zh';
  document.documentElement.lang = I18N[lang].htmlLang;
  document.title = I18N[lang].title;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.innerHTML = I18N[lang][el.dataset.i18n] || el.innerHTML;
  });
  localStorage.setItem('freefood-lang', lang);
}
```

That's the whole i18n engine. Priority: URL > localStorage > default.

### Lesson 3: The reveal animation is more important than you think

When I first shipped, the page had a `prefers-reduced-motion: no-preference`
reveal animation that hid everything until JS added the `.visible` class.
On slow connections or with JS disabled, the entire page rendered
blank. **For a site about hunger, a blank page is a bad look.**

I added two fixes:

```css
/* Only hide when JS is available */
html.js .reveal { opacity: 0; transform: translateY(20px); }
html.js .reveal.visible { opacity: 1 !important; }

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Now the page renders fully without JS, and graceful-degrades for
people who get motion-sick.

## The #ambassadors section

This is the part I'm most proud of, because it was the part I was
most afraid of.

Building a site is easy. Asking strangers to help you is hard.

The way I solved it: I drew 6 role cards (engineer, local contact,
translator, story collector, outreach, designer). I filled one card
with my own name. I left 5 cards dashed-outlined with `← 你的位置`
/ `← YOUR SLOT` in the corner. The message: "we're starting at
1, you could be 2".

The "How to join" section is 3 steps:
1. Open an issue or PR on GitHub, or email open@freefoodmap.org.
   Tell us: skills, time, city, contact.
2. We reply within a week, add you to the contributors list.
3. Co-build the next version. The roadmap is on GitHub Issues.

It sounds simple. It is. But the hard part was committing to the
invitation in the first place.

## What's missing (intentionally)

- **More points.** 60 is a beginning. I want 100 by month 1,
  300 by month 3. The data file is here:
  [data.js](https://github.com/freefoodmap/freefoodmap.github.io/blob/main/data.js).
  Open a PR.
- **More languages.** zh + en now. Need ES, PT, FR, AR, HI, SW.
  The i18n file is here:
  [i18n.js](https://github.com/freefoodmap/freefoodmap.github.io/blob/main/i18n.js).
  Copy a 240-line file, translate the values, send a PR.
- **More local contact verification.** Every entry in data.js
  should have a real human in that city who's looked at the
  organization's website in the last 90 days.
- **A real form backend.** When we have 100 PRs/week, I'll add
  Cloudflare Workers + KV. Until then, form submissions go to
  localStorage as a temporary measure.

## What I'd love from you

If you read this far, you're probably one of three people:

1. **You can code.** Open an issue or PR. The codebase is small,
   the README is detailed, the contribution guide is two pages.

2. **You can speak another language.** Fork the i18n file. Translate.
   Send a PR. Your name will appear in the README and on the site.

3. **You can verify food banks in your city.** Open the data file.
   Find 3-5 entries near you. Check their websites. If anything's
   wrong, fix it in the PR. If your city isn't there, add it.

The site is at [freefoodmap.github.io](https://freefoodmap.github.io).
The repo is at
[github.com/freefoodmap/freefoodmap.github.io](https://github.com/freefoodmap/freefoodmap.github.io).
The email is open@freefoodmap.org.

— Andy Zhuang
Brooklyn, NY · 2026
```

---

## Publishing checklist

- [ ] Upload cover image first (1280×720, < 1MB)
- [ ] Add tags: `github`, `opensource`, `webdev`, `javascript`, `i18n`
- [ ] Set canonical URL to the site (not the GitHub repo)
- [ ] Schedule for a Tuesday or Wednesday morning (US time)
- [ ] After publish, share to Twitter with a 1-tweet summary
- [ ] Pin to your Dev.to profile for 7 days
- [ ] Add to "Open Source" tag followers

---

## SEO hooks (one-liners that show up in search)

The body should mention these phrases at least once (Dev.to auto-indexes):

- "static site i18n"
- "github pages deploy"
- "leaflet openstreetmap"
- "open source food distribution"
- "global volunteer network"
- "free food map 2026"
- "AI era redesign distribution"

These show up in Google results within 2 weeks if the article gets
5+ reactions.
