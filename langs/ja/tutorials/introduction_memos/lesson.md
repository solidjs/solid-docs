ほとんどの場合、派生 Signal を合成すれば十分です。しかし、重複した作業を減らすために、値をキャッシュすると有益な場合もあります。Memo を使って関数を評価し、その依存関係が変わるまで結果を保存できます。これは、他の依存関係を持つ Effect の計算をキャッシュしたり、DOM ノードの作成などの高価な操作に必要な作業を軽減するのに適しています。

Memo は Effect のようなオブザーバーであると同時に、読み取り専用の Signal でもあります。Memo は依存関係とオブザーバーの両方を認識しているため、どのような変更でも一度しか実行されないことを保証できます。これにより、Signal に書き込む Effect を登録するよりも好ましいものとなります。一般的に、派生できるものは、派生させるべきです。

Memo の作成は、`solid-js` からインポートできる `createMemo` に関数を渡すだけで簡単です。この例では、クリックするたびに値を再計算するコストが高くなっていきます。これを `createMemo` でラップすると、1 回のクリックで 1 回だけ再計算されます:

```jsx
const fib = createMemo(() => fibonacci(count()));
```
実行頻度を確認するに、`fib` 関数内に `console.log` を設置します:
```jsx
const fib = createMemo(() => {
  console.log("Calculating Fibonacci");
  return fibonacci(count());
});
```
