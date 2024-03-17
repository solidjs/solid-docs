Solid verileri props olarak geçirmeye gerek olmaksızın aktarmak için bir Context API sağlar. Bu, sinyalleri ve store'ları paylaşmak için kullanışlı olabilir. Context kullanımı, reaktif sistemin bir parçası olarak oluşturulma ve sistem tarafından yönetilme avantajına sahiptir.

Başlamak için bir Context objesini oluşturuyoruz. Bu obje, verilerimizi enjekte etmek için kullanılan bir `Provider` bileşeni içerir. Bununla birlikte, `Provider` bileşenlerini ve `useContext` consumer'ların belirli Context için önceden yapılandırılmış sürümleri ile sarmak yaygın bir kullanımdır.

Bu derste de tam olarak bunu yapıyoruz. Basit bir counter (sayaç) store'unun tanımını `counter.tsx` dosyasında görebilirsiniz.

Context'i kullanmak için öncelikle App bileşenimizi global olarak sağlamak üzere saralım. Sarmaladığımız `CounterProvider`'ı kullanacağız. Son olarak count'u başlangıç değeri 1 olacak şekilde düzenleyelim.

```jsx
render(() => (
  <CounterProvider count={1}>
    <App />
  </CounterProvider>
), document.getElementById("app"));
```

Sonra, `nested.tsx` bileşenimizdeki counter context'ini consume etmemiz gerekiyor. Bunu, sarılmış `useCounter` consumer'ini kullanarak yapabiliriz:

```jsx
const [count, { increment, decrement }] = useCounter();
return (
  <>
    <div>{count()}</div>
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
  </>
);
```