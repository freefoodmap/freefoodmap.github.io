# 🥯 Free Food Map · 全球免费食品发放点地图

> 灵感来自在洛杉矶为流浪汉免费做酱香饼的河南小伙"小唐"。一张地图,串起全球 60+ 个免费食品发放点,以及如何从零开始做一次免费食品发放的完整指南。
>
> 🌍 **中英双语** · 默认中文,右上角一键切换。

## 🌟 包含什么

- **46 个真实发放点** —— 覆盖 31 个国家/地区,包括 Feeding America、Trussell Trust、绿洲盛食社、肯德基食物驿站、Robin Hood Army 等
- **小唐的完整故事** —— 从 2022 年独闯洛杉矶到 2026 年宣布竞选洛杉矶市长
- **3 个真实视频** —— B 站上小唐原视频直链(200+ 万播放)
- **3 个延伸搜索** —— YouTube / B 站 / 抖音的"食物银行"搜索直链
- **6 步起步指南** —— 从"想清楚为什么"到"做 3 次再谈扩张"
- **4 个前辈踩坑提醒** —— 被举报、消耗、钱、NGO 注册
- **可交互地图** —— Leaflet + OpenStreetMap,8 种类型筛选器,按国家分组的侧边列表
- **提交表单** —— 提交新发放点(目前存到 localStorage,待接入后端)
- **中英双语** —— 一键切换,持久化到 localStorage,支持 `?lang=en` URL 参数

## 🛠️ 技术栈

- 纯静态网站,**零后端**
- HTML + **本地预构建** Tailwind CSS(无 CDN 依赖,国内访问稳)
- Vanilla JavaScript + 轻量级 i18n 字典
- Leaflet.js + OpenStreetMap 暗色瓦片
- Google Fonts (Inter / Noto Serif SC / JetBrains Mono)
- 响应式设计,移动端友好

## 📁 文件结构

```
freefood/
├── index.html           # 主页面(8 个 section,所有 UI 文本带 data-i18n)
├── style.css            # 自定义样式(品牌色 / 弹窗 / 地图标记 / reveal)
├── app.js               # 交互逻辑:地图、筛选、滚动、表单、i18n
├── data.js              # 46 个全球发放点 + TYPE_LABELS / TYPE_COLORS
├── i18n.js              # 中英翻译字典(180 keys × 2)
├── tailwind.config.js   # 主题色 / 字体 / 自定义动画
├── tailwind.src.css     # Tailwind 入口(@tailwind base/components/utilities)
├── tailwind.css         # 本地预构建产物(~20KB,无 CDN!)
├── package.json         # 重新构建 Tailwind 用的依赖清单
└── README.md            # 本文件
```

## 🚀 本地运行

任意 HTTP 服务器即可:

```bash
# Python
python -m http.server 8000

# Node
npx serve .

# 然后打开
# http://localhost:8000
```

直接双击 `index.html` 也可以,但部分浏览器对 ES modules / CORS 有限制,推荐用 HTTP 服务器。

### 重新构建 Tailwind(可选)

如果改了 `tailwind.config.js` 或 `tailwind.src.css`,需要重新构建:

```bash
npm install --no-save tailwindcss@3.4.0
node node_modules/tailwindcss/lib/cli.js -c tailwind.config.js -i tailwind.src.css -o tailwind.css --minify
```

> 项目里 `tailwind.css` 已经构建好,日常浏览/部署不需要这个步骤。

## 🌍 国际化(i18n)

### 三种切换方式

1. **页面按钮** —— 右上角"中文 / EN"按钮一键切换
2. **URL 参数** —— `?lang=zh` 或 `?lang=en`
3. **持久化** —— 用户的选择写入 `localStorage.freefood-lang`,刷新后保留

### 优先级

`URL 参数 > localStorage > 默认中文`

### 翻译范围

- ✅ UI 全部文本(导航、按钮、标题、描述、表单 placeholder)
- ✅ 类型标签(`foodbank` / `pantry` / `soup_kitchen` 等 8 种,中英对照)
- ✅ 地图属性(attribution、popup labels)
- ✅ 视频卡片文案
- ⚠️ **数据描述**(`data.js` 里 46 个点的 `desc`)目前**只有中文**;英文模式下地图 popup 会显示中文描述。未来扩展:为每个点加 `desc_en` 字段。

### 加一个翻译 key

1. 在 `i18n.js` 的 `zh: { ... }` 和 `en: { ... }` 里各加一条
2. 在 `index.html` 对应元素上加 `data-i18n="yourKey"`
3. 重新部署即可

## ✏️ 自定义指南

### 加一个新发放点

编辑 `data.js`,在 `window.FOOD_POINTS` 数组中加一项:

```js
{
  id: "my-new-point",
  name: "新点名称",
  org: "组织名",
  city: "City, State",
  country: "USA",
  lat: 40.7128, lng: -74.0060,
  type: "foodbank",            // foodbank / pantry / soup_kitchen / street / weekly / drive_thru / school_meal / smart_cabinet
  schedule: "周一–周五 9:00–17:00",
  phone: "(123) 456-7890",
  website: "https://example.com",
  desc: "一句话介绍"
}
```

### 换主题色

编辑 `tailwind.config.js` 顶部的 `theme.extend.colors`:

```js
colors: {
  crust: '#f4a52a',  // 饼的金黄
  ember: '#e84c1c',  // 炭火橙
  ink:   '#0b1220',  // 深墨
  cream: '#fdf8f0',  // 奶油
}
```

改完记得 `npm install + 重新构建 Tailwind`(见上面"重新构建 Tailwind")。

### 接入真正的后端

`app.js` 里 `setupForm()` 默认把提交存到 `localStorage`。改成 POST 到你的 API:

```js
await fetch('https://your-api.com/submit', {
  method: 'POST',
  body: JSON.stringify(data)
});
```

## 🤝 贡献

欢迎提交 PR 加新发放点 / 修错 / 翻译。

数据来源:
- 各组织官网与维基百科
- Feeding America 网络
- European Food Banks Federation
- Wikipedia

## 📜 许可

MIT — 用作善意就好。数据如有错误,请提交 issue。

---

🥯 一张饼,一份善意,一张地图。
