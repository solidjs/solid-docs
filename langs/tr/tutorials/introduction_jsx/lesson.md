JSX örneklerde gördüğümüz üzere HTML benzeri bir syntax'a sahiptir ve Solid ile bileşen oluşturmanın temelini oluşturmaktadır.
JSX `{ } ` syntax'ını kullanarak HTML üzerinde değişken ve fonksiyonları kullanabilmemize olanak sağlayan dinamik yapılar sunar.
Bu örnekte, `name` değişkenini HTML'de `{name}` şeklinde bir div'in içerisinde kullandık. Aynı şekilde, bir HTML elemanını doğrudan `svg` değişkenine atanacak şekilde ürettik.

JSX kullanan diğer frameworklerin aksine Solid, HTML standartlarına mümkün olduğunca yakın kalmaya çalışır dolayısıyla Stack Overflow'daki yanıtlardan veya tasarımcıların şablon oluşturucularından kopyalayıp yapıştırma konusunda kolaylık sağlar.

JSX'in HTML'i kapsayan bir superset olarak tanımlanmasını engelleyen üç ana farklılık vardır:
1. JSX'te void elemanlar yoktur. Tüm elemanların kapanış etiketine sahip olması veya kendini kapatması gerekir. Bunu `<input>` veya `<br>` gibi yapılar kullanırken göz önünde bulundurmalısınız.
2. JSX sadece bir eleman dönmelidir. Birden çok üst seviye elemana sahip bir yapı istendiği takdirde Fragment elemanı kullanılır.

   ```jsx
   <>
     <h1>Title</h1>
     <p>Some Text</p>
   </>
   ```
3. JSX HTML yorumlarını `<!--...-->` veya özel etiketleri `<!DOCTYPE>` desteklemez.

Fakat JSX, SVG desteklemektedir. Hadi bileşenimize doğrudan bir SVG yapıştıralım:
```jsx
<svg height="300" width="400">
  <defs>
    <linearGradient id="gr1" x1="0%" y1="60%" x2="100%" y2="0%">
      <stop offset="5%" style="stop-color:rgb(255,255,3);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
    </linearGradient>
  </defs>
  <ellipse cx="125" cy="150" rx="100" ry="60" fill="url(#gr1)" />
  Sorry but this browser does not support inline SVG.
</svg>
```
