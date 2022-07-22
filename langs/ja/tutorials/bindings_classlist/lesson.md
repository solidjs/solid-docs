Solid は、要素の `className` プロパティを設定するのに、`class` を使用します。しかし、条件付きでクラスを設定するのが便利な場合もあります。そのため、Solid には組み込みの `classList` JSX 属性があり、キーがクラス名、値が真偽の式であるオブジェクトを受け取ります。true の場合はクラスが適用され、false の場合はクラスが削除されます。

この例では、これを:

```jsx
<button
  class={current() === 'foo' ? 'selected' : ''}
  onClick={() => setCurrent('foo')}
>foo</button>
```

こう置き換えることができます:

```jsx
<button
  classList={{selected: current() === 'foo'}}
  onClick={() => setCurrent('foo')}
>foo</button>
```

CSS モジュールで受け取る時と同じように、動的に名前を付けられることを覚えておいてください:

```jsx
import { active } from "./style.module.css"

<div classList={{ [active]: isActive() }} />
```
