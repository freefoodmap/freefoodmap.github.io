# Cold Email · 技术志愿者 (i18n / 前端 / 设计)

> **收件人:** HN 评论者、Dev.to 作者、GitHub 上关注 food/hunger/accessibility 主题的人
> **目标:** 拉到 1–2 个核心技术贡献者(PR 贡献 ≥ 1)
> **发送时段:** 周二/周三 20:00–22:00 收件人本地时间
> **回复率预期:** 8–15%(tech 圈对 OSS cold email 容忍度高)

---

## Subject(选一个)

### A(具体技术)
```
Looking for a {{language}} translator for a 240-key i18n file
```

### B(技术债)
```
Static site, 240 i18n keys, no backend — looking for co-maintainers
```

### C(短)
```
freefoodmap.github.io × you?
```

---

## Body

```
Subject: Looking for a {{language}} translator for a 240-key i18n file

Hi {{first_name}},

Saw your {{where: "HN comment" / "Dev.to post" / "GitHub issue"}} on
{{topic: "static i18n" / "Leaflet maps" / "github pages"}}. You
seem to know the area well.

I'm Andy, building a volunteer-run map of free food distribution
points. Live at https://freefoodmap.github.io. Tech stack is
deliberately simple:

- HTML + pre-built Tailwind (~22KB, no CDN)
- Vanilla JS + 240-line i18n engine
- Leaflet + OpenStreetMap dark tiles
- GitHub Pages (org, not personal)

The repo: github.com/freefoodmap/freefoodmap.github.io
(MIT-licensed, so you keep your contributions under your name,
not mine.)

What I need help with (pick one, 1–2 hours total):

A. **{{language}} translation.** `i18n.js` has 240 keys, all in
   zh + en. Fork, translate values, send PR. I have a checklist
   in CONTRIBUTING.md.

B. **Accessibility pass.** I haven't done a real a11y audit. If
   you do, I'll credit you prominently.

C. **Performance.** Page weight is ~50KB. Could probably be 30KB
   with a smarter build. I have a `package.json` for Tailwind
   but no minification for HTML/JS.

D. **One specific bug.** I have a few open issues tagged
   "good first issue". Pick one, fix it, PR.

What I offer:
- Direct co-maintainer access (not just "thanks for the PR")
- Your name in README.md + on the site
- Access to me for any blocking question
- The first 5 contributors get a co-founder title

If none of A–D sparks joy, that's fine. Reply "no" and I'll
stop spamming.

— Andy
https://freefoodmap.github.io
open@freefoodmap.org
```

---

## 个性化占位符

- `{{first_name}}` — 收件人 first name
- `{{where}}` — 你在哪里找到他(HN comment, Dev.to post, GitHub issue)
- `{{topic}}` — 他发过的话题
- `{{language}}` — 你猜他会说的语言(西班牙/法语/阿拉伯/印地/斯瓦希里)

> **关键:** `{{where}}` 和 `{{topic}}` 必须真。Cold email 最忌"假个性化"。

---

## 找技术志愿者

| 来源 | 方法 | 转化率 |
|---|---|---|
| **HN Show HN 评论者** | 找"我可以贡献"的回复 → DM | 高 |
| **Dev.to followers** | 搜 "i18n" / "leaflet" / "static site" | 中 |
| **GitHub Issues** | 找同类项目里经常 PR 的人 | 高 |
| **V2EX 回帖** | 看回帖中提具体技术的人 | 中 |
| **Twitter #CodeNewbie** | 找寻找 first-OSS 的人 | 中低 |
| **Discord (Reactiflux / Web Dev 等)** | 找空闲时间多的人 | 中 |

---

## 跟进节奏(7-14 天)

### Day 7

```
Subject: re: Looking for a {{language}} translator

Bumping this. Even a "no thanks" reply would close the loop
for me — saves me from sending a second follow-up.

If you have 30 min, I can jump on a call and walk you through
the i18n file. I think you'll see it's pretty mechanical.

— Andy
```

### Day 14 — 最后一试

```
Subject: re: Looking for a {{language}} translator

One last try. If timing's bad, just say "next month" and I'll
reach out again.

If you're open to a 1-time PR (not ongoing commitment), that's
totally fine too.

— Andy
```

---

## 关键差异(跟其他 3 个 email 比)

| 维度 | 区别 |
|---|---|
| **语气** | 短、具体、不寒暄 |
| **承诺** | "1–2 hours total" 是 killer line |
| **A/B/C/D 列表** | 让人选一个最低门槛的参与方式 |
| **"co-founder" 头衔** | 前 5 个 contributor 给,激励稀缺感 |
| **"Reply 'no'" 鼓励** | 降低回复门槛 |
| **时间** | 晚上 8–10 点(tech 圈活跃时间) |

---

## 关键成功因素

1. **真去看他的 profile / posts** — 假个性化最致命
2. **具体指出哪一行** — 让人 5 分钟内能上手
3. **不要钱** — 公益项目 + OSS
4. **共创** — 不是说"你帮我",是说"我们一起"
5. **给退出** — "Reply 'no'" 反而提高回复率
