`<For>` コンポーネントは、オブジェクトの配列をループするための最良の方法です。配列が変更されると、`<For>` は DOM 内のアイテムを再作成するのではなく、更新したり移動したりします。例を見てみましょう。

```jsx
<For each={cats()}>{(cat, i) =>
  <li>
    <a target="_blank" href={`https://www.youtube.com/watch?v=${cat.id}`}>
      {i() + 1}: {cat.name}
    </a>
  </li>
}</For>
```

`<For>` コンポーネントには、ループさせる配列を渡す `each` というプロパティがひとつあります。

そして、`<For>` と `</For>` の間にノードを直接書き込むのではなく、コールバックを渡します。これは、JavaScript の [`map` コールバック](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map#parameters)に似た関数です。配列の各要素に対して、その要素を第一引数、インデックスを第二引数としてコールバックが呼び出されます（この例では `cat` と `i` です）。これらをコールバック内で使用して、レンダリングするノードを返します。

インデックスは定数ではなく、Signal であることに注意してください。これは `<For>` が "参照キー" であるためで、レンダリングする各ノードは配列の要素に結合されています。つまり、ある要素が配列の中で配置を変えた場合、破棄して再作成するのではなく、対応するノードも移動し、そのインデックスが変更されます。

`each` プロパティは配列を想定していますが、 [`Array.from`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/from) や [`Object.keys`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) 、あるいは [`spread syntax`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax) などのユーティリティを使用すれば、他の反復可能オブジェクトを配列に変換できます。
