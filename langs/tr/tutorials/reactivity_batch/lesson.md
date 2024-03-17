Solid'in reaktivitesi synchronous'tur, yani DOM herhangi bir değişiklikten sonraki satırda güncellenmiş hale gelir. Solid'in granular rendering'i sadece reaktif sistemdeki güncellemenin bir yayılımı olduğu için bu çoğunlukla mükemmeldir. İlişkisi bulunmayan değişikliklerin iki kez "render edilmesi" aslında bunun boşuna olduğu anlamına gelmez.

Peki ya değişiklikler arasına ilişki varsa? Solid'in `batch` helper'i birden fazla değişikliği sıraya koymaya ve gözlemcilerine bildirmeden önce hepsini aynı anda uygulamaya izin verir.

Örneğimizde, bir butona tıklandığında her iki ismi de atıyoruz ve bu, işlenen render'lanmış güncellemeyi iki kez tetikliyor. Butona tıkladığınızda log'ları konsolda görebilirsiniz. Öyleyse `set` çağrılarını bir `batch` içerisine saralım.

```js
 const updateNames = () => {
    console.log("Button Clicked");
    batch(() => {
      setFirstName(firstName() + "n");
      setLastName(lastName() + "!");
    })
  }
```
Ve bu kadar, bütün değişiklikler artık bir kere bildiriliyor.