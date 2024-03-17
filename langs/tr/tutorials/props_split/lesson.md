Props için birleştirme işlemi haricinde de yapmak istediğimiz işlemler olacaktır.

Genellikle, props gruplara ayrılır ki
gerekenler mevcut bileşende kullanılsın ve diğerleri de alt bileşenlere aktarılsın.

Bu kullanım için Solid [`splitProps`](/docs/latest/api#splitprops) fonksiyonuna sahiptir. Argüman olarak props objesini ve kendi props objesine çıkarmak istediğimiz bir veya daha fazla anahtar array'leri alır. Belirtilen anahtarlardaki her bir array için bir tane olmak üzere props objelerinden oluşan bir array, ve kalan anahtarlar ile de bir props objesi döner. Döndürülen bütün objeler reaktivitiyi korumaktadır.

Örneğimiz isim belirlesek de güncellenmiyor, çünkü reaktivite `greeting.tsx` i destructure ederken kaybedilmiş:
```jsx
export default function Greeting(props) {
  const { greeting, name, ...others } = props;
  return <h3 {...others}>{greeting} {name}</h3>
}
```

Bunun yerine `splitProps` ile reaktiviteyi bu şekilde koruyabiliriz:
```jsx
export default function Greeting(props) {
  const [local, others] = splitProps(props, ["greeting", "name"]);
  return <h3 {...others}>{local.greeting} {local.name}</h3>
}
```
Artık buton beklediğimiz gibi çalışıyor.