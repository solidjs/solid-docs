# Solid のテスト

Solid のコードを本番環境で使用するには、テストする必要があります。すべてを手動でテストしたくはないので、自動テストが必要です。このガイドでは、すべてのセットアップ方法と Solid コードのテストに役立ついくつかのパターンを説明します。

## テストのセットアップ

私たちは 2 つのテストランナーのサポートを提供しています:

- jest - 多くの機能を持ち、非常によく知られています

- uvu - 必要最低限のものだけをもたらします

どちらも [solid-testing-library](https://github.com/solidjs/solid-testing-library) をベースにしており、[Testing Library](https://testing-library.com/) を Solid に統合しています。テスティングライブラリは軽量なブラウザを模倣し、テストからそれを操作するための API を提供します。

Solid と Jest テスト用のスターターテンプレートが用意されています。これをベースにしてプロジェクトを作成するか、スクラッチのプロジェクトにスターターテンプレートをインストールし、その設定をプロジェクトにコピーすることをお勧めします。

このテンプレートは、インストールに [degit](https://github.com/Rich-Harris/degit) ユーティリティを使用します。

### Jest を設定する

Jest 統合は、Solid をブラウザとして使用できるようにする [solid-jest/preset/browser](https://github.com/solidjs/solid-jest) Jest 設定プリセットをベースにしています。これは、Solid コードを変換するために babel を使用します。

これは [jest-dom](https://github.com/testing-library/jest-dom) を使用して `expect` を拡張し、テストを書くのに役立つ多くのカスタム マッチャーを使用します。

#### Jest と TypeScript (`ts-jest`)

```bash
$ npx degit solidjs/templates/ts-jest my-solid-project
$ cd my-solid-project
$ npm install # もしくは pnpm install もしくは yarn install
```

このテンプレートはテスト中にタイプチェックを行わないことに注意してください。IDE や `package.json` にあるカスタム `tsc --noEmit` スクリプトを使用して、このようなチェックをトリガーできます。

### uvu を設定する

また、`uvu` のスターターテンプレートも提供しています。

このテンプレートには [solid-dom-testing](https://www.npmjs.com/package/solid-dom-testing) が含まれており、Testing Library で有用なアサーションを記述するのに役立ちます。

#### Uvu と TypeScript (`ts-uvu`)

```bash
$ npx degit solidjs/templates/ts-uvu my-solid-project
$ cd my-solid-project
$ npm install # もしくは pnpm install もしくは yarn install
```

#### uvu のカバレッジレポート

> 残念ながら、[babelの制限](https://github.com/babel/babel/issues/4289)により、トランスパイルされた JSX のソースマップ出力はできません。その結果、コンポーネントのカバレッジはゼロとなります。JSX でないコードでは動作します。

テストのコードカバレッジを確認したい場合、uvu のお気に入りのツールは c8 です。インストールと設定のために、以下を実行します:

```sh
> npm i --save-dev c8 # もしくは yarn add -D もしくは pnpm
> npm set-script "test:coverage" "c8 uvu -r solid-register"
```

これで `npm run test:coverage` を実行すると、テストのカバレッジが表示されるようになります。

HTML 形式のカバレッジレポートが欲しい場合は、`c8` の代わりに `c8 -r html` を使って、html レポーターを有効にできます。

#### Watch モード

`uvu` はすぐに使用できるウォッチモードはありませんが、 `chokidar-cli` を使用して同じことを行うことができます:

```sh
> npm i --save-dev chokidar-cli # もしくは yarn add -D もしくは pnpm
> npm set-script "test:watch" "chokidar src/**/*.ts src/**/*.tsx -c \"uvu -r solid-register\"
# use .js/.jsx instead of .ts/.tsx
```

これで `npm run test:watch` を実行すると、ファイルを変更するたびにテストが実行されるようになります。

## テストのパターンとベストプラクティス

さて、テストツールのインストールが完了したら、次はそれらを使ってみましょう。これを簡単にするため、Solid はいくつかのすばらしいパターンをサポートしています。

### リアクティブな状態のテスト

メンテナンスを容易にするため、あるいは複数のビューをサポートできるようにするため、状態の一部をコンポーネントから分離しておきたい場合があります。この場合、テストの対象となるインターフェイスは状態そのものです。[リアクティブルート](https://www.solidjs.com/docs/latest/api#createroot)の外では、状態は追跡されず、更新しても Effect や Memo がトリガーされないことに注意してください。

また、Effect は非同期でトリガーされるので、最終的な Effect にアサーションをラップするのに役立ちます。また、複数の変更に対する一連の Effect を観察するには、`createRoot` から必要なツールを返して、非同期のテスト関数で実行すると便利です（`createRoot` 自体は `async` 関数を受け取ることができないので）。

例として、[ToDo のサンプル](https://www.solidjs.com/examples/todos)にある `createLocalStorage` をテストしてみましょう:

```ts
import { createEffect } from "solid-js";
import { createStore, Store, SetStoreFunction } from "solid-js/store";

export function createLocalStore<T>(
  initState: T
): [Store<T>, SetStoreFunction<T>] {
  const [state, setState] = createStore(initState);
  if (localStorage.todos) setState(JSON.parse(localStorage.todos));
  createEffect(() => (localStorage.todos = JSON.stringify(state)));
  return [state, setState];
}
```

TODO コンポーネントを作成する代わりに、このモデルを単独でテストできます。その際、1. リアクティブな変更は `render` または `createRoot` によって提供される追跡コンテキストがある場合のみ動作すること、2. 非同期であるが `createEffect` によってそれをキャッチできること、を念頭に置く必要があります。`createRoot` を使用すると、手動で廃棄のトリガーをできるという利点があります:

#### Jest でのテスト

```ts
import { createLocalStore } from "./main.tsx";
import { createRoot, createEffect } from "solid-js";

describe("createLocalStore", () => {
  beforeEach(() => {
    localStorage.removeItem("todos");
  });

  const initialState = {
    todos: [],
    newTitle: "",
  };

  test("既存の状態を localStorage から読み取る", () =>
    createRoot((dispose) => {
      const savedState = { todos: [], newTitle: "saved" };
      localStorage.setItem("todos", JSON.stringify(savedState));
      const [state] = createLocalStore(initialState);
      expect(state).toEqual(savedState);
      dispose();
    }));

  test("新しい状態を localStorage に格納する", () =>
    createRoot((dispose) => {
      const [state, setState] = createLocalStore(initialState);
      setState("newTitle", "updated");
      // Effect をキャッチするため、Effect を使う
      return new Promise<void>((resolve) =>
        createEffect(() => {
          expect(JSON.parse(localStorage.todos || "")).toEqual({
            todos: [],
            newTitle: "updated",
          });
          dispose();
          resolve();
        })
      );
    }));

  test("状態を複数回更新する", async () => {
    const { dispose, setState } = createRoot((dispose) => {
      const [state, setState] = createLocalStore(initialState);
      return { dispose, setState };
    });
    setState("newTitle", "first");
    // すべての Effect を解決するため 1 ティック待つ
    await new Promise((done) => setTimeout(done, 0));
    expect(JSON.parse(localStorage.todos || "")).toEqual({
      todos: [],
      newTitle: "first",
    });
    setState("newTitle", "second");
    await new Promise((done) => setTimeout(done, 0));
    expect(JSON.parse(localStorage.todos || "")).toEqual({
      todos: [],
      newTitle: "first",
    });
    dispose();
  });
});
```

#### uvu でのテスト

```ts
import { createLocalStore } from "./main";
import { suite } from "uvu";
import * as assert from "uvu/assert";
import { createEffect, createRoot } from "solid-js";

const todoTest = suite("createLocalStore");

todoTest.before.each(() => {
  localStorage.removeItem("todos");
});

const initialState = {
  todos: [],
  newTitle: "",
};

todoTest("既存の状態を localStorage から読み取る", () =>
  createRoot((dispose) => {
    const savedState = { todos: [], newTitle: "saved" };
    localStorage.setItem("todos", JSON.stringify(savedState));
    const [state] = createLocalStore(initialState);
    assert.equal(state, savedState);
    dispose();
  })
);

todoTest("新しい状態を localStorage に格納する", () =>
  createRoot((dispose) => {
    const [_, setState] = createLocalStore(initialState);
    setState("newTitle", "updated");
    // Effect をキャッチするため、Effect が必要
    return new Promise<void>((resolve) =>
      createEffect(() => {
        assert.equal(JSON.parse(localStorage.todos || ""), {
          todos: [],
          newTitle: "updated",
        });
        dispose();
        resolve();
      })
    );
  })
);

todoTest.run();
```

### ディレクティブのテスト

[ディレクティブ](https://www.solidjs.com/docs/latest/api#use%3A___)は再利用可能な方法で参照を使用できるようにします。これらは基本的に `(ref: HTMLElement, data: Accessor<any>) => void` というパターンに従った関数です。[ディレクティブのチュートリアル](https://www.solidjs.com/tutorial/bindings_directives?solved)では、アクセサーの引数にラップされたコールバックを呼び出す `clickOutside` ディレクティブを定義しています。

コンポーネントを作成し、そこでディレクティブを使用することもできますが、その場合はディレクティブを直接テストするのではなく、ディレクティブの使用をテストすることになります。マウントされたノードとアクセサーを提供することで、ディレクティブの外面をテストする方がより簡単です:

#### Jest でのテスト

```ts
// click-outside.test.ts
import clickOutside from "click-outside";
import { createRoot } from "solid-js";
import { fireEvent } from "solid-testing-library";

describe("clickOutside", () => {
  const ref = document.createElement("div");

  beforeAll(() => {
    document.body.appendChild(ref);
  });

  afterAll(() => {
    document.body.removeChild(ref);
  });

  test("外側のクリックでトリガーされる", () =>
    createRoot(
      (dispose) =>
        new Promise<void>((resolve) => {
          let clickedOutside = false;
          clickOutside(ref, () => () => {
            clickedOutside = true;
          });
          document.body.addEventListener("click", () => {
            expect(clickedOutside).toBeTruthy();
            dispose();
            resolve();
          });
          fireEvent.click(document.body);
        })
    ));

  test("内側のクリックではトリガーされない", () =>
    createRoot(
      (dispose) =>
        new Promise<void>((resolve) => {
          let clickedOutside = false;
          clickOutside(ref, () => () => {
            clickedOutside = true;
          });
          ref.addEventListener("click", () => {
            expect(clickedOutside).toBeFalsy();
            dispose();
            resolve();
          });
          fireEvent.click(ref);
        })
    ));
});
```

#### uvu でのテスト

```ts
// click-outside.test.ts
import clickOutside from "click-outside.tsx";
import { createRoot } from "solid-js";
import { fireEvent } from "solid-testing-library";

const clickTest = suite("clickOutside");

const ref = document.createElement("div");

clickTest.before(() => {
  document.body.appendChild(ref);
});

clickTest.after(() => {
  document.body.removeChild(ref);
});

clickTest('外側のクリックでトリガーされる', () =>
  createRoot(
    (dispose) =>
      new Promise<void>((resolve) => {
        let clickedOutside = false;
        clickOutside(ref, () => () => {
          clickedOutside = true;
        });
        document.body.addEventListener("click", () => {
          assert.ok(clickedOutside);
          dispose();
          resolve();
        });
        fireEvent.click(document.body);
      })
  )
);

clickTest('内側のクリックではトリガーされない', () =>
  createRoot(
    (dispose) =>
      new Promise<void>((resolve) => {
        let clickedOutside = false;
        clickOutside(ref, () => () => {
          clickedOutside = true;
        });
        ref.addEventListener("click", () => {
          assert.is(clickedOutside, false);
          dispose();
          resolve();
        });
        fireEvent.click(ref);
      })
  )
);

clickTest.run();
```

### コンポーネントのテスト

テストするための、シンプルなクリックカウンターコンポーネントを見てみましょう:

```ts
// main.tsx
import { createSignal, Component } from "solid-js";

export const Counter: Component = () => {
  const [count, setCount] = createSignal(0);

  return (
    <div role="button" onClick={() => setCount((c) => c + 1)}>
      Count: {count()}
    </div>
  );
};
```

ここでは、`solid-testing-library` を使用します。最も重要なヘルパーは、何とかして DOM にコンポーネントをレンダリングする `render` と、実際のユーザーイベントに似た方法でイベントをディスパッチする `fireEvent` と、グローバルセレクターを提供する `screen` です。また、`@testing-library/jest-dom` が提供する `expect` に追加された有用なアサーションも利用しています。

#### Jest でのテスト

```ts
// main.test.tsx
import { Counter } from "./main";
import { cleanup, fireEvent, render, screen } from "solid-testing-library";

describe("Counter", () => {
  afterEach(cleanup);

  test("ゼロから始まる", () => {
    render(() => <Counter />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Count: 0");
  });

  test("クリックで値が 1 増える", async () => {
    render(() => <Counter />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    // イベントループが終了するのにひとつのプロミスを解決する必要があります
    await Promise.resolve();
    expect(button).toHaveTextContent("Count: 1");
    fireEvent.click(button);
    await Promise.resolve();
    expect(button).toHaveTextContent("Count: 2");
  });
});
```

#### uvu でのテスト

```ts
// main.test.tsx
import { suite } from "uvu";
import * as assert from "uvu/assert";
import { Counter } from "main";
import { fireEvent, render, screen } from "solid-testing-library";
import { isInDocument, hasTextContent } from "solid-dom-testing";

const testCounter = suite("Counter");

testCounter.after.each(cleanup);

testCounter("ゼロから始まる", () => {
  const { getByRole } = render(() => <Counter />);
  const button = getByRole("button");
  assert.ok(isInDocument(button), "button not in dom");
  assert.ok(hasTextContent(button, "Count: 0"), "wrong text content");
});

testCounter("クリックで値が 1 増える", async () => {
  render(() => <Counter />);
  const button = screen.getByRole("button");
  fireEvent.click(button);
  // イベントループが終了するのにひとつのプロミスを解決する必要があります
  await Promise.resolve();
  assert.ok(
    hasTextContent(button, "Count: 1"),
    "not count 1 after first click"
  );
  fireEvent.click(button);
  await Promise.resolve();
  assert.ok(
    hasTextContent(button, "Count: 2"),
    "not count 2 after first click"
  );
});

testCounter.run();
```
