# はじめに

**私たちは新しいドキュメントに取り組んでいます。** 新しい初心者向けチュートリアルは[こちら](https://docs.solidjs.com/tutorials/getting-started-with-solid/)チェックできます。また、[Discord](http://discord.com/invite/solidjs) で私たちの活動に参加してください！

## Solid を見る

Solid のコア コンセプトの概要を簡単に説明した動画をご覧ください:

- [Solid in 100 seconds](https://youtu.be/hw3Bx5vxKl0)
- [Solid reactivity in 10 minutes](https://youtu.be/J70HXl1KhWE)

## Solid を試す

Solid を使い始める最も簡単な方法は、オンラインで試すことです。https://playground.solidjs.com の REPL は、アイデアを試すのに最適な方法です。また、いくつかの[サンプル](https://github.com/solidjs/solid/blob/main/documentation/resources/examples.md)を編集できる https://codesandbox.io/ もあります。

また、ターミナルで以下のコマンドを実行して、 [Vite テンプレート](https://github.com/solidjs/templates) を使用することもできます:

```sh
> npx degit solidjs/templates/js my-app
> cd my-app
> npm i # or yarn or pnpm
> npm run dev # or yarn or pnpm
```

または TypeScript 向けに:

```sh
> npx degit solidjs/templates/ts my-app
> cd my-app
> npm i # or yarn or pnpm
> npm run dev # or yarn or pnpm
```

もしくはプロジェクトに依存関係をインストールできます。Solid を JSX で使用する場合（推奨）、`solid-js` NPM ライブラリーと z[Solid JSX コンパイラー](https://github.com/ryansolid/dom-expressions/tree/main/packages/babel-plugin-jsx-dom-expressions) Babel プラグインをインストールする必要があります:




```sh
> npm install solid-js babel-preset-solid
```

そして、`babel-preset-solid` を `.babelrc` か、webpack や rollup の Babel の設定に追加してください:

```json
"presets": ["solid"]
```

TypeScript の場合、Solid の JSX を処理するために `tsconfig.json` を以下のように設定します（詳細は [TypeScript ガイド](https://www.solidjs.com/guides/typescript)を参照してください）:



```json
"compilerOptions": {
  "jsx": "preserve",
  "jsxImportSource": "solid-js",
}
```

## Solid を学ぶ

Solid はアプリケーションの構成要素として機能する、合成可能な小さなピースがすべてです。これらの部品は主に、多くの浅いトップレベル API を構成する関数です。幸いなことに、これらのほとんどについて知らなくても始めることができます。

自由に使える構成要素には、主にコンポーネントとリアクティブプリミティブの 2 種類があります。

コンポーネントは、props オブジェクトを受け取り、ネイティブの DOM 要素や他のコンポーネントを含む JSX 要素を返す関数です。これらはパスカルケースの JSX 要素として表現できます:

```jsx
function MyComponent(props) {
  return <div>Hello {props.name}</div>;
}

<MyComponent name="Solid" />;
```

コンポーネントは、それ自体がステートフルではなく、インスタンスを持たないという点で軽量です。代わりに、DOM 要素やリアクティブプリミティブのファクトリ関数として機能します。

Solid のきめ細かいリアクティビティは、Signal、Memo、Effect の 3 つのコアプリミティブで構築されています。これらが一緒になって、ビューを最新の状態に保つための自動追跡同期エンジンを形成します。リアクティブな計算は、同期的に実行されるシンプルな関数でラップされた式の形をしています。

```js
const [first, setFirst] = createSignal("JSON");
const [last, setLast] = createSignal("Bourne");

createEffect(() => console.log(`${first()} ${last()}`));
```

[Solid のリアクティビティ](/guides/reactivity)と [Solid のレンダリング](/guides/rendering)の詳細をご覧いただけます。

## Solid に考える

Solid の設計には、Web サイトやアプリケーションを構築する上で、どのような原則や価値観が最適なのかといういくつもの意見が込められています。Solid の背後にある哲学を知っていれば、Solid を習得し、使うことが容易になるでしょう。

### 1. 宣言型データ

宣言型データとは、データの動作の記述を宣言に結びつけることです。データの動作のすべての側面を 1 つの場所にパッケージ化することで、簡単に構成できます。

### 2. 消えるコンポーネント

更新を考慮せずにコンポーネントを構造化することは難しいです。Solid の更新はコンポーネントから完全に独立しています。コンポーネント関数は一度呼び出されると消滅してしまいます。コンポーネントはコードを整理するために存在し、他の用途はあまりありません。

### 3. リード/ライトの分離

正確な制御と予測可能性がより良いシステムを作ります。一方通行のフローを強制するための真の不変性は必要ありませんが、どの使用者が書き込んでいいか/いけないかを意識的に決定する能力があればよいのです。

### 4. シンプルはイージーに勝る

きめ細やかなリアクティビティのために苦労して得た教訓です。明示的で一貫性のある規約は、より多くの努力が必要な場合でも、それだけの価値があります。目的は、基盤となる最小限のツールを提供することです。

## Web コンポーネント

Solid は、Web コンポーネントを第一級市民として持ちたいという願望を持って生まれました。時とともに、その設計は進化し、目標も変わりました。しかし、Solid は依然として Web コンポーネントを作成するための優れた方法です。[Solid Element](https://github.com/solidjs/solid/tree/main/packages/solid-element) を使うと Solid の関数コンポーネントを記述、ラップして、小さくてパフォーマンスの高い Web コンポーネントを作成できます。Solid アプリの内部では、Solid Element は Solid の Context API を活用でき、Solid の Portal は Shadow DOM の隔離されたスタイルをサポートします。

## サーバーレンダリング

Solid は、真のアイソモーフィックな開発を可能にする動的なサーバーサイドレンダリングソリューションを備えています。Solid の Resource プリミティブを使用することで非同期データのリクエストが簡単にでき、さらに重要なことに、クライアントとブラウザの間で自動的にシリアライズおよび同期されます。

Solid はサーバー上での非同期レンダリングとストリームレンダリングをサポートしているため、コードを一方的に記述し、それをサーバー上で実行できます。つまり、[render-as-you-fetch](https://reactjs.org/docs/concurrent-mode-suspense.html#approach-3-render-as-you-fetch-using-suspense) やコード分割などの機能が Solid でも機能するということです。

詳細については、[サーバーガイド](/guides/server#サーバーサイドレンダリング)をご覧ください。

## ビルドなしの選択肢

プレーン HTML ファイルや https://codepen.io などの非コンパイル環境で Solid を使用する必要がある場合、Solid のコンパイル時に最適化された JSX 構文ではなく、プレーン JavaScript で [` html`` ` Tagged Template Literals](https://github.com/solidjs/solid/tree/main/packages/solid/html) または [HyperScript の `h()` 関数](https://github.com/solidjs/solid/tree/main/packages/solid/h)を使用できます。

[Skypack](https://www.skypack.dev/) を使って、ブラウザから直接実行することもできます。例えば:

```html
<html>
  <body>
    <script type="module">
      import {
        createSignal,
        onCleanup,
      } from "https://cdn.skypack.dev/solid-js";
      import { render } from "https://cdn.skypack.dev/solid-js/web";
      import html from "https://cdn.skypack.dev/solid-js/html";

      const App = () => {
        const [count, setCount] = createSignal(0),
          timer = setInterval(() => setCount(count() + 1), 1000);
        onCleanup(() => clearInterval(timer));
        return html`<div>${count}</div>`;
        // もしくは
        return h("div", {}, count);
      };
      render(App, document.body);
    </script>
  </body>
</html>
```

ビルドレス化の利点はトレードオフを伴います:

- 式は常にゲッター関数でラップされる必要があり、そうしないとリアクティブになりません。
  次のコードは `first` や `last` の値が変更されても更新されません。テンプレートが内部で作成するエフェクトの中で値にアクセスしないため、依存関係が追跡されないからです:
  ```js
  html` <h1>Hello ${first() + " " + last()}</h1> `;
  // or
  h("h1", {}, "Hello ", first() + " " + last());
  ```
  テンプレートはエフェクト内のゲッターから読み込まれ、依存関係が追跡されるため、`first` や `last` が変更されると、以下のように期待通りに更新されます:
  ```js
  html` <h1>Hello ${() => first() + " " + last()}</h1> `;
  // or
  h("h1", {}, "Hello ", () => first() + " " + last());
  ```
  Solid の JSX はコンパイル時の能力によりこの問題はなく、`<h1>Hello {first() + ' ' + last()}</h1>` のような式はリアクティブに動作します。
- Solid JSX のようにビルド時の最適化が行われないため、各テンプレートが最初に実行されるときにランタイムでコンパイルされるため、アプリの起動速度がわずかに遅くなりますが、多くのユースケースでこのパフォーマンスの低下は気にならない程度になります。` html`` ` テンプレートタグを使用しても、JSX と同様に起動後の処理速度は変わりません。`h()` の呼び出しは、実行前にテンプレート全体を静的に解析できないため、常に進行速度が遅くなります。

TypeScript でこれらを動作させるには、対応する DOM Expressions ライブラリが必要です。タグ付きテンプレートリテラルは [Lit DOM Expressions](https://github.com/ryansolid/dom-expressions/tree/main/packages/lit-dom-expressions) で、HyperScript は [Hyper DOM Expressions](https://github.com/ryansolid/dom-expressions/tree/main/packages/hyper-dom-expressions) で利用できます。
