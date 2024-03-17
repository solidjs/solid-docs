İç içe güncellemeleri bağımsız olarak işlenebilir olması, Solid'deki incelikli reaktivitenin nedenlerinden biridir. Bir kullanıcı listesine sahip olabilirsiniz, bunun içerisindeki bir ismi güncellediğimizde listenin kendisini değiştirilmeden sadece DOM'daki tek bir konum güncellenir. Bunu çok az framework (reaktif olsalar bile) başarabilmiştir.

Peki bunu nasıl başarıyoruz? Örnekte bir sinyal içerisinde todo listemiz var. Bir todo'yu tamamlandı olarak işaretlemek için, todo bir klon ile değiştirilmelidir. Çoğu framework bu şekilde çalışır, ancak listeyi farklılaştırarak yeniden çalıştırdığımız ve bunun sonucunda - `console.log` ile gösterildiği gibi - DOM elemanları yeniden oluşturulduğu için bu gereksiz bir yük oluşturur.
 
```js
const toggleTodo = (id) => {
  setTodos(
    todos().map((todo) => (todo.id !== id ? todo : { ...todo, completed: !todo.completed })),
  );
};
```

Bunun yerine, Solid ile biz veriyi iç içe geçmiş sinyaller ile oluşturabiliriz:

```js
const addTodo = (text) => {
  const [completed, setCompleted] = createSignal(false);
  setTodos([...todos(), { id: ++todoId, text, completed, setCompleted }]);
};
```

Artık `setCompleted` fonksiyonunu çağırarak herhangi bir ek farklılaştırma oluşturmadan state'i güncelleyebiliriz. Bunun nedeni, karmaşıklığı view'dan alıp veriye taşımış olmamızdır ve verinin nasıl değiştiğini tam olarak bilmekteyiz.

```js
const toggleTodo = (id) => {
  const todo = todos().find((t) => t.id === id);
  if (todo) todo.setCompleted(!todo.completed())
}
```
Kalan `todo.completed` referanslarını `todo.completed()` ile değiştirirseniz, örnek artık bir todo'yu değiştirdiğinizde değil, yalnızca oluşturduğunuzda `console.log`'u çalıştırmaktadır.

Bu elbette bazı manuel eşlemeler gerektir ve geçmişte bizim için mevcut olan tek seçenekti. Ancak artık, proxy'ler ile bu işin çoğunu manuel müdahale olmaksızın arka planda yapabiliriz. Nasıl yapıldığını görmek için sonraki eğitimlerle devam edin.
