Solid'de az sayıda Lifecycle (Yaşam Döngüsü) fonksiyonu vardır, çünkü her şey reaktif sistem içerisinde yaşar ve son bulur. Reaktif sistem senkronize şekilde oluşur ve güncellenir, bu nedenle de sadece zamanlama (scheduling) güncellemenin sonuna eklenen efektlere gelir.

Temel görevleri yerine getiren geliştiricilerin genellikle bu şekilde düşünmediğini fark ettik ve bu yüzden
işleri kolaylaştırmak için `onMount` adında bir alias oluşturduk. `onMount` aslında, sadece takip edilmeyen (non-tracking) bir `createEffect`
çağrısıdır ve asla tekrar çağrılmaz.
Yani `onMount` initial rendering tamamlandıktan hemen sonra sadece bir kere çalışacağından emin olabileceğiniz bir effect çağrısıdır.

`onMount` hook'unu fetch ile beraber resimleri getirmek için kullanalım:
```js
onMount(async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
  setPhotos(await res.json());
});
```

Yaşam döngüleri sadece tarayıcıda çalışır, dolaysıyla `onMount` içerisine kod yazmak SSR sırasında sunucuda çalışmama avantajını sağlar. Bu örnekte veri getirme (fetching) işlemi kullanmış olsak da, genellikle gerçek sunucu/tarayıcı koordinasyonu için Solid'in resource'larını kullanırız.