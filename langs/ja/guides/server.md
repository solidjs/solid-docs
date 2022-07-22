# サーバーサイドレンダリング

Solid は、JSX テンプレートを超効率的な文字列付加コードにコンパイルすることで、サーバーレンダリングを処理します。これは、babel プラグインまたはプリセットで、`generate: "ssr"` を渡すことで実現できます。クライアントとサーバーの両方で、ハイドレーションに対応したコードを生成するには、`hydratable: true` を渡す必要があります。

`solid-js` と `solid-js/web` のランタイムは、node 環境で実行する場合には、非リアクティブな対照物と交換されます。他の環境では、`node` に設定された条件付きエクスポートでサーバーコードをバンドルする必要があります。ほとんどのバンドルツールは、これを行なう方法を持っています。一般的には、エクスポート条件として `solid` を使用することをお勧めします。また、ライブラリは `solid` エクスポートでソースを出荷することをお勧めします。

SSR 用にビルドすると、2 つの別々のバンドルを生成することになるので、若干の設定が必要になります。クライアントのエントリーでは `hydrate` を使用します:

```jsx
import { hydrate } from "solid-js/web";

hydrate(() => <App />, document);
```

_注意: ドキュメントルートからレンダリングとハイドレーションを行うことが可能です。これにより、JSX ですべてのビューを記述できます。_

サーバーのエントリーでは、Solid が提供する 4 つのレンダリングオプションのいずれかを使用できます。それぞれ、出力とドキュメントの先頭に挿入されるスクリプトタグが生成されます。

```jsx
import {
  renderToString,
  renderToStringAsync,
  renderToStream,
} from "solid-js/web";

// 同期文字列レンダリング
const html = renderToString(() => <App />);

// 非同期文字列レンダリング
const html = await renderToStringAsync(() => <App />);

// ストリームレンダリング
const stream = renderToStream(() => <App />);

// Node
stream.pipe(res);

// Web ストリーム（Cloudflare Workers など）
const { readable, writable } = new TransformStream();
stream.pipeTo(writable);
```

便利なように `solid-js/web` は `isServer` フラグをエクスポートします。これは、ほとんどのバンドラーが、このフラグを持つものをツリーシェイクしたり、このフラグを持つコードでのみ使用されるものをクライアントバンドルからインポートしたりできるので便利です。

```jsx
import { isServer } from "solid-js/web";

if (isServer) {
  // サーバーでのみ実行
} else {
  // ブラウザでのみ実行
}
```

## ハイドレーションスクリプト

Solid のランタイムがロードされる前から徐々にハイドレーションさせるためには、特別なスクリプトをページに挿入する必要があります。このスクリプトは、`generateHydrationScript` で生成して挿入するか、`<HydrationScript />` タグを使用して JSX の一部として含めることができます。

```js
import { generateHydrationScript } from "solid-js/web";

const app = renderToString(() => <App />);

const html = `
  <html lang="en">
    <head>
      <title>🔥 Solid SSR 🔥</title>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="/styles.css" />
      ${generateHydrationScript()}
    </head>
    <body>${app}</body>
  </html>
`;
```

```jsx
import { HydrationScript } from "solid-js/web";

const App = () => {
  return (
    <html lang="en">
      <head>
        <title>🔥 Solid SSR 🔥</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles.css" />
        <HydrationScript />
      </head>
      <body>{/*... rest of App*/}</body>
    </html>
  );
};
```

ドキュメントからハイドレーションする場合、クライアントの実行時に利用できないアセットを挿入すると `<head>`タグの下にない場合は問題が発生する可能性があります。Solid は `<NoHydration>` コンポーネントを提供しており、このコンポーネントの子は、サーバー上では通常通り動作しますがブラウザ上ではハイドレーションされません。

```jsx
<NoHydration>
  <ImNotHydrated />
</NoHydration>
```

## 非同期およびストリーミング SSR

これらのメカニズムは、アプリケーションの動作に関する Solid の知識に基づいて構築されています。
先にフェッチしてからレンダリングするのではなく、サーバー上で Suspense と Resource API を使用します。
Solid は、クライアントと同様に、サーバー上でレンダリングしながらフェッチします。
コードも全く同じように書かれています。

非同期レンダリングは、すべてのサスペンス境界が解決するまで待ってから結果を送信します（静的サイト生成の場合はファイルに書き込みます）。

ストリーミングは、同期コンテンツのブラウザへのフラッシュをすぐに開始します。最初は、サーバー上で Suspense フォールバックをレンダリングして、クライアントに送信します。
次に、サーバー上で非同期データの読み込みが終了すると、データと HTML を同じストリームでクライアントに送ります。
ブラウザはジョブを終了し、Suspense を解決して、フォールバックを実際のコンテンツに置き換えます。

この方法の利点:

- サーバーは非同期データが応答するのを待つ必要がありません。アセットはより早くブラウザにロードされ、ユーザーはより早くコンテンツを見始めることができます。
- JAMStack のようなクライアントフェッチに比べて、データのロードはサーバー上ですぐに始まり、クライアントの JavaScript がロードされるのを待つ必要はありません。
- すべてのデータはシリアル化され、サーバーからクライアントに自動的に転送されます。

## SSR の注意点

Solid のアイソモーフィック SSR ソリューションは、どちらの環境でも同じように動作する単一のコードベースとしてコードを書くことができるという点で非常に強力です。しかし、これによってハイドレーションに期待されることがあります。ほとんどの場合、クライアントでレンダリングされるビューは、サーバーでレンダリングされるビューと同じです。テキストに関しては正確である必要はありませんが、マークアップは構造的に同じであるべきです。

サーバーでレンダリングされたマーカーを使用して、サーバー上の要素やリソースの位置を一致させます。このため、クライアントとサーバーは同じコンポーネントを使用する必要があります。これは、Solid がクライアントとサーバーで同じようにレンダリングされることを考えると、通常は問題になりません。しかし、現在のところ、クライアントではハイドレーションされないものをサーバーでレンダリングする手段がありません。現在のところ、ページ全体を部分的にハイドレーションさせて、ハイドレーションマーカーを生成しない方法はありません。それはオール・オア・ナッシングです。部分的なハイドレーションは、将来的に検討したいと考えています。

最後に、すべてのリソースは `render` ツリーで定義する必要があります。リソースは自動的にシリアライズされてブラウザに取り込まれますが、これは `render` メソッドがレンダリングの進行状況を把握しているからです。同様に、サーバーにはリアクティビティがないので、最初のレンダリングで Signal を更新して、ツリーの上位に反映されることを期待してはいけません。サスペンスの境界がある一方で、Solid の SSR は基本的にトップダウンです。

## SSR を始める

SSR の設定には注意が必要です。[solid-ssr](https://github.com/solidjs/solid/blob/main/packages/solid-ssr) パッケージにはいくつかの例があります。

しかし、この経験をよりスムーズにすることを目的とした新しいスターター [SolidStart](https://github.com/solidjs/solid-start) が開発されています。

## 静的サイト生成を始める

[solid-ssr](https://github.com/solidjs/solid/blob/main/packages/solid-ssr) には、静的サイトや事前レンダリングされたサイトを生成するためのユーティリティが同梱されています。詳しくは README をご覧ください。
