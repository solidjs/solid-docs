Solid の `style` 属性は、スタイルの文字列かオブジェクトのどちらかを受け付けます。
ただし、オブジェクトの形式は `Element.prototype.style` とは異なり、代わりに `style.setProperty` を呼び出すためのラッパーとなります。これは、キーが "backgroundColor "ではなく "background-color "のようにダッシュケース形式をとり、単位は明示的に指定する必要がある（例: `width: 500` ではなく `width: 500px`）ということです。


これは CSS 変数を設定できるということでもあります:

```js
<div style={{ "--my-custom-color": themeColor() }} />
```

それでは、いくつかのインラインスタイルを使って、div をアニメーションしてみましょう:
```jsx
<div style={{
  color: `rgb(${num()}, 180, ${num()})`,
  "font-weight": 800,
  "font-size": `${num()}px`}}
>
  Some Text
</div>
```
