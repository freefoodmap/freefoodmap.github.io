# Cold Email · CSSA / 中国学生学者联合会

> **收件人:** 北美/欧洲/亚太 CSSA(中国学生学者联合会)主席/外联部长
> **目标:** 找本地联络人,让 CSSA 在校园里帮我们宣传
> **发送时段:** 周二/周三 9:00 AM 收件人本地时间
> **回复率预期:** 5–15%(比一般 cold email 高,因为有项目链接可验证)

---

## Subject(选一个)

### A(具体 + 不夸张)
```
Free food map for {{city}} · looking for a {{university}} contact
```

### B(以小唐 hook)
```
A 90s kid in LA gives free scallion pancakes. We're mapping 60+ similar spots worldwide — need a {{city}} contact
```

### C(短,直球)
```
{{university}} CSSA × Free Food Map?
```

> **不要用:** "Hi! I'm reaching out to introduce..." "Hope this email finds you well" "I came across your organization..."

---

## Body({{占位符}}需替换)

```
Subject: {{university}} CSSA × Free Food Map?

Hi {{first_name}},

Quick context: I'm Andy, building a volunteer-run map of 60+ free
food distribution points across 31 countries. Live at
https://freefoodmap.github.io.

The story that started it: a 90s kid from Henan named "Xiao Tang"
is giving away free scallion pancakes in LA's slums. His slogan:
"Vote for me as Mayor in three years." Made the news in China
(B 站, 2.57M+ views), and people started asking — where else is
this happening?

I built the site. Now I need people in 30+ cities to verify local
info, add new points, and translate to their language.

Specifically, {{city}} right now has:
- {{# of existing points}} points on the map (or "0 points — empty
  city")
- {{notable local food org, if any}}
- {{CSSA university}} has ~{{Chinese student count}} Chinese students

What I'm asking (10 min/month, totally optional):
1. Verify 3-5 entries near {{campus}} in our data file
   (https://github.com/freefoodmap/freefoodmap.github.io/blob/main/data.js)
2. Add any new points you find
3. (Optional) Cross-post a 1-line announcement in your WeChat group
4. (Optional) Add "open@freefoodmap.org" as a contact in your
   resource page

What I offer back:
- Your name in the site credits + GitHub README
- Direct access to me for any campus-specific food-resource questions
- If you ever need help starting your own food bank, I have a
  6-step guide (already on the site)
- Co-author a campus-specific version of the map (e.g.
  {{university-slug}}.freefoodmap.org) — only if you want

The whole project is MIT-licensed. No fee, no contract, no meetings.

If you're not the right person, can you forward this to whoever
handles "community resources" or "external partnerships"?

— Andy Zhuang
https://freefoodmap.github.io
open@freefoodmap.org
```

---

## 个性化占位符(必填)

- `{{first_name}}` — 收件人 first name,**不要用 honorific**(Mr./Dr. 显得 spam)
- `{{university}}` — 学校全名(Yale, MIT, Columbia...)
- `{{city}}` — 城市(New Haven, Cambridge, NYC)
- `{{# of existing points}}` — 查 `data.js` 看该校所在城市有几个点
- `{{campus}}` — 校园(尽量具体)
- `{{notable local food org, if any}}` — 当地知名公益组织(没就跳过)

> **投入 5 分钟做 1 封个性化,比 1 小时群发 100 封更有效。**

---

## 跟进节奏(7-14-30 天)

### Day 7 — 第 1 封 follow-up

```
Subject: re: {{university}} CSSA × Free Food Map?

Hi {{first_name}},

Bumping this in case it slipped through. No pressure — I know
CSSA is mid-semester and your inbox is a warzone.

If a 5-min reply isn't feasible, even a forward to whoever runs
"social welfare" or "publicity" at {{university}} would help.

Worst case: I'll just remove {{university}} from my outreach list
and try again next semester. Either way, thanks for reading.

— Andy
```

### Day 14 — 第 2 封 follow-up(可选,值最后一试)

```
Subject: re: {{university}} CSSA × Free Food Map?

Hi {{first_name}},

One last try. If timing's bad, just say "later" and I'll reach
out in {{next semester}}.

A 5-minute reply — even a "no, thanks" — would close the loop for me.

— Andy
```

### Day 30 — 结案

如果还没回,移到 `cold-leads/nurture-2026Q4.md`,4 个月后再试。

---

## 找 CSSA 联系人

1. **Google:** `"{{university}}" CSSA contact`
2. **学校官网:** `/international/student-organizations/`
3. **WeChat 群:** 用 `wechaty` / `Wechaty` 库或人工加群
4. **小红书 / 知乎:** 搜 `{{university}} 留学生`
5. **朋友推荐:** 你认识的 CSSA 校友,请他们 intro 别人

> **成功率最高的方法:** 朋友 intro,而不是 cold email。

---

## 100 封后复盘指标

| 指标 | 目标 |
|---|---|
| 发送 | 100 |
| 打开率 | 50%+ (subject 行好) |
| 回复率 | 10%+ |
| 转化(真去加数据 / 介绍别人) | 5% |
| 新增本地联络人 | 5–10 个 |
