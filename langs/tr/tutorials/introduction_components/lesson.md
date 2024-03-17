Uygulamalarınızı oluştururken kodunuzu parçalara bölmek isteyebilirsiniz, bu tekrar kullanılabilirlik ve modülerlik konularında yararlı olacaktır. Solid'te bunu yapmanın ana yolu bileşen (component) oluşturmaktır.

Bileşenler temelde `HelloWorld()` - şimdiye kadar kullanmakta olduğumuz - gibi birer fonksiyondur. Bileşenleri özel yapan şey, genellikle JSX döndürmeleri ve diğer bileşenlerde JSX tarafından çağırılabilmeleridir.

Hadi örneğimizde `Nested` bileşenimizi uygulamamıza ekleyelim. Bileşeni başka bir dosyada tanımladık, ancak aynı dosyada birden fazla bileşen de barınabilir. Öncelikle aşağıdaki kodu ekleyelim.

```js
import Nested from "./nested";
```

Sonra bileşenimizi JSX'e ekleyelim. Daha önce bahsedildiği gibi, döndürmek istediğimiz birden fazla elemanımız var, dolayısıyla bu elemanları Fragment ile sarmalıyız.

```jsx
function App() {
  return (
    <>
      <h1>This is a Header</h1>
      <Nested />
    </>
  );
}
```

Ana bileşen ilk kez oluştuğunda `Nested()` fonksiyonunu çalıştıracaktır ve bir daha asla çağırmayacaktır. Sonrasındaki tüm değişiklikler Solid'in önümüzdeki derslerde göreceğimiz reaktivite sistemi tarafından gerçekleştirilecektir.