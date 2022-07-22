JSX は、これまでの例で見てきた HTML に似た構文で、Solid でコンポーネントを作成する際の中核となるものです。
JSX には動的な式があり、`{ } ` の構文を使用して HTML 内の変数や関数を参照できます。
この例では、div の中に `{name}` を使用して、文字列 `name` を HTML に含めています。同じように、変数 `svg` に直接代入された HTML 要素をインクルードしています。

JSX を使用する他のフレームワークとは異なり、Solid は可能な限り HTML 標準に近づけようとしており、Stack Overflow の回答やデザイナーが作成したテンプレートからコピー&ペーストできるようになっています。

JSX と HTML の間には、JSX が HTML のスーパーセットと見なされないようにするような 3 つの主な違いがあります:
1. JSX には void 要素がありません。つまり、すべての要素に閉じタグまたは自己終了が必要となります。`<input>` や `<br>` のような要素をコピーする際には、この点に注意してください。
2. JSX は単一の要素を返さなければなりません。複数のトップレベル要素を表現するには、Fragment 要素を使用します:

   ```jsx
   <>
     <h1>Title</h1>
     <p>Some Text</p>
   </>
   ```
3. JSX は HTML コメント `<!--...-->` や `<!DOCTYPE>` のような特殊なタグをサポートしていません。

しかし、JSX は SVG をサポートしています。それでは、SVG をコンポーネントに直接コピーしてみましょう:
```jsx
<svg height="300" width="400">
  <defs>
    <linearGradient id="gr1" x1="0%" y1="60%" x2="100%" y2="0%">
      <stop offset="5%" style="stop-color:rgb(255,255,3);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
    </linearGradient>
  </defs>
  <ellipse cx="125" cy="150" rx="100" ry="60" fill="url(#gr1)" />
  Sorry but this browser does not support inline SVG.
</svg>
```
