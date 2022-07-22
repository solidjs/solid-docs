ストアは多くの場合、Solid のストアプロキシを使用して Solid で作成されます。時には、Redux、Apollo、XState などのイミュータブルなライブラリとインターフェイスでつなぎ、これらに対して粒度の高い更新を行う必要があります。

この例では、Redux の基本的なラッパーを用意しています。その実装は `useRedux.tsx` で見ることができます。ストアの定義とアクションは残りのファイルにあります。

中心となる動作は、Store オブジェクトを作成し、Redux のストアを購読して、更新時に状態を更新するというものです。

```js
const [state, setState] = createStore(store.getState());
const unsubscribe = store.subscribe(
  () => setState(store.getState())
);
```
デモをクリックしてアイテムを追加したり、チェックしたりすると、かなりうまくいっているように見えます。しかし、明白でないのは、レンダリングが非効率的であるということです。作成時だけでなく、ボックスをチェックするたびに console.log が表示されていることに注目してください。

その理由は、Solid はデフォルトでは差分を取らないためです。新しいアイテムを新しいものとみなして置き換えてしまうのです。データが細かく変化する場合は、差分を取る必要はありません。しかし、もしやる場合は？

Solid は差分を取るためのメソッド `reconcile` を提供しています。これは `setStore` の呼び出しを強化するもので、イミュータブルなソースからのデータを差分して、細かい更新のみを通知できます。

では、このコードを次のように更新してみましょう:
```js
const [state, setState] = createStore(store.getState());
const unsubscribe = store.subscribe(
  () => setState(reconcile(store.getState()))
);
```
これで、この例は期待通りに動作し、作成時にだけ create のコードを実行ようになりました。

これはこの問題を解決する唯一の方法ではなく、一部のフレームワークでテンプレートループフローに `key` プロパティがあるのを見たことがあるでしょう。問題は、それをテンプレートのデフォルト部分にすることにより、コンパイル済みのフレームワークであっても、リストの一致を常に実行する必要があり、潜在的な変更のためにすべての子の差分を常に取る必要があることです。データ中心のアプローチでは、テンプレートの外でもこれを適用できるだけでなく、オプトインもできます。内部の状態管理にはこれが必要ないことを考える場合、デフォルトで最高のパフォーマンスが得られることになります。

もちろん、必要に応じて `reconcile` を使うことは問題ありません。シンプルな reducer がデータの更新を整理するのに最適な方法であることもあります。`reconcile` は、独自の `useReducer` プリミティブを作ることで、ここで威力を発揮します:

```js
const useReducer = (reducer, state) => {
  const [store, setStore] = createStore(state);
  const dispatch = (action) => {
    state = reducer(state, action);
    setStore(reconcile(state));
  }
  return [store, dispatch];
};
```

`reconcile` の動作は設定可能です。カスタムの `key` を設定ができ、構造的に複製することを無視して葉ノードのみを差分する `merge` オプションもあります。
