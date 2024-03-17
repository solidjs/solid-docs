# Reatividade

O gerenciamento de dados do Solid é construído a partir de um conjunto de primitivas reativas flexíveis que são responsáveis por todas as atualizações. Ele tem uma abordagem muito semelhante ao MobX ou Vue, exceto que nunca troca sua granularidade por um VDOM. Dependências são rastreadas automaticamente quando você acessa seus valores reativos em seus efeitos e código JSX View.

Os primitivos do Solid vêm na forma de chamadas `create` que geralmente retornam tuplas, onde geralmente o primeiro elemento é um primitivo legível e o segundo é um setter. É comum referir-se apenas à parte legível pelo nome primitivo.

Aqui está um contador de incremento automático básico que é atualizado com base na configuração do signal de `count`.

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

## Introduzindo Primitivos

O Solid é composto de 3 primitivas primárias: Signal, Memo e Effect. Em seu núcleo está o padrão Observer, onde Signals (e Memos) são rastreados envolvendo Memos e Effects.

Os Signals são os primitivos mais simples. Eles contêm valor e funções get e set para que possamos interceptar quando eles são lidos e escritos.

```js
const [count, setCount] = createSignal(0);
```

Effects são funções que envolvem leituras de nosso Signal e são executadas novamente sempre que o valor de um Signal dependente muda. Isso é útil para criar efeitos colaterais, como renderização.

```js
createEffect(() => console.log("The latest count is", count()));
```

Finalmente, Memos são valores derivados armazenados em cache. Eles compartilham as propriedades de Signals e Effects. Eles rastreiam seus próprios Signals dependentes, reexecutando apenas quando eles mudam, e eles próprios são Signals rastreáveis.

```js
const fullName = createMemo(() => `${firstName()} ${lastName()}`);
```

## Como funciona

Signals são emissores de eventos que contêm uma lista de assinaturas. Eles notificam seus assinantes sempre que seu valor muda.

As coisas ficam mais interessantes como essas assinaturas acontecem. Solid usa rastreamento automático de dependência. As atualizações acontecem automaticamente conforme os dados mudam.

O truque é uma pilha global em tempo de execução. Antes que um Effect ou Memo execute (ou reexecute) sua função fornecida pelo desenvolvedor, ele empurra a si mesmo para aquela pilha. Então, qualquer Signal que é lido verifica se há um ouvinte atual na pilha e, se houver, adiciona o ouvinte às suas assinaturas.

Você pode pensar assim:

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

Agora, sempre que atualizamos o Signal, sabemos quais Effects devem ser executados novamente. Simples, mas eficaz. A implementação real é muito mais complicada, mas essa é a essência do que está acontecendo.

Para uma compreensão mais detalhada de como funciona a reatividade, estes são artigos úteis:

[A Hands-on Introduction to Fine-Grained Reactivity](https://dev.to/ryansolid/a-hands-on-introduction-to-fine-grained-reactivity-3ndf)

[Building a Reactive Library from Scratch](https://dev.to/ryansolid/building-a-reactive-library-from-scratch-1i0p)

[SolidJS: Reactivity to Rendering](https://angularindepth.com/posts/1289/solidjs-reactivity-to-rendering)

## Considerações

Essa abordagem de reatividade é muito poderosa e dinâmica. Ele pode manipular as dependências que mudam rapidamente por meio da execução de diferentes ramificações do código condicional. Ele também funciona por meio de muitos níveis de indireção. Qualquer função executada dentro de um escopo de rastreamento também está sendo rastreada.

No entanto, existem alguns comportamentos e desvantagens importantes dos quais devemos estar cientes.

1. Toda reatividade é rastreada a partir de chamadas de função, seja diretamente ou oculta sob getter/proxy e acionada por acesso de propriedade. Isso significa que o local onde você acessa as propriedades em objetos reativos é importante.

2. Componentes e callbacks de chamada de fluxos de controle não rastreiam escopos e são executados apenas uma vez. Isso significa que a desestruturação ou execução de lógica de nível superior em seus componentes não será executada novamente. Você deve acessar esses Signals, Stores e props de dentro de outras primitivas reativas ou do JSX para que essa parte do código seja reavaliada.

3. Essa abordagem rastreia apenas de forma síncrona. Se você tiver um setTimeout ou usar uma função assíncrona em seu Effect, o código executado de forma assíncrona após o fato não será rastreado.
