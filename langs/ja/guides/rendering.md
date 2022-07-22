# レンダリング

Solid は、JSX、タグ付きテンプレートリテラル、および Solid の HyperScript バリアントの 3 つの形式でテンプレートをサポートしていますが、JSX が主流となっています。その理由は？　JSX は、コンパイルのために作られた優れた DSL です。明確な構文を持ち、TypeScript をサポートし、Babel と連携し、Code Syntax Highlighting や Prettier などのツールをサポートしています。基本的にすべてを無料で提供してくれるツールを使うのは現実的なことでした。コンパイルされたソリューションとして、素晴らしい DX を提供します。こんなに広くサポートされているものを使えるのに、なぜカスタム構文 DSL で苦労しているのですか？

## JSX コンパイル

レンダリングは、JSX テンプレートを最適化されたネイティブな js コードに事前コンパイルすることが伴います。JSX コードは以下のように構成されます:

- インスタンス化されるたびに複製されるテンプレート DOM 要素
- firstChild と nextSibling のみを使用する一連の参照宣言
- 作成された要素を更新するためのきめ細かな計算

このアプローチは、document.createElement を使って要素をひとつずつ作成するよりもパフォーマンスが高く、コード量も少なくて済みます。

## 属性とプロパティ

Solid は、属性の大文字小文字を区別しないなど、HTML の慣習を可能な限り反映しようとしています。

ネイティブ要素の JSX のすべての属性の大部分は、DOM 属性として設定されます。静的な値は、複製されるテンプレートに直接組み込まれます。追加の機能を提供する `class`、`style`、`value`、`innerHTML` のようないくつかの例外もあります。

しかし、カスタム要素（ネイティブの組み込みを除く）は動的な場合、プロパティがデフォルトとなります。これは、より複雑なデータ型を扱うためです。これは、標準的なのスネークケースの属性名 `some-attr` をキャメルケース `someAttr` に変換することで実現しています。

しかし、名前空間ディレクティブを使って、この動作を直接制御することは可能です。属性を `attr:` で強制的に指定したり、プロパティを `prop:` で強制的に指定できます:

```jsx
<my-element prop:UniqACC={state.value} attr:title={state.title} />
```

> **注意:** 静的属性は、複製される html テンプレートの一部として作成されます。固定および動的な式は、JSX のバインディング順に後から適用されます。ほとんどの DOM 要素では問題ありませんが、`type='range'`を持つ input 要素のように、順序が重要になるものもあります。要素をバインドする際には、この点に注意してください。

## エントリー

Solid をマウントする最も簡単な方法は、'solid-js/web' から render をインポートすることです。`render` は第一引数に関数、第二引数にマウントコンテナを取り、廃棄メソッドを返します。この `render` は自動的にリアクティブルートを作成し、マウントコンテナへのレンダリングを処理します。最高のパフォーマンスを得るためには、子のない要素を使用してください。

```jsx
import { render } from "solid-js/web";

render(() => <App />, document.getElementById("main"));
```

> **重要** 第一引数は関数である必要があります。そうしないと、リアクティブシステムを適切に追跡し、スケジュールできません。関数ラッパーを省略すると、Effects は実行されなくなります。

## コンポーネント

Solid のコンポーネントは、単なるパスカル（キャピタル）ケースの関数です。最初の引数は props オブジェクトであり、実際の DOM ノードを返します。

```jsx
const Parent = () => (
  <section>
    <Label greeting="Hello">
      <div>John</div>
    </Label>
  </section>
);

const Label = (props) => (
  <>
    <div>{props.greeting}</div>
    {props.children}
  </>
);
```

すべての JSX ノードは実際の DOM ノードなので、トップレベルコンポーネントの唯一の責任は、それらを DOM に追加することです。

## Props

React や Vue、Angular やその他のフレームワークと同様に、Solid ではコンポーネントにプロパティを定義して、子コンポーネントにデータを渡すことができます。ここでは、親コンポーネントが文字列 "Hello" を `greeting` プロパティを介して `Label` コンポーネントに渡しています。

```jsx
const Parent = () => (
  <section>
    <Label greeting="Hello">
      <div>John</div>
    </Label>
  </section>
);
```

上の例では、`greeting` に設定されている値は静的なものですが、動的な値を設定することもできます。例えば:

```jsx
const Parent = () => {
  const [greeting, setGreeting] = createSignal("Hello");

  return (
    <section>
      <Label greeting={greeting()}>
        <div>John</div>
      </Label>
    </section>
  );
};
```

コンポーネントは、`props` という引数を介して渡されたプロパティにアクセスできます。

```jsx
const Label = (props) => (
  <>
    <div>{props.greeting}</div>
    {props.children}
  </>
);
```

他のフレームワークとは異なり、コンポーネントの `props` に対してオブジェクトの分割代入を使用することはできません。舞台裏では、`props` オブジェクトが Object のゲッターに依存して、値を遅延取得するためです。分割代入を使用すると、`props` のリアクティビティが損なわれます。

この例は、Solid で props にアクセスする「正しい」方法を示しています:

```jsx
// ここでは、`props.name` が期待通りに更新されます
const MyComponent = (props) => <div>{props.name}</div>;
```

この例は、Solid での間違った props へのアクセス方法を示しています:

```jsx
// これはだめ
// ここでは、`props.name` は `name` に分解されるため、更新されません（つまり、リアクティブではない）
const MyComponent = ({ name }) => <div>{name}</div>;
```

props オブジェクトは、使っているときは普通のオブジェクトのように見えますが（TypeScript ユーザーは props オブジェクトが普通のオブジェクトのように型付けされていることに気づくでしょう）、実際には Signal に似たリアクティブなオブジェクトです。これにはいくつかの意味があります。

