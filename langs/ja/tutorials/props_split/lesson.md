私達にできる props の操作はマージだけではありません。

props をグループに分けて、そのうちの一部を現在のコンポーネントで使用し、他のものを子コンポーネントに渡すために分割したい場合がよくあります。


この目的のために、Solid には [`splitProps`](/docs/latest/api#splitprops) があります。これは、props オブジェクトと、独自の props オブジェクトに抽出したいキーの配列を 1 つまたは複数受け取ります。props オブジェクトの配列を返します。指定されたキーの配列ごとに 1 つずつの props オブジェクトと、残余引数と同じように残りのキーを含む 1 つの props オブジェクトが入っています。返されたオブジェクトはすべてリアクティビティを保ちます。




今回の例では、`greeting.tsx` 内で分割代入したときにリアクティビティが失われたため、name を変更しても更新されません:
```jsx
export default function Greeting(props) {
  const { greeting, name, ...others } = props;
  return <h3 {...others}>{greeting} {name}</h3>
}
```

代わりに、`splitProps` でリアクティビティを維持できます:
```jsx
export default function Greeting(props) {
  const [local, others] = splitProps(props, ["greeting", "name"]);
  return <h3 {...others}>{local.greeting} {local.name}</h3>
}
```
これで、ボタンは期待通り動作するようになりました。
