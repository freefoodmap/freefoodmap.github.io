# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.4.0] - 2026-08-10 · The Network + Promotion Playbook

Two additions to convert viewers into participants.

### Added (The Network)
- **New `#ambassadors` section** between `#guide` and `#submit` — emerald-tinted dark theme for visual distinction
  - **6 role cards** (engineer / local contact / translator / story collector / outreach / designer) with skills tags
  - **Current network** list: 1 filled founder card (Andy Zhuang) + 5 empty dashed "your slot" placeholders with `← 你的位置` / `← YOUR SLOT` hint
  - **3-step "How to join"** flow: open issue/PR or email → we reply within a week → co-build next version
  - **CTAs**: GitHub issues (emerald button) + `mailto:open@freefoodmap.org`
  - Closing quote: *"The world is changed not by one person, but by the network of people who choose to show up."*
- **Nav link** `#ambassadors` (emerald hover, between "如何开始" and "提交新发放点")
- **44 new i18n keys** in both `zh` and `en` (240 total in dict, 238 used in HTML)
- **New CSS classes** in `style.css`: `.amb-card`, `.amb-person-filled`, `.amb-person-empty` (with `::after` slot hint), `.amb-step`, `.amb-step-num`

### Added (Promotion Playbook)
- **`promotion/` directory** — 13 files (~70KB total) for version-controlled promotion work
  - `promotion/README.md` — index
  - `promotion/00-STRATEGY.md` — 30-day rollout plan, 3 audience types, metrics dashboard
  - `promotion/CONTACTS-CHECKLIST.md` — 30 target contacts across 7 regions, with status machine
  - `promotion/POSTS-LOG.md` — publishing log + 30-day retrospective template
  - `promotion/templates/HackerNews.md` — Show HN post + 5 comment responses
  - `promotion/templates/V2EX.md` — 创造 node post + 5 responses
  - `promotion/templates/DevTo.md` — long-form 1,800–2,500 word article
  - `promotion/templates/Twitter.md` — 8-tweet thread + reply templates
  - `promotion/templates/WeChat.md` — 朋友圈 / 群 / 即刻 / 微博 / 小红书
  - `promotion/templates/Cold-Email-1-CSSA.md` — 校园学生组织
  - `promotion/templates/Cold-Email-2-NGO.md` — 食物银行 / NGO
  - `promotion/templates/Cold-Email-3-Church.md` — 教会 / 社区中心
  - `promotion/templates/Cold-Email-4-Tech.md` — 技术志愿者

### Changed
- **Tailwind CSS rebuilt** to include arbitrary value `from-[#0a1814]` and `to-[#0a1410]` for the section gradient
- `.gitignore` adds `_*.js`, `_*.py`, `_*.html`, `_*.sh` patterns to prevent test-script commits
- `README.md` updated to mention `#ambassadors` section

### Notes
- All 6 empty ambassador slots are intentionally untracked — they will be filled manually as volunteers sign up
- The `open@freefoodmap.org` mailbox routes to the org founders
- This is the **call to action** for the public launch: turn viewers into participants
- Promotion templates are MIT-licensed, so any future ambassador can copy, adapt, and improve them

## [1.3.0] - 2026-08-07 · GitHub Pages launch

The site now explicitly invites collaborators — engineers, local contacts, translators, story collectors, outreach folks, designers — to grow the network with the founder.

### Added
- **New `#ambassadors` section** between `#guide` and `#submit` — emerald-tinted dark theme for visual distinction
  - **6 role cards** (engineer / local contact / translator / story collector / outreach / designer) with skills tags
  - **Current network** list: 1 filled founder card (Andy Zhuang) + 5 empty dashed "your slot" placeholders with `← 你的位置` / `← YOUR SLOT` hint
  - **3-step "How to join"** flow: open issue/PR or email → we reply within a week → co-build next version
  - **CTAs**: GitHub issues (emerald button) + `mailto:open@freefoodmap.org`
  - Closing quote: *"The world is changed not by one person, but by the network of people who choose to show up."*
