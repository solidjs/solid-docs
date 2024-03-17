Bazen reaktif bir Context içinde olsa bile Signal okumalarının track edilmemesi istenilebilir. Solid, `untrack` helper'i ile sarılmış işlemlerin okumaları track etmesini engelleyebilir.

Örneğimizde `b` değiştiğinde loglamak istemediğimizi varsayalım. Signal'i aşağıdaki şekilde değiştirerek `b` sinyalinin takibini kaldırabiliriz (untrack). 

```js
createEffect(() => {
  console.log(a(), untrack(b));
});
```
Sinyaller fonksiyon olduğu için doğrudan aktarılabilirler, ancak `untrack` daha karmaşık davranışa sahip fonksiyonları da sarabilir.

`untrack` okumaların izlenmesini devre dışı bırakıyor olsa da, hala gerçekleşen ve gözlemcilerini bildiren yazmalar üzerinde hiçbir etkisi yoktur.
