Solid は、状態の更新に浅いイミュータブルなパターンを使用することを強く推奨します。読み取りと書き込みを分離することで、コンポーネントのレイヤーを通過する際にプロキシの変更を追跡できなくなるリスクなく、システムのリアクティビティをよりよくコントロールできます。これは、Signal に比べてストアの方がより効果的です。

しかし、ミューテーションの方が推論しやすい場合もあります。そのため、Solid は Immer にインスパイアされた `produce` ストア修飾子を提供しており、`setStore` 呼び出し内で Store オブジェクトの書き込み可能なプロキシバージョンを変更できます。

これは、制御を放棄せず、小さな範囲での変更を可能にするための素晴らしいツールです。Todo の例でイベントハンドラーのコードを以下のように置き換えて、`produce` を使ってみましょう:

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

ストアを使った `produce` はおそらく大半のケースに対応していますが、Solid には `createMutable` から利用できる、ミュータブルな Store オブジェクトもあります。内部 API には推奨されない方法ですが、サードパーティシステムとの相互運用や互換性のためには有用な場合があります。
