# Reatividade Básica

A abordagem geral do Solid para reatividade é envolver qualquer computação reativa em
uma função, e reexecutar esta função quando suas dependências atualizarem.
O compilador JSX do Solid também envolve a maioria das expressões (código entre chaves) com uma
função, para que elas sejam atualizadas automaticamente (e acionam as atualizações correspondentes no DOM)
quando as suas dependências mudarem.
Mais precisamente, a reexecução automáticas de uma função ocorre sempre que a função
é chamada em um _escopo de rastreamento_ como em uma expressão JSX ou chamadas a API que constroem "computações" (`createEffect`, `createMemo`, etc.).
Por padrão, as dependências de uma função são rastreadas automaticamente quando elas são chamadas em um escopo de rastreamento, detectando quando a função lê
o estado reativo (p.ex., via um Signal getter or um atributo de Store).
Como resultado, você geralmente não precisa se preocupar sobre dependências.
(Mas se o rastreio de dependências automático não produzir os resultados desejados,
você pode [sobrescrever o rastreio de dependências](#reactive-utilities).)
Essa abordagem torna a reatividade _composta_: chamar uma função dentro de outra função que geralmente causa que a função principal herde as dependências da função chamada.

## `createSignal`

```ts
import { createSignal } from "solid-js";

function createSignal<T>(
  initialValue: T,
  options?: { equals?: false | ((prev: T, next: T) => boolean) }
): [get: () => T, set: (v: T) => T];

// available types for return value of createSignal:
import type { Signal, Accessor, Setter } from "solid-js";
type Signal<T> = [get: Accessor<T>, set: Setter<T>];
type Accessor<T> = () => T;
type Setter<T> = (v: T | ((prev?: T) => T)) => T;
```

Sinais são o tipo primitivo mais básico. Eles rastreiam um único valor (que pode ser qualquer objeto Javascript) que muda durante o tempo.
O valor do Sinal começa igual o que foi passado no primeiro argumento `initialValue` (ou `undefined` caso não existam argumentos).
A função `createSignal` retorna um par de funções como um array de dois elementos:
um _getter_ (ou _accessor_) e um _setter_. No uso tipico vocÊ desestrutura esse array em um Sinal nomeado da seguinte maneira:

```ts
const [count, setCount] = createSignal(0);
const [ready, setReady] = createSignal(false);
```

Chamar o getter (p.ex., `count()` ou `ready()`)
retorna o valor atual do Sinal.
É crucial para o rastreio automático de dependências que o getter do Sinal seja chamado dentro do escopo de rastreamento para fazer com que o sinal seja adicionado as dependências
para que então a função seja reexecutada caso o Sinal seja atualizado.

Chamar o setter (p.ex., `setCount(nextCount)` ou `setReady(nextReady)`)
seta o valor do Sinal e _atualiza_ o Sinal
(acionando as dependências para reexecutarem)
se o valor realmente mudar (veja os detalhes abaixo).
Como o seu único argumento, o setter recebe ou um novo valor para o Sinal, ou uma função que mapeia o ultimo valor do Sinal para um novo valor.
O setter também retorna o valor atualizado. Por exemplo:

```ts
// read signal's current value, and
// depend on signal if in a tracking scope
// (but nonreactive outside of a tracking scope):
const currentCount = count();

// or wrap any computation with a function,
// and this function can be used in a tracking scope:
const doubledCount = () => 2 * count();

// or build a tracking scope and depend on signal:
const countDisplay = <div>{count()}</div>;

// write signal by providing a value:
setReady(true);

// write signal by providing a function setter:
const newCount = setCount((prev) => prev + 1);
```

> If you want to store a function in a Signal you must use the function form:
>
> ```js
> setValue(() => myFunction);
> ```
>
> However, functions are not treated specially as the `initialValue` argument
> to `createSignal`, so you should pass a function initial value as is:
>
> ```js
> const [func, setFunc] = createSignal(myFunction);
> ```

A não ser que você esteja em um [lote](#batch), [efeito](#createEffect), ou [transição](#use-transition), sinais são atualizados imediatamente quando você os muda.
Por exemplo:

```ts
setReady(false);
console.assert(ready() === false);
setReady(true);
console.assert(ready() === true);
```

Se você não tem certeza que seu código vai executar em um lote ou uma transição
(p.ex., código de uma biblioteca), você pode evitar fazer suposições.

##### Opções

Muitos primitivos em Solid recebem um objeto de "opções" como um último parâmetro opcional. as opções do `createSignal` permite que você determine uma opção `equals`. Por exemplo:

```ts
const [getValue, setValue] = createSignal(initialValue, { equals: false });
```

Por padrão, quando chamando um setter do sinal, o sinal só atualiza (e causa suas dependências para reexecutar)
se o novo valor é na verdade diferente do ultimo valor,
de acordo com o o operador `===` do JavaScript.

De forma alternativa, você pode definir o `equals` to `false` para sempre que o setter seja chamado reexecutar as dependências, ou você pode passar sua própria função de equidade.
Alguns exemplos:

```ts
// use { equals: false } to allow modifying object in-place;
// normally this wouldn't be seen as an update because the
// object has the same identity before and after change
const [object, setObject] = createSignal({ count: 0 }, { equals: false });
setObject((current) => {
  current.count += 1;
  current.updated = new Date();
  return current;
});

// use { equals: false } signal as trigger without value:
const [depend, rerun] = createSignal(undefined, { equals: false });
// now calling depend() in a tracking scope
// makes that scope rerun whenever rerun() gets called

// define equality based on string length:
const [myString, setMyString] = createSignal("string", {
  equals: (newVal, oldVal) => newVal.length === oldVal.length,
});

setMyString("strung"); // considered equal to the last value and won't cause updates
setMyString("stranger"); // considered different and will cause updates
```

## `createEffect`

```ts
export function createEffect<T>(
  fn: (v: T) => T,
  value?: T,
  options?: { name?: string }
): void;
```

Cria um novo cálculo que rastreia automaticamente as dependências e é executado após cada renderização em que uma dependência foi alterada. Ideal para usar `ref`s e gerenciar outros efeitos colaterais.

```js
const [a, setA] = createSignal(initialValue);

// efeito que depende do Signal `a`
createEffect(() => doSideEffect(a()));
```

A função de efeito é chamada com o valor retornado da última execução da função de efeito. Este valor pode ser inicializado como um segundo argumento opcional. Isso pode ser útil para diferenciar sem criar um closure adicional.

```js
createEffect((prev) => {
  const sum = a() + b();
  if (sum !== prev) console.log(sum);
  return sum;
}, 0);
```

## `createMemo`

```ts
export function createMemo<T>(
  fn: (v: T) => T,
  value?: T,
  options?: { name?: string; equals?: false | ((prev: T, next: T) => boolean) }
): () => T;
```

Cria um Signal derivado somente leitura que recalcula seu valor sempre que as dependências do código executado são atualizadas.

```js
const getValue = createMemo(() => computeExpensiveValue(a(), b()));

// ler valor
getValue();
```

A função de memo é chamada com o valor retornado da última execução da função de memo. Este valor pode ser inicializado como um segundo argumento opcional. Isso é útil para reduzir cálculos.

```js
const sum = createMemo((prev) => input() + prev, 0);
```

## `createResource`

```ts
type ResourceReturn<T> = [
  {
    (): T | undefined;
    loading: boolean;
    error: any;
  },
  {
    mutate: (v: T | undefined) => T | undefined;
    refetch: () => void;
  }
];

export function createResource<T, U = true>(
  fetcher: (k: U, getPrev: () => T | undefined) => T | Promise<T>,
  options?: { initialValue?: T; name?: string }
): ResourceReturn<T>;

export function createResource<T, U>(
  source: U | false | null | (() => U | false | null),
  fetcher: (k: U, getPrev: () => T | undefined) => T | Promise<T>,
  options?: { initialValue?: T; name?: string }
): ResourceReturn<T>;
```

Cria um Signal que pode gerenciar solicitações assíncronas. O `fetcher` é uma função assíncrona que aceita o valor de retorno da `source` se fornecida e retorna um Promise cujo valor resolvido é definido no recurso. O fetcher não é reativo, portanto, use o primeiro argumento opcional se quiser que ele seja executado mais de uma vez. Se o source for falsa, null ou undefined, não será feita a busca.

```js
const [data, { mutate, refetch }] = createResource(getQuery, fetchData);

// ler valor
data();

// verifique se está carregando
data.loading;

// verifique se errou
data.error;

// definir valor diretamente sem criar Promise
mutate(optimisticValue);

// buscar novamente a última solicitação
refetch();
```

`loading` e `error` são getters reativos e podem ser rastreados.

# Ciclos de vida

## `onMount`

```ts
export function onMount(fn: () => void): void;
```

Registra um método que é executado após a renderização inicial e os elementos foram montados. Ideal para usar `ref`s e gerenciar outros efeitos colaterais ocasionais. É equivalente a um `createEffect` que não possui dependências.

## `onCleanup`

```ts
export function onCleanup(fn: () => void): void;
```

Registra um método de limpeza que é executado no descarte ou recálculo do escopo reativo atual. Pode ser usado em qualquer Componente ou Effect.

## `onError`

```ts
export function onError(fn: (err: any) => void): void;
```

Registra um método de tratamento de erros que é executado quando ocorrem erros de escopo filho. Apenas os manipuladores de erro de escopo mais próximos são executados. Reinicie para acionar a linha.

# Utilitários Reativos

Esses auxiliares fornecem a capacidade de programar melhor as atualizações e controlar como a reatividade é rastreada.

## `untrack`

```ts
export function untrack<T>(fn: () => T): T;
```

Ignora o rastreamento de qualquer uma das dependências no bloco de código em execução e retorna o valor.

## `batch`

```ts
export function batch<T>(fn: () => T): T;
```

Retém a confirmação de atualizações dentro do bloco até o final para evitar recálculos desnecessários. Isso significa que os valores de leitura na próxima linha ainda não serão atualizados. O método definido e os efeitos do [Solid Store](#createstore) agrupam automaticamente seu código em um lote.

## `on`

```ts
export function on<T extends Array<() => any> | (() => any), U>(
  deps: T,
  fn: (input: T, prevInput: T, prevValue?: U) => U,
  options: { defer?: boolean } = {}
): (prevValue?: U) => U | undefined;
```

`on` é projetado para ser passado em uma computação para tornar suas dependências explícitas. Se um array de dependências é passado, `input` e` prevInput` são arrays.

```js
createEffect(on(a, (v) => console.log(v, b())));

// é equivalente a:
createEffect(() => {
  const v = a();
  untrack(() => console.log(v, b()));
});
```

Você também não pode executar o cálculo imediatamente e, em vez disso, optar por que ele seja executado apenas na alteração, definindo a opção defer como true.

```js
// não executa imediatamente
createEffect(on(a, (v) => console.log(v), { defer: true }));

setA("new"); // agora executa
```

## `createRoot`

```ts
export function createRoot<T>(fn: (dispose: () => void) => T): T;
```

Cria um novo contexto não rastreado que não descarta automaticamente. Isso é útil para contextos reativos aninhados que você não deseja liberar quando o pai reavaliar. É um padrão poderoso para armazenamento em cache.

Todo o código Solid deve ser agrupado em um desses níveis superiores, pois eles garantem que toda a memória/cálculos sejam liberados. Normalmente você não precisa se preocupar com isso, pois `createRoot` está embutido em todas as funções de entrada` render`.

## `mergeProps`

```ts
export function mergeProps(...sources: any): any;
```

Um método de objeto reativo `merge`. Útil para definir adereços padrão para componentes, caso o chamador não os forneça. Ou clonando o objeto de adereços incluindo propriedades reativas.

Este método funciona usando um proxy e resolvendo propriedades na ordem inversa. Isso permite o rastreamento dinâmico de propriedades que não estão presentes quando o objeto prop é mesclado pela primeira vez.

```js
// props padrão
props = mergeProps({ name: "Smith" }, props);

// clonar props
newProps = mergeProps(props);

// fundir props
props = mergeProps(props, otherProps);
```

## `splitProps`

```ts
export function splitProps<T>(
  props: T,
  ...keys: Array<(keyof T)[]>
): [...parts: Partial<T>];
```

Este é o substituto da desestruturação. Ele divide um objeto reativo por chaves, mantendo a reatividade.

```js
const [local, others] = splitProps(props, ["children"]);

<>
  <Child {...others} />
  <div>{local.children}<div>
</>
```

## `useTransition`

```ts
export function useTransition(): [
  () => boolean,
  (fn: () => void, cb?: () => void) => void
];
```

Usado para enviar atualizações assíncronas em lote em uma transação que adia a confirmação até que todos os processos assíncronos sejam concluídos. Isso está vinculado ao Suspense e rastreia apenas os recursos lidos sob os limites do Suspense.

```js
const [isPending, start] = useTransition();

// verifique se está em transição
isPending();

// envolver na transição
start(() => setSignal(newValue), () => /* transição está feita */)
```

## `observable`

```ts
export function observable<T>(input: () => T): Observable<T>;
```

Este método recebe um Signal e produz um Observable simples. Consuma-o da biblioteca Observable de sua escolha normalmente com o operador `from`.

```js
import { from } from "rxjs";

const [s, set] = createSignal(0);

const obsv$ = from(observable(s));

obsv$.subscribe((v) => console.log(v));
```

## `mapArray`

```ts
export function mapArray<T, U>(
  list: () => readonly T[],
  mapFn: (v: T, i: () => number) => U
): () => U[];
```

Helper de mapa reativo que armazena em cache cada item por referência para reduzir o mapeamento desnecessário nas atualizações. Ele executa a função de mapeamento apenas uma vez por valor e, em seguida, move ou remove conforme necessário. O argumento do índice é um Signal. A função de mapa em si não está rastreando.

Auxiliar subjacente para o fluxo de controle `<For>`.

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
    }
    setName,
    setDescription
  }
});
```

## `indexArray`

```ts
export function indexArray<T, U>(
  list: () => readonly T[],
  mapFn: (v: () => T, i: number) => U
): () => U[];
```

Semelhante ao `mapArray`, exceto que mapeia por índice. O item é um Signal e o índice agora é a constante.

Auxiliar subjacente para o fluxo de controle `<Index>`.

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

Essas APIs estão disponíveis em `solid-js/store`.

## `createStore`

```ts
export function createStore<T extends StoreNode>(
  state: T | Store<T>,
  options?: { name?: string }
): [get: Store<T>, set: SetStoreFunction<T>];
```

Isso cria uma árvore de Signals como proxy que permite que valores individuais em estruturas de dados aninhadas sejam rastreados de forma independente. A função `create` retorna um objeto proxy somente leitura e uma função setter.

```js
const [state, setState] = createStore(initialValue);

