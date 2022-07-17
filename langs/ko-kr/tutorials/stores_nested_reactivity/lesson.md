Solid에서 세분화된 반응성을 제공할 수 있는 이유 중 하나는 중첩된 업데이트를 독립적으로 처리할 수 있기 때문입니다.
사용자 리스트가 있고 이 중의 한 사용자 이름을 업데이트한다고 했을 때, Solid는 리스트 자체의 내용을 비교하지 않으면서 DOM 에 있는 이름의 위치만 업데이트합니다. UI 프레임워크 중에서 이런게 가능한 프레임워크는 거의 없습니다. 심지어 리액티프 프레임워크라고 하더라도 말이죠. 

하지만 어떻게 이를 가능하게 했을까요? 이 예제에서는 todo 리스트를 가진 시그널이 있습니다. todo를 완료 상태로 설정하기 위해, todo의 복제를 사용해 기존 항목을 교체합니다. 대부분의 프레임워크에서 이런 방법을 사용하지만, `console.log`에서 볼 수 있듯이 리스트를 비교해서 DOM 엘리먼트를 다시 생성해야하기 때문에 비효율적입니다.

```js
const toggleTodo = (id) => {
  setTodos(
    todos().map((todo) => (todo.id !== id ? todo : { ...todo, completed: !todo.completed })),
  );
};
```

반면에 Solid와 같은 세분화된 라이브러리에서는, 다음과 같이 중첩된 시그널로 데이터를 초기화합니다:

```js
const addTodo = (text) => {
  const [completed, setCompleted] = createSignal(false);
  setTodos([...todos(), { id: ++todoId, text, completed, setCompleted }]);
};
```

이제 추가 비교 작업없이 `setCompleted`를 호출해서 완료 상태를 업데이트할 수 있습니다. 이는 복잡한 부분을 뷰에서 데이터로 이동했기 때문에 가능합니다. 이제 Solid는 데이터가 어떻게 변경되는지를 알 수 있게 됩니다.

```js
const toggleTodo = (id) => {
  const todo = todos().find((t) => t.id === id);
  if (todo) todo.setCompleted(!todo.completed())
}
```
이제 나머지 `todo.completed` 참조 코드를 `todo.completed()`로 변경하게 되면, 예제에서 `console.log`는 생성시에만 실행하며, todo를 토글할 때는 실행하지 않게 됩니다.

이 방법은 수동 매핑이 필요하며, 지금까지는 유일하게 선택 가능한 방법이었습니다. 하지만 지금은 프록시 덕분에 이러한 작업의 대부분을 백그라운드에서 수동 작업없이 가능해졌습니다. 어떻게 하는지는 다음 튜토리얼에서 살펴보겠습니다.
