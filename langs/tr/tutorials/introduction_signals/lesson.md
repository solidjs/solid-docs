_Sinyaller_ Solid'te reaktivitenin ana unsurudur. Zaman içinde değişen/değişebilen değerlerden oluşurlar; bir sinyalin değeri değiştiğinde, otomatik olarak o sinyali kullanan diğer her şey de güncellenecektir.

Sinyal oluşturmak için `createSignal` fonksiyonunu `solid-js`'den import edelim ve Counter bileşenimizde aşağıdaki gibi çağıralım:
```jsx
const [count, setCount] = createSignal(0);
```

Create fonksiyonu bir argüman almaktadır ki bu da başlangıç değeridir, sonrasında getter ve setter olmak üzere iki fonksiyondan oluşan bir array döndürür. [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) ile bu fonksiyonları dilediğimiz gibi isimlendirebiliriz. Bizim durumumuzda getter'i `count` setter'i ise `setCount` olarak isimlendirelim.

İlk döndürülen değerin bir getter (mevcut değeri döndüren bir fonksiyon) olduğunu, yani değerin kendisi olmadığına dikkat ediniz. Bunun sebebi framework'ün bu sinyalin nereden okunduğunu takip edebilmesi ve buna göre de güncellemeleri kontrol etmesidir.

Bu derste Javascript'in `setInterval` fonksiyonu ile periyodik olarak artan bir sayaç oluşturacağız. Aşağıdaki kodu Counter bileşenimize ekleyerek `count` sinyalimizi saniyede bir güncelleyebiliriz.

```jsx
setInterval(() => setCount(count() + 1), 1000);
```

Her tikte count'un bir önceki değerini okuyup, 1 ekleyip, yeni değer olarak atıyoruz.

> Solid'de sinyaller parametre olarak fonksiyon da kabul etmektedirler, dolayısıyla bir önceki değeri, yeni değer atamak için kullanabiliriz.
> ```jsx
> setCount(c => c + 1);
> ```

Son olarak sinyali JSX içerisinde okumamız gerekiyor:

```jsx
return <div>Count: {count()}</div>;
```
