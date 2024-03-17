Solid bir öğe üzerinde `className` property'sini ayarlamak için `class` kelimesini kullanır. Ancak class'lara koşul eklemek istediğiniz durumlar olabilir. Bu nedenle Solid, anahtarların class isimleri ve değerin boolean bir ifade olduğu bir obje alan yerleşik bir `classList` JSX attribute'una sahiptir. Boolean karşılığına göre sınıflar uygulanır veya kaldırılır.

Örneğimizde aşağıdaki kodu:

```jsx
<button
  class={current() === 'foo' ? 'selected' : ''}
  onClick={() => setCurrent('foo')}
>foo</button>
```

classList kullanacak şekilde değiştirebiliriz:

```jsx
<button
  classList={{selected: current() === 'foo'}}
  onClick={() => setCurrent('foo')}
>foo</button>
```

CSS modules'tan aldığınız sınıfları dinamik olarak da uygulayabileceğinizi unutmayın:

```jsx
import { active } from "./style.module.css"

<div classList={{ [active]: isActive() }} />
```
