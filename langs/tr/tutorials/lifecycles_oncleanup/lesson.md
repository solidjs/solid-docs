Bazı frameworkler temizleme (cleanup) metotlarını side-effect'lerin veya lifecycle fonksiyonlarının dönüş değerleri olarak eşleştirir/kullanır. Solid render ağacındaki her şey (muhtemelen atıl/durağan) bir Effect'in içinde yaşadığı ve iç içe geçebildiği için `onCleanup`'ı birinci sınıf bir fonksiyon haline getirdik. `onCleanup` Herhangi bir kapsamda çağrılabilir: bu kapsam yeniden değerlendirilmek (re-evaluate) için tetiklendiğinde ve son olarak kaldırıldığında çalışacaktır.

`onCleanup`'ı bileşenlerinizde veya Effect'lerinizde kullanabilirsiniz. Özel tanımladığınız direktiflerde kullanabilirsiniz. Reaktif sistemin senkronize yürütülmesine bağlı olan hemen hemen her yerde kullanabilirsiniz.

Eğitimin giriş bölümündeki sinyal örneği hiçbir zaman kendisini temizlemiyordu, Bu problemi `setInterval` çağrısını aşağıdaki ile değiştirerek düzeltelim:

```js
const timer = setInterval(() => setCount(count() + 1), 1000);
onCleanup(() => clearInterval(timer));
```