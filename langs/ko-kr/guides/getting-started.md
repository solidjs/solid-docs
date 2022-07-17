# 시작하기

**새 문서를 작성 중입니다.** 새로운 초보자용 튜토리얼은 [여기](https://docs.solidjs.com/tutorials/getting-started-with-solid/)에서 확인할 수 있으며, [Discord](http://discord.com/invite/solidjs)에서 참여할 수 있습니다!

## Solid 살펴보기

Solid 핵심 개념에 대한 간략한 동영상을 확인해 보세요:

- [Solid 소개 (100초)](https://youtu.be/hw3Bx5vxKl0)
- [Solid의 반응성 (10분)](https://youtu.be/J70HXl1KhWE)

## Solid 사용하기

Solid를 사용하기 위한 가장 쉬운 방법은 온라인으로 시도해 보는 것입니다. https://playground.solidjs.com 의 REPL은 이를 위한 완벽한 방법을 제공합니다. 또한 [예제](https://github.com/solidjs/solid/blob/main/documentation/resources/examples.md)를 편집해 볼 수 있는 https://codesandbox.io/ 도 있습니다.

또한, 터미널에서 다음 명령을 실행해서 간단한 [Vite 템플릿](https://github.com/solidjs/templates)을 사용할 수 있습니다:

```sh
> npx degit solidjs/templates/js my-app
> cd my-app
> npm i # or yarn or pnpm
> npm run dev # or yarn or pnpm
```

타입스크립트를 사용하려면 다음과 같이 실행합니다:

```sh
> npx degit solidjs/templates/ts my-app
> cd my-app
> npm i # or yarn or pnpm
> npm run dev # or yarn or pnpm
```

또는 프로젝트에 디펜던시를 설치할 수 있습니다.
(권장하는 방법인) Solid를 JSX와 함께 사용하려면, `solid-js` NPM 라이브러리와 [Solid JSX compiler](https://github.com/ryansolid/dom-expressions/tree/main/packages/babel-plugin-jsx-dom-expressions) babel 플러그인을 설치해야 합니다:

```sh
> npm install solid-js babel-preset-solid
```

그리고 나서, `.babelrc` 파일 혹은 webpack, rollup 에 있는 Babel 설정에 `babel-preset-solid`을 추가합니다:

```json
"presets": ["solid"]
```

타입스크립트 사용시, Solid의 JSX를 핸들링하기 위해 `tsconfig.json` 파일을 다음과 같이 설정합니다 (자세한 사항은 [타입스크립트 가이드](https://www.solidjs.com/guides/typescript)를 참고하세요):

```json
"compilerOptions": {
  "jsx": "preserve",
  "jsxImportSource": "solid-js",
}
```

## Solid 배우기

Solid는 애플리케이션 빌딩 블록 역할을 하는 조합 가능한 작은 조각들입니다. 이 조각들은 대부분 얕은 최상위 API를 구성하는 함수들입니다. 다행히도 이들 대부분에 대해서 몰라도 시작할 수 있습니다.

자유롭게 사용할 수 있는 두가지 주요 빌딩 블록은 컴포넌트와 리액티브 프리미티브가 있습니다.

컴포넌트는 props 객체를 입력으로 받으며, 네이티브 DOM 엘리먼트와 다른 컴포넌트를 포함하는 JSX 엘리먼트를 반환하는 함수입니다. 이는 파스칼 케이스의 JSX 엘리먼트로 표현할 수 있습니다:

```jsx
function MyComponent(props) {
  return <div>Hello {props.name}</div>;
}

<MyComponent name="Solid" />;
```

컴포넌트는 자체적으로 상태를 저장하지 않고 인스턴스가 없다는 점에서 가볍습니다. 대신, DOM 엘리먼트와 리액티브 프리미티브를 위한 팩토리 함수 역할을 합니다.

Solid의 세밀한 반응성<sub>Reactivity</sub>은 시그널, 메모, 이펙트의 3개의 핵심 프리미티브들을 기반으로 합니다. 이들은 뷰를 최신 상태로 유지하는 자동 추적 동기화 엔진을 형성합니다. 리액티브 계산은 동기식으로 실행되는, 함수로 래핑된 표현식의 형태를 취합니다.

```js
const [first, setFirst] = createSignal("JSON");
const [last, setLast] = createSignal("Bourne");

createEffect(() => console.log(`${first()} ${last()}`));
```

[Solid의 반응성](/guides/reactivity)과 [Solid의 렌더링](/guides/rendering)에 대해서 자세히 알아보세요.

## Solid의 철학

Solid의 디자인에는 최고의 웹사이트와 애플리케이션을 구축하는데 필요한 원칙과 가치관에 대한 몇가지 의견이 담겨 있습니다. Solid에 대한 철학을 알고 있다면 Solid를 배우고 사용하는것이 더 쉬워집니다.

### 1. 선언적 데이터

선언적 데이터는 데이터의 동작에 대한 설명을 선언에 묶는 방식입니다. 이를 통해 데이터 동작의 모든 측면을 한 곳에서 패키징하여 쉽게 조합할 수 있습니다.

### 2. 사라지는 컴포넌트

업데이트를 고려하지 않고 컴포넌트를 구조화하는 것은 어렵습니다. Solid 업데이트는 컴포넌트와 완전히 독립되어 있습니다. 컴포넌트 함수는 한 번 호출된 후 사라집니다. 컴포넌트는 코드를 구성하기 위해 존재하며 다른 용도는 별로 없습니다.

### 3. 읽기/쓰기 분리

정확한 제어와 예측 가능성은 더 나은 시스템을 만듭니다. 단벙향 플로우를 강제하기 위한 불변성은 필요하지 않으며, 소비자가 변경할 수 있는 것과 아닌 것을 의식적으로 결정하는 능력만 필요합니다.

### 4. 쉬운것보다 단순한 것이 낫다.

세밀한 반응성을 위해서 고생하며 얻은 교훈입니다. 더 많은 노력이 필요하더라도, 명시적이고 일관된 규칙은 그만한 가치가 있습니다. 목표는 기본이 되는 최소한의 도구를 제공하는 것입니다.

## 웹 컴포넌트

Solid는 웹 컴포넌트를 1급 시민으로 만들고자 하는 바램으로 탄생했습니다. 시간이 흐르면서 디자인이 발전하고 목표가 변경되었지만, Solid는 여전히 웹 컴포넌트를 작성하는 좋은 방법입니다. [Solid 엘리먼트](https://github.com/solidjs/solid/tree/main/packages/solid-element)를 사용하면 Solid의 함수형 컴포넌트를 작성하고 래핑해서 작고 성능 좋은 웹 컴포넌트를 만들 수 있습니다. Solid 앱 내에서 Solid 엘리먼트는 Solid의 컨텍스트 API를 활용할 수 있으며, Solid Portal은 Shadow DOM의 격리된 스타일을 지원합니다.

## 서버 렌더링

Solid는 진정한 동형<sub>Isomorphic</sub> 개발 경험을 가능하게 하는 동적 서버 사이드 렌더링 솔루션을 제공합니다. Resource 프리미티브를 사용하면 비동기 데이터 요청을 쉽게 생성할 수 있으며, 클라이언트와 브라우저 간에 자동으로 직렬화 및 동기화됩니다.

Solid는 서버에서 비동기 렌더링과 스트림 렌더링을 지원하기 때문에, 한쪽 방향으로 코드를 작성해서 서버에서 실행할 수 있습니다. 즉, [render-as-you-fetch](https://ko.reactjs.org/docs/concurrent-mode-suspense.html#approach-3-render-as-you-fetch-using-suspense) 및 코드 분할과 같은 기능이 Solid에서도 작동합니다.

자세한 내용은 [서버 가이드](/guides/server#server-side-rendering)를 읽어보시기 바랍니다.

## 빌드리스 옵션

일반 HTML 파일, https://codepen.io 등과 같이 컴파일을 사용하지 않는 환경에서 Solid를 사용하고 싶은 경우, Solid의 컴파일 타임 최적화된 JSX 문법 대신 평범한 자바스크립트에서 [` html`` ` 태그드 템플릿 리터럴](https://github.com/solidjs/solid/tree/main/packages/solid/html) 이나 [HyperScript `h()` 함수](https://github.com/solidjs/solid/tree/main/packages/solid/h)를 사용할 수 있습니다.

[Skypack](https://www.skypack.dev/)을 사용해 브라우저에서 직접 실행 가능합니다. 예를 들면:

```html
<html>
  <body>
    <script type="module">
      import {
        createSignal,
        onCleanup,
      } from "https://cdn.skypack.dev/solid-js";
      import { render } from "https://cdn.skypack.dev/solid-js/web";
      import html from "https://cdn.skypack.dev/solid-js/html";

      const App = () => {
        const [count, setCount] = createSignal(0),
          timer = setInterval(() => setCount(count() + 1), 1000);
        onCleanup(() => clearInterval(timer));
        return html`<div>${count}</div>`;
        // 혹은
        return h("div", {}, count);
      };
      render(App, document.body);
    </script>
  </body>
</html>
```

빌드리스의 장점에는 트레이드 오프가 있습니다:

- 표현식은 항상 getter 함수로 래핑되어야 하며, 그렇지 않으면 리액티브하지 않게 됩니다.
  다음 코드는 템플릿이 내부적으로 생성하는 이펙트 안에서 값을 액세스하지 않았기 때문에, `first`나 `last`가 변경되더라도 업데이트되지 않으며, 디펜던시가 추적되지 않습니다:
  ```js
  html` <h1>Hello ${first() + " " + last()}</h1> `;
  // 혹은
  h("h1", {}, "Hello ", first() + " " + last());
  ```

  다음 코드는 템플릿이 이펙트 안에서 getter를 읽기 때문에 `first`나 `last`가 변경되면 예상대로 업데이트되며, 디펜던시도 추적됩니다:

  ```js
  html` <h1>Hello ${() => first() + " " + last()}</h1> `;
  // 혹은
  h("h1", {}, "Hello ", () => first() + " " + last());
  ```

  Solid의 JSX는 컴파일을 하기 때문에 이 문제가 없으며, `<h1>Hello {first() + ' ' + last()}</h1>` 같은 표현식은 리액티브하게 됩니다.

- 빌드 시간 최적화는 Solid JSX 에서 처럼 동작하지 않습니다. 각 템플릿이 런타임 중에 처음 실행될 때 컴파일되기 때문에 앱 시작 속도가 약간 느려지기는 하지만, 대부분의 경우 이를 알아채지 못합니다. 시작 후 실행 속도는 JSX에서의 ` html`` ` 템플릿 태그와 동일하게 유지됩니다. `h()` 호출은 실행되기 전에 전체 템플릿을 정적으로 분석할 수 없기 때문에 항상 느린 실행 속도를 갖습니다.


타입스크립트와 함께 작동하려면, 여전히 관련 DOM Expression 라이브러리가 필요하다는 것을 기억해야 합니다. 태그드 템플릿 리터럴을 사용하려면 [Lit DOM Expressions](https://github.com/ryansolid/dom-expressions/tree/main/packages/lit-dom-expressions)가 필요하며, 하이퍼스크립트는 [Hyper DOM Expressions](https://github.com/ryansolid/dom-expressions/tree/main/packages/hyper-dom-expressions)가 필요합니다.

