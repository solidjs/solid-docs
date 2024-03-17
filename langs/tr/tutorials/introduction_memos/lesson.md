Genellikle, türetilmiş sinyaller (derived signal) oluşturmak yeterli olsa bile, bazen tekrarlanan işleri azaltmak için değerleri önbelleğe almak faydalı olabilir. Bir fonksiyonu değerlendirmek ve bağımlılıkları değişene kadar sonucu saklamak için memo'lar kullanılabilir. Bu sayede, başka bağımlılıklara sahip efektler için hesaplamaları önbelleğe almak veya DOM node'u oluşturmak gibi maliyetli işlemlerde, yükü azaltmak için yerinde bir çözüme ulaşılabilir.

Memo'lar hem gözlemci - bir effect gibi -, hem de salt okunur bir sinyaldir. Hem bağımlılıkların hem de gözlemcilerinin farkındadırlar ve bu sayede herhangi bir değişiklik için yalnızca bir kez çalıştırılması sağlanır. Bu durum da onları sinyalleri değiştiren efektleri kaydederken tercih edilebilir kılar. Genel olarak, bir şey türetilebiliyorsa, türetilmelidir.

Memo `solid-js`'ten import edeceğimiz `createMemo`'ya fonksiyonu aktararak basit bir şekilde oluşturulabilir. Örnekte, sonucu tekrar hesaplamak her tıklamada daha maliyetli hale gelmekte. Fakat fonksiyonu `createMemo` ile sardığımızda her tıklamada gerekli hesaplama sadece bir kere gerçekleşecektir:

```jsx
const fib = createMemo(() => fibonacci(count()));
```
`fib` fonksiyonunun içerisine `console.log` koyarak ne sıklıkla çalıştığını gözlemleyebiliriz:
```jsx
const fib = createMemo(() => {
  console.log("Calculating Fibonacci");
  return fibonacci(count());
});
```
