Resource'lar özellikle Async yüklemeyi işlemek için tasarlanmış özel Sinyallerdir. Amaçları, asenkron değerleri Sold'in dağıtık yürütme modelinde etkileşime girmelerini kolaylaştıracak şekilde sarmaktır. Bu sıralı modeller sağlayan async/await veya generator'ların tam tersidir. Amacı async'in akışı engellemesinin önüne geçmektir.

Resource'lar, bir promise döndüren async data fetcher fonksiyonuna sorgu sağlayan bir kaynak sinyali tarafından yönlendirilebilir. Fetcher fonksiyonun ne olduğu önemli değildir, yani tipik REST endpoint'ine veya GraphQL'e ya da bir promise üreten herhangi bir şeye ulaşmakta kullanılabilir. Resource'lar verilerin yüklenmesi konusunda bilgi sahibi değillerdir yani promise'e bağlı çalışır ve onun tarafından yönlendirilirler.

Ortaya çıkan Resource sinyali, mevcut duruma göre görüntüyü kontrol etmemizi sağlayan reaktif `loading` ve `error` property'lerini de içerir.

Örneğimizde user sinyalini Resource ile değiştirelim:
```js
const [user] = createResource(userId, fetchUser);
```
Ürettiğimiz user, `userId` sinyali tarafından yönetilir ve değişiklik olduğu zaman fetch metodunu çalıştırır, bu kadar.

`createResource`'tan dönen ikinci değer, içerideki Signal'i doğrudan güncellemek için bir `mutate` metodu ve kaynak değişmemiş olsa bile mevcut sorguyu yeniden yüklemek için bir `refetch` metodu içerir.

```js
const [user, { mutate, refetch }] = createResource(userId, fetchUser);
```

`lazy` içeride `createResource` kullanarak dinamik import'ları yönetir.