- **Nav link** `#ambassadors` (emerald hover, between "如何开始" and "提交新发放点")
- **44 new i18n keys** in both `zh` and `en` (240 total in dict, 238 used in HTML)
- **New CSS classes** in `style.css`: `.amb-card`, `.amb-person-filled`, `.amb-person-empty` (with `::after` slot hint), `.amb-step`, `.amb-step-num`

### Changed
- **Tailwind CSS rebuilt** to include arbitrary value `from-[#0a1814]` and `to-[#0a1410]` for the section gradient
- `.gitignore` adds `_*.js`, `_*.py`, `_*.html`, `_*.sh` patterns to prevent test-script commits

### Notes
- All 6 empty slots are intentionally untracked — they will be filled manually as volunteers sign up
- The `open@freefoodmap.org` mailbox routes to the org founders
- This is the **call to action** for the public launch: turn viewers into participants

## [1.3.0] - 2026-08-07 · GitHub Pages launch

The project is now publicly deployed and open-sourced.

### Added
- **GitHub Pages deployment** at [freefoodmap.github.io](https://freefoodmap.github.io)
- **GitHub organization**: [github.com/freefoodmap](https://github.com/freefoodmap)
- **Repository**: [github.com/freefoodmap/freefoodmap.github.io](https://github.com/freefoodmap/freefoodmap.github.io)
- **CONTRIBUTING.md** — community contribution guide (4 ways to contribute: data, copy, video, i18n)
- **.github/ISSUE_TEMPLATE/new_spot.md** — "Submit a new food point" issue template
- **LICENSE** (MIT) — permissive open-source license
- **package.json** — npm dependency manifest for Tailwind rebuilds
- **.gitignore** — excludes node_modules, screenshots, Chrome user-data dirs

### Changed
- Removed "Created by MiniMax Agent" platform watermark (mcode was used as staging only)
- Hero no longer references Xiao Tang personally; data cards and "inspiration" footnote replace it

## [1.2.0] - 2026-08-04 · Hero redesign

The homepage was re-architected to lead with the **idea** (AI era + distribution reform) instead of the **person** (Xiao Tang).

### Added
- **Slogan** (zh + en), placed in hero and footer:
  - 中: `AI 时代，请让全球温饱成为人文基础。`
  - 英: `In the age of AI, let food & shelter for all be a human foundation.`
- **4 global data cards** in hero right column: 7.3亿+ hungry / 13亿吨 wasted / 1 in 7 / 200+ food banks
- **Hero inspiration footnote** — Xiao Tang is acknowledged as the inspiration, not the centerpiece

### Changed
- **H1 rewritten** from "一张饼,一份善意,一张地图。" to "AI 时代，重新设计分配。" / "In the age of AI, redesign the sharing."
- **Hero subheading rewritten** to lead with global data contradiction (730M+ hungry vs 1.3B tons wasted)
- **Stats bar section simplified** — full-width 4-card grid replaced with header-only (cards now live in hero)
- **LIVE card removed** — Xiao Tang's personal quote, @xiaotang688, and avatar no longer dominate the hero

## [1.1.0] - 2026-08-04 · Bilingual

The site became fully bilingual (Chinese default, English toggle).

### Added
- **English translation** for the entire UI — 180 keys × 2 languages
- **i18n.js** — 25 KB translation dictionary (`window.I18N = { zh: {...}, en: {...} }`)
- **Language toggle button** in nav (desktop + mobile) — shows the *next* language
- **URL parameter** `?lang=en` or `?lang=zh` for deep-linking
- **localStorage persistence** under key `freefood-lang` — visitor's choice sticks across reloads
- **`TYPE_LABELS` bilingual** — 8 food point types (foodbank / pantry / soup_kitchen / etc.) in both languages
- **`heroInspiration` + `heroInspirationLink` keys** for the new inspiration footnote

### Fixed
- **Stats counter flash bug** — `playCount()` was resetting the final value to 0 before animating, causing English/headless users to see 0/0/0 momentarily. Final value is now set synchronously on load; the count-up animation only plays on hover.
- `prefers-reduced-motion: reduce` now skips the reveal animation entirely (better a11y)

## [1.0.0] - 2026-08-04 · Initial public release

The first version that could be shown to the public. Hosted on mcode.space.mcode.cn (subsequently replaced by GitHub Pages in 1.3.0).

### Added
- **Hero section** with bilingual title, subheading, and live "Xiao Tang" card
- **Stats bar** — 4 global data cards (730M+, 1.3B tons, 1/7, 200+)
- **Story section** — Xiao Tang's full timeline (2022 LA → 2024 stall → 2025 arrest → 2026 mayor run)
- **Interactive map** — Leaflet.js + OpenStreetMap dark tiles, 8 type filters
- **46 real food distribution points** across 31 countries
- **6-step how-to-start guide** — from "find your why" to "do it 3 times before scaling"
- **4 pitfall warnings** — reporting, burnout, money, NGO registration
- **Submit form** — localStorage-based new-point submission
- **3 verified B站 videos** of Xiao Tang's journey
- **3 search CTAs** — YouTube / B站 / 抖音 food bank searches

### Technical
- **Tailwind CSS pre-built locally** (~20 KB minified, no CDN dependency for China reliability)
- **Vanilla JavaScript** — no build step, no framework
- **Mobile-responsive** — works on phones and desktops
- **Static-only** — deployable to any static host (mcode / GitHub Pages / Netlify / Cloudflare Pages / S3)

## [0.1.0] - 2026-07-30 · Project kicks off

First files appear on disk. The idea becomes a project.

### Added
- **Hand-curated data** of 46 food distribution points across 31 countries
- **`style.css`** — dark theme + warm crust/ember colors, custom map markers, popup styles
- **`data.js`** — `window.FOOD_POINTS` array + `TYPE_LABELS` + `TYPE_COLORS`
- **`app.js`** — Leaflet map, filters, IntersectionObserver reveal, counter animation, form submit
- **`index.html`** — 8 sections (Nav / Hero / StatsBar / Story / Map / Videos / Guide / Submit / Footer)
- **Tailwind** setup with local pre-build pipeline (`tailwind.config.js` + `tailwind.src.css` → `tailwind.css`)

## [Pre-history] - 2026-03/04 · Origin

The conceptual seed. No code yet, just the question.

### Inspiration
- **The Xiao Tang free scallion pancake story** went viral in early 2026 — a man in LA giving away free food, arrested twice, planning a 2029 mayor run
- **The "AI era + global distribution" paradox** — 730M+ hungry while AI can write poetry and drive cars; 1.3B tons of food wasted yearly
- **The belief**: *technology's greatest good is redesigning how we share; free food is where that change begins*

### Coincidence
- Around the same period, **`freefoodmap.org` was registered by a third party** (2026-03-19, via IONOS SE, with WHOIS privacy) — almost certainly a domain speculator. We let it go and use `freefoodmap.net` instead (or stay on GitHub Pages at `freefoodmap.github.io`).

---

## Project stats (as of 2026-08-07)

| Metric | Count |
|---|---|
| Food points | **46** |
| Countries / regions | **31** |
| Real videos of Xiao Tang | **3** (B站: 257万+ 播放) |
| i18n keys | **180 × 2** languages |
| Source files | **14** (incl. README, LICENSE, CONTRIBUTING, CHANGELOG) |
| Lines committed | **~2,800+** |
| Deploy targets | **2** (GitHub Pages + mcode backup) |
| Live URLs | `https://freefoodmap.github.io` · `https://2gfsmu58ezlqy.space.mcode.cn` |

## Roadmap (sketch)

- [ ] **freefoodmap.net** custom domain + DNS redirection (workaround for freefoodmap.org being squatted)
- [ ] **More food points** — community PRs through ISSUE_TEMPLATE
- [ ] **More languages** — Spanish, Portuguese, Hindi, Swahili for global reach
- [ ] **"Find food near me"** geolocation feature
- [ ] **Statistics page** — visualize the 46 points over time
- [ ] **Cloudflare Pages auto-deploy** on every `git push` to main

[Keep a Changelog]: https://keepachangelog.com/en/1.1.0/
