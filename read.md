# 1.美化超出文本，使用 ... 代替
```css
// 文字不允许换行（单行文本）
white-space: nowrap;
// 溢出部分隐藏
overflow: hidden;
// 文本溢出使用 ... 代替
text-overflow: ellipsis;
```

# 2.`wx.chooseAddress` 接口调用失败
`manifest.json`
```json
"mp-weixin" : {
    /* 小程序特有相关 */
    "requiredPrivateInfos": [
        "chooseAddress"
    ]
}
```