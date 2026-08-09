# Hacker News · Show HN Template

> **最佳时间:** 美东 周三或周四 8–10 AM(北京时间 20–22 点)
> **目标:** 24h 内 1k–10k views,3 天内 50–200 GitHub stars
> **格式:** 标题 ≤ 80 字符,正文 ≤ 200 字,链接放在第一行

---

## 标题(Title — 选一个)

### 选项 A(强调 idea,推荐)
```
Show HN: Free Food Map – 60+ global free food distribution points in one map
```

### 选项 B(强调 person/故事)
```
Show HN: I built a global food distribution map after watching a guy in LA give away free pancakes
```

### 选项 C(强调 tech,技术圈友好)
```
Show HN: Free Food Map – a zero-backend i18n site for global free food distribution
```

> **经验:** HN 上 标题里**不要**有 emoji、不要"AI"、不要"我做了一个"的中式翻译。直接、具体、让人秒懂。

---

## 正文(Body — 可直接复制)

```
Hi HN,

I built https://freefoodmap.github.io — a static map of 60+ free food
distribution points across 31 countries. The story behind it:

In April 2026, a 90s kid from Henan named "Xiao Tang" announced he's
running for LA Mayor in 2029. He'd been making scallion pancakes in
the US since 2022, was arrested twice, and now gives them away for
free in the slums. His slogan: "Vote for me as Mayor in three years."

The site is inspired by him, but the real point is bigger: in 2026 AI
can write poetry and drive cars, yet 730M+ people still go hungry and
1.3B tons of food are wasted every year. Technology's greatest good
might be redesigning how we share.

What I built:
- Zero backend. Pure static (HTML + pre-built Tailwind + Leaflet).
- 60+ real points, all sourced from Feeding America, Trussell Trust,
  European Food Banks Federation, Oasis Food Bank, KFC food cabinets,
  Robin Hood Army, etc. Real websites, real phone numbers.
- 240 i18n keys, zh + en, persisted to localStorage, ?lang= URL param.
- Bilingual video gallery (3 real B 站 videos + YouTube/B站/抖音 search).
- 6-step "How to start your own" guide with tips on legal, sourcing,
  filming, and not burning out.
- The new #ambassadors section — 6 roles, 1 filled (me), 5 empty
  slots waiting for engineers, local contacts, translators, story
  collectors, outreach, and designers from any country.

I deliberately did NOT use Tailwind CDN, or any build pipeline, or
any tracking. The site is ~50KB, deploys in 90 seconds via git push
to GitHub Pages, and works offline-ish.

What's missing (intentionally — looking for help):
- More points (currently 60, want 100+ in 31 countries, then 100+ countries)
- More languages (need ES/PT/FR/AR/HI/SW)
- More video links from real distributions
- Local contact verification in each country

If you're in any city and can verify 3-5 food banks near you, or
if you can translate to one of the missing languages, please open
an issue: https://github.com/freefoodmap/freefoodmap.github.io

The site itself, the data file, and the i18n dict are all open-source
under MIT. Everything is in a single GitHub org so contributors can
co-build it without giving anyone commit rights to a personal account.

— Andy
```

---

## 评论区应答模板(必备!)

### 1. 经典批评:"These are mostly well-known orgs, what's new?"

```
Honest answer: nothing about the data is new — Feeding America, Trussell
Trust, etc. have been public for decades. What's new is putting them on
one map that (a) auto-translates to your language, (b) is one git push
away from being updated, and (c) explicitly invites locals in each city
to verify and add.

The most common reason a food bank is missing from search results is
not that it doesn't exist — it's that nobody in that city has bothered
to write a page about it in English. So I'm hoping to flip that.
```

### 2. 经典批评:"X city is missing"

```
You're right, please add it! The data file is here:
https://github.com/freefoodmap/freefoodmap.github.io/blob/main/data.js

If you can paste 3-5 points in your city with name/coord/website/phone,
I'll merge and credit you. The ISSUE_TEMPLATE is here:
https://github.com/freefoodmap/freefoodmap.github.io/issues/new
```

### 3. 经典批评:"Why no backend?"

```
Because the orgs change their hours faster than any backend can update.
By keeping it static + GitHub-based, anyone in any country can submit a
PR and have it live in 90 seconds. We trade real-time data for
participation.

If it gets big enough to need a backend, that's a good problem to have.
```

### 4. 经典批评:"AI 时代 + 重新设计分配 — feels like marketing"

```
Fair. The slogan is the part I'm most willing to change. The data
beneath it isn't. Push back on the framing if you want — the site is
MIT-licensed so the only thing I control is the homepage.
```

### 5. 关于"小唐"的怀疑

```
He has a Douyin account @xiaotang688 with hundreds of thousands of
followers and he's been covered by Chinese-language media since 2024.
I'm aware some of the more viral details are disputed — the bail
amount and the "running for Mayor" timeline specifically. The site
points to his original B 站 videos so anyone can verify. The site
itself doesn't depend on him being real — the data does.
```

---

## 发布动作清单

发布前 1 小时:
- [ ] 重新部署确认无 bug
- [ ] 准备好 3 张截图:hero、map、ambassadors
- [ ] 准备好"原文链接 + GitHub 链接 + 中文版链接"
- [ ] 关掉所有 auto-posting 工具

发布后 24h:
- [ ] 60 分钟内回**每一条**评论(HN 算法奖励早期互动)
- [ ] 不要删除任何评论,即使是负面的
- [ ] 5k views 后:Twitter 转发"+1"
- [ ] 10k views 后:V2EX / Dev.to 同步发帖

发布后 7 天:
- [ ] 统计:stars、PRs、emails
- [ ] 写一个"first week"小复盘 → Dev.to
- [ ] 把所有 HN 评论里的好问题变成 GitHub issues

---

## 反模式(千万别做)

- ❌ 用 "🚀 AI 时代颠覆性创新" 之类的标题
- ❌ 标题里加 emoji
- ❌ 在正文里推销"愿景",不展示具体东西
- ❌ 链接到 Medium 帖子(应该直链到站点)
- ❌ 第一次发帖就求捐款 / 求 star
- ❌ 假装是 NGO 发的(HN 讨厌 marketing)
- ❌ 不回评论 / 让别人代回
