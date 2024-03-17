Kolaylık sağlamak için Solid, hesaplamalarımız için spesifik bağımlılıklar oluşturmayı sağlayan bir `on` helper'ına sahiptir. Bu çoğunlukla hangi Sinyallerin takip edileceği konusunda daha da açık olmanın (ve okunsalar bile diğer sinyalleri track etmemenin) kısa bir yolu olarak kullanılır. Ayrıca `on` hesaplamanın hemen yürütülmesini ve yalnızca ilk değişiklikte çalıştırılmasını sağlayan bir `defer` seçeneği sunar. 

Örneğimizde, Effect'in yalnızca `a` değeri güncellendiğinde çalışmasını ve bu değer değişene kadar çalışmayı ertelemesini sağlayalım:

```js
createEffect(on(a, (a) => {
  console.log(a, b());
}, { defer: true }));
```
