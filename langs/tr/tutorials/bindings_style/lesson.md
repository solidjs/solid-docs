Solid'deki style attribute'u style string'leri veya objeleri kabul eder.
Ancak nesne formu `Element.prototype.style`'dan farklıdır, aslında `style.setProperty`'yi çağıran bir sarıcıdır (wrapper). Sonuç olarak anahtarlar (key) dash-case yazılır, örneğin "backgroundColor" yerine "background-color" kullanılmalıdır. Ayrıca herhangi bir birim açıkça belirtilmelidir (`width: 500` geçersiz olacaktır, doğru kullanım ise: `width: 500px` şeklindedir) 


Bu aynı zamanda CSS değişkenleri atayabileceğimiz anlamına da gelir:

```js
<div style={{ "--my-custom-color": themeColor() }} />
```

Div'imizi bir kaç satır içi (inline) style ile hareketli hale getirelim: 
```jsx
<div style={{
  color: `rgb(${num()}, 180, ${num()})`,
  "font-weight": 800,
  "font-size": `${num()}px`}}
>
  Some Text
</div>
```