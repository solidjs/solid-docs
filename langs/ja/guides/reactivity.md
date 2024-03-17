# リアクティビティ

Solid のデータ管理は、すべての更新を担当する一連の柔軟なリアクティブプリミティブで構築されています。MobX や Vue と非常に似たアプローチをとっていますが、仮想 DOM のために粒度を変えることはありません。Effect や JSX ビューのコードでリアクティブな値にアクセスすると、依存関係が自動的に追跡されます。

Solid のプリミティブは、主にタプルを返す `create` を呼び出す形で提供されています。大抵の場合、タプルの最初の要素は読み取り可能なプリミティブで、2 番目の要素はセッターです。読み取り可能な部分のみをプリミティブ名で参照するのが一般的です。

これは `count` Signal の変更に基づいて更新される、基本的な自動インクリメントカウンターです。

```jsx
import { createSignal, onCleanup } from "solid-js";
import { render } from "solid-js/web";

const App = () => {
  const [count, setCount] = createSignal(0),
    timer = setInterval(() => setCount(count() + 1), 1000);
  onCleanup(() => clearInterval(timer));

  return <div>{count()}</div>;
};

render(() => <App />, document.getElementById("app"));
```

## プリミティブの紹介

Solid は、Signal、Memo、Effect の 3 つの主要なプリミティブで構成されています。これらのプリミティブの核となるのは、Memo と Effect をラップすることで Signal（と Memo）を追跡するオブザーバーパターンです。

Signal は最もコアとなるプリミティブです。Signal には値が含まれており、読み書きされたときにインターセプトできるように get と set の関数が用意されています。

```js
const [count, setCount] = createSignal(0);
```

Effect は、Signal の読み込みをラップし、依存する Signal の値が変更されるたびに再実行する関数です。これは、レンダリングなどの副作用を作成するのに便利です。

```js
createEffect(() => console.log("The latest count is", count()));
```

最後に、Memo はキャッシュされた派生値です。Memo は Signal と Effect の両方の特性を持っています。依存する Signal を追跡し、それらが変更されたときにのみ再実行され、Memo 自体も追跡可能な Signal です。

```js
const fullName = createMemo(() => `${firstName()} ${lastName()}`);
```

## 動作の仕組み

Signal は、サブスクリプションのリストを保持するイベントエミッタです。Signal は、値が変わるたびにサブスクライバーに通知します。

さらに興味深いのは、これらのサブスクリプションがどのように行われるかということです。Solid は自動的な依存関係追跡を使用しています。データが変更されると自動的に更新されます。

この秘訣は、ランタイムのグローバルスタックにあります。Effect や Memo が開発者から提供された関数を実行（または再実行）する前に、そのスタックに自分自身をプッシュします。そして、読み込まれた Signal は、スタック上に現在のリスナーがあるかどうかをチェックし、あればそのリスナーをサブスクリプションに追加します。

このように考えることができます:

```js
function createSignal(value) {
  const subscribers = new Set();

  const read = () => {
    const listener = getCurrentListener();
    if (listener) subscribers.add(listener);
    return value;
  };

  const write = (nextValue) => {
    value = nextValue;
    for (const sub of subscribers) sub.run();
  };

  return [read, write];
}
```

これで、Signal を更新するたびに、どの Effect を再実行すればよいかがわかります。シンプルで効果的です。実際の実装はもっと複雑ですが、これが、起こっていることの根幹です。

リアクティビティの仕組みをより詳しく理解するには、以下の記事が役立ちます:

[A Hands-on Introduction to Fine-Grained Reactivity](https://dev.to/ryansolid/a-hands-on-introduction-to-fine-grained-reactivity-3ndf)

[Building a Reactive Library from Scratch](https://dev.to/ryansolid/building-a-reactive-library-from-scratch-1i0p)

[SolidJS: Reactivity to Rendering](https://angularindepth.com/posts/1289/solidjs-reactivity-to-rendering)

## 考慮すべき点

リアクティビティに対するこのアプローチは、非常にパワフルでダイナミックです。条件付きコードの異なるブランチを実行することで、依存関係がその場で変化することに対応できます。また、何段階もの間接参照でも機能します。追跡スコープ内で実行された関数もすべて追跡されます。

ただし、注意しなければならない重要な動作とトレードオフがいくつかあります。

1. すべてのリアクティビティは、直接またはゲッター/プロキシの下に隠されているかどうかにかかわらず関数の呼び出しから追跡され、プロパティアクセスによってトリガーされます。つまり、どこでリアクティブオブジェクトのプロパティにアクセスするかが重要になります。

2. 制御フローからのコンポーネントやコールバックは、スコープを追跡せず、一度しか実行されません。つまり、コンポーネント内のトップレベルでロジックを実行したり分割代入しても、再実行されないということです。コードのその部分を再評価するためには、他のリアクティブプリミティブや JSX からこれらの Signal、Store、props にアクセスする必要があります。

3. この方法では、同期的にしか追跡できません。Effect で setTimeout があったり、async 関数を使用したりしても、事後に非同期を実行するコードは追跡されません。
