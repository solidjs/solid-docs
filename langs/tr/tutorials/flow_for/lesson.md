`<For>` bileşeni objelerden oluşan bir array üzerinde döngü oluşturmanın en iyi yoludur. Array değiştiği takdirde `<For>` ögelerin yeniden oluşturulması yerine DOM üzerinde güncellenmesi veya taşınmasını sağlar. Gelin örneğe bir bakalım.

```jsx
<For each={cats()}>{(cat, i) =>
  <li>
    <a target="_blank" href={`https://www.youtube.com/watch?v=${cat.id}`}>
      {i() + 1}: {cat.name}
    </a>
  </li>
}</For>
```

`<For>` bileşeni için sadece bir prop vardır: `each`. Döngü oluşturacağınız array `each`'a aktarılır.

Sonrasında, `<For>` ve `</For>` arasına doğrudan node'ları yazmak yerine _callback_ fonksiyonu aktarılır. Bu fonksiyon JavaScript'in [`map` callback](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#parameters) fonksiyonuna benzemektedir. Array'deki her eleman için, eleman ilk argüman olarak ve index ikinci argüman olarak geri çağrılır. (Bu örnekte `cat` ve `i`.) Daha sonra, işlenecek bir node döndürmesi gereken callback'te bu değerleri kullanabilirsiniz.

Dikkat edilmesi gereken bir diğer konu da index'in sabit bir sayı değil bir _sinyal_ oluşudur. Bunun nedeni `<For>` un referansla anahtarlanmış (keyed by reference) olmasıdır: işlenilen her bir node array'deki bir elemana bağlıdır. Başka bir deyişle, bir ögenin array'deki yeri değiştirildiğinde yok edilip yeniden oluşturulmak yerine, ilgili node da hareket edecek ve index'i değiştirecektir.

`each` prop'u bir array beklemektedir ancak [`Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from), [`Object.keys`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys), veya [`spread syntax`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) gibi yardımcılarla diğer yinelenebilir nesneleri array'lere dönüştürebilirsiniz.