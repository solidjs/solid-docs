Solid では、すべてがリアクティブシステムによって左右されるため、ライフサイクル関数はほとんどありません。リアクティブシステムは同期的に作成・更新されるため、唯一のスケジューリングは、更新の最後にプッシュされる Effect になります。

基本的な作業をしている開発者はこのような考え方をしないことが多いので、少し簡単にするために `onMount` というエイリアスを作りました。`onMount` は単なる`createEffect` の呼び出しで、非追跡、つまり再実行されません。これは単なる Effect の呼び出しですが、最初のレンダリングがすべて完了した後、コンポーネントに対して一度だけ実行されることを確信して使用できます。




それでは、`onMount` フックを使って、写真を取得してみましょう:
```js
onMount(async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
  setPhotos(await res.json());
});
```

ライフサイクルはブラウザでしか実行されないので、`onMount` にコードを置くことで、SSR 時にサーバー上で実行されないというメリットがあります。この例ではデータのフェッチを行っていますが、通常は真のサーバー/ブラウザ連携のために Solid の Resource を使用します。
