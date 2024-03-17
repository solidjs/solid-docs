Birçok durumda, bir bileşenin içinden bir üst bileşene ref göndermek isteyebilirsiniz. Bunu yapmanın yolu yine `ref` attribute'unu kullanmaktır. Dışarıdan bakıldığında, bir bileşen üzerinde `ref` kullanmak, yerel bir öğe üzerinde ref kullanmaya çok benzer. Dolayısıyla atanacak bir değişken veya bir callback fonksiyonu iletebilir. 

Ancak, geliştiricinin bu `ref`'i geri iletilmek üzere, bileşen içerisinde bir elemana bağlaması gerekir. Bunun için `props.ref` kullanımından yararlanırız. Bu her iki `ref` türü de verildiği takdirde, `ref`' in callback formudur, fakat genelde siz bunu JSX elemanlarından birine veya bir bileşene `ref` attribute'u olarak doğrudan atayacağınız için çoğunlukla bu detay sizden gizlenir.

Logoyu tekrar hareket ettirmek için ref'i `canvas.tsx`'ten iletmemiz gerekmekte:

```jsx
<canvas ref={props.ref} width="256" height="256" />
```
