JSX gerçek DOM elemanları oluşturduğu için Solid'de atama yoluyla her zaman bir DOM elemanına referans alabilirsiniz. Örneğin:

```jsx
const myDiv = <div>My Element</div>;
```

Ancak Solid'in eleman oluşturma optimizasyonu açısından, elemanları ayırmamanın ve tek bir bitişik JSX şablonu şeklinde kullanmanın yararı vardır.

Bu durumda `ref` attribute'u ile Solid'deki bir elemanı referans alabilirsiniz. Ref'ler temel olarak yukarıdaki örnekte olduğu gibi birer atamadır, oluşturulma aşamasında yani belge DOM'a eklenmeden önce atanırlar. Bir değişken tanımlayın, `ref` attribute'una atayın ve değişken atanacaktır:

```jsx
let myDiv;

<div ref={myDiv}>My Element</div>
```

Örneğimizde canvas elemanına referans alalım ve animasyon ekleyelim:

```jsx
<canvas ref={canvas} width="256" height="256" />
```

Ref'ler ayrıca bir callback fonksiyonu biçiminde de kullanılabilir. Böylece, mantığı encapsulate etmek için, özellikle de elemanlar eklenene kadar beklemeniz gerekmediğinde, kullanışlı olabilirler. Örneğin:

```jsx
<div ref={el => /* do something with el... */}>My Element</div>
```
