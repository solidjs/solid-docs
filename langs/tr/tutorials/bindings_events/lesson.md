Solid'deki event'ler `on` ön adına sahip niteliklerdir (attribute) ve birkaç yönden özel olarak ele alınırlar. Öncelikle wrapping konusunda normal buluşsallığı (heuristic) takip etmezler; çoğu durumda, bir sinyal ile bir event handler arasındaki farkı saptamak zordur. Bu nedenle, event'ler çağrıldıklarından ve de güncelleme işlemi için reaktivite gerektirmediklerinden yalnızca başlangıçta bağlanırlar. Handler'ın uygulamanın mevcut durumuna göre farklı kod çalıştırması sağlanılabilir.

Ortak UI event'leri (bubble oluşturan, oluşturulan) otomatik olarak belgede temsil edilir. Bu bağlamda performansı iyileştirmek için Solid, ek closure'lar oluşturmadan handler'ı verilerle (ilk argüman olarak) çağırmak için bir dizi syntax'ı destekler. 

```jsx
const handler = (data, event) => /*...*/

<button onClick={[handler, data]}>Click Me</button>
```

Örneğimizde, handler'ı `mousemove` event'ine bağlayalım:
```jsx
<div onMouseMove={handleMouseMove}>
  The mouse position is {pos().x} x {pos().y}
</div>
```

Tüm `on` bind'ları (bağ) büyük/küçük harf farkına duyarlı değildir, bu da event adlarının küçük harfle yazılması gerektiği anlamına gelir. Örneğin: `onMouseMove`, `mousemove` event adını izler. Büyük/küçük harf kullanımını desteklemek veya event temsilini (event delegation) kullanmamak istediğiniz durumlarda `on:` namespace'ini iki noktadan sonra gelecek event handler ile eşleşecek şekilde kullanabilirsiniz:

```jsx
<button on:DOMContentLoaded={() => /* Do something */} >Click Me</button>
```
