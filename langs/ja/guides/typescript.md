---
title: TypeScript
description: Solid を TypeScript で使用するためのヒント 
sort: 3
---
# TypeScript

Solid は、TypeScript で簡単に使用できるよう設計されています。
標準的な JSX を使用すると、TypeScript でコードをほぼ理解でき、API のための洗練された組み込み型も提供されています。

このガイドでは、TypeScript を使用する際や Solid のコードを型付けする際の便利なヒントを紹介します。


## TypeScript の設定

[Solid スターター テンプレート](https://github.com/solidjs/templates/)は、[`tsconfig.json`](https://github.com/solidjs/templates/blob/master/ts/tsconfig.json) を作成するための良い出発点となります。



最も重要なことは、Solid JSX コンパイラーで TypeScript を使用するには、[`"jsx": "preserve"`](https://www.typescriptlang.org/tsconfig#jsx) で JSX コンストラクトを残すように TypeScript を設定する必要があり、また、[`"jsxImportSource": "solid-js"`](https://www.typescriptlang.org/tsconfig#jsxImportSource) で JSX の型の場所を TypeScript に伝える必要があります。




したがって、最小限の `tsconfig.json` は次のようになります:

```json
{
  "compilerOptions": {
    "jsx": "preserve",
    "jsxImportSource": "solid-js"
  }
}
```

コードベースでさまざまな種類の JSX を使用している場合（例えば一部のファイルは React で他のファイルは Solid）、コードの大部分に対して `tsconfig.json` でデフォルトの `jsxImportSource` を設定できます。そして以下のプラグマを使用して、特定の `.tsx` ファイルで [`jsxImportSource` オプションをオーバーライド](https://www.typescriptlang.org/tsconfig#jsxImportSource)します:





```ts
/** @jsxImportSource solid-js */
```

or

```ts
/** @jsxImportSource react */
```

## API の型

Solid は TypeScript で記述されているため、そのままですべてが型付けされています。
[API ドキュメント](https://www.solidjs.com/docs/latest/api)には、すべての API 呼び出しの型が詳細に記載されています。さらに、明示的に型を指定する必要がある場合に Solid の記法を参照しやすくするためのいくつかの有用な型定義も記載されています。


ここでは、いくつかのコアプリミティブを使用した場合の結果の型について説明します。

### Signal

`createSignal<T>` は、Signal に格納されているオブジェクトの型 `T` をパラメータとしています。例えば:


```ts
const [count, setCount] = createSignal<number>();
```

最初の `createSignal` は戻り値が `Signal<number>` で、渡した型に対応しています。これはゲッターとセッターのタプルで、それぞれジェネリック型を持っています:



```ts 
import type { Signal, Accessor, Setter } from 'solid-js';
type Signal<T> = [get: Accessor<T>, set: Setter<T>];
```

この場合、Signal のゲッター `count` は `Accessor<number | undefined>` という型を持っています。`Accessor<T>` は Solid が提供する型定義で、この場合 `() => number | undefined` と等価です。


この例では `createSignal` にデフォルト値を与えていないので `| undefined` が追加されており、Signal の値は実際には `undefined` で始まります。



Signal のセッター `setCount` は `Setter<number>` という型を持っています。これはより複雑な型定義で、おおよそ `(value?: number | ((prev?: number) => number)) => number` に相当し、
渡された引数の 2 つの可能性を表しています： `setCount` には `number` か、前の値（もしあった場合）を受け取り `number` を返す関数のどちらかが渡すことができます。





実際の `Setter` の型はより複雑で、新しい値を決定するために関数を呼び出すのではなく、Signal をその関数の値に設定したい場合に、誤ってセッターに関数を渡してしまうことを検出するためのものです。


もし `setCount(value)` を呼び出したときに TypeScript エラー "Argument ... is not assignable to parameter" が発生したら、`setCount(() => value)` のようにセッター引数をラップして、`value` が呼ばれないようにしてみてください。



##### デフォルト

`createSignal` を呼び出す際に、明示的に Signal の型を指定する必要はありません。また、`createSignal` にデフォルト値を指定することで、型の `| undefined` 部分を避けることができます:



```ts
const [count, setCount] = createSignal(0);
const [name, setName] = createSignal('');
```

この場合、TypeScript は Signal の型がそれぞれ `number` と `string` であると推測します。 したがって、例えば `count` は `Accessor<number>` 型、`name` は `Accessor<string>` 型になります（`| undefined` は除かれる）。



### Context

Signal と同様に、[`createContext<T>`](https://www.solidjs.com/docs/latest/api#createcontext) は、コンテキストの値の型 `T` をパラメータとしています。


この型は明示的に指定できます:

```ts
type Data = {count: number, name: string};
const dataContext = createContext<Data>();
```

この場合、`dataContext` は `Context<Data | undefined>` という型を持っているので、`useContext(dataContext)` は `Data | undefined` という型にマッチする戻り値を持つことになります。


`| undefined` の理由は、現在のコンポーネントの祖先でコンテキストが提供されていない可能性があり、その場合 `useContext` は `undefined` を返すからです。



代わりに `createContext` にデフォルト値を与えれば、型の `| undefined` の部分を避けることができ、多くの場合 `createContext` の型も明示的に指定する必要はなくなります:



```ts
const dataContext = createContext({count: 0, name: ''});
```

この場合、TypeScript は `dataContext` が `Context<{count: number, name: string}>` という型を持つと推論し、これは `Context<Data>`（`| undefined` なし）と等価です。



もう 1 つのよくあるパターンは、コンテキストの値を生成するファクトリー関数を定義することです。 そして TypeScript の [`ReturnType`](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype) 型ヘルパーを使って、その関数の戻り値の型を取得し、それをコンテキストの型として使用できます:





```ts
export const makeCountNameContext = (initialCount = 0, initialName = '') => {
  const [count, setCount] = createSignal(initialCount);
  const [name, setName] = createSignal(initialName);
  return [{count, name}, {setCount, setName}] as const;
    // `as const` はタプルの型推論を矯正します
};
type CountNameContextType = ReturnType<typeof makeCountNameContext>;
export const CountNameContext = createContext<CountNameContextType>();
export const useCountNameContext = () => useContext(CountNameContext);
```

この例では、`CountNameContextType` が `makeCountNameContext` の戻り値に相当します:

```ts
[
  {readonly count: Accessor<number>, readonly name: Accessor<string>},
  {readonly setCount: Setter<number>, readonly setName: Setter<string>}
]
```

また、`useCountNameContext` は `() => CountNameContextType | undefined` という型を持っています。

もし、`undefined` の可能性を回避したいのであれば、コンテキストが使用されるときには常に提供されることを表明すればよいでしょう:

```ts
export const useCountNameContext = () => useContext(CountNameContext)!;
```

これは危険な仮定です。実際に `createContext` にデフォルトの引数を与えて、コンテキストが常に定義されているようにする方が安全でしょう。



## コンポーネントの型

```ts
import type { JSX, Component } from 'solid-js';
type Component<P = {}> = (props: P) => JSX.Element;
```

基本的なコンポーネント関数に型を付けるには、`Component<P>` 型を使用します。ここで `P` は `props` 引数の型で、[object 型](https://www.typescriptlang.org/docs/handbook/2/objects.html) である必要があります。

これにより、正しく型付けされた props が属性として渡され、戻り値は Solid でレンダリングできるものになります。`JSX.Element` は DOM ノード、`JSX.Element` の配列、`JSX.Element` を返す関数、ブール値、`Undefined`/`null` などにできます。



以下はその例です:

```tsx
const Counter: Component = () => {
  const [count, setCount] = createSignal(0);
  return (
    <button onClick={() => setCount((c) => c+1)}>
      {count()}
    </button>
  );
};

<Counter/>;              // good
<Counter initial={5}/>;  // 型エラー: initial の prop はない
<Counter>hi</Counter>    // 型エラー: children の prop はない

const InitCounter: Component<{initial: number}> = (props) => {
  const [count, setCount] = createSignal(props.initial);
  return (
    <button onClick={() => setCount((c) => c+1)}>
      {count()}
    </button>
  );
};

<InitCounter initial={5}/>;  // good
```

もし、コンポーネントに JSX の子要素を持たせたい場合は、明示的に `P` に `children` という型を追加するか、自動的に `children?: JSX.Element` を追加する `ParentComponent` 型を使用することもできます。また、`const` ではなく `function` でコンポーネントを宣言したい場合は、`props` 型のヘルパーである `ParentProps` を使用することもできます。 いくつかの例を挙げると:





```tsx
import { JSX, ParentComponent, ParentProps } from 'solid-js';
type ParentProps<P = {}> = P & { children?: JSX.Element };
type ParentComponent<P = {}> = Component<ParentProps<P>>;

// 等価な型:
//const CustomCounter: Component<{children?: JSX.Element}> = ...
//function CustomCounter(props: ParentProps): JSX.Element { ...
const CustomCounter: ParentComponent = (props) => {
  const [count, setCount] = createSignal(0);
  return (
    <button onClick={() => setCount((c) => c+1)}>
      {count()}
      {props.children}
    </button>
  );
};

// 等価な型:
//const CustomInitCounter: Component<{initial: number, children?: JSX.Element}> = ...
//function CustomInitCounter(props: ParentProps<{initial: number}>): JSX.Element { ...
const CustomInitCounter: ParentComponent<{initial: number}> = (props) => {
  const [count, setCount] = createSignal(props.initial);
  return (
    <button onClick={() => setCount((c) => c+1)}>
      {count()}
      {props.children}
    </button>
  );
};
```

後者の例では、`props` パラメータは自動的に `props: ParentProps<{initial: number}>` の型になります。これは `props: {initial: number, children?: JSX.Element}` と同じです。


（Solid 1.4 以前では `Component` は `ParentComponent` と同等でした）

Solid は `children` を処理するために、他に 2 つの `Component` サブタイプを提供します:

```ts
import {JSX, FlowComponent, FlowProps, VoidComponent, VoidProps} from 'solid-js';
type FlowProps<P = {}, C = JSX.Element> = P & { children: C };
type FlowComponent<P = {}, C = JSX.Element> = Component<FlowProps<P, C>>;
type VoidProps<P = {}> = P & { children?: never };
type VoidComponent<P = {}> = Component<VoidProps<P>>;
```

`VoidComponent` は `children` をサポートしないコンポーネントのためのものです。
`VoidComponent<P>` は、`P` が `children` の型を提供しない場合に、`Component<P>` と同等になります。


`FlowComponent` は Solid の `<Show>` や `<For>` のような「制御フロー」コンポーネントを対象としています。 このようなコンポーネントは一般的に `children` を必要とし、時には `children` に特定の型（単一の関数であること）を要求することがあります。 例えば:




```tsx
const CallMeMaybe: FlowComponent<{when: boolean}, () => void> = (props) => {
  createEffect(() => {
    if (props.when)
      props.children();
  });
  return <>{props.when ? 'Calling' : 'Not Calling'}</>;
};

<CallMeMaybe when={true}/>;  // 型エラー: children が不足
<CallMeMaybe when={true}>hi</CallMeMaybe>;  // 型エラー: children （訳注: の型が違う）
<CallMeMaybe when={true}>
  {() => console.log("Here's my number")}
</CallMeMaybe>;              // good
```

## イベントハンドラー

名前空間 `JSX` は、特に HTML DOM を操作するための便利な型を提供します。提供されているすべての型は [dom-expressions における JSX の定義](https://github.com/ryansolid/dom-expressions/blob/main/packages/dom-expressions/src/jsx.d.ts)を参照してください。




`JSX` 名前空間が提供する便利なヘルパー型のひとつは `JSX.EventHandler<T, E>` で、これは DOM 要素の型 `T` とイベントの型 `E` に対する単一引数のイベントハンドラーを表しています。



これを利用して、JSX の外部で定義する任意のイベントハンドラーに型を付けることができます。
例えば:

```tsx
import type { JSX } from 'solid-js';
const onInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
  console.log('input changed to', event.currentTarget.value);
};

<input onInput={onInput}/>
```

[`on___` JSX 属性](https://www.solidjs.com/docs/latest/api#on___)の中でインラインで定義された（ビルトインイベントタイプを持つ）ハンドラーは、自動的に適切な `JSX.EventHandler` として型付けされます:




```tsx
<input onInput={(event) => {
  console.log('input changed to', event.currentTarget.value);
}}/>;
```

`JSX.EventHandler<T>` は、イベントの [`currentTarget` 属性](https://developer.mozilla.org/ja/docs/Web/API/Event/currentTarget)が `T` 型であることに注意してください（この例では、`event.currentTarget` は `HTMLInputEvent` という型なので、`value` 属性を持っています）。しかし、イベントの [`target` 属性](https://developer.mozilla.org/ja/docs/Web/API/Event/target) は任意の `DOMElement`である可能性があります。





これは、`currentTarget` がイベントハンドラーにアタッチされた要素であり、既知の型を持っているのに対し、`target` はイベントがイベントハンドラーにバブルしたりキャプチャされる原因となったユーザーとのインタラクションであり、任意の DOM 要素になり得るからです。




## ref 属性

`ref` 属性に変数を使用すると、要素がレンダリングされた際、その変数に DOM 要素を代入するように Solid に指示することになります。TypeScript を使用しない場合、これは次のようになります:



```jsx
let divRef;

console.log(divRef); // undefined

onMount(() => {
  console.log(divRef); // <div> element
})

return (
  <div ref={divRef}/>
)
```

これは、その変数に型を付ける際の課題です。`divRef` はレンダリング後にのみ `HTMLDivElement` にセットされますが、`HTMLDivElement` という型をつけるべきでしょうか？
（ここでは TypeScript の `strictNullChecks` モードがオンになっているものとすします。そうでない場合、TypeScript は潜在的な `undefined` の変数を無視します）



TypeScript の最も安全なパターンは、`divRef` が一定期間 `undefined` であることを認識し、使用時に確認することです:


```tsx
let divRef: HTMLDivElement | undefined;

divRef.focus();  // コンパイル時に正しくエラーとして報告される

onMount(() => {
  if (!divRef) return;
  divRef.focus();  // 正しく許可される
});

return (
  <div ref={divRef!}>
    ...
  </div>
);
```

あるいは、`onMount` が呼ばれるのは `<div>` 要素がレンダリングされた後だとわかっているので、`onMount` 内で `divRef` にアクセスする際に [non-null assertion (`!`)](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-) を使用することもできます:




```tsx
onMount(() => {
  divRef!.focus();
});
```

もうひとつの安全なパターンは、`divRef` の型から `undefined` を省略し、`ref` 属性の中で [definite assignment assertion (`!`)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#definite-assignment-assertions) を使用することです:



```tsx
let divRef: HTMLDivElement;

divRef.focus();  // コンパイル時のエラーとして正しく報告される

onMount(() => {
  divRef.focus();  // 正しく許可される
});

return (
  <div ref={divRef!}>
    ...
  </div>
);
```

TypeScript は `ref` 属性が `divRef` 変数に設定されていると想定しているため、`ref={divRef!}` を使用する必要があります。したがって、`divRef` はすでに割り当てられているはずです。Solid ではその逆で、`divRef` は `ref` 属性によって割り当てられます。definite assignment assertion の `divRef!` によって、このことを TypeScript に効果的に納得させます。TypeScript は、この行の後に `divRef`  が割り当てられていることを理解します。







このパターンでは、TypeScript は関数本体の中（JSX ブロックが定義される前）で ref が誤って使用された場合、正しくフラグを立てられます。しかし、TypeScript は現在、ネストされた関数内で未定義の可能性がある変数が使用されてもフラグを立てないようになっています。Solid の文脈では、`createMemo`、`createRenderEffect`、`createComputed` の内部（ref を定義する JSX ブロックの前）では ref を使用しないように注意する必要があります。なぜなら、これらの関数はすぐに呼び出されるため、ref はまだ定義されていないからです（ただし、TypeScript はこれをエラーと判断しません）。







これに対して、先ほどのパターンでは、これらのエラーをキャッチできます。

もう 1 つの一般的ですが、安全性が低いパターンは、変数宣言の時点で定型代入のアサーションを入れるという方法もあります。


```tsx
let divRef!: HTMLDivElement;

divRef.focus();  // エラーが発生するにもかかわらず許可されてしまう

onMount(() => {
  divRef.focus();  // 正しく許可される
});

return (
  <div ref={divRef}>
    ...
  </div>
);
```

この方法は、その変数の代入チェックを効果的にオフにするものです。これは簡単な回避策ですが、さらに注意が必要です。

特に前のパターンとは異なり、ネストされた関数の外側でその変数を早く使っても、誤って許可されてしまいます。


## 制御フローの絞り込み

よくあるパターンは、[`<Show>`](https://www.solidjs.com/docs/latest/api#%3Cshow%3E) を使って、データが定義されているときだけデータを表示することです:



```tsx
const [name, setName] = createSignal<string>();

return (
  <Show when={name()}>
    Hello {name().replace(/\s+/g, '\xa0')}!
  </Show>
);
```

この場合、TypeScript は `name()` の 2 回の呼び出しが同じ値を返すこと、最初の呼び出しが truthy な値を返した場合にのみ 2 回目の呼び出しが行われることを判断できません。そのため、`.replace()`を呼び出そうとすると、`name()` が `undefined` になる可能性があると文句を言うことになります。




この問題に対する回避策を 2 つ紹介します:

1. TypeScript の [non-null assertion operator `!`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-) を使って、2 回目の呼び出しで `name()` が非 NULL になることを手動でアサーションできます:



   ```tsx
   return (
     <Show when={name()}>
       Hello {name()!.replace(/\s+/g, '\xa0')}!
     </Show>
   );
   ```

2. コールバック形式の `<Show>` を使用すると、`when` プロパティの値が truthy である場合にその値を渡すことができます:


   ```tsx
   return (
     <Show when={name()}>
       {(n) =>
         <>Hello {n.replace(/\s+/g, '\xa0')}!</>
       }
     </Show>
   );
   ```

   この場合、`Show` コンポーネントの型は賢いので、TypeScript に対して `n` は truthy なので、`undefined`（または `null` や `false`）にはならないと伝えることができます。



   ただし、この形式の `<Show>` は、`name()` が falsy な値から truthy な値に変わったときだけ行うのではなく、`name()` が変わるたびに子要素全体を一からレンダリングするように強制することに注意してください。


   これは、子要素がきめ細かなリアクティビティ（変更されていない部分を再利用し、変更された部分のみを更新する）の利点を完全に享受できないことを意味します。


## 特殊な JSX 属性とディレクティブ

### `on:___`/`oncapture:___`

Solid の [`on:___`/`oncapture:___` 属性](https://www.solidjs.com/docs/latest/api#on%3A___%2Foncapture%3A___)を使用してカスタムイベントハンドラーを使用する場合は、モジュール `"solid-js"` の `JSX` 名前空間で `CustomEvents` と `CustomCaptureEvents` インターフェイスをオーバーライドし、対応する `Event` オブジェクトの型を定義する必要があります:





```tsx
class NameEvent extends CustomEvent {
  type: 'Name';
  detail: {name: string};

  constructor(name: string) {
    super('Name', {detail: {name}});
  }
}

declare module "solid-js" {
  namespace JSX {
    interface CustomEvents { // on:Name
      "Name": NameEvent;
    }
    interface CustomCaptureEvents { // oncapture:Name
      "Name": NameEvent;
    }
  }
}

<div on:Name={(event) => console.log('name is', event.detail.name)}/>
```

### `prop:___`/`attr:___`

Solid の [`prop:___` 属性](https://www.solidjs.com/docs/latest/api#prop%3A___)で強制プロパティを使用する場合や、Solid の [`attr:___` 属性](https://www.solidjs.com/docs/latest/api#attr%3A___)でカスタム属性を使用する場合、それぞれ `ExplicitProperties` と `ExplicitAttributes` インターフェイスで型を定義できます:






```tsx
declare module "solid-js" {
  namespace JSX {
    interface ExplicitProperties { // prop:___
      count: number;
      name: string;
    }
    interface ExplicitAttributes { // attr:___
      count: number;
      name: string;
    }
  }
}

<Input prop:name={name()} prop:count={count()}/>
<my-web-component attr:name={name()} attr:count={count()}/>
```

### `use:___`

Solid の [`use:___` 属性](https://www.solidjs.com/docs/latest/api#use%3A___)にカスタムディレクティブを定義する場合、`Directives` インターフェイスに以下のように型を付けます:



```tsx
function model(element: HTMLInputElement, value: Accessor<Signal<string>>) {
  const [field, setField] = value();
  createRenderEffect(() => (element.value = field()));
  element.addEventListener("input", (e) => setField(e.target.value));
}

declare module "solid-js" {
  namespace JSX {
    interface Directives {  // use:model
      model: Signal<string>;
    }
  }
}

let [name, setName] = createSignal('');

<input type="text" use:model={[name, setName]} />;
```

ディレクティブ `d` を他のモジュールから `import` していて、`d` がディレクティブ `use:d` としてのみ使用されている場合、TypeScript（より正確には [`babel-preset-typescript`](https://babeljs.io/docs/en/babel-preset-typescript)）はデフォルトで `d` の `import` を削除します（TypeScript は `use:d` が `d` への参照として理解しないため、`d` が型だと思ってしまう）。




この問題を回避する方法は 2 つあります:

1. [babel-preset-typescript` の `onlyRemoveTypeImports: true`](https://babeljs.io/docs/en/babel-preset-typescript#onlyremovetypeimports) 設定オプションを使用して、`import type ...` 以外の `import` は削除しないようにできます。もし、`vite-plugin-solid` を使用しているのであれば、`vite.config.ts` の `solidPlugin({ typescript: { onlyRemoveTypeImports: true } })` でこのオプションを指定できます。







   このオプションは、コードベース全体で `export type` と `import type` を注意深く使用しないと、問題が発生する可能性があることに注意してください。


2. ディレクティブ `d` を持つすべてのモジュールに、`false && d;` のような偽のアクセスを追加する。

   これにより、TypeScript は `d` の `import` を削除しなくなります。また、[Terser](https://terser.org/) などでツリーシェイクしている場合、このコードは最終的にコードバンドルから省かれることになるでしょう。



   よりシンプルな `d;` という偽のアクセスも `import` が削除されるのを防ぎますが、通常はツリーシェイクされないので、最終的なコードバンドルに含まれることになります。