// read value
state.someValue;

// set value
setState({ merge: "thisValue" });

setState("path", "to", "value", newValue);
```

Store objetos sendo proxies rastreiam apenas no acesso à propriedade. E no acesso Stores produz recursivamente objetos Store aninhados em dados aninhados. No entanto, ele envolve apenas matrizes e objetos simples. Classes não são agrupadas. Portanto, coisas como `Date`,` HTMLElement`, `RegExp`, `Map`, `Set` não são granularmente reativas. Além disso, o objeto de estado de nível superior não pode ser rastreado sem acessar uma propriedade nele. Portanto, não é adequado para uso em coisas nas quais você itera, pois a adição de novas chaves ou índices não pode acionar atualizações. Portanto, coloque qualquer lista em uma chave de estado em vez de tentar usar o próprio objeto de estado.

```js
// coloque a lista como uma chave no objeto de estado
const [state, setState] = createStore({ list: [] });

// acessar a propriedade `list` no objeto de estado
<For each={state.list}>{item => /*...*/}</For>
```

### Getters

Store objetos suportam o uso de getters para armazenar valores calculados.

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

Esses são getters simples, portanto, você ainda precisará usar um Memo se quiser armazenar um valor em cache;

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

### Atualizando Stores

As alterações podem assumir a forma de uma função que passa do estado anterior e retorna um novo estado ou um valor. Os objetos são sempre mesclados superficialmente. Defina os valores como `undefined` para excluí-los da Store.

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

Ele oferece suporte a caminho incluindo key arrays, object ranges e funções de filtro.

`setState` também suporta configuração aninhada onde você pode indicar o caminho para a mudança. Quando aninhado, o estado que você está atualizando pode ser outro valor não Object. Os objetos ainda são mesclados, mas outros valores (incluindo Arrays) são substituídos.

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

Path pode ser keys de string, array de keys, objetos iterativos ({from, to, by}) ou funções de filtro. Isso dá um poder expressivo incrível para descrever as mudanças de estado.

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

## `produce`

```ts
export function produce<T>(
  fn: (state: T) => void
): (
  state: T extends NotWrappable ? T : Store<T>
) => T extends NotWrappable ? T : Store<T>;
```

API inspirada no Immer para objetos da Store do Solid que permite a mutação localizada.

```js
setState(
  produce((s) => {
    s.user.name = "Frank";
    s.list.push("Pencil Crayon");
  })
);
```

## `reconcile`

```ts
export function reconcile<T>(
  value: T | Store<T>,
  options?: {
    key?: string | null;
    merge?: boolean;
  } = { key: "id" }
): (
  state: T extends NotWrappable ? T : Store<T>
) => T extends NotWrappable ? T : Store<T>;
```

Difere as alterações de dados quando não podemos aplicar atualizações granulares. Útil para lidar com dados imutáveis de lojas ou grandes respostas de API.

A chave é usada quando disponível para combinar itens. Por padrão, `merge` false faz verificações referenciais sempre que possível para determinar a igualdade e substitui onde os itens não são referencialmente iguais. `merge` true empurra todos os diffing para as folhas e transforma efetivamente os dados anteriores para o novo valor.

```js
// inscrevendo-se em um observable
const unsubscribe = store.subscribe(({ todos }) => (
  setState('todos', reconcile(todos)));
);
onCleanup(() => unsubscribe());
```

## `createMutable`

```ts
export function createMutable<T extends StoreNode>(
  state: T | Store<T>,
  options?: { name?: string }
): Store<T> {
```

Cria um novo objeto proxy de Store mutável. As Stores só acionam atualizações na mudança de valores. O rastreamento é feito pela interceptação do acesso à propriedade e rastreia automaticamente o aninhamento profundo por meio de proxy.

Útil para integração de sistemas externos ou como camada de compatibilidade com MobX/Vue.

> **Observação:** um estado mutável pode ser transmitido e modificado em qualquer lugar, o que pode tornar mais difícil seguir e quebrar o fluxo unidirecional. Geralmente é recomendado usar `createStore` em seu lugar. O modificador `produce` pode dar muitos dos mesmos benefícios sem nenhuma das desvantagens.

```js
const state = createMutable(initialValue);

// ler valor
state.someValue;

// defina valor
state.someValue = 5;

state.list.push(anotherValue);
```

Mutables suportam setters junto com getters.

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

# APIs de Componentes

## `createContext`

```ts
interface Context<T> {
  id: symbol;
  Provider: (props: { value: T; children: any }) => any;
  defaultValue: T;
}
export function createContext<T>(defaultValue?: T): Context<T | undefined>;
```

Context fornece uma forma de injeção de dependência em Solid. Ele é usado para evitar a necessidade de passar dados como props por meio de componentes intermediários.

Esta função cria um novo objeto de contexto que pode ser usado com `useContext` e fornece o fluxo de controle do `Provider`. Context padrão é usado quando nenhum `Provider` é encontrado acima na hierarquia.

```js
export const CounterContext = createContext([{ count: 0 }, {}]);

export function CounterProvider(props) {
  const [state, setState] = createStore({ count: props.count || 0 });
  const store = [
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
    <CounterContext.Provider value={store}>
      {props.children}
    </CounterContext.Provider>
  );
}
```

O valor passado para o provedor é passado para `useContext` como está. Isso significa que o agrupamento como uma expressão reativa não funcionará. Você deve passar sinais e armazenamentos diretamente em vez de acessá-los no JSX.

## `useContext`

```ts
export function useContext<T>(context: Context<T>): T;
```

Usado para capturar o contexto para permitir a passagem profunda de adereços sem ter que passá-los por cada função do Componente.

```js
const [state, { increment, decrement }] = useContext(CounterContext);
```

## `children`

```ts
export function children(fn: () => any): () => any;
```

Usado para facilitar a interação com `props.children`. Este auxiliar resolve qualquer reatividade aninhada e retorna um memo. Abordagem recomendada para usar `props.children` em qualquer coisa que não seja passar diretamente para JSX.

```js
const list = children(() => props.children);

// do something with them
createEffect(() => list());
```

## `lazy`

```ts
export function lazy<T extends Component<any>>(
  fn: () => Promise<{ default: T }>
): T & { preload: () => Promise<T> };
```

Used to lazy load components to allow for code splitting. Components are not loaded until rendered. Lazy loaded components can be used the same as its statically imported counterpart, receiving props etc... Lazy components trigger `<Suspense>`

Usado para carregar componentes preguiçosos para permitir a divisão de código. Os componentes não são carregados até serem renderizados. Os componentes de carregamento lento podem ser usados da mesma forma que sua contraparte importada estaticamente, recebendo props etc... Os componentes preguiçosos acionam o `<Suspender>`

```js
// wrap import
const ComponentA = lazy(() => import("./ComponentA"));

// use in JSX
<ComponentA title={props.title} />;
```

# Primitivas Secundárias

Você provavelmente não precisará deles para seu primeiro aplicativo, mas sim dessas ferramentas úteis.

## `createDeferred`

```ts
export function createDeferred<T>(
  source: () => T,
  options?: {
    timeoutMs?: number;
    name?: string;
    equals?: false | ((prev: T, next: T) => boolean);
  }
): () => T;
```

Cria um somente leitura que notifica apenas as alterações posteriores quando o navegador está ocioso. `timeoutMs` é o tempo máximo de espera antes de forçar a atualização.

## `createComputed`

```ts
export function createComputed<T>(
  fn: (v: T) => T,
  value?: T,
  options?: { name?: string }
): void;
```

Cria um novo cálculo que rastreia automaticamente as dependências e executa imediatamente antes da renderização. Use isso para gravar em outras primitivas reativas. Quando possível, use `createMemo` em vez de escrever para um Signal de atualização intermediária pode fazer com que outros cálculos precisem ser recalculados.

## `createRenderEffect`

```ts
export function createRenderEffect<T>(
  fn: (v: T) => T,
  value?: T,
  options?: { name?: string }
): void;
```

Cria um novo cálculo que rastreia automaticamente as dependências e é executado durante a fase de renderização conforme os elementos DOM são criados e atualizados, mas não necessariamente conectados. Todas as atualizações internas do DOM acontecem neste momento.

## `createSelector`

```ts
export function createSelector<T, U>(
  source: () => T,
  fn?: (a: U, b: T) => boolean,
  options?: { name?: string }
): (k: U) => boolean;
```

Cria um Signal condicional que notifica apenas os assinantes ao inserir ou sair de sua chave correspondente ao valor. Útil para estado de seleção delegado. Uma vez que faz a operação O(1) em vez de O(n).

```js
const isSelected = createSelector(selectedId);

<For each={list()}>
  {(item) => <li classList={{ active: isSelected(item.id) }}>{item.name}</li>}
</For>;
```

# Renderização

Essas importações são expostas em `solid-js/web`

## `render`

```ts
export function render(
  code: () => JSX.Element,
  element: MountableElement
): () => void;
```

Este é o ponto de entrada do aplicativo do navegador. Fornece uma definição ou função de componente de nível superior e um elemento para montagem. Recomenda-se que este elemento esteja vazio, pois a função de descarte retornada apagará todos os filhos.

```js
const dispose = render(App, document.getElementById("app"));
```

## `hydrate`

```ts
export function hydrate(
  fn: () => JSX.Element,
  node: MountableElement
): () => void;
```

Este método é semelhante a `render`, exceto que tenta reidratar o que já foi processado para o DOM. Ao inicializar no navegador, uma página já foi renderizada pelo servidor.

```js
const dispose = hydrate(App, document.getElementById("app"));
```

## `renderToString`

```ts
export function renderToString<T>(
  fn: () => T,
  options?: {
    eventNames?: string[];
    nonce?: string;
  }
): string;
```

Renderiza em uma string de forma síncrona. A função também gera uma tag de script para hidratação progressiva. As opções incluem eventNames para ouvir antes de a página carregar e reproduzir na hidratação e nonce para colocar na tag do script.

```js
const html = renderToString(App);
```

## `renderToStringAsync`

```ts
export function renderToStringAsync<T>(
  fn: () => T,
  options?: {
    eventNames?: string[];
    timeoutMs?: number;
    nonce?: string;
  }
): Promise<string>;
```

O mesmo que `renderToString`, exceto que irá esperar que todos os limites de `<Suspense>` sejam resolvidos antes de retornar os resultados. Os dados do recurso são serializados automaticamente na tag do script e serão hidratados na carga do cliente.

```js
const html = await renderToStringAsync(App);
```

## `pipeToNodeWritable`

```ts
export type PipeToWritableResults = {
  startWriting: () => void;
  write: (v: string) => void;
  abort: () => void;
};
export function pipeToNodeWritable<T>(
  fn: () => T,
  writable: { write: (v: string) => void },
  options?: {
    eventNames?: string[];
    nonce?: string;
    noScript?: boolean;
    onReady?: (r: PipeToWritableResults) => void;
    onComplete?: (r: PipeToWritableResults) => void | Promise<void>;
  }
): void;
```

Este método é renderizado em um fluxo de Node. Ele renderiza o conteúdo de forma síncrona, incluindo quaisquer marcadores de substituição de Suspense e, em seguida, continua a transmitir os dados de qualquer recurso assíncrono à medida que é concluído.

```js
pipeToNodeWritable(App, res);
```

A opção `onReady` é útil para escrever no fluxo em torno da renderização do aplicativo principal. Lembre-se de usar `onReady` para chamar manualmente `startWriting`.

## `pipeToWritable`

```ts
export type PipeToWritableResults = {
  write: (v: string) => void;
  abort: () => void;
  script: string;
};
export function pipeToWritable<T>(
  fn: () => T,
  writable: WritableStream,
  options?: {
    eventNames?: string[];
    nonce?: string;
    noScript?: boolean;
    onReady?: (
      writable: { write: (v: string) => void },
      r: PipeToWritableResults
    ) => void;
    onComplete?: (
      writable: { write: (v: string) => void },
      r: PipeToWritableResults
    ) => void;
  }
): void;
```

Este método é renderizado em um fluxo da web. Ele renderiza o conteúdo de forma síncrona, incluindo quaisquer marcadores de substituição de suspense e, em seguida, continua a transmitir os dados de qualquer recurso assíncrono à medida que é concluído.

```js
const { readable, writable } = new TransformStream();
pipeToWritable(App, writable);
```

A opção `onReady` é útil para escrever no fluxo em torno da renderização do aplicativo principal. Lembre-se de usar `onReady` para chamar manualmente `startWriting`.

## `isServer`

```ts
export const isServer: boolean;
```

Isso indica que o código está sendo executado como servidor ou pacote de navegador. Como os tempos de execução subjacentes exportam isso como um booleano constante, permite que os bundlers eliminem o código e suas importações usadas dos respectivos bundles.

```js
if (isServer) {
  // Eu nunca vou chegar ao bundle do navegador
} else {
  // não será executado no servidor;
}
```

# Controle de fluxo

Solid usa componentes para controlar o fluxo. A razão é que, com a reatividade para ter desempenho, temos que controlar como os elementos são criados. Por exemplo, com listas, um simples `map` é ineficiente, pois sempre mapeia tudo. Isso significa funções auxiliares.

Envolvê-los em componentes é uma maneira conveniente de modelagem concisa e permite que os usuários componham e construam seus próprios fluxos de controle.

Esses fluxos de controle integrados serão importados automaticamente. Todos, exceto `Portal` e `Dynamic` são exportados de `solid-js`. Aqueles dois que são específicos do DOM são exportados por `solid-js/web`.

> Nota: Todos os filhos de função callback/render do fluxo de controle não são rastreáveis. Isso permite a criação de estados de aninhamento e isola melhor as reações.

## `<For>`

```ts
export function For<T, U extends JSX.Element>(props: {
  each: readonly T[];
  fallback?: JSX.Element;
  children: (item: T, index: () => number) => U;
}): () => U[];
```

Fluxo de controle de loop referencialmente chaveado simples.

```jsx
<For each={state.list} fallback={<div>Loading...</div>}>
  {(item) => <div>{item}</div>}
</For>
```

O segundo argumento opcional é um signal de índice:

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
function Show<T>(props: {
  when: T | undefined | null | false;
  fallback?: JSX.Element;
  children: JSX.Element | ((item: T) => JSX.Element);
}): () => JSX.Element;
```

O fluxo de controle `Show` é usado para renderizar parte da visualização condicional. É semelhante ao operador ternário (`a ? b : c`), mas é ideal para modelagem JSX.

```jsx
<Show when={state.count > 0} fallback={<div>Loading...</div>}>
  <div>My Content</div>
</Show>
```

`Show` também pode ser usado como uma forma de inserir blocos em um modelo de dados específico. Por exemplo, a função é reexecutada sempre que o modelo do usuário é substituído.

```jsx
<Show when={state.user} fallback={<div>Loading...</div>}>
  {(user) => <div>{user.firstName}</div>}
</Show>
```

## `<Switch>`/`<Match>`

```ts
export function Switch(props: {
  fallback?: JSX.Element;
  children: JSX.Element;
}): () => JSX.Element;

type MatchProps<T> = {
  when: T | undefined | null | false;
  children: JSX.Element | ((item: T) => JSX.Element);
};
export function Match<T>(props: MatchProps<T>);
```

Útil para quando há mais de 2 condições exclusivas mútuas. Pode ser usado para fazer coisas como roteamento simples.

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

Match também oferece suporte a filhos de função para servir como fluxo codificado.

## `<Index>`

```ts
export function Index<T, U extends JSX.Element>(props: {
  each: readonly T[];
  fallback?: JSX.Element;
  children: (item: () => T, index: number) => U;
}): () => U[];
```

Iteração de lista não chaveada (linhas chaveadas para indexar). Isso é útil quando não há uma chave conceitual, como se os dados consistirem em primitivas e for o índice que é fixo em vez do valor.

O item é um signal:

```jsx
<Index each={state.list} fallback={<div>Loading...</div>}>
  {(item) => <div>{item()}</div>}
</Index>
```

O segundo argumento opcional é um número de índice:

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
function ErrorBoundary(props: {
  fallback: JSX.Element | ((err: any, reset: () => void) => JSX.Element);
  children: JSX.Element;
}): () => JSX.Element;
```

Captura erros não detectados e renderiza conteúdo substituto.

```jsx
<ErrorBoundary fallback={<div>Something went terribly wrong</div>}>
  <MyComp />
</ErrorBoundary>
```

Também suporta callback de formulário que passa em erro e uma função de redefinição.

```jsx
<ErrorBoundary
  fallback={(err, reset) => <div onClick={reset}>Error: {err.toString()}</div>}
>
  <MyComp />
</ErrorBoundary>
```

## `<Suspense>`

```ts
export function Suspense(props: {
  fallback?: JSX.Element;
  children: JSX.Element;
}): JSX.Element;
```

Um componente que rastreia todos os recursos lidos nele e mostra um estado de espaço reservado de fallback até que sejam resolvidos. O que torna `Suspense` diferente de `Show` é que ele não bloqueia, pois os dois ramos existem ao mesmo tempo, mesmo que não estejam atualmente no DOM.

```jsx
<Suspense fallback={<div>Loading...</div>}>
  <AsyncComponent />
</Suspense>
```

## `<SuspenseList>` (Experimental)

```ts
function SuspenseList(props: {
  children: JSX.Element;
  revealOrder: "forwards" | "backwards" | "together";
  tail?: "collapsed" | "hidden";
}): JSX.Element;
```

`SuspenseList` permite a coordenação de vários componentes paralelos `Suspense` e `SuspenseList`. Ele controla a ordem em que o conteúdo é revelado para reduzir a sobrecarga do layout e tem a opção de recolher ou ocultar estados de fallback.

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

SuspenseList ainda é experimental e não tem suporte total de SSR.

## `<Dynamic>`

```ts
function Dynamic<T>(
  props: T & {
    children?: any;
    component?: Component<T> | string | keyof JSX.IntrinsicElements;
  }
): () => JSX.Element;
```

Este componente permite inserir um componente ou tag arbitrário e passar os props para ele.

```jsx
<Dynamic component={state.component} someProp={state.something} />
```

## `<Portal>`

```ts
export function Portal(props: {
  mount?: Node;
  useShadow?: boolean;
  isSVG?: boolean;
  children: JSX.Element;
}): Text;
```

Isso insere o elemento no nó de montagem. Útil para inserir Modais fora do layout da página. Os eventos ainda se propagam pela Hierarquia de componentes.

O portal é montado em um `<div>` a menos que o destino seja o cabeçalho do documento. `useShadow` coloca o elemento em uma raiz de sombra para isolamento de estilo, e `isSVG` é necessário se inserir em um elemento SVG para que `<div>` não seja inserido.

```jsx
<Portal mount={document.getElementById("modal")}>
  <div>My Content</div>
</Portal>
```

# Atributos JSX Especiais

Em geral, o Solid tenta seguir as convenções do DOM. A maioria dos props são tratados como atributos em elementos nativos e propriedades em componentes da Web, mas alguns deles têm comportamento especial.

Para atributos de namespaces personalizados com TypeScript, você precisa estender o namespace JSX do Solid:

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

Refs são uma forma de obter acesso aos elementos DOM subjacentes em nosso JSX. Embora seja verdade que pode-se apenas atribuir um elemento a uma variável, é mais adequado deixar os componentes no fluxo do JSX. Refs são atribuídos no momento da renderização, mas antes que os elementos sejam conectados ao DOM. Eles vêm em 2 tipos.

```js
// assinatura simples
let myDiv;

// use onMount ou createEffect para ler depois de conectado ao DOM
onMount(() => console.log(myDiv));
<div ref={myDiv} />

// Ou, função de callback (chamada antes de ser conectada ao DOM)
<div ref={el => console.log(el)} />
```

Refs também podem ser usados em Componentes. Eles ainda precisam ser fixados no outro lado.

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

Um auxiliar que aproveita `element.classList.toggle`. Ele pega um objeto cujas chaves são nomes de classe e os atribui quando o valor resolvido é verdadeiro.

```jsx
<div
  classList={{ active: state.active, editing: state.currentId === row.id }}
/>
```

## `style`

O auxiliar de estilo do Solid funciona com uma string ou com um objeto. Ao contrário da versão do React, o Solid usa `element.style.setProperty` sob o capô. Isso significa suporte para CSS vars, mas também significa que usamos a versão inferior das propriedades com dash-case. Na verdade, isso leva a um melhor desempenho e consistência com a saída SSR.

```jsx
// string
<div style={`color: green; background-color: ${state.color}; height: ${state.height}px`} />

// objeto
<div style={{
  color: "green",
  "background-color": state.color,
  height: state.height + "px" }}
/>

// variável CSS
<div style={{ "--my-custom-color": state.themeColor }} />
```

## `innerHTML`/`textContent`

Estes funcionam da mesma forma que seus equivalentes de propriedade. Defina uma string e eles serão definidos. **Tenha cuidado!!** Definir `innerHTML` com quaisquer dados que possam ser expostos a um usuário final, pois pode ser um vetor para um ataque malicioso. `textContent`, embora geralmente não seja necessário, é na verdade uma otimização de desempenho quando você sabe que os filhos serão apenas texto, pois ignora a rotina de diffing genérica.

```jsx
<div textContent={state.text} />
```

## `on___`

Manipuladores de eventos em Solid normalmente assumem a forma de `onclick` ou `onClick` dependendo do estilo. O nome do evento está sempre em letras minúsculas. O Solid usa delegação de eventos semi-sintéticos para eventos de UI comuns que são compostos e borbulham. Isso melhora o desempenho para esses eventos comuns.

```jsx
<div onClick={(e) => console.log(e.currentTarget)} />
```

Solid também oferece suporte à passagem de uma matriz para o manipulador de eventos para vincular um valor ao primeiro argumento do manipulador de eventos. Isso não usa `bind` ou cria um fechamento adicional, por isso é altamente otimizado para delegar eventos.

```jsx
function handler(itemId, e) {
  /*...*/
}

<ul>
  <For each={state.list}>{(item) => <li onClick={[handler, item.id]} />}</For>
</ul>;
```

Os eventos não podem ser recuperados e as ligações não são reativas. O motivo é que geralmente é mais caro anexar/desanexar ouvintes. Uma vez que os eventos são chamados naturalmente, não há necessidade de reatividade, basta um atalho para o manipulador, se desejado.

```jsx
// se definido, chame, de outra forma, não.
<div onClick={() => props.handleClick?.()} />
```

## `on:___`/`oncapture:___`

Para quaisquer outros eventos, talvez aqueles com nomes incomuns, ou aqueles que você não deseja que sejam delegados, existem os eventos de namespace `on`. Isso simplesmente adiciona um ouvinte de evento literalmente.

```jsx
<div on:Weird-Event={(e) => alert(e.detail)} />
```

## `use:___`

Essas são diretivas personalizadas. Em certo sentido, isso é apenas sintaxe de açúcar sobre `ref`, mas nos permite anexar facilmente várias diretivas a um único elemento. Uma diretiva é simplesmente uma função com a seguinte assinatura:

```ts
function directive(element: Element, accessor: () => any): void;
```

As funções de diretiva são chamadas no momento da renderização, mas antes de serem adicionadas ao DOM. Você pode fazer o que quiser com eles, incluindo criar signals, efeitos, limpeza de registro, etc.

```js
const [name, setName] = createSignal("");

function model(el, value) {
  const [field, setField] = value();
  createRenderEffect(() => (el.value = field()));
  el.addEventListener("input", (e) => setField(e.target.value));
}

<input type="text" use:model={[name, setName]} />;
```

Para se registrar no TypeScript, estenda o namespace JSX.

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

Força o prop a ser tratado como uma propriedade em vez de um atributo.

```jsx
<div prop:scrollTop={props.scrollPos + "px"} />
```

## `attr:___`

Força o prop a ser tratado como um atributo em vez de uma propriedade. Útil para Web Components onde você deseja definir atributos.

```jsx
<my-element attr:status={props.status} />
```

## `/* @once */`

O compilador de Solid usa uma heurística simples para empacotamento reativo e avaliação preguiçosa de expressões JSX. Ele contém uma chamada de função, um acesso de propriedade ou JSX? Se sim, nós o envolvemos em um getter quando passado para componentes ou em um efeito se passado para elementos nativos.

Sabendo disso, podemos reduzir a sobrecarga de coisas que sabemos que nunca mudarão simplesmente acessando-as fora do JSX. Uma variável simples nunca será quebrada. Também podemos dizer ao compilador para não envolvê-los iniciando a expressão com um decorador de comentário `/_@once_/`.

```jsx
<MyComponent static={/*@once*/ state.wontUpdate} />
```

Isso também funciona nos filhos.

```jsx
<MyComponent>{/*@once*/ state.wontUpdate}</MyComponent>
```