多くの JSX フレームワークとは異なり、Solid の関数コンポーネントは（レンダリングサイクルごとではなく）一度しか実行されないため、以下の例は期待通りには動作しません。

```jsx
import { createSignal } from "solid-js";

const BasicComponent = (props) => {
  const value = props.value || "default";

  return <div>{value}</div>;
};

export default function Form() {
  const [value, setValue] = createSignal("");

  return (
    <div>
      <BasicComponent value={value()} />
      <input type="text" oninput={(e) => setValue(e.currentTarget.value)} />
    </div>
  );
}
```

この例では、おそらく `BasicComponent` が `input` に入力された現在の値を表示することを望んでいます。しかし、覚えておいてほしいのですが、`BasicComponent` 関数は、コンポーネントが最初に作成されたときに一度だけ実行されます。このとき（作成時）、`props.value` は `''` と等しくなります。これは、`BasicComponent` の `const value` が `'default'` に解決され、更新されないことを意味します。`props` オブジェクトはリアクティブですが、`const value = props.value || 'default';` で props にアクセスすることは、Solid の観察可能な範囲外であるため、props が変更されても自動的に再評価されません。

では、この問題を解決するにはどうすればよいのでしょうか？

一般的には、Solid が観測できる場所で `props` にアクセスする必要があります。一般的には、JSX 内部や、`createMemo`、`createEffect`、または thunk（`() => ...` 訳注: 引数を取らず値を返す関数のこと）の内部を意味します。ここでは、期待通りに動作する 1 つのソリューションを紹介します:

```jsx
const BasicComponent = (props) => {
  return <div>{props.value || "default"}</div>;
};
```

これは、同等に、関数に巻き上げることができます:

```jsx
const BasicComponent = (props) => {
  const value = () => props.value || "default";

  return <div>{value()}</div>;
};
```

もうひとつの選択肢として、コストのかかる計算の場合は `createMemo` を使う方法もあります。例えば:

```jsx
const BasicComponent = (props) => {
  const value = createMemo(() => props.value || "default");

  return <div>{value()}</div>;
};
```

あるいはヘルパーを使用する

```jsx
const BasicComponent = (props) => {
  props = mergeProps({ value: "default" }, props);

  return <div>{props.value}</div>;
};
```

注意として、以下の例は動作**しません**:

```jsx
// だめ
const BasicComponent = (props) => {
  const { value: valueProp } = props;
  const value = createMemo(() => valueProp || "default");
  return <div>{value()}</div>;
};

// だめ
const BasicComponent = (props) => {
  const valueProp = props.value;
  const value = createMemo(() => valueProp || "default");
  return <div>{value()}</div>;
};
```

Solid のコンポーネントは、そのパフォーマンスの重要な部分です。Solid の「消える」コンポーネントのアプローチは、遅延 props 評価によって実現されています。props の式をすぐに評価して値を渡すのではなく、子で props にアクセスするまで実行を延期します。そうすることで、最後の瞬間まで実行を延期し、通常は DOM バインディングの中で実行し、パフォーマンスを最大化します。これにより、階層がフラットになり、コンポーネントのツリーを維持する必要がなくなります。

```jsx
<Component prop1="static" prop2={state.dynamic} />;

// だいたいこのようにコンパイルされます:

// コンポーネント本体を分離し、コストのかかる更新を防ぐために、追跡を解除します
untrack(() =>
  Component({
    prop1: "static",
    // 動的な式なので、ゲッターでラップ
    get prop2() {
      return state.dynamic;
    },
  })
);
```

リアクティビティを維持するために、Solid にはいくつかの props ヘルパーがあります:

```jsx
// デフォルト props
props = mergeProps({ name: "Smith" }, props);

// props の複製
const newProps = mergeProps(props);

// props のマージ
props = mergeProps(props, otherProps);

// props を複数の props オブジェクトに分割
const [local, others] = splitProps(props, ["class"])
<div {...others} class={cx(local.class, theme.component)} />
theme.component)} />
```

## Children

Solid は React と同様に JSX Children を扱います。単一の子は `props.children` の単一の値で、複数の子は値の配列で処理されます。通常は、JSX ビューにそれらを渡します。しかし、それらを操作したい場合は、下流の制御フローを解決して Memo を返す `children` ヘルパーを使用することをお勧めします。

```jsx
// 単一の子
const Label = (props) => <div class="label">Hi, { props.children }</div>

<Label><span>Josie</span></Label>

// 複数の子
const List = (props) => <div>{props.children}</div>;

<List>
  <div>First</div>
  {state.expression}
  <Label>Judith</Label>
</List>

// 子の配列を map 処理
const List = (props) => <ul>
  <For each={props.children}>{item => <li>{item}</li>}</For>
</ul>;

// ヘルパーを使って、子の配列の変更と map 処理
const List = (props) => {
  // children ヘルパーは値を記憶し、すべての中間的なリアクティビティを解決します
  const memo = children(() => props.children);
  createEffect(() => {
    const children = memo();
    children.forEach((c) => c.classList.add("list-child"))
  })
  return <ul>
    <For each={memo()}>{item => <li>{item}</li>}</For>
  </ul>;
```

**重要:** Solid は子タグを高価な式として扱い、動的なリアクティブ式と同じようにラップします。つまり、`prop` へのアクセス時に遅延的に評価されます。ビューで使用する前に分割代入したり、複数回アクセスすることには注意してください。これは、Solid には事前に仮想 DOM ノードを作成してから差分を取るような余裕がないため、これらの `prop` の解決は遅延的かつ慎重に行わなければならないためです。これを行いたい場合は、`children` ヘルパーを使用すると、それらがメモ化されます。
