Sinyaller takip edilebilir değerlerdir, ancak bu denklemin sadece yarısıdır. Tamamlanması için bu izlenebilir değerler tarafından güncellenebilen gözlemciler kullanılır. Effect bir gözlemcidir ve işlevi sinyale bağlı bir side-effect çalıştırmaktır.

Effect oluşturmak için `solid-js`'ten `createEffect`'i import ediyoruz ve içerisinde bir fonksiyon oluşturuyoruz. Effect otomatik olarak fonksiyon çalışırken okunan sinyallere subscribe olur ve bunlardan birisi değiştiğinde fonksiyonu yeniden çalıştırır.

Hadi `count` her değiştiğine çalışan bir Effect oluşturalım.

```jsx
createEffect(() => {
  console.log("The count is now", count());
});
```

`count` sinyalimizi güncellemek için bir butona tıklandığında çalışacak bir fonksiyon atayalım.

```jsx
<button onClick={() => setCount(count() + 1)}>Click Me</button>
```

Artık her butona tıklandığında konsol'a yazıyor. Bu örnek görece basit bir örnek, fakat Solid'in nasıl çalıştığını anlamak için, JXT içindeki her ifadenin bağımlı sinyalleri değiştiğinde yeniden çalıştırılan kendine ait bir effect olduğunu hayal etmelisiniz. Solid içerisindeki bütün render işlemleri bu şekilde çalışır, Solid perspektifinde: *bütün render işlemleri reaktif sistemin bir side effect'idir*.

> Geliştiricinin `createEffect` ile oluşturduğu effectler render işlemi tamamlandıktan sonra çalışır ve çoğunlukla DOM ile etkileşime giren güncellemeleri zamanlamak için kullanılırlar. DOM'u öncesinde değiştirmek istiyorsanız [`createRenderEffect`](https://www.solidjs.com/docs/latest/api#createrendereffect) kullanabilirsiniz.