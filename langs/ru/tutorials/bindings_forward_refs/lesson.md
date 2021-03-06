Иногда вам будет необходимо передать `ref` из компонента в его родителя. Для этого мы можем использовать `ref` так же, как мы использовали его на нативных элементах. Мы можем использовать `ref` как переменную, которая будет определена или передавать его как функцию-коллбек (`callback function`).

Для того, чтобы это работало автору компонента необходимо прикрепить его к внутреннему элементу. Для этого мы используем `props.ref`. Такая запись превращает любой из варианта создания `ref` и превращает его в коллбек (`callback`). Эта деталь, скорее всего будет скрыта от вас, так как в большинстве случаев вы будете прикреплять `ref` элементам или компонентам в виде атрибута.

Для того, чтобы наш логотип снова был анимирован мы должны передать `ref` в `canvas.tsx`:

```jsx
<canvas ref={props.ref} width="256" height="256" />
```
