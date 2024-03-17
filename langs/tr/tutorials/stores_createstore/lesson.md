Store'lar Sold'in iç içe geçmiş reaktiviteye cevabıdır. Property'leri takip edilebilen proxy objelerdir ve başka objeler içerebilirler. İçerdiği objeler de otomatik olarak proxy ile sarılır.

İşleri hafif tutmak için Solid, yalnızca izleme kapsamları altında erişilen property'ler için temel sinyaller oluşturur. Bu sayede Store'lardaki tüm sinyaller istenildiği gibi lazy şekilde oluşturulur.

`createStore` fonksiyonu, başlangıç değeri alır ve sinyallere benzer bir okuma/yazma tuple'ı döndürür. İlk eleman salt okunur store proxy'sidir, ikinci ise bir setter fonksiyonudur.

Setter fonksiyonu en temel haliyle, property'leri mevcut durumla birleşecek olan bir obje alır. Ayrıca iç içe güncellemeler yapabilmemiz için bir path syntax'ı da destekler. Bu sayede hem reaktivitenin kontrolünü koruyabilir, hem de nokta atışı güncellemeler yapabiliriz.

> Sold'in path syntax'ının bir çok formu vardır ve yineleme ve aralıklar yapmak için bazı güçlü syntax'lar içerir. Tüm kapsamını görmek için API dokümantasyonuna bakın.

Let's look at how much easier it is to achieve nested reactivity with a Store. We can replace the initialization of our component with this:
Gelin Store ile iç içe geçmiş reaktifliğin ne kadar kolay oluşturulduğuna bakalım. Bileşenimizdeki ilgili kısmı değiştirelim:

```js
const [todos, setTodos] = createStore([]);
const addTodo = (text) => {
  setTodos([...todos, { id: ++todoId, text, completed: false }]);
};
const toggleTodo = (id) => {
  setTodos(
    (todo) => todo.id === id,
    "completed",
    (completed) => !completed
  );
};
```

Store'un path syntax'ını önceki state'i almamıza ve iç içe geçmiş değerlerde yeni state'i döndürmemizi olanak tanıyan fonksiyon setter'lar ile kullanıyoruz.

Ve hepsi bu kadar, şablonun geri kalanı da tepki verecektir (onay kutusunu tıklandığında Konsolu kontrol edin)