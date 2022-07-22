コンテキストはストアのための素晴らしいツールです。インジェクションを処理し、所有権をリアクティブグラフに結びつけ、廃棄を自動的に管理し、Solid のきめ細かいレンダリングにより、レンダリングのオーバーヘッドもありません。

しかし、コンテキストが過剰になることもあります。代替案としては、リアクティブシステムを直接使用することです。例えば、グローバルスコープで Signal を生成し、他のモジュールが使えるように `export` することでグローバルなリアクティブデータストアを構築できます:

```js
import { createSignal } from 'solid-js';

export default createSignal(0);

// どこか別の場所で:
import counter from './counter';
const [count, setCount] = counter;
```

Solid のリアクティビティは普遍的な概念です。コンポーネントの内側か外側かは関係ありません。グローバルな状態とローカルな状態という別々の概念はありません。すべてが同じものなのです。

唯一の制限は、すべての計算（Effect/Memo）がリアクティブルート（`createRoot`）の下で作成される必要があることです。Solid の `render` はこれを自動的に行います。

このチュートリアルでは、`counter.tsx` がそのようなグローバルストアです。これを使用するには、`main.tsx` のコンポーネントを次のように変更します:

```jsx
const { count, doubleCount, increment } = counter;

return (
  <button type="button" onClick={increment}>
    {count()} {doubleCount()}
  </button>
);
```

したがって、計算を含む複雑な独自のグローバルストアを使用する場合は、必ずルートを作成してください。あるいは、コンテキストを使用することをお勧めします。
