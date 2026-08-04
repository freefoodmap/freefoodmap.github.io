# 🤝 Contributing to Free Food Map

> 任何形式的免费食品发放点都欢迎被收录。无论你是发起人、志愿者,还是路过看到这个项目的人——你的每一次补充,都让这张地图更完整。

## 怎么贡献

### 1. 加一个新发放点 (推荐)

最简单也最有价值的贡献就是加一个你身边的免费食物发放点。

**方法 A:网页表单 (零门槛)**
- 打开站点,滚到底部 → 找到"提交表单"section
- 填表 → 提交

**方法 B:直接编辑 `data.js` (推荐,提 PR)**
1. Fork 这个仓库
2. 打开 `data.js`,在 `window.FOOD_POINTS` 数组里加一项:

```js
{
  id: "my-new-point",         // 唯一 id,英文短横线分隔
  name: "新点名称",
  org: "组织名",
  city: "城市, 省份/州",
  country: "中国",            // 国家/地区
  lat: 39.9042,               // 纬度 (Google Maps 查)
  lng: 116.4074,              // 经度
  type: "foodbank",           // foodbank / pantry / soup_kitchen / street /
                              // weekly / drive_thru / school_meal / smart_cabinet
  schedule: "周一–周五 9:00–17:00",
  phone: "(+86) 010-xxxx-xxxx",
  website: "https://example.org",
  desc: "一句话介绍这家点"
}
```

3. 跑 `python -m http.server 8000`,打开 `http://localhost:8000`,确认:
   - 地图上看到你的新点 (用过滤器查)
   - 弹窗信息正确
4. 提 Pull Request,在描述里说一下"我加的是 XXX 市的 XXX 发放点,数据来源是 XXX"

### 2. 修错 / 改文案

- 错别字 → 直接提 PR 改 `index.html` / `i18n.js`
- 描述不准 → 改 `data.js`
- 翻译问题 → 改 `i18n.js`(zh + en 两边都改)

### 3. 加视频

- 短视频/纪录片链接 → 编辑 `data.js` 对应点的字段,或者改 `index.html` 的视频卡片
- **不要**直接上传视频到仓库 (大文件)

### 4. 加 i18n 语言

欢迎加任何语言!

1. 复制 `i18n.js` 的 `en: { ... }` 块
2. 改成新语言(比如 `ja: { ... }`,`es: { ... }`)
3. 在 `app.js` 的 `detectLang()` 里加新语言的 URL 参数支持
4. 改 `index.html` 顶部的 `<html lang="...">`

## 数据原则

- **真实** — 只收录真实运营的发放点
- **免费** — 不能是付费/会员制/慈善义卖
- **对外开放** — 不接受"仅限内部员工/会员"
- **持续运营** — 至少运营 1 个月以上,临时活动不算
- **可验证** — 至少有一个公开联系方式(电话/官网/社交媒体)

## 提交 PR 前

- [ ] 我看过 [README.md](./README.md) 的"加新发放点"说明
- [ ] 我在本地跑过 `python -m http.server 8000`,确认改动正确
- [ ] 我没有上传任何大文件(视频/截图)
- [ ] 我没有提交任何 token / 密钥
- [ ] 我用了清晰的 commit message (推荐中文,格式 `加: 北京市海淀区的 XX 食物银行`)

## 行为准则

- **善意优先** — 任何批评/建议都是为了项目更好
- **不删别人贡献** — 除非数据明显错误并经讨论
- **保留来源** — 引用别人的数据时注明出处

## 联系

- GitHub Issues: 提问 / 建议 / 报告问题
- Pull Request: 实际贡献
- 邮件: 见 README.md

---

🙏 谢谢你的贡献。每加一个点,就多一个人能找到下一顿饭。
