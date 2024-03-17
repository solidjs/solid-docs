Bütün bundler'lar (Webpack, Rollup, Parcel, Vite vb.) dinamik import'lar kullandığından, kod bölme (code splitting) işlemini otomatik olarak gerçekleştirirler. Solid'in içerisindeki `lazy` metodu, ertelenmiş lazy yükleme için, bileşenin dinamik import'unu wrap etmenizi sağlar. Çıktı, JSX'te normal bir şekilde kullanılabilen bir bileşenden farksızdır ancak tek fark `lazy` ile oluşturulan import ilk kez render edildiğinde, import ettiği kodu dinamik olarak yükler ve kod elde edilene kadar o render kolunu durdurur.

`lazy` kullanmak için aşağıdaki satırı:
```js
import Greeting from "./greeting";
```
Aşağıdaki ile değiştirelim:
```js
const Greeting = lazy(() => import("./greeting"));
```

İşlem büyük olasılıkla hala gözle fark edilemeyecek kadar hızlı olacaktır, eğer yüklenmeyi görmek isterseniz bir miktar sahte gecikme ekleyebilirsiniz.

```js
const Greeting = lazy(async () => {
  // simulate delay
  await new Promise(r => setTimeout(r, 1000))
  return import("./greeting")
});
```
