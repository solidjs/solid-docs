Solid şiddetle shallow immutable modellerin kullanmasını tavsiye eder. Okumaları ve yazmaları ayırarak, bileşen katmanlarından geçerken proxy'mizdeki değişkenlerin izini kaybetme riski olmadan sistemimizin reaktivitesi üzerinde daha iyi kontrol sağlarız. Sinyallere kıyasla Store'larda bu kullanımın getirisi çok daha yüksek olacaktır.

Ancak bazen mutation'ları kullanmak, daha doğrusu mutation'lar kullanıyormuş gibi mantık yürütmek daha kolaydır. Bu nedenle Solid, `setStore` çağrıları içinde Store objesinin yazılabilir bir proxy sürümünü mutate edebilmenize olanak tanıyan Immer'den ilham alan bir `produce` store değiştiricisi sunar.

`produce`, kontrolü elden bırakmadan küçük mutate alanlarına izin vermek için güzel bir araçtır. Event handler'ı şu şekilde değiştirerek `produce`'u Todo örneğimizde kullanalım:

```jsx
const addTodo = (text) => {
  setTodos(
    produce((todos) => {
      todos.push({ id: ++todoId, text, completed: false });
    })
  );
};
const toggleTodo = (id) => {
  setTodos(
    (todo) => todo.id === id,
    produce((todo) => (todo.completed = !todo.completed))
  );
};
```

Store ve `produce` kullanımların bir çoğu için yeterli olacaktır, Solid ayrıca `createMutable` ile kullanılabilen bir mutable Store objesine sahiptir. Internal API'lar için önerilen bir yaklaşım olmasa da bazen interop veya 3. parti sistemlerle uyumluluk için kullanışlı olacaktır.
