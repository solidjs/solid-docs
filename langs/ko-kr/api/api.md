# Basic Reactivity

반응성에 대한 Solid의 전반적인 접근 방식은 모든 리액티브 계산을 함수로 래핑하고 디펜던시가 업데이트될 때 해당 함수를 다시 실행하는 것입니다.
Solid JSX 컴파일러는 또는 대부분의 JSX 표현식 (중괄호 안의 코드)을 함수로 래핑하므로, 디펜던시가 변경되면 자동으로 업데이트(및 해당 DOM 업데이트)합니다.
보다 정확하게는, 함수의 자동 재실행은 _추적 범위_ 내에서 함수가 호출될 때마다 발생합니다. 추적 범위는 JSX 표현식이나 "계산"(`createEffect`, `createMemo`, 등)을 빌드하는 API 호출을 의미합니다.
기본적으로 함수의 디펜던시는 추적 범위에서 호출될 때 함수가 리액티브 상태를 읽는 것(예: 시그널 getter 혹은 Store 속성을 통해)을 감지하여 자동으로 추적됩니다.
결과적으로, 보통은 디펜던시에 대해 걱정할 필요가 없습니다(하지만 자동 디펜던시 추적이 원하는 결과를 생성하지 않는 경우, [디펜던시 추적을 오버라이드](#reactive-utilities) 할 수 있습니다.)
이 접근 방식은 반응성을 _구성 가능_ 하게 만듭니다: 다른 함수에서 하나의 함수를 호출하면 일반적으로 호출하는 함수가 호출되는 함수의 디펜던시를 상속합니다.

## `createSignal`

```ts
import { createSignal } from "solid-js";

function createSignal<T>(
  initialValue: T,
  options?: { equals?: false | ((prev: T, next: T) => boolean) }
): [get: () => T, set: (v: T) => T];

// createSignal 반환값에 사용 가능한 타입:
import type { Signal, Accessor, Setter } from "solid-js";
type Signal<T> = [get: Accessor<T>, set: Setter<T>];
type Accessor<T> = () => T;
type Setter<T> = (v: T | ((prev?: T) => T)) => T;
```

시그널은 가장 기본적인 리액티브 프리미티브입니다. 이는 시간에 따라 변하는 단일 값(자바스크립트 객체)을 추적합니다.
시그널의 초기값은 전달된 첫 번째 인자인 `initialValue` (미지정시 `undefined`) 값으로 시작합니다.
`createSignal` 함수는 _getter_ (또는 _accessor_)와 _setter_ 함수 2개를 가진 배열을 반환합니다. 보통은 다음과 같이 디스트럭처링을 사용해 배열을 이름을 가진 시그널에 할당합니다:

```js
const [count, setCount] = createSignal(0);
const [ready, setReady] = createSignal(false);
```

getter (예: `count()` 혹은 `ready()`)를 호출하면 시그널의 현재 값을 반환합니다.
자동 디펜던시 추적에 있어 중요한 부분은, 추적 범위 내에서 getter를 호출하게 되면 호출하는 함수는 해당 시그널에 의존하게 되므로, 시그널이 업데이트되면 해당 함수가 다시 실행됩니다.

setter(예: `setCount(nextCount)` 혹은 `setReady(nextReady)`)를 호출하면 시그널의 값을 설정하고, 값이 실제로 변경된 경우 (자세한 내용은 아래쪽 참고) 시그널을 _업데이트_(디펜던시가 있는 항목을 다시 실행하도록 트리거링)합니다 .

setter의 유일한 인수로 시그널의 새 값이나 시그널의 마지막 값을 새 값에 매핑하는 함수를 사용합니다.
setter는 업데이트된 값도 반환합니다. 예를 들어:

```js
// 시그널의 현재 값
// 추적 범위 내에 있는 경우 시그널에 디펜던시를 가집니다.
// (추적 범위 밖에서는 리액티브하지 않음):
const currentCount = count();

// 또는 계산식을 함수로 래핑
// 이 함수는 추적 범위 내에서 사용될 수 있습니다:
const doubledCount = () => 2 * count();

// 또는 추적 범위를 생성하고, 시그널에 의존성을 가집니다:
const countDisplay = <div>{count()}</div>;

// 시그널 setter에 값 설정:
setReady(true);

// 시그널 setter에 함수 사용:
const newCount = setCount((prev) => prev + 1);
```

> 시그널에 함수를 저장하고 싶다면 함수 형식를 사용해야 합니다:
>
> ```js
> setValue(() => myFunction);
> ```
>
> 함수를 `createSignal`의 `initialValue` 인수로 사용시에는 그대로 전달해야 합니다:
>
> ```js
> const [func, setFunc] = createSignal(myFunction);
> ```

[batch](#batch), [effect](#createEffect), [transition](#use-transition)에 있는 것이 아니라면, 시그널은 설정하는 즉시 업데이트됩니다.
예를 들어:

```js
setReady(false);
console.assert(ready() === false);
setReady(true);
console.assert(ready() === true);
```

코드가 batch 혹은 transition(예: 라이브러리 코드)으로 실행될지 확실하지 않다면, 이러한 가정은 피해야 합니다.

##### Options

Solid의 여러 프리미티브들은 "options" 객체를 마지막 옵셔널 인수로 받습니다.
`createSignal`의 옵션 객체에는 `equals` 옵션이 있습니다. 예를 들어:

```js
const [getValue, setValue] = createSignal(initialValue, { equals: false });
```

기본적으로 시그널의 setter를 호출할 때, 자바스크립트의 `===` 연산자에 따라 새 값이 이전 값과 다른 경우에만 시그널이 업데이트되고 디펜던시 항목들이 재실행됩니다.
`equals`를 `false`로 설정하면 setter가 호출된 후 디펜던시 항목들을 항상 다시 실행하거나, 동등성 테스트를 위한 커스텀 함수를 제공할 수 있습니다.
몇 가지 예를 살펴보면:

```js
// 객체의 내용을 변경하는 것을 허용하려면 { equals: false } 을 사용합니다;
// 일반적으로는 변경 전후에 동일한 객체를 가리키고 있기 때문에, 업데이트로 보지 않습니다.
const [object, setObject] = createSignal({ count: 0 }, { equals: false });
setObject((current) => {
  current.count += 1;
  current.updated = new Date();
  return current;
});

// { equals: false } 시그널의 값을 지정하지 않는 경우 트리거로 사용할 수 있습니다:
const [depend, rerun] = createSignal(undefined, { equals: false });
// 추적 범위에서 depend() 를 호출하면 rerun() 이 호출될 때마다 해당 범위가 다시 실행됩니다.

// 문자열의 길이에 따라 동등성 비교 정의:
const [myString, setMyString] = createSignal("string", {
  equals: (newVal, oldVal) => newVal.length === oldVal.length,
});

setMyString("strung"); // 이전 값과 동일한 것으로 판단해 업데이트가 발생하지 않습니다.
setMyString("stranger"); // 이전 값과 다른 것으로 판단해 업데이트가 발생합니다.
```

## `createEffect`

```ts
import { createEffect } from "solid-js";

function createEffect<T>(fn: (v: T) => T, value?: T): void;
```

이펙트는 디펜던시가 변경될 때마다 임의의 코드("사이드 이펙트": 예를 들면, DOM을 수동으로 변경하는 것과 같은)를 실행하도록 하는 일반적인 방법입니다. `createEffect`는 추적 범위에서 주어진 함수를 실행하는 새 계산을 생성하여 디펜던시를 자동으로 추적하고, 디펜던시가 업데이트될 때마다 함수를 자동으로 다시 실행합니다.
예를 들면:

```js
const [a, setA] = createSignal(initialValue);

// 시그널 `a`에 디펜던시를 가지는 이펙트
createEffect(() => doSideEffect(a()));
```

이펙트 함수는 이펙트 함수의 마지막 실행에서 반환된 값과 동일한 인수로 호출됩니다.
첫 호출시에는 `createEffect` 호출시 사용한 2번째 인수를 사용해 호출됩니다.
이렇게 하면 마지막으로 계산된 값을 기억하기 위해 추가 클로저를 만들지 않고도 diff를 계산할 수 있습니다.
예를 들어:

```js
createEffect((prev) => {
  const sum = a() + b();
  if (sum !== prev) console.log("sum changed to", sum);
  return sum;
}, 0);
```

이펙트는 주로 리액티브 시스템에 쓰기를 하지 않고 읽기만 하는 사이드 이펙트에 대한 것입니다:
이펙트 안에서는 시그널을 설정하지 않는것이 가장 좋습니다. 부주의하게 사용하는 경우 추가 렌더링이나 무한 이펙트 루프를 유발할 수 있습니다.
대신 [`createMemo`](#creatememo)를 사용하여 다른 리액티브 값에 의존하는 새 값을 계산하는 편이 좋습니다. 이렇게 하면 리액티브 시스템은 의존 관계를 파악할 수 있으므로 그에 따라 최적화할 수 있습니다.

이펙트 안에서 시그널을 설정하면, 이펙트 함수는 자동으로 [`batch`](#batch)로 래핑되며, 이는 이펙트 내부의 모든 시그널 변경 사항은 이펙트가 완료된 후에만 전파됨을 의미합니다.
이렇게 되면 여러 시그널 업데이트는 하나의 업데이트만 트리거하면서, 사이드 이펙트 중간에 원치 않는 사이드 이펙트가 발생하는 것을 방지할 수 있습니다.
실제로 여러 이펙트가 한꺼번에 트리거되면, 이들은 모두 묶어 하나의 `batch`로 래핑됩니다.

이펙트 함수의 _첫 번째_ 실행은 바로 실행되지 않으며, 현재 렌더링 단계 이후에 실행되도록 예약됩니다(예: [`render`](#render), [`createRoot`](#createroot), [`runWithOwner`](#runwithowner) 에 전달된 함수를 호출한 후).
첫 번째 실행시까지 대기하려면, 브라우저가 DOM을 렌더링하기 전에 실행되는 [`queueMicrotask`](https://developer.mozilla.org/en-US/docs/Web/API/queueMicrotask) 를 사용하거나, 브라우저 렌더링 후에 실행되는 `await Promise.resolve()` 혹은 `setTimeout(..., 0)` 을 사용하세요.
첫 번째 실행 후, 이펙트는 일반적으로 디펜던시가 업데이트될 때 즉시 실행됩니다([batch](#batch) 혹은 [transition](#use-transition)인 경우는 예외입니다).
예를 들어:

```js
// 이 코드는 컴포넌트 함수 안에 있다고 가정하며, 따라서 렌더링 단계의 일부입니다.
const [count, setCount] = createSignal(0);

// 이 이펙트는 처음 실행시와 변경시 count를 출력합니다.
createEffect(() => console.log("count =", count()));
// 이펙트 아직 미실행
console.log("hello");
setCount(1);  // 이펙트 아직 미실행
setCount(2);  // 이펙트 아직 미실행

queueMicrotask(() => {
  // 이제 `count = 2` 출력
  console.log("microtask");
  setCount(3);  // 바로 `count = 3` 출력
  console.log("goodbye");
});

// --- 전체 출력: ---
// hello
// count = 2
// microtask
// count = 3
// goodbye
```

첫 번째 실행 지연은 컴포넌트에서 반환된 JSX가 DOM에 추가된 후에 컴포넌트 스코프에 정의된 이펙트가 실행된다는 의미이므로 유용합니다.
특히, [`ref`](#ref) 는 이미 설정된 상태가 됩니다.
따라서 이펙트를 사용해 DOM을 수동으로 조작하거나, 바닐라 JS 라이브러리를 호출하거나, 다른 사이드 이펙트를 일으킬 수 있습니다.

이펙트의 첫 번째 실행은 브라우저가 DOM을 렌더링하기 전에 실행됩니다(리액트의 `useLayoutEffect`와 유사합니다).
렌더링 후까지 대기해야 하는 경우 (예: 렌더링 시간 측정), `await Promise.resolve()` (혹은 `Promise.resolve().then(...)`)를 사용할 수 있지만, 시그널 같은 리액티브 상태를 사용하게 되면 재실행을 위한 이펙트가 트리거되지 않게 됩니다. 이는 `async` 함수가 `await`를 사용한 후에는 추적이 불가능하기 때문입니다.
따라서 promise 전에 모든 디펜던시를 사용해야 합니다.

이펙트를 처음 실행할 때도 즉시 실행하려면, [`createRenderEffect`](#createrendereffect) 또는 [`createComputed`](#createcomputed) 를 사용하세요.

이펙트 함수 _안_에서 [`onCleanup`](#oncleanup)을 호출해 이펙트 함수 실행 사이의 사이드 이펙트를 정리할 수 있습니다.
이런 클린업 함수는 이펙트 실행 사이와 이펙트가 삭제(예: 포함하는 컴포넌트가 언마운트)될 때 모두 호출됩니다.
예를 들어:

```js
// eventName 시그널에서 발생하는 이벤트 리스닝
createEffect(() => {
  const event = eventName();
  const callback = (e) => console.log(e);
  ref.addEventListener(event, callback);
  onCleanup(() => ref.removeEventListener(event, callback));
});
```

## `createMemo`

```ts
import { createMemo } from "solid-js";

function createMemo<T>(
  fn: (v: T) => T,
  value?: T,
  options?: { equals?: false | ((prev: T, next: T) => boolean) }
): () => T;
```

메모를 사용하면 파생된 값을 많은 리액티브 계산에서 효율적으로 재사용할 수 있습니다.
`createMemo`는 주어진 함수의 반환 값과 동일한 읽기 전용 리액티브 값을 생성하고, 디펜던시가 변경될 때만 함수가 실행되도록 합니다.

```js
const value = createMemo(() => computeExpensiveValue(a(), b()));

// 값 읽기
value();
```

Solid에서는 함수를 메모로 래핑할 필요가 없는 경우가 종종 있습니다; 대신 유사한 리액티브 동작을 얻기 위해 일반 함수를 정의하고 호출할 수 있습니다.
주요 차이점은 여러 리액티브 설정들에서 함수를 호출하는 경우입니다.
함수의 디펜던시가 업데이트될 때, `createMemo`로 래핑되어 있지 않으면 한 함수가 여러 번 호출됩니다.
예를 들어:

```js
const user = createMemo(() => searchForUser(username()));
// 다음 함수와 비교: const user = () => searchForUser(username());
return (
  <ul>
    <li>Your name is "{user()?.name}"</li>
    <li>
      Your email is <code>{user()?.email}</code>
    </li>
  </ul>
);
```

`username` 시그널이 업데이트되면, `searchForUser`가 한 번만 호출됩니다.
반환된 `user`가 실제로 변경되면 `user` 메모가 업데이트되고, 두 리스트 항목이 자동으로  업데이트됩니다.
만일 `user` 정의를 `() => searchForUser(username())` 일반 함수로 교체하면, `searchForUser`는 두 번(각 리스트 아이템 업데이트시마다) 호출됩니다.

또 다른 주요 차이점은 메모의 디펜던시가 변경되었지만 메모의 값이 변경되지 않은 경우, 의존 항목이 업데이트되지 않도록 보호할 수 있다는 점입니다.
[`createSignal`](#createsignal)과 마찬가지로, `createMemo`에 의해 생성된 파생 시그널은 메모 함수에서 반환된 값이 `===` 연산자에 따라 이전값에서 변경된 경우만 _업데이트_하고, 의존 항목들을 다시 실행하도록 트리거합니다.
또는  `equals`가 `false`로 설정된 옵션 객체를 전달해 디펜던시가 변경되면 메모를 항상 업데이트하거나, 동등성 비교를 위한 커스텀 `equals` 함수를 전달할 수 있습니다.

메모 함수는 메모 함수의 마지막 실행에서 반환된 값과 동일한 인수로 호출되며, 첫 번째 호출시에는 `createMemo` 실행시 전달한 두 번째 옵셔널 인수를 사용해 호출됩니다.
이는 계산을 줄이는데 유용합니다. 예를 들면:

```js
// input()이 취한 모든 값의 합을 추적합니다.
const sum = createMemo((prev) => input() + prev, 0);
```

메모 함수는 setter를 호출해 다른 시그널을 변경해서는 안되며, "순수" 함수여야 합니다.
이를 통해 Solid는 디펜던시 그래프에 따라 메모 업데이트 순서를 최적화할 수 있으므로, 디펜던시 변경에 대한 응답으로 모든 메모가 한꺼번에 업데이트될 수 있습니다.

## `createResource`

```ts
import { createResource } from "solid-js";
import type { ResourceReturn } from "solid-js";

type ResourceReturn<T> = [
  {
    (): T | undefined;
    loading: boolean;
    error: any;
    latest: T | undefined;
  },
  {
    mutate: (v: T | undefined) => T | undefined;
    refetch: (info: unknown) => Promise<T> | T;
  }
];

function createResource<T, U = true>(
  fetcher: (
    k: U,
    info: { value: T | undefined; refetching: boolean | unknown }
  ) => T | Promise<T>,
  options?: { initialValue?: T }
): ResourceReturn<T>;

function createResource<T, U>(
  source: U | false | null | (() => U | false | null),
  fetcher: (
    k: U,
    info: { value: T | undefined; refetching: boolean | unknown }
  ) => T | Promise<T>,
  options?: { initialValue?: T }
): ResourceReturn<T>;
```

비동기 요청의 결과를 반영하는 시그널을 생성합니다.

`createResource`는 비동기 fetcher 함수를 실행하고, fetcher 실행이 끝나면 결과 데이터로 업데이트되는 시그널을 반환합니다.
`createResource`를 사용하는 2가지 방법이 있습니다: fetcher 함수만 인수로 전달하거나, 소스 시그널을 첫 번째 인수로 추가로 전달할 수 있습니다.
소스 시그널은 변경될 때마다 fetcher를 다시 트리거하고 그 값은 fetcher에 전달됩니다.
```js
const [data, { mutate, refetch }] = createResource(fetchData);
```
```js
const [data, { mutate, refetch }] = createResource(sourceSignal, fetchData);
```
이 스니펫에서 `fetchData`가 fetcher 함수이며, `fetchData`가 실행을 끝낼때까지 `data()`는 정의되지 않습니다.
첫 번째 경우, `fetchData`는 즉시 실행됩니다.
두 번째 경우, `sourceSignal`이 `false`, `null`, `undefined` 이외의 값을 갖는 즉시 `fetchData`가 호출됩니다.
`sourceSignal` 값이 변경될 때마다 다시 호출되며, 그 값은 항상 `fetchData` 함수의 첫 번째 인수로 전달됩니다.

`mutate`를 호출해 `data` 시그널을 직접 업데이트((다른 시그널 setter 처럼 동작)할 수 있습니다.
`refetch`를 호출해 fetcher를 직접 다시 실행하고, `refetch(info)`와 같이 옵셔널 인수를 전달하여 fetcher에 추가 정보를 제공할 수 있습니다: .

`data`는 일반 시그널 getter처럼 작동합니다: `data()`를 사용해 `fetchData`의 마지막 반환 값을 읽습니다.
하지만 두 가지 추가 리액티브 속성이 있습니다: `data.loading`은 fetcher가 호출되었지만 아직 반환되지 않았는지를 알려주며, `data.error`는 요청에 에러가 발생했는지 알려줍니다; 에러에는 fetcher에서 발생한 오류도 포합됩니다. (참고: 에러가 예상된다면, [ErrorBoundary](#<errorboundary>)에 `createResource`를 래핑할 수 있습니다.)

**1.4.0** 버전에서는, `data.latest`는 마지막으로 반환된 값을 반환하며, [Suspense](#<suspense>)와 [트랜지션](#usetransition)을 트리거하지 않습니다; 아직 값이 반환된 적이 없다면, `data.latest`는 `data()`와 동일하게 작동합니다. 이는 새 데이터를 로딩하는 도중에는 이전 데이터를 보여주고자 하는 경우 유용합니다.

`loading`, `error`, `latest`는 리액티브 getter이며 추적 가능합니다.

`fetcher`는 데이터를 가져오기 위해 `createResource`에 제공하는 비동기 함수입니다.
fetcher에는 두 개의 인수가 전달됩니다. 소스 시그널의 값(제공된 경우), 그리고 `value`, `refetching` 속성을 가진 정보 객체입니다. `value`는 이전에 가져온 값을 알려줍니다.
fetcher가 `refetch` 함수를 사용해 트리거된 경우 `refetching` 값이 `true`가 되며, 그 외의 경우 `false`가 됩니다.
`refetch` 함수가 `refetch(info)`처럼 인수와 함께 호출된 경우, `refetching`이 해당 인수로 설정됩니다.

```js
async function fetchData(source, { value, refetching }) {
  // 데이터를 가져와 값을 반환합니다.
  //`source`: 소스 시그널의 현재 값을 알려줍니다;
  //`value`: fetcher의 마지막 반환값을 알려줍니다;
  //`refetching`: fetcher가 `refetch()`를 호출해 트리거될 때, 또는 `refetch(info)` 처럼 전달된 옵셔널 인수와 동일한 경우 true


const [data, { mutate, refetch }] = createResource(getQuery, fetchData);

// 값 읽기
data();

// 로딩중인지 확인
data.loading;

// 에러 발생 여부 확인
data.error;

// promise를 생성하지 않고 직접 값 설정
mutate(optimisticValue);

// 마지막 요청을 명시적으로 다시 가져옵니다
refetch();
```

**v1.4.0 에서 추가됨**

`renderToStream`을 사용중이라면, `deferStream` 옵션을 사용해 리소스가 준비될 때까지 Solid가 스트림 플러시를 하지 않고 기다리도록 할 수 있습니다:

```js
// user 데이터를 가져오는 것과 컨텐츠 스트리밍을 최대한 빨리 진행합니다.
const [user] = createResource(() => params.id, fetchUser);

// user 데이터를 가져와 리소스가 로드된 후, 컨텐츠 스트리밍을 진핸합니다.
const [user] = createResource(() => params.id, fetchUser, {
  deferStream: true,
});
```

# Lifecycles

## `onMount`

```ts
import { onMount } from "solid-js";

function onMount(fn: () => void): void;
```

초기 렌더링 및 엘리먼트가 마운트된 후 실행되는 메서드를 등록합니다.
`ref`를 사용하고 다른 일회성 사이드 이펙트를 관리하는 데 이상적입니다.
디펜던시가 없는 `createEffect`와 동일합니다.

## `onCleanup`

```ts
import { onCleanup } from "solid-js";

function onCleanup(fn: () => void): void;
```

현재 리액티브 스코프를 폐기하거나 재계산시 실행되는 클린업 메서드를 등록합니다.
모든 컴포넌트와 이펙트에서 사용 가능합니다.

## `onError`

```ts
import { onError } from "solid-js";

function onError(fn: (err: any) => void): void;
```

자식 스코프에서 에러가 발생한 경우 실행되는 에러 핸들러 메서드를 등록합니다.
가장 가까운 스코프에 있는 에러 핸들러만 실행되며, 상위로 전달하려면 에러를 다시 던지면 됩니다.

# Reactive Utilities

이 헬퍼 함수들은 보다 나은 업데이트 스케줄 및 반응성 추적을 제어하는 기능을 제공합니다.

## `untrack`

```ts
import { untrack } from "solid-js";

function untrack<T>(fn: () => T): T;
```

실행 코드 블럭의 디펜던시 추적을 무시하고 값을 반환합니다.

## `batch`

```ts
import { batch } from "solid-js";

function batch<T>(fn: () => T): T;
```

불필요한 재계산을 막기 위해, 블럭 내에서의 업데이트 커밋을 마지막까지 미룹니다.
이는 다음 행에서 읽는 값이 아직 업데이트되지 않았음을 의미합니다.
[Solid 스토어](#createstore)의 set 메서드, [Mutable 스토어](#createmutable)의 array 메서드, 이펙트는 자동으로 해당 코드를 일괄 처리합니다.

## `on`

```ts
import { on } from "solid-js";

function on<T extends Array<() => any> | (() => any), U>(
  deps: T,
  fn: (input: T, prevInput: T, prevValue?: U) => U,
  options: { defer?: boolean } = {}
): (prevValue?: U) => U | undefined;
```

`on`은 디펜던시가 명시적으로 계산에 전달되로록 디자인되었습니다.
디펜던시 배열이 전달되는 경우, `input`과 `prevInput`도 배열입니다.

```js
createEffect(on(a, (v) => console.log(v, b())));

// 위 코드는 다음 코드와 동일합니다:
createEffect(() => {
  const v = a();
  untrack(() => console.log(v, b()));
});
```

defer 옵션을 true로 설정해 계산을 바로 실행하지 않고 변경시에만 실행되도록 선택할 수 있습니다.

```js
// 바로 실행하지 않습니다
createEffect(on(a, (v) => console.log(v), { defer: true }));

setA("new"); // 여기서 실행됩니다.
```

`stores`와 `mutable`에서 부모 객체에서 속성을 추가하거나 삭제하면 이펙트가 트리거됩니다.
[`createMutable`](#createMutable) 참조.

## `createRoot`

```ts
import { createRoot } from "solid-js";

function createRoot<T>(fn: (dispose: () => void) => T): T;
```

자동으로 삭제되지 않고 추적되지 않은 새 스코프를 생성합니다.
부모가 재평가할 때, 해제하고 싶지 않은 중첩된 리액티브 스코프가 있는 경우 유용하게 사용할 수 있습니다.

모든 Solid 코드는 모든 메모리와 계산이 해제되도록 보장하기 때문에, 이런 최상위 레벨 중 하나로 래핑되어야 합니다.
일반적으로 `createRoot`는 모든 `render` 엔트리 함수에 포함되어 있기 때문에 이에 대해 걱정할 필요는 없습니다.

## `getOwner`

```ts
import { getOwner } from "solid-js";

function getOwner(): Owner;
```

현재 실행중인 코드를 소유하는 리액티브 스코프를 반환합니다. 예를 들면, 나중에 현재 스코프 외부에서 `runWithOwner` 호출시 전달하기 위해 사용합니다.

내부적으로, 계산(이펙트, 메모, 등)은 `createRoot`나 `render`에 의해 생성된 루트 소유자까지 따라 올라가면서 자식 소유자를 생성합니다.
Solid는 이러한 소유권 트리를 통해 서브 트리를 탐색하고 모든 [`onCleanup`](#oncleanup) 콜백을 호출함으로써 삭제된 계산을 자동으로 정리할 수 있습니다.
예를 들어, `createEffect`의 디펜던시가 변경되면, 이펙트는 이펙트 함수를 다시 실행하기 전에 모든 하위 `onCleanup` 콜백을 호출합니다.
`getOwner`를 호출하면 현재 실행 블럭의 폐기를 담당하는 현재 소유자 노드가 반환됩니다.

컴포넌트는 계산이 아니므로 소유자 노드를 생성하지 않지만, 일반적으로 `createEffect`에서 렌더링되므로 결과는 비슷합니다: 컴포넌트가 언마운트되면 모든 하위 `onCleanup` 콜백이 호출됩니다.
컴포넌트 스코프에서 `getOwner`를 호출하면 컴포넌트 렌더링과 언마운트를 담당하는 소유자가 반환됩니다.

리액티브 스코프를 소유한다고 해서 반드시 _추적_하는 것은 아닙니다.
예를 들어, [`untrack`](#untrack)은 JSX (`<Component ...>`)를 통해 생성된 컴포넌트와 마찬가지로 함수 실행시 새로운 리액티브 스코프를 생성하지 않고 추적을 끕니다.

## `runWithOwner`

```ts
import { runWithOwner } from "solid-js";

function runWithOwner<T>(owner: Owner, fn: (() => void) => T): T;
```

외부 스코프의 소유자 대신, 제공된 소유자 아래에서 주어진 함수를 실행합니다.
기본적으로 `createEffect`, `createMemo` 등에 의해 생성된 계산은 현재 실행중인 코드의 소유자(`getOwner`의 반환값)가 소유하므로, 소유자가 삭제될 때 같이 삭제됩니다.
`runWithOwner`를 호출하면 기본값을 지정한 소유자(일반적으로 `getOwner`에 대한 이전 호출의 반환값)로 오버라이드할 수 있으므로, 계산이 삭제되는 시점을 보다 정확하게 제어할 수 있습니다.

(올바른) 소유자를 갖는 것은 다음과 같은 두 가지 이유때문에 중요합니다:

- 소유자가 없는 계산은 삭제할 수 없습니다. 예를 들어, 소유자 없이 `createEffect`를 호출하게 되면(예: 전역 스코프), 이펙트는 소유자가 삭제될 때 같이 삭제되는 대신 영원히 실행됩니다.
- [`useContext`](#usecontext)는 소유자 트리를 찾아 올라가면서 원하는 컨텍스트를 제공하는 가장 가까운 조상을 찾아 컨텍스트를 얻습니다. 따라서 소유자가 없으면 제공된 컨텍스트를 찾을 수 없으며, 잘못된 소유자가 있다면 잘못된 컨텍스트를 얻을 수 있습니다.

소유자를 수동으로 설정하면, 소유자의 스코프 외부에서 반응성을 수행할 때 유용합니다.
특히 `async` 함수나 `setTimeout` 같은 콜백을 통한 비동기 계산은 자동으로 설정된 소유자를 잃기 때문에, `getOwner`를 통해 원래 소유자를 기억하고 `runWithOwner`를 통해 복원하는 작업이 필요합니다.
예를 들어:

```js
const owner = getOwner();
setTimeout(() => {
  // 이 콜백은 소유자없이 실행됩니다.
  // runWithOwner를 통해 소유자를 복원합니다:
  runWithOwner(owner, () => {
    const foo = useContext(FooContext);
    createEffect(() => {
      console.log(foo);
    });
  });
}, 1000);
```

디펜던시 추적을 결정하는 것은 소유자가 아니므로, `runWithOwner`는 비동기 함수에서 추적하는데 도움이 되지 않습니다; 비동기 파트(예: 첫 번째 `await` 이후)에서 리액티브 상태를 사용하더라도 디펜던시로 추적되지 않습니다.

## `mergeProps`

```ts
import { mergeProps } from "solid-js";

function mergeProps(...sources: any): any;
```

리액티브 객체를 머지하는 메서드입니다.
호출자가 설정하지 않은 props의 디폴트 값을 설정하거나, 리액티브 속성을 포함해 props 객체를 복제할 때 유용합니다.

이 메서드는 프록시를 사용하며 속성을 역순으로 확인하는 식으로 작동하기 때문에, prop 객체가 처음 머지되었을때 존재하지 않은 속성의 동적 추적을 가능하게 합니다.

```js
// 디폴트 props
props = mergeProps({ name: "Smith" }, props);

// props 복제
newProps = mergeProps(props);

// props 머지
props = mergeProps(props, otherProps);
```

## `splitProps`

```ts
import { splitProps } from "solid-js";

function splitProps<T>(
  props: T,
  ...keys: Array<(keyof T)[]>
): [...parts: Partial<T>];
```

리액티브 객체를 키를 사용해 분할합니다.

리액티브 객체와, 키의 배열들을 인수로 받습니다; 원래 객체에서 키 배열에 있는 속성들만 포함하는 리액티브 객체를 반환합니다.
반환되는 배열의 마지막 리액티브 객체에는 원래 객체의 나머지 속성들이 포함됩니다.

props의 일부 속성만 사용하고 나머지는 자식에게 전달하려는 경유 유용합니다.
```js
<MyComponent a={1} b={2} c={3} d={4} e={5} foo="bar" />;
function MyComponent(props) {
  console.log(props); // {a: 1, b: 2, c: 3, d: 4, e: 5, foo: "bar"}
  const [vowels, consonants, leftovers] = splitProps(
    props,
    ["a", "e"],
    ["b", "c", "d"]
  );
  console.log(vowels); // {a: 1, e: 5}
  console.log(consonants); // {b: 2, c: 3, d: 4}
  console.log(leftovers.foo); // bar
}
```

`splitProps`는 임의의 갯수의 배열을 인수로 받기 때문에 원하는만큼 props 객체를 분할할 수 있습니다. props의 서브셋이 필요한 여러 자식 컴포넌트가 있는 경우를 예로 들 수 있습니다.

컴포넌트에 6개의 props가 전달되었다고 가정해 보겠습니다:
```js
<MyComponent a={1} b={2} c={3} d={4} e={5} foo="bar"/>
function MyComponent(props) {
  console.log(props) // {a: 1, b: 2, c: 3, d: 4, e: 5, foo: "bar"}
  const [vowels, consonants, leftovers] = splitProps(props,
          ["a", "e"], ["b", "c", "d"]);
  console.log(vowels) // {a: 1, e: 5}
  console.log(consonants) // {b: 2, c: 3, d: 4}
  console.log(leftovers.foo) // bar
}
```

## `useTransition`

```ts
import { useTransition } from "solid-js";

function useTransition(): [
  pending: () => boolean,
  startTransition: (fn: () => void) => Promise<void>
];
```

모든 비동기 프로세스가 완료될 때까지 커밋을 연기하는 트랜잭션에서 비동기 업데이트를 일괄 처리하는데 사용됩니다.
이는 Suspense와 연결되어 있으며, Suspense 경계에서 읽은 리소스만 추적합니다.

```js
const [isPending, start] = useTransition();

// 트랜지션중인지 확인
isPending();

// 트랜지션 래핑
start(() => setSignal(newValue), () => /* 트랜지션 완료 */)
```

## `startTransition`

**v1.1.0 에 추가된 기능**

```ts
import { startTransition } from "solid-js";

function startTransition: (fn: () => void) => Promise<void>;
```

`useTransition`과 유사하지만, 연결된 pending 상태가 없다는 점이 다릅니다. 트랜지션을 시작하기 위해 직접 사용할 수 있습니다.

## `observable`

```ts
import { observable } from "solid-js";

function observable<T>(input: () => T): Observable<T>;
```

이 메서드는 시그널을 받아 Observable을 생성합니다.
일반적으로 `from` 오퍼레이터를 사용해 선택한 다른 Observable 라이브러리에서 사용할 수 있습니다.

```js
// solid.js 시그널과 rxjs 연동
import { observable } from "solid-js";
import { from } from "rxjs";

const [s, set] = createSignal(0);

const obsv$ = from(observable(s));

obsv$.subscribe((v) => console.log(v));
```

`rxjs`없이 `from`을 사용할 수도 있습니다; 아래 참조.

## `from`

**v1.1.0 에 추가된 기능**

```ts
import { from } from "solid-js";

function from<T>(
  producer:
    | ((setter: (v: T) => T) => () => void)
    | {
        subscribe: (
          fn: (v: T) => void
        ) => (() => void) | { unsubscribe: () => void };
      }
): () => T;
```

RxJS Observable 또는 Svelte Store와 같은 외부 생산자와 더 쉽게 연동할 수 있도록 하는 헬퍼 함수입니다.
이는 기본적으로 모든 구독 가능한 것(`subscribe` 메서드가 있는 객체)을 시그널로 바꾸고, 구독과 폐기를 관리합니다.

```js
const signal = from(obsv$);
```

또한 setter 함수를 인수로 받아서 구독 취소 함수를 반환하는 커스텀 생산자 함수를 사용할 수 있습니다.

```js
const clock = from((set) => {
  const t = setInterval(() => set(1), 1000);
  return () => clearInterval(t);
});
```

> 참고: `from`에 의해 생성된 시그널은 외부 스트림 및 소스와의 더 나은 인트페이스를 위해 동등성 체크가 꺼져 있습니다.

## `mapArray`

```ts
import { mapArray } from "solid-js";

function mapArray<T, U>(
  list: () => readonly T[],
  mapFn: (v: T, i: () => number) => U
): () => U[];
```

업데이트시 불필요한 매핑을 줄이기 위해, 참조로 각 항목을 캐시하는 리액티브 map 헬퍼 함수입니다.
값당 한 번만 매핑 함수를 실행하며, 이 후에는 필요에 따라 이동하거나 삭제합니다.
인덱스 인수는 시그널입니다.
map 함수 자체는 추적하지 않습니다.

`<For>` 제어 흐름 내부에서 사용하고 있습니다.

```js
const mapped = mapArray(source, (model) => {
  const [name, setName] = createSignal(model.name);
  const [description, setDescription] = createSignal(model.description);

  return {
    id: model.id,
    get name() {
      return name();
    },
    get description() {
      return description();
    },
    setName,
    setDescription,
  };
});
```

## `indexArray`

```ts
import { indexArray } from "solid-js";

function indexArray<T, U>(
  list: () => readonly T[],
  mapFn: (v: () => T, i: number) => U
): () => U[];
```

인덱스로 매핑한다는 점을 제외하면 `mapArray`와 유사합니다.
각 항목은 시그널이며, 인덱스는 상수입니다.

`<Index>` 제어 흐름 내부에서 사용하고 있습니다.

```js
const mapped = indexArray(source, (model) => {
  return {
    get id() {
      return model().id
    }
    get firstInitial() {
      return model().firstName[0];
    },
    get fullName() {
      return `${model().firstName} ${model().lastName}`;
    },
  }
});
```

# Stores

이 API들은 `solid-js/store`에 포함되어 있습니다.
이 API들을 사용하면 스토어를 생성할 수 있습니다.
스토어는 시그널 트리를 독립적으로 추적하고 수정할 수 있도록 하는 [프록시 객체](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)입니다.

## 스토어 사용하기

### `createStore`

```ts
import { createStore } from "solid-js/store";
import type { StoreNode, Store, SetStoreFunction } from "solid-js/store";

function createStore<T extends StoreNode>(
  state: T | Store<T>
): [get: Store<T>, set: SetStoreFunction<T>];
type Store<T> = T;  // 개념상 읽기 전용이지만, 타입은 그렇게 설정되지 않음
```

create 함수는 초기 상태를 가져와 저장소에 래핑하고, 읽기 전용 프록시 객체와 setter 함수를 반환합니다.

```js
const [state, setState] = createStore(initialValue);

// 값 읽기
state.someValue;

// 값 설정
setState({ merge: "thisValue" });

setState("path", "to", "value", newValue);
```

프록시로서 스토어 객체는 속성에 액세스할 때만 추적합니다.

중첩된 객체에 액세스할 때 스토어는 중첩된 스토어 객체를 생성하며, 이는 트리 아래 끝까지 적용됩니다.
하지만 이는 배열과 일반 객체에만 적용됩니다.
클래스는 래핑되지 않기 때문에, `Date`, `HTMLElement`, `RegExp`, `Map`, `Set` 과 같은 객체는 스토어의 속성으로 세분화된 반응성을 제공하지 않습니다.

#### 스토어에서의 배열

**1.4.0** 버전에서는, 최상위 상태 객체는 배열이 될 수 있습니다. 이전 버전에서는 배열을 감싸는 객체를 사용해야 합니다:

```jsx
// Solid 1.4.0 이상
const [todos, setTodos] = createStore([
  { id: 1, title: "Thing I have to do", done: false },
  { id: 2, title: "Learn a New Framework", done: false },
]);
...
<For each={todos}>{todo => <Todo todo={todo} />}</For>;
```

```jsx
// 1.4.0 미만
const [state, setState] = createStore({
  todos: [
    { id: 1, title: "Thing I have to do", done: false },
    { id: 2, title: "Learn a New Framework", done: false },
  ],
});
<For each={state.todos}>{(todo) => <Todo todo={todo} />}<For>;
```

스토어 안에 있는 배열을 변경하는 경우, 배열을 직접 구독하는 계산은 트리거되지 않습니다. 예를 들어:

```js
createEffect(() => {
  console.log(state.todos);
});

// 이펙트를 트리거하지 않습니다:
setState(todos, state.todos.length, { id: 3 });
// 배열의 레퍼런스가 변경되었기 때문에, 이펙트를 트리거합니다:
setState("todos", (prev) => [...prev, { id: 3 }]);
```

### Getters

스토어 객체는 getter가 계산된 값을 사용하는 것을 지원합니다.

```js
const [state, setState] = createStore({
  user: {
    firstName: "John",
    lastName: "Smith",
    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
  },
});
```

getter는 액세스할 때마다 실행되기 때문에, 값을 캐시하려면 여전히 메모를 사용해야 합니다:

```js
let fullName;
const [state, setState] = createStore({
  user: {
    firstName: "John",
    lastName: "Smith",
    get fullName() {
      return fullName();
    },
  },
});
fullName = createMemo(() => `${state.user.firstName} ${state.user.lastName}`);
```

### 스토어 업데이트

변경 함수는 이전 상태를 받아서 새 상태나 값을 반환하는 함수의 형태를 취할 수 있습니다.
객체는 항상 얕게 머지됩니다.
스토어에서 값을 삭제하려면 값을 `undefined`로 설정하세요.

```js
const [state, setState] = createStore({
  firstName: "John",
  lastName: "Miller",
});

setState({ firstName: "Johnny", middleName: "Lee" });
// ({ firstName: 'Johnny', middleName: 'Lee', lastName: 'Miller' })

setState((state) => ({ preferredName: state.firstName, lastName: "Milner" }));
// ({ firstName: 'Johnny', preferredName: 'Johnny', middleName: 'Lee', lastName: 'Milner' })
```

키 배열, 객체 범위, 필터 함수를 포함하는 경로를 지원합니다.

setState는 변경할 경로를 나타낼 수 있는 중첩된 설정도 지원합니다.
중첩된 상태에서는 업데이트하는 상태가 Object 값이 아닐 수도 있습니다.
Object는 머지되지만, 다른 값(배열 포함)은 대체됩니다.

```js
const [state, setState] = createStore({
  counter: 2,
  list: [
    { id: 23, title: 'Birds' }
    { id: 27, title: 'Fish' }
  ]
});

setState('counter', c => c + 1);
setState('list', l => [...l, {id: 43, title: 'Marsupials'}]);
setState('list', 2, 'read', true);
// {
//   counter: 3,
//   list: [
//     { id: 23, title: 'Birds' }
//     { id: 27, title: 'Fish' }
//     { id: 43, title: 'Marsupials', read: true }
//   ]
// }
```

경로는 문자열 키, 키 배열, 반복 객체({from, to, by}), 필터 함수일 수 있으며, 이는 상태 변화를 표시하기 위한 놀라운 표현력을 제공합니다.

```js
const [state, setState] = createStore({
  todos: [
    { task: 'Finish work', completed: false }
    { task: 'Go grocery shopping', completed: false }
    { task: 'Make dinner', completed: false }
  ]
});

setState('todos', [0, 2], 'completed', true);
// {
//   todos: [
//     { task: 'Finish work', completed: true }
//     { task: 'Go grocery shopping', completed: false }
//     { task: 'Make dinner', completed: true }
//   ]
// }

setState('todos', { from: 0, to: 1 }, 'completed', c => !c);
// {
//   todos: [
//     { task: 'Finish work', completed: false }
//     { task: 'Go grocery shopping', completed: true }
//     { task: 'Make dinner', completed: true }
//   ]
// }

setState('todos', todo => todo.completed, 'task', t => t + '!')
// {
//   todos: [
//     { task: 'Finish work', completed: false }
//     { task: 'Go grocery shopping!', completed: true }
//     { task: 'Make dinner!', completed: true }
//   ]
// }

setState('todos', {}, todo => ({ marked: true, completed: !todo.completed }))
// {
//   todos: [
//     { task: 'Finish work', completed: true, marked: true }
//     { task: 'Go grocery shopping!', completed: false, marked: true }
//     { task: 'Make dinner!', completed: false, marked: true }
//   ]
// }
```

## 스토어 유틸리티

### `produce`

```ts
import { produce } from "solid-js/store";

function produce<T>(
  fn: (state: T) => void
): (
  state: T extends NotWrappable ? T : Store<T>
) => T extends NotWrappable ? T : Store<T>;
```

Immer에서 영감을 받은 API로, Solid 스토어 객체에 대한 로컬라이즈된 변경을 허용합니다.

```js
setState(
  produce((s) => {
    s.user.name = "Frank";
    s.list.push("Pencil Crayon");
  })
);
```

### `reconcile`

```ts
import { reconcile } from "solid-js/store";

function reconcile<T>(
  value: T | Store<T>,
  options?: {
    key?: string | null;
    merge?: boolean;
  } = { key: "id" }
): (
  state: T extends NotWrappable ? T : Store<T>
) => T extends NotWrappable ? T : Store<T>;
```

세분화된 업데이트를 적용할 수 없는 경우 데이터 변경 사항에 대한 diff를 수행합니다.
스토어나 대규모 API 응답의 불변 데이터를 처리할 때 유용합니다.

key는 항목을 일치시킬 수 있을 때 사용됩니다.
기본적으로 `merge`는 `false` 이며, 가능하면 참조 검사를 수행해 동등성을 판단하고 항목이 동일한 참조가 아닌 경우 이를 대체합니다.
`merge`가 `true`이면, 모든 diff를 사용해 이전 데이터를 새 값으로 효과적으로 머지합니다.

```js
// observable 구독
const unsubscribe = store.subscribe(({ todos }) => (
  setState('todos', reconcile(todos)));
);
onCleanup(() => unsubscribe());
```

### `unwrap`

```ts
import { unwrap } from "solid-js/store";

function unwrap(store: Store<T>): T;
```

프록시 없이 스토어 내부 데이터를 반환합니다.

### `createMutable`

```ts
import { createMutable } from "solid-js/store";

function createMutable<T extends StoreNode>(
  state: T | Store<T>,
): Store<T>;
```

새로운 변경 가능한 스토어 프록시 객체를 생성합니다.
스토어는 값이 변경될 때만 업데이트를 트리거합니다.
추적은 속성 액세스를 가로채서 수행되며, 프록시를 통해 깊은 중첩을 자동으로 추적합니다.

외부 시스템을 통합하거나, MobX/Vue 와의 호환성 레이어로 유용합니다.

> **참고:** 변경 가능한 상태는 어디에나 전달되고 변경될 수 있으므로, 단방향 흐름을 따라가기 어렵고, 이를 쉽게 깰 수 있게 됩니다.
> 일반적으로 `createStore`를 대신 사용하는 것이 좋습니다.
> `produce` 수정자는 단점은 없이 많은 이점을 제공할 수 있습니다.

```js
const state = createMutable(initialValue);

// 값 읽기
state.someValue;

// 값 설정
state.someValue = 5;

state.list.push(anotherValue);
```

Mutable은 getter와 setter를 지원합니다.

```js
const user = createMutable({
  firstName: "John",
  lastName: "Smith",
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(value) {
    [this.firstName, this.lastName] = value.split(" ");
  },
});
```

### `modifyMutable`

**v1.4.0에서 추가**

```ts
import { modifyMutable } from 'solid-js/store';

function modifyMutable<T>(mutable: T, modifier: (state: T) => T): void;
```

이 헬퍼 함수는 단일 [`batch`](#batch)에서 ([`createMutable`](#createmutable)에서 반환하는) 변경 가능한 스토어를 여러 번 변경하는 것을 단순화함으로써, 의존관계에 있는 계산이 업데이트마다 실행되는 대신 한 번만 업데이트되도록 합니다.
첫 번째 인수는 수정할 변경 가능한 스토어이며, 두 번째 인수는 [`reconcile`](#reconcile) 또는 [`produce`](#produce) 에서 반환된 것과 같은 스토어 수정자입니다.
(커스텀 수정자 함수를 전달하는 경우, 해당 인수가 래핑되지 않은 스토어임을 조심해야 합니다.)

예를 들어, 변경 가능한 여러 필드에 의존성이 있는 UI가 있다고 가정해 보겠습니다:

```tsx
const state = createMutable({
  user: {
    firstName: "John",
    lastName: "Smith",
  },
});

<h1>Hello {state.user.firstName + ' ' + state.user.lastName}</h1>
```


*n* 개의 필드를 순서대로 수정하게 되면, UI는 *n* 번 업데이트됩니다:

```ts
state.user.firstName = "Jake";  // 업데이트 트리거
state.user.lastName = "Johnson";  // 또다른 업데이트 트리거
```

단 한 번만 업데이트를 트리거하려면, 필드를 `batch` 내에서 변경합니다:

```ts
batch(() => {
  state.user.firstName = "Jake";
  state.user.lastName = "Johnson";
});
```

`modifyMutable` 를 `reconcile` 또는 `produce` 와 결합하면, 유사한 작업을 수행하는 두 가지 방법을 제공할 수 있습니다:

```ts
// state.user 를 지정한 객체로 교체 (다른 필드들은 모두 삭제)
modifyMutable(state.user, reconcile({
  firstName: "Jake",
  lastName: "Johnson",
});

// batch에서 두 필드를 수정하며, 한 번의 업데이트만 트리거
modifyMutable(state.user, produce((u) => {
  u.firstName = "Jake";
  u.lastName = "Johnson";
});
```

# Component APIs

## `createContext`

```ts
import { createContext } from "solid-js";
import type { Context } from "solid-js";

interface Context<T> {
  id: symbol;
  Provider: (props: { value: T; children: any }) => any;
  defaultValue: T;
}

function createContext<T>(defaultValue?: T): Context<T | undefined>;
```

Solid에서 컨텍스트는 일종의 의존성 주입을 제공합니다. 중간 컴포넌트 props를 따라 데이터를 전달할 필요가 없도록 데이터를 저장하는데 사용됩니다.

이 함수는 `useContext`와 함께 사용할 수 있는 새로운 컨텍스트 객체를 생성하고, `Provider` 제어 흐름을 제공합니다.
기본 컨텍스트는 계층 구조에서 `Provider`를 찾을 수 없을 때 사용됩니다.

```js
export const CounterContext = createContext([{ count: 0 }, {}]);

export function CounterProvider(props) {
  const [state, setState] = createStore({ count: props.count || 0 });
  const counter = [
    state,
    {
      increment() {
        setState("count", (c) => c + 1);
      },
      decrement() {
        setState("count", (c) => c - 1);
      },
    },
  ];

  return (
    <CounterContext.Provider value={counter}>
      {props.children}
    </CounterContext.Provider>
  );
}
```

프로바이더에 전달된 값은 그대로 `useContext`에 전달되며, 이로 인해 리액티브 표현식으로 래핑해도 작동하지 않습니다.
시그널과 스토어를 JSX에서 액세스하는 대신 직접 전달해야 합니다.

## `useContext`

```ts
import { useContext } from "solid-js";

function useContext<T>(context: Context<T>): T;
```

props를 각 컴포넌트 함수를 통해 전달하지 않으면서도 깊숙히 전달하기 위해 컨텍스트를 가져옵니다.

```js
const [state, { increment, decrement }] = useContext(CounterContext);
```

## `children`

```ts
import { children } from "solid-js";
import type { JSX, ResolvedChildren } from "solid-js";

function children(fn: () => JSX.Element): () => ResolvedChildren;
```

`children` 헬퍼는 JSX에서 `{props.children}` 을 단 한 번만 사용해 다른 컴포넌트로 자식을 전달하는 경우를 제외한, 다른 모든 경우 `props.children` 과의 복잡한 상호 작용을 위한 것입니다.
일반적으로 `props.children` 에 대한 getter를 다음과 같이 전달합니다:

```js
const resolved = children(() => props.children);
```

반환값은 자식을 나타내는 [memo](#creatememo) 이며, 자식이 변경될 때마다 업데이트됩니다.
`props.children` 에 직접 접근하는 대신 memo를 사용하면, 일부 시나리오에서 몇 가지 중요한 이점이 있습니다.
근본적인 문제는 JSX를 통해 컴포넌트 자식을 지정하는 경우, Solid는 자동으로 `props.children`을 프로퍼티 getter로 정의하며, 이로 인해 `props.children` 이 액세스될 때마다 자식이 생성(DOM이 생성)됩니다.
이로 인한 두 가지 특징적인 결과는:

- `props.children` 에 여러 번 액세스하면 자식(및 관련된 DOM)이 여러 번 생성됩니다.
  이는 DOM을 복사하려는 경우에는 유용하지만(DOM 노드는 하나의 부모 엘리먼트에만 나타날 수 있음), 대부분의 경우 중복된 DOM 노드를 생성하게 됩니다.
  대신 `resolved()` 를 여러 번 호출하게 되면, 같은 자식을 재사용하게 됩니다.
- `props.children` 를 추적 범위 외부에서 (예: 이벤트 핸들러에서) 액세스하는 경우, 절대 정리되지 않는 자식을 생성하게 됩니다.
  대신 `resolved()` 를 호출하면 자식을 재사용하게 됩니다.
  또한 (다른 컴포넌트 같은) 다른 추적범위가 아닌, 현재 컴포넌트에서 자식이 추적되는 것을 보장합니다,

또한 `children` 헬퍼는 인수가 없는 함수를 호출하고 2차원 배열을 1차원 배열로 평탄화하여 자식을 결정합니다.
예를 들어, `{signal() * 2}`와 같이 JSX로 지정된 자식은 `props.children` 에서 getter 함수 `() => count() * 2` 로 래핑되지만, `count` 시그널에 따라 `resolved` 에서는 실제 숫자로 적절하게 평가됩니다.

`props.children` 이 배열이 아닌 경우(JSX 태그가 자식을 하나만 가지는 경우), `children` 헬퍼는 이를 배열로 정규화하지 않습니다.
이는 단일 함수를 자식으로 전달하려는 경우 유용한데, `typeof resolved() === 'function'` 을 통해 이를 감지할 수 있습니다.
배열로 정규화하고 싶다면, `Array.isArray(resolved()) ? resolved() : [resolved()]` 처럼 사용할 수 있습니다.

다음은 자식을 렌더링하는 것 외에도 `Element` 타입이 되는 모든 자식의 `class` 속성을 자동으로 설정하는 예입니다:

```tsx
const resolved = children(() => props.children);

createEffect(() => {
  let list = resolved();
  if (!Array.isArray(list)) list = [list];
  for (let child of list) child?.setAttribute?.("class", myClass());
});

return <div>{resolved()}</div>;
```

(이 방법은 별로 권장되지는 않습니다:
일반적으로 props 또는 컨텍스트를 통해 원하는 클래스를 자식 컴포넌트로 전달하는 선언적 접근 방식을 따르는 것이 좋습니다.)

반면에, JSX를 통해 `props.children`을 다른 컴포넌트나 엘리먼트에 전달하는 경우, `children` 헬퍼를 사용할 필요가 없습니다(경우에 따라서 원치 않는 경우도 있습니다).

```tsx
const Wrapper = (props) => {
  return <div>{props.children}</div>;
};
```

`children` 헬퍼의 중요한 측면은 `props.children`에 바로 액세스하므로 자식을 강제로 생성하고 결정해야 한다는 것입니다. 
이는 [`<Show>`](#<show>) 컴포넌트 내에서 자식을 사용하는 것과 같은 조건부 렌더링시에는 바람직하지 않을 수 있습니다.
예를 들어, 다음 코드는 항상 자식을 평가합니다:

```tsx
const resolved = children(() => props.children);

return <Show when={visible()}>{resolved()}</Show>;
```

`<Show>`가 자식을 렌더링할 때만 자식을 평가하고 싶다면, 컴포넌트 내부 혹은 `<Show>` 내부 함수에서 `children` 호출을 푸시합니다. 이렇게 되면 `when` 조건이 true인 경우에만 자식을 평가합니다.
또 다른 좋은 방법은 자식을 실제로 평가하고 싶은 경우에만 `props.children`을 `children` 헬퍼에 전달하는 것입니다:

```ts
const resolved = children(() => visible() && props.children);
```

## `lazy`

```ts
import { lazy } from "solid-js";

function lazy<T extends Component<any>>(
  fn: () => Promise<{ default: T }>
): T & { preload: () => Promise<T> };
```

코드 스플리팅을 허용하기 위해 컴포넌트를 지연 로딩하는데 사용됩니다.
컴포넌트는 렌더링될 때까지 로드되지 않습니다.
지연 로딩된 컴포넌트는 props를 받는 등의 작업을 정적으로 임프토된 컴포넌트와 동일하게 사용할 수 있습니다.
지연 컴포넌트는 `<Suspense>`를 트리거합니다.

```js
// 임포트 래핑
const ComponentA = lazy(() => import("./ComponentA"));

// JSX에서 사용
<ComponentA title={props.title} />;
```

## `createUniqueId`

```ts
import { createUniqueId } from "solid-js";

function createUniqueId(): string;
```

서버/브라우저 모두에서 안정적으로 사용할 수 있는 범용 ID 생성기.

```js
const id = createUniqueId();
```

> **참고** 서버에서는 하이드레이션 가능한 컴포넌트에서만 작동합니다.

# Secondary Primitives

처음 앱을 만들때는 필요 없을 수 있지만, 있으면 유용한 도구들입니다.

## `createDeferred`

```ts
import { createDeferred } from "solid-js";

function createDeferred<T>(
  source: () => T,
  options?: {
    timeoutMs?: number;
    equals?: false | ((prev: T, next: T) => boolean);
  }
): () => T;
```

브라우저가 아이들 상태일 때 다운스트림 변경 사항을 알려주는 읽기 전용 계산을 생성합니다.
`timeoutMs` 는 강제 업데이트를 하기 전에 대기하는 최대 시간입니다.

## `createRenderEffect`

```ts
import { createRenderEffect } from "solid-js";

function createRenderEffect<T>(fn: (v: T) => T, value?: T): void;
```

render 이펙트는 일반 이펙트([`createEffect`](#createeffect)에 의해 생성)와 유사한 계산이지만, Solid가 이펙트 함수의 첫 실행을 예약할 때 차이가 있습니다.
`createEffect`는 현재 렌더링 단계가 완료될 때까지 기다리지만, `createRenderEffect`는 함수를 즉시 실행합니다.
따라서 이펙트는 DOM 엘리먼트가 생성되고 업데이트될 때 실행되지만, 관심있는 특정 엘리먼트가 생성되기 전, 그리고 이 엘리먼트가 도큐먼트에 연결되기 전에 실행될 수 있습니다.
특히 [`ref`](#ref)는 초기 이펙트 호출 전에는 설정되지 않습니다.
실제로 Solid는 `ref` 설정을 포함해 렌더링 단계 자체를 구현하기 위해 `createRenderEffect`를 사용합니다.

render 이펙트에 대한 리액티브 업데이트는 이펙트와 동일합니다: 리액티브 변경(예: 단일 시그널 업데이트, 일괄 변경, 전체 렌더링 단계 동안의 변경 집합)에 대한 응답으로 대기열에 추가되고, 나중에 단일 [일괄<sub>batch</sub>](#batch)로 이펙트와 함께 실행됩니다.
특히, render 이펙트 내의 모든 시그널 업데이트 일괄 처리됩니다.

다음은 동작의 예입니다. ([`createEffect`](#createeffect)의 예와 비교해 보세요.)

```js
// 이 코드가 컴포넌트 함수에 있다고 가정하고, 렌더링 단계의 일부입니다.
const [count, setCount] = createSignal(0);

// 이 이펙트는 처음과 변경시에 count 를 출력합니다.
createRenderEffect(() => console.log("count =", count()));
// render 이펙트는 즉시 실행되며, `count = 0`을 출력합니다.
console.log("hello");
setCount(1);  // 아직 이펙트 미실행
setCount(2);  // 아직 이펙트 미실행

queueMicrotask(() => {
  // 이제 `count = 2` 출력
  console.log("microtask");
  setCount(3);  // 즉시 `count = 3` 출력
  console.log("goodbye");
});

// --- 전체 출력: ---
// count = 0   [createEffect와 비교해 유일하게 추가된 라인]
// hello
// count = 2
// microtask
// count = 3
// goodbye
```

`createEffect`와 마찬가지로, 이펙트 함수는 마지막 이펙트 함수 실행에서 반환된 값을 인수로 사용해 호출됩니다.
첫 실행인 경우에는 `createRenderEffect`호출시 사용한 옵셔널 두 번째 인수를 사용해 호출됩니다.

## `createComputed`

```ts
import { createComputed } from "solid-js";

function createComputed<T>(fn: (v: T) => T, value?: T): void;
```

`createComputed`는 추적 범위에서 지정된 함수를 즉시 실행하는 새 계산을 생성하여, 디펜던시를 자동으로 추적하고 디펜던시가 변경될 때마다 함수를 자동으로 다시 실행합니다.
함수는 함수의 마지막 실행에서 반환된 값을 인수로 사용해 호출되며, 첫번째 호출에서는 `createComputed`의 옵셔널 두 번째 인수를 사용해 호출됩니다.
그 외의 경우 함수의 반환 값은 노출되지 않습니다. 특히, `createComputed`는 반환 값이 없습니다.

`createComputed`는 Soild에서 가장 즉각적인 형태의 반응형이며, 다른 프리미티브를 구현하는데 가장 유용합니다. (예를 들어, 일부 다른 Solid 프리미티브들은 `createComputed`를 사용해 구현되어 있습니다.)
하지만, `createComputed`는 다른 리액티브 프리미티브보다 더 많은 불필요한 업데이트를 쉽게 일으킬 수 있기 때문에 주의해서 사용해야 합니다.
사용 전에, 밀접하게 관련되어 있는 [`createMemo`](#creatememo)와 [`createRenderEffect`](#createrendereffect)을 고려해보세요.

`createMemo`와 마찬가지로, `createComputed`는 업데이트시 ([batch](#batch), [이펙트](#createEffect), [트랜지션](#use-transition)이 아닌 경우) 즉시 함수를 호출합니다.
하지만 `createMemo` 함수는 순수(어떤 시그널도 설정하지 않아야 함)해야 하지만, `createComputed` 함수는 시그널을 설정할 수 있습니다.
이와 관련해, `createMemo`는 함수 반환 값에 대해 읽기 전용 시그널을 제공하는 반면, `createComputed`로 동일한 작업을 수행하려면 함수 내에서 시그널을 설정해야 합니다.

`createComputed`내에서 시그널을 업데이트하면 불필요([`batch`](#batch), [`untrack`](#untrack) 등으로 래핑해 처리하지 않은 경우)할 수도 있는 리액티브 업데이트를 즉시 트리거합니다.
반면에 순수 함수와 `createMemo`를 사용할 수 있다면, Solid가 메모 업데이트 실행 순서를 최적화하기 때문에 이것이 더 효율적일 수 있습니다.

`createRenderEffect`와 마찬가지로, `createComputed`는 처음에는 해당 함수를 즉시 실행하지만, 업데이트가 수행되는 방식이 다릅니다.
일반적으로 `createComputed`는 즉시 업데이트하지만, `createRenderEffect`는 현재 렌더링 단계 후에 `createEffect`와 함께 단일 `batch`로 실행되도록 대기열을 업데이트합니다.
따라서 `createRenderEffect`는 전체 업데이트를 더 적게 수행할 수 있지만, 약간 덜 즉각적입니다.

## `createReaction`

**v1.3.0 추가**

```ts
import { createReaction } from "solid-js";

function createReaction(onInvalidate: () => void): (fn: () => void) => void;
```

때로는 추적과 재실행을 분리하는 것이 유용합니다.
이 프리미티브는 반환된 추적 함수에 의해 래핑된 표현식이 변경 사항에 대해 알림을 받을 때 처음 실행될 사이드 이펙트를 등록합니다.

```js
const [s, set] = createSignal("start");

const track = createReaction(() => console.log("something"));

// 다음에 s가 변경되면 리액션을 실행합니다.
track(() => s());

set("end"); // "something"

set("final"); // 리액션은 첫 업데이트에서만 실행되기 때문에 작동하지 않으며, track 을 다시 호출해야 합니다.
```

## `createSelector`

```ts
import { createSelector } from "solid-js";

function createSelector<T, U>(
  source: () => T,
  fn?: (a: U, b: T) => boolean
): (k: U) => boolean;
```

값과 일치하는 키가 들어오거나 나가는 경우에만 구독자에게 알리는 조건부 시그널을 생성합니다.
O(n) 대신 O(2) 연산을 수행하기 때문에, 위임된 선택 상태에 유용하게 사용할 수 있습니다.

```js
const isSelected = createSelector(selectedId);

<For each={list()}>
  {(item) => <li classList={{ active: isSelected(item.id) }}>{item.name}</li>}
</For>;
```

# Rendering

사용되는 함수들은 `solid-js/web`에서 가져옵니다.

## `render`

```ts
import { render } from 'solid-js/web';

function render(code: () => JSX.Element, element: MountableElement): () => void;
```

이 함수는 브라우저 앱 진입점입니다.
마운트할 최상위 컴포넌트나 함수, 그리고 마운트할 대상 엘리먼트를 지정합니다.
이 엘리먼트는 비워두는 것이 좋습니다:
`render` 실행 중에 자식을 추가하기 때문에, 반환되는 dispose 함수는 모든 자식들을 삭제합니다.

```js
const dispose = render(App, document.getElementById("app"));
// 또는
const dispose = render(() => <App/>, document.getElementById("app"));
```

첫 번째 인수가 함수라는 것이 중요합니다:
`render`가 루트를 설정하고 `App` 내에서 시그널 디펜던시를 추적하기 전에 `App`이 실행되기 때문에, `render(<App/>, ...)` 처럼 JSX를 직접 전달하면 안됩니다.

## `hydrate`

```ts
import { hydrate } from "solid-js/web";

function hydrate(fn: () => JSX.Element, node: MountableElement): () => void;
```

이 메서드는 DOM에 이미 렌더링된 것을 다시 하이드레이션 하려고 시도한다는 점만 빼면 `render`와 유사합니다.
브라우저에서 초기화할 때 페이지는 이미 서버에서 렌더링된 상태입니다.

```js
const dispose = hydrate(App, document.getElementById("app"));
```

## `renderToString`

```ts
import { renderToString } from "solid-js/web";

function renderToString<T>(
  fn: () => T,
  options?: {
    nonce?: string;
    renderId?: string;
  }
): string;
```

문자열로 렌더링하며, 동기식으로 작동합니다.
이 함수는 또한 프로그레시브 하이드레이션을 위한 스크립트 태그를 생성합니다.
옵션에는 페이지가 로드되기 전에 수신하고 하이드레이션시에 실행할 이벤트 이름과, 스크립트 태그에 넣을 nonce가 포함됩니다.

`renderId` 는 여러 최상위 루트가 있는 경우 네임스페이스 렌더링에 사용됩니다.

```js
const html = renderToString(App);
```

## `renderToStringAsync`

```ts
import { renderToStringAsync } from "solid-js/web";

function renderToStringAsync<T>(
  fn: () => T,
  options?: {
    timeoutMs?: number;
    renderId?: string;
    nonce?: string;
  }
): Promise<string>;
```

결과를 반환하기 전에 모든 `<Suspense>` 경계가 해결될 때까지 대기한다는 점만 제외하면 `renderToString`과 동일합니다.
리소스 데이터는 자동으로 스크립트 태그로 직렬화되며, 클라이언트 로드시 하이드레이트됩니다.

`renderId` 는 여러 최상위 루트가 있는 경우 네임스페이스 렌더링에 사용됩니다.

```js
const html = await renderToStringAsync(App);
```

## `renderToStream`

**v1.3.0 추가**

```ts
import { renderToStream } from "solid-js/web";

function renderToStream<T>(
  fn: () => T,
  options?: {
    nonce?: string;
    renderId?: string;
    onCompleteShell?: () => void;
    onCompleteAll?: () => void;
  }
): {
  pipe: (writable: { write: (v: string) => void }) => void;
  pipeTo: (writable: WritableStream) => void;
};
```

이 메서드는 스트립으로 렌더링합니다.
Suspense 폴백 플레이스홀더를 포함하여 컨텐츠를 동기적으로 렌더링한 다음, 완려되면 비동기 리소스에서 데이터과 HTML을 계속 스트리밍합니다.

```js
// node
renderToStream(App).pipe(res);

// web stream
const { readable, writable } = new TransformStream();
renderToStream(App).pipeTo(writable);
```

`onCompleteShell`은 스트림에 대한 첫 플러시를 브라우저에 쓰기전에, 동기 렌더링이 완료되면 실행됩니다.
`onCompleteAll`은 모든 서버 Suspense 경계가 해결되면 호출됩니다.
`renderId` 는 여러 최상위 루트가 있는 경우 네임스페이스 렌더링에 사용됩니다.

> 이 API는 이전의 `pipeToWritable`, `pipeToNodeWritable` API를 대체합니다.

## `isServer`

```ts
import { isServer } from "solid-js/web";

const isServer: boolean;
```

코드가 서버 또는 브라우저 번들로 실행되고 있음을 나타냅니다.
기본 런타임이 이 값을 boolean 상수값으로 익스포트하기 때문에, 번들러는 이 코드와 해당 번들에서 사용된 임포트들을 제거할 수 있습니다.

```js
if (isServer) {
  // 브라우저 번들에 포함되지 않음
} else {
  // 서버에서 실행되지 않음
}
```

## `HydrationScript`

```ts
import { generateHydrationScript, HydrationScript } from "solid-js/web";

function generateHydrationScript(options: {
  nonce?: string;
  eventNames?: string[];
}): string;

function HydrationScript(props: {
  nonce?: string;
  eventNames?: string[];
}): JSX.Element;
```

하이드레이션 스크립트는 Solid 런타임이 로드되기 전에 하이드레이션을 부트스트랩하기 위해 페이지에 배치되어야 하는 특별한 스크립트입니다.
HTML 문자열에서 호출 및 삽입할 수 있는 함수로 제공되거나, `<html>` 태그에서 JSX를 렌더링하는 경우 컴포넌트로 제공됩니다.

옵션에는 스크립트 태그에 추가할 `nounce`, 그리고 스크립트가 로드된 후 하이드레이션 재실행 중에 캡쳐해야하는 이벤트 이름들이 있습니다.
이 이벤트들은 구성 및 버블링되는 대부분의 UI 이벤트를 포함하는 Solid가 위임하는 이벤트로 한정됩니다.
기본적으로는 `click`, `input` 이벤트만 있습니다.

# Control Flow

리액티브 제어 흐름이 성능을 발휘하려면, 엘리먼트가 생성되는 방식을 제어해야 합니다.
예를 들어, `array.map`을 호출하면 항상 전체 배열을 매핑하므로 비효율적입니다.

이는 헬퍼 함수를 의미합니다.
이들을 컴포넌트로 래핑하는 것은 간결한 템플릿을 위한 편리한 방법이며, 사용자가 커스텀 제어 흐름 컴포넌트를 만들어 구성할 수 있도록 합니다.

이러한 기본 제어 흐름 컴포넌트들은 자동으로 임포트됩니다.
`Portal`, `Dynamic`을 제외한 모든 항목들은 `solid-js`와 `solid-js/web`에서 익스포트됩니다.
DOM 전용인 `Portal`과 `Dynamic`은 `solid-js/web`에서 익스포트됩니다.

> 참고: 제어 흐름의 모든 콜백/렌더 함수는 추적되지 않습니다. 이 덕분에 중첩된 상태를 생성할 수 있으며, 리액션을 더 잘 분리할 수 있게 됩니다.

## `<For>`

```ts
import { For } from "solid-js";

function For<T, U extends JSX.Element>(props: {
  each: readonly T[];
  fallback?: JSX.Element;
  children: (item: T, index: () => number) => U;
}): () => U[];
```

변경된 항목만 효율적으로 업데이트하는 참조 키 루프. 콜백 함수의 첫 번째 인수는 현재 항목이 전달됩니다.

```jsx
<For each={state.list} fallback={<div>Loading...</div>}>
  {(item) => <div>{item}</div>}
</For>
```

옵셔널인 두 번째 인수는 인덱스 시그널이 전달됩니다:

```jsx
<For each={state.list} fallback={<div>Loading...</div>}>
  {(item, index) => (
    <div>
      #{index()} {item}
    </div>
  )}
</For>
```

## `<Show>`

```ts
import { Show } from "solid-js";

function Show<T>(props: {
  when: T | undefined | null | false;
  fallback?: JSX.Element;
  children: JSX.Element | ((item: T) => JSX.Element);
}): () => JSX.Element;
```

Show 제어 흐름은 뷰의 일부를 조건부로 렌더링하는 데 사용됩니다: `when` 조건이 참인 경우 `children`을 렌더링하며, 그렇지 않은 경우  `fallback`을 렌더링합니다.
삼항 연산자(`when ? children : fallback`)와 유사하지만 JSX 템플링에는 이 방법이 좋습니다.

```jsx
<Show when={state.count > 0} fallback={<div>Loading...</div>}>
  <div>My Content</div>
</Show>
```

Show는 특정 데이터 모델을 표시하는데도 사용할 수 있습니다.
예를 들어, 아래 함수는 user 모델이 교체될 때마다 다시 실행됩니다.

```jsx
<Show when={state.user} fallback={<div>Loading...</div>}>
  {(user) => <div>{user.firstName}</div>}
</Show>
```

## `<Switch>`/`<Match>`

```ts
import { Switch, Match } from "solid-js";
import type { MatchProps } from "solid-js";

function Switch(props: {
  fallback?: JSX.Element;
  children: JSX.Element;
}): () => JSX.Element;

type MatchProps<T> = {
  when: T | undefined | null | false;
  children: JSX.Element | ((item: T) => JSX.Element);
};
function Match<T>(props: MatchProps<T>);
```

2개 이상의 상호 배타적인 조건이 있는 유용합니다.
예를 들어, 기본 라우팅에 사용할 수 있습니다.

```jsx
<Switch fallback={<div>Not Found</div>}>
  <Match when={state.route === "home"}>
    <Home />
  </Match>
  <Match when={state.route === "settings"}>
    <Settings />
  </Match>
</Switch>
```

Match는 함수 형태의 자식도 지원합니다.

## `<Index>`

```ts
import { Index } from "solid-js";

function Index<T, U extends JSX.Element>(props: {
  each: readonly T[];
  fallback?: JSX.Element;
  children: (item: () => T, index: number) => U;
}): () => U[];
```

키가 없는 리스트 반복에 사용하며, 렌더링된 노드는 배열 인덱스로 키가 지정됩니다.
데이터가 프리미티브로 구성이 되어 있고, 값 대신 인덱스가 고정되어 있는 경우와 같이 개념적인 키가 없을 때 유용합니다.

아래 코드에서 item은 시그널입니다:

```jsx
<Index each={state.list} fallback={<div>Loading...</div>}>
  {(item) => <div>{item()}</div>}
</Index>
```

2번째 인수는 index를 나타냅니다:

```jsx
<Index each={state.list} fallback={<div>Loading...</div>}>
  {(item, index) => (
    <div>
      #{index} {item()}
    </div>
  )}
</Index>
```

## `<ErrorBoundary>`

```ts
import { ErrorBoundary } from "solid-js";

function ErrorBoundary(props: {
  fallback: JSX.Element | ((err: any, reset: () => void) => JSX.Element);
  children: JSX.Element;
}): () => JSX.Element;
```

처리되지 않은 에러를 캐치해서 대체 콘텐츠를 렌더링합니다.

```jsx
<ErrorBoundary fallback={<div>Something went terribly wrong</div>}>
  <MyComp />
</ErrorBoundary>
```

또한 에러와 리셋 함수를 전달하는 콜백 형식도 지원합니다.

```jsx
<ErrorBoundary
  fallback={(err, reset) => <div onClick={reset}>Error: {err.toString()}</div>}
>
  <MyComp />
</ErrorBoundary>
```

## `<Suspense>`

```ts
import { Suspense } from "solid-js";

function Suspense(props: {
  fallback?: JSX.Element;
  children: JSX.Element;
}): JSX.Element;
```

자식에서 읽는 모든 리소스를 추적하고 해결될 때까지 폴백 플레이스 홀더를 표시하는 컴포넌트입니다.
`Suspense`가 `Show`와 다른 점은, 현재 DOM에 없더라도 두 컴포넌트가 동시에 존재한다는 점에서 논블로킹이라는 점입니다.

```jsx
<Suspense fallback={<div>Loading...</div>}>
  <AsyncComponent />
</Suspense>
```

## `<SuspenseList>` (실험 단계)

```ts
import { SuspenseList } from "solid-js";

function SuspenseList(props: {
  children: JSX.Element;
  revealOrder: "forwards" | "backwards" | "together";
  tail?: "collapsed" | "hidden";
}): JSX.Element;
```

`SuspenseList`는 여러 병렬 `Suspense`와 `SuspenseList` 컴포넌트를 조정할 수 있습니다.
레이아웃 스래싱을 줄이기 위해 컨텐츠가 표시되는 순서를 제어하고, 폴백 상태를 축소하거나 숨길수 있는 옵션이 있습니다.

```jsx
<SuspenseList revealOrder="forwards" tail="collapsed">
  <ProfileDetails user={resource.user} />
  <Suspense fallback={<h2>Loading posts...</h2>}>
    <ProfileTimeline posts={resource.posts} />
  </Suspense>
  <Suspense fallback={<h2>Loading fun facts...</h2>}>
    <ProfileTrivia trivia={resource.trivia} />
  </Suspense>
</SuspenseList>
```

SuspenseList 는 아직 실험 단계이며, SSR 을 완전하게 지원하지 않습니다.

## `<Dynamic>`

```ts
import { Dynamic } from "solid-js/web";

function Dynamic<T>(
  props: T & {
    children?: any;
    component?: Component<T> | string | keyof JSX.IntrinsicElements;
  }
): () => JSX.Element;
```

이 컴포넌트를 사용하면 임의의 컴포넌트 또는 태그를 삽입하고 props를 전달할 수 있습니다.

```jsx
<Dynamic component={state.component} someProp={state.something} />
```

## `<Portal>`

```ts
import { Portal } from "solid-js/web";

function Portal(props: {
  mount?: Node;
  useShadow?: boolean;
  isSVG?: boolean;
  children: JSX.Element;
}): Text;
```

mount 노드에 컴포넌트를 삽입합니다.
페이지 레이아웃 외부에 모달을 삽입는데 유용하게 사용할 수 있으며, 이벤트는 컴포넌트 계층을 통해 전파됩니다.

대상이 `HTMLHeadElement`가 아니라면 Portal 은 `<div>`에 마운트됩니다.
`useShadow`는 스타일 격리를 위해 섀도우 루트에 엘리먼트를 배치하고, SVG 엘리먼트에 삽입하는 경우 `<div>`가 삽입되지 않도록 `isSVG` 설정이 필요합니다.

```jsx
<Portal mount={document.getElementById("modal")}>
  <div>My Content</div>
</Portal>
```

# 특별한 JSX 속성

일반적으로 Solid는 DOM 컨벤션을 지키려고 합니다.
대부분의 props는 기본 엘리먼트의 속성 및 웹 컴포넌트의 프로퍼티로 취급되지만, 그 중 일부는 특별한 동작을 합니다.

타입스크립트 사용시 커스텀 네임스페이스 속성은 Solid의 JSX 네임스페이스를 확장해야 합니다:

```ts
declare module "solid-js" {
  namespace JSX {
    interface Directives {
      // use:____
    }
    interface ExplicitProperties {
      // prop:____
    }
    interface ExplicitAttributes {
      // attr:____
    }
    interface CustomEvents {
      // on:____
    }
    interface CustomCaptureEvents {
      // oncapture:____
    }
  }
}
```

## `ref`

ref는 JSX의 기본 DOM 엘리먼트에 액세스하기 위한 방법입니다.
엘리먼트를 변수에 할당할 수도 있지만, JSX의 플로우에 컴포넌트를 그대로 두는 것이 더 좋습니다.
ref는 렌더링 시점에 엘리먼트가 DOM에 연결되기 전에 할당됩니다.

```js
// ref에 의해 직접 할당되는 변수
let myDiv;

// onMount 또는 createEffect를 사용해 DOM에 연결된 후 읽음
onMount(() => console.log(myDiv));
<div ref={myDiv} />

// 또는, 콜백 함수 사용 (DOM에 연결되기 전에 호출됨)
<div ref={el => console.log(el)} />
```

ref는 컴포넌트에서도 사용할 수 있으며, 다른 쪽에도 부착되어야 합니다.

```jsx
function MyComp(props) {
  return <div ref={props.ref} />;
}

function App() {
  let myDiv;
  onMount(() => console.log(myDiv.clientWidth));
  return <MyComp ref={myDiv} />;
}
```

## `classList`

Solid는 엘리먼트의 `class`를 설정하기 위해 `class`와 `classList` 속성을 제공합니다.

먼저, 다른 속성들처럼 `class=...`를 사용합니다. 예를 들면:

```jsx
// 2개의 정적 class
<div class="active editing" />

// 필요없는 경우 class 속성을 삭제하는 하나의 동적 class
<div class={state.active ? 'active' : undefined} />

// 2개의 동적 class
<div class={`${state.active ? 'active' : ''} ${state.currentId === row.id ? 'editing' : ''}} />
```

(참고로 `className=...`는 Solid 1.4 부터 더 이상 사용되지 않습니다.)

대신 `classList` 속성을 사용하면 각 키는 class 이고, 해당 class 를 포함할지 여부를 나타내는 boolean 형식의 값을 가지는 객체를 지정할 수 있습니다.
예를 들면 (위의 마지막 예제에 해당함):

```jsx
<div
  classList={{ active: state.active, editing: state.currentId === row.id }}
/>
```

이 예제는 해당 boolean 값이 변경될 때만 [`element.classList.toggle`](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle) 을 동적으로 호출하여 각 class 를 켜거나 끄는 [렌더 이펙트](#createrendereffect)로 컴파일됩니다.
예를 들어, `state.active`가 `true`가 되면, 엘리먼트는 `active` class를 얻게 됩니다.

`classList`에 전달되는 값은 적절한 객체로 평가되는 모든 표현식(시그널 getter 포함)이 가능합니다.
몇 가지 예를 들면:

```jsx
// 동적 class 이름, 값
<div classList={{ [className()]: classOn() }} />;

// 시그널 class 리스트
const [classes, setClasses] = createSignal({});
setClasses((c) => ({...c, active: true}));
<div classList={classes()} />;
```

`class`와 `classList`를 섞어쓸 수는 있지만 위험합니다.
안전한 상황은 `class`가 정적 문자열로 설정하거나 설정하지 않고, `classList`가 리액티브한 경우입니다.
(`class` 는 `class={baseClass()}`처럼 정적 계산 값으로 설정할 수도 있지만, `classList` 보다는 앞에 설정해야 합니다)
만일 `class`와 `classList` 모두 리액티브하다면, 예상치 못한 동작이 발생할 수 있습니다:
`class` 값이 변경되면, Solid 는 전체 `class` 속성을 설정하므로, `classList`에서 설정된 모든 토글을 덮어쓰게 됩니다.

 `classList`는 컴파일 타임 속성이기 때문에, `<div {...props} />` 과 같은 스프레드 연산자나 `<Dynamic>`내에서는 작동하지 않습니다.

## `style`

Solid의 `style` 속성에 CSS 문자열이나 키가 CSS 속성 이름인 객체를 사용할 수 있습니다:

```jsx
// 문자열
<div style={`color: green; height: ${state.height}px`} />

// 객체
<div style={{
  color: "green",
  height: state.height + "px" }}
/>
```
[리액트의 `style` 속성](https://reactjs.org/docs/dom-elements.html#style)과 달리 Solid는 내부적으로 `element.style.setProperty`를 사용합니다.
즉, `backgroundColor`와 같은 자바스크립트 카멜 케이스 버전이 아닌 `"background-color"`와 같은 소문자이면서 `-`로 구분된 속성 이름을 사용해야 합니다.
이는 실제로 더 나은 성능과 SSR 출력의 일관성으로 이어집니다.

```jsx
// 문자열
<div style={`color: green; background-color: ${state.color}; height: ${state.height}px`} />

// 객체
<div style={{
  color: "green",
  "background-color": state.color,
  height: state.height + "px" }}
/>
```

또한 CSS 변수도 설정할 수 있습니다. 예를 들면:

```jsx
// css 변수 설정
<div style={{ "--my-custom-color": state.themeColor }} />
```

## `innerHTML`/`textContent`

이는 해당 프로퍼티와 동일하게 문자열을 설정하면 작동합니다.
**조심하세요!!** `innerHTML`에 설정하는 데이터는 최종 사용자에게 노출되며, 악성 공격에 사용될 수 있습니다.
`textContent`는 일반적으로는 필요하지 않지만, 일반적인 diffing 루틴을 건너뛰기 때문에 자식이 텍스트로만 구성되어 있다는 것을 알고 있는 경우 사용하면 성능을 최적화할 수 있습니다.

```jsx
<div textContent={state.text} />
```

## `on___`

Solid의 이벤트 핸들러는 일반적으로 스타일에 따라 `onclick` 이나 `onClick` 형식을 취합니다.

Solid는 버블링되는 일반 UI 이벤트에 대해 반-합성<sub>semi-synthetic</sub> 이벤트 위임을 사용합니다.
이로 인해 일반적인 이벤트의 성능이 향상됩니다.

```jsx
<div onClick={(e) => console.log(e.currentTarget)} />
```

Solid는 이벤트 핸들러의 첫 번째 인수에 값을 바인딩하기 위해 배열을 사용할 수 있습니다.
이는 `bind`를 사용하거나 추가 클로저를 생성하지 않으므로, 이벤트를 위임하는 고도로 최적화된 방법입니다.

```jsx
function handler(itemId, e) {
  /*...*/
}

<ul>
  <For each={state.list}>{(item) => <li onClick={[handler, item.id]} />}</For>
</ul>;
```

이벤트는 리바운드되지 않으며 바인딩은 리액티브하지 않습니다. 이는 리스너를 추가, 삭제하는데 비용이 많이 들기 때문입니다.
이벤트 핸들러는 이벤트 발생시마다 일반 함수처럼 호출되기 때문에 반응성이 필요없습니다; 원하는 경우 바로 가면 됩니다.

```jsx
// 정의된 경우 호출하며, 그렇지 않으면 호출하지 않음
<div onClick={() => props.handleClick?.()} />
```

`onChange`와 `onInput`은 기본 동작에 따라 작동합니다. `onInput`은 값이 변경된 직후 실행됩니다; `<input>` 필드의 경우 `onChange`는 필드가 포커스를 잃은 후에만 실행됩니다.

## `on:___`/`oncapture:___`

특이한 이름을 가진 이벤트나, 위임을 원하지 않는 이벤트의 경우 `on` 네임스페이스 이벤트를 사용합니다.
이 속성은 이벤트 리스너를 그대로 추가합니다.

```jsx
<div on:Weird-Event={(e) => alert(e.detail)} />
```

## `use:___`

이는 커스텀 디렉티브입니다. 어떤 의미에서 이는 ref에 대한 문법적 설탕이지만 단일 엘리먼트에 여러 디렉티브를 쉽게 연결할 수 있습니다.
디렉티브는 다음과 같은 시그니처를 가지는 함수입니다.

```ts
function directive(element: Element, accessor: () => any): void;
```

디렉티브 함수는 DOM에 추가되기 전에 렌더링시에 호출됩니다.
시그널, 이펙트 생성, 클린업 등록등을 포함하는 모든 원하는 작업을 수행할 수 있습니다.

```js
const [name, setName] = createSignal("");

function model(el, value) {
  const [field, setField] = value();
  createRenderEffect(() => (el.value = field()));
  el.addEventListener("input", (e) => setField(e.target.value));
}

<input type="text" use:model={[name, setName]} />;
```

타입스크립트 사용시 JSX 네임스페이스를 확장해 등록합니다.

```ts
declare module "solid-js" {
  namespace JSX {
    interface Directives {
      model: [() => any, (v: any) => any];
    }
  }
}
```

## `prop:___`

prop이 속성<sub>attribute</sub> 대신 프로퍼티로 처리되도록 합니다.

```jsx
<div prop:scrollTop={props.scrollPos + "px"} />
```

## `attr:___`

prop이 프로퍼티 대신 속성<sub>attribute</sub>로 처리되도록 합니다.
웹 컴포넌트에서 속성을 설정하려는 경우 유용합니다.

```jsx
<my-element attr:status={props.status} />
```

## `/* @once */`

Solid의 컴파일러는 JSX 표현식의 리액티브 래핑 및 지연 평가에 휴리스틱을 사용합니다.
함수 호출, 프로퍼티 액세스, JSX가 포함되어 있다면 컴포넌트에 전달할 때는 getter로 래핑하고, 기본 엘리먼트에 전달하는 경우에는 이펙트로 래핑합니다.

이 휴리스틱과 그 한계를 알고 있으면 JSX 외부에서 액세스하여 절대 변경되지 않는 항목의 오버헤드를 줄일 수 있습니다.
홀로 있는 변수는 절대 래핑되지 않습니다.
또한 표현식 앞에 `/* @once */` 주석 데코레이터를 추가하여 컴파일러가 래핑하지 않도록 할 수 있습니다.

```jsx
<MyComponent static={/*@once*/ state.wontUpdate} />
```

이는 자식에도 적용됩니다.

```jsx
<MyComponent>{/*@once*/ state.wontUpdate}</MyComponent>
```
