Store'lar çoğunlukla Solid'in Store proxy'leri kullanılarak oluşturulur. Bazen Redux, Apollo veya XState gibi immutable kütüphaneler ile interface'ler oluşturmak isteyebilirsiniz ve bunlar için parçalı (granular) güncellemeler yapmanız gerekir.

Örneğimizde `useRedux.tsx` dosyasında görebileceğiniz temel bir Redux wrapper'ımız var. Store tanımı ve action'lar da diğer dosyalarda yer almakta.

Temel kullanım, bir store objesi oluşturmamız ve güncelleme sırasında durumu güncellemek için Redux Store'una subscribe olmamızdır.

```js
const [state, setState] = createStore(store.getState());
const unsubscribe = store.subscribe(
  () => setState(store.getState())
);
```
Demo'da ögelerin eklenmesi veya işaretlenmesi iyi çalışır gibi görünüyor. Ancak, verimsiz render'lar yok sayılmamalıdır. Dikkat ederseniz console.log sadece öge eklendiğinde değil ögeler işaretlendiğinde de oluşmakta.

Bunun nedeni Solid'in varsayılan olarak farklılaşmıyor (diff) oluşudur. Yeni ögenin yeni olduğunu varsayar ve değiştirir. Veriler parçalı değişiyorsa farklılaştırmaya gerek olmaz. Ama ya gerekirse?

Solid, `setStore` çağrısını geliştiren ve bu immutable kaynaklardan gelen verileri yalnızca parçalı güncellemeleri bildirerek farklılaştırmamızı sağlayan bir yöntem olarak `reconcile` fonksiyonunu sağlar.

Let's update that code to:
```js
const [state, setState] = createStore(store.getState());
const unsubscribe = store.subscribe(
  () => setState(reconcile(store.getState()))
);
```
Şimdi örneğimizde beklediğimiz gibi Create sadece öğe eklenirken konsol'da yazdırılıyor.

Tek çözüm elbette bu değil, bazı framework'lerde `key` property'sinin döngü içerisindeki elemanlarda kullanıldığını görmüşsünüzdür. Sorun şu ki, bu davranışı varsayılan hale getirdiğinizde, her zaman liste hesaplaması yapmanız ve derlenmiş framework'lerde bile, olası değişiklikler için tüm alt elemanları her zaman farklılaştırmanız gerekir. Veri merkezli bir yaklaşım, bunu yalnızca template dışı uygulanabilir hale getirmez aynı zamanda da daha tercih edilebilir hale getirir. Internal state yönetiminin buna ihtiyaç duymadığını da göz önünde bulundurduğumuzda, Solid'in en performanslı yolu varsayılan olarak sunduğunu unutmayalım.

Elbette, ihtiyaç duyulduğunda `reconcile` kullanmakta bir sorun yoktur. Bazen basit bir reducer, veri güncellemelerini organize etmek için harika bir yöntem sağlayabilir. `reconcile` kendini burada gösterir ve kendi `useReducer` primitiflerinizi oluşturur.

```js
const useReducer = (reducer, state) => {
  const [store, setStore] = createStore(state);
  const dispatch = (action) => {
    state = reducer(state, action);
    setStore(reconcile(state));
  }
  return [store, dispatch];
};
```

`Reconcile`'ın davranışı yapılandırılabilir. Özel bir key ayarlanabilir, ayrıca yapısal klonlamayı yok sayan ve yalnızca alt parçaları (leaves) farklılaştıran bir birleştirme seçeneği de vardır.