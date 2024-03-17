# 반응성

Solid의 데이터 관리는 모든 업데이트를 담당하는 일련의 유연한 리액티브 프리미티브들로 구축됩니다. MobX 또는 Vue와 유사한 접근 방식을 사용하지만, 가상 DOM을 사용하지 않습니다. 이펙트와 JSX 뷰 코드에서 리액티브 값에 접근하는 경우, 디펜던시는 자동으로 추적됩니다.

Solid의 프리미티브들은 주로 튜플을 반환하는 `create` 함수를 호출하는 형태로 제공되며, 일반적으로 첫 번째 요소는 getter 이며, 두 번째 요소는 setter 입니다. 일반적으로 프리미티브 이름으로 getter만 참조합니다.

다음은 `count` 시그널 변경에 따라 자동 증가되는 카운터입니다.

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

## 프리미티브 소개

Solid 는 시그널, 메모, 이펙트의 세 가지 주요 프리미티브들로 구성됩니다. 그 핵심은 메모와 이펙트를 래핑하여 시그널(및 메모)을 추적하는 옵저버 패턴입니다.

시그널은 가장 핵심적인 프리미티브입니다. 여기에는 값과 함께 get/set 함수를 포함하고 있어, 읽고 쓸 때 인터셉터할 수 있습니다.

```js
const [count, setCount] = createSignal(0);
```

이펙트는 시그널 읽기를 래핑해서, 관련 시그널의 값이 변경될 때마다 재실행되는 함수입니다. 렌더링과 같은 사이드 이펙트를 생성하는데 유용합니다.

```js
createEffect(() => console.log("The latest count is", count()));
```

마지막으로 메모는 캐시된 파생 값으로 시그널과 이펙트의 속성을 공유합니다. 관련 시그널을 추적하고, 변경시에만 다시 실행되며, 메모 자체도 추적 가능한 시그널입니다.

```js
const fullName = createMemo(() => `${firstName()} ${lastName()}`);
```

## 작동 방식

시그널은 구독 목록을 보유하는 이벤트 이미터<sub>Emitter</sub>입니다. 시그널은 값이 변경될 때마다 구독자에게 알립니다.

흥미로운 점은 이러한 구독이 발생하는 방식입니다. Solid는 자동 종속성 추적을 사용하며, 데이터가 변경되면 자동으로 업데이트됩니다.

이 비결은 런타임의 글로벌 스택에 있습니다. 이펙트 또는 메모는 개발자가 제공한 함수를 실행(또는 재실행)하기 전에 스택에 자신을 푸시합니다. 그런 다음 읽은 모든 시그널은 스택에 현재 리스너가 있는지 확인하고 있으면 리스너를 해당 구독에 추가합니다.

다음과 같이 생각할 수 있습니다:

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

이제 시그널을 업데이트할 때마다 어떤 이펙트를 다시 실행할지 알 수 있습니다. 간단하고 효과적입니다. 실제 구현은 이보다 훨씬 더 복잡하지만, 실제 일어나는 일의 핵심은 위의 코드와 같습니다.

반응성의 작동방식을 더 자세히 이해하려면 다음 문서들을 참조하세요:

[A Hands-on Introduction to Fine-Grained Reactivity](https://dev.to/ryansolid/a-hands-on-introduction-to-fine-grained-reactivity-3ndf)

[Building a Reactive Library from Scratch](https://dev.to/ryansolid/building-a-reactive-library-from-scratch-1i0p)

[SolidJS: Reactivity to Rendering](https://angularindepth.com/posts/1289/solidjs-reactivity-to-rendering)

## 고려 사항

반응성에 대한 이 접근 방식은 매우 강력하고 동적입니다. 조건문의 다른 분기 코드를 실행해서 종속성이 동적으로 변경되는 것을 처리할 수 있습니다. 또한 여러 단계의 간접 참조에서도 작동합니다. 추적 범위 내에서 실행되는 모든 함수도 추적됩니다.

하지만, 주의해야할 몇 가지 중요한 동작과 트레이드오프가 있습니다.

1. 모든 반응성은 직접 함수 호출 또는 getter/프록시 아래에 숨겨저 있는 속성에 접근할 때 트리거되는 함수 호출에서 추적됩니다. 즉, 리액티브 객체의 속성에 접근하는 위치가 중요합니다.

2. 제어 흐름의 컴포넌트와 콜백은 추적하지 않으며 한 번만 실행됩니다. 즉, 컴포넌트의 최상위 레벨에서 디스트럭쳐링하거나 로직을 수행해도 다시 실행되지 않습니다. 코드를 다시 평가하려면 다른 리액티브 프리미티브나 JSX 에서 시그널, 스토어, props에 접근해야 합니다.

3. 이 방법은 동기식으로만 추적합니다. 이펙트에 setTimeout 이나 다른 비동기 함수를 사용하는 경우, 나중에 비동기 실행되는 코드는 추적되지 않습니다.
