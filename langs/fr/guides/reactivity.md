# Réactivité

La gestion des données avec Solid est construite avec une collection de primitives réactives flexibles qui sont responsables de toutes les mises à jour. L'approche est très similaire à MobX ou Vue sauf qu'elle ne sacrifie jamais la granularité pour un VDOM.

Les primitives de Solid sont sous la forme d'appel de `create` qui vont souvent retourner des tuples, où généralement le premier élément est une primitive de lecture et la seconde d'écriture. Il est commun de référer seulement à la partie lisible par le nom de la primitive.

Ci-dessous un exemple basique d'un compteur auto-incrémenter qui se met à jour après modification du signal `count`.

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

## Introduction aux primitives

Solid est construit sur 3 principales primitives, Signal, Mémo et Effet. Au cœur de ces primitives, nous utilisons le pattern Observer.

Les Signaux sont les primitives les plus basiques. Elles contiennent des valeurs et des fonctions de lecture et écriture que nous pouvons intercepter quand elles sont lues et réécrites.

```js
const [count, setCount] = createSignal(0);
```

Les Effets sont des fonctions qui enrobe les fonctions de lecture de nos signaux et se réexécuté quand la valeur d'un Signal dépendant change. Ceci est utile lorsque l'on veut créer des effets secondaires, comme le rendu.

```js
createEffect(() => console.log("The latest count is", count()));
```

Enfin, les Mémos sont des valeurs dérivées mises en cache. Ils partagent des propriétés avec les Signaux et les Effets. Ils vont surveiller leurs propres Signaux dépendants, se réexécuter seulement quand ceux-ci changent et sont des Signaux surveillés.

```js
const fullName = createMemo(() => `${firstName()} ${lastName()}`);
```

## Comment ça marche

Les Signaux sont des émetteurs d'évènement qui possèdent une liste d'abonnés. Ils notifient ses abonnés lorsque leurs valeurs changent.

Ce qui est intéressant, c'est de savoir comment ces abonnements se font. Solid utilise un système automatique de surveillance de dépendance. Les mises à jour se font automatiquement lorsque la donnée change.

L'astuce est une pile globale à l'exécution. Avant qu'un Effet ou Mémo s'exécute (ou réexécute) sa fonction fournie par le développeur, il va s'ajouter lui-même à la pile. Puis tous les Signaux qui sont lus vont vérifier s’il y a un écouteur actuellement dans la pile et si c'est le cas, il va ajouter cet écouteur dans ses abonnés.

Vous pouvez le conceptualiser comme ceci :

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

Maintenant quand le Signal se met à jour, nous savons quels Effets se réexécutent. Simple, mais efficace. La vraie implémentation est plus compliquée, mais c'est le cœur de ce qu'il se passe.

Pour plus de détails au sujet de la Réactivité et de son fonctionnent, ces articles vous seront utiles :

[A Hands-on Introduction to Fine-Grained Reactivity](https://dev.to/ryansolid/a-hands-on-introduction-to-fine-grained-reactivity-3ndf)

[Building a Reactive Library from Scratch](https://dev.to/ryansolid/building-a-reactive-library-from-scratch-1i0p)

[SolidJS: Reactivity to Rendering](https://angularindepth.com/posts/1289/solidjs-reactivity-to-rendering)

## Considérations

Cette approche à la réactivité est très puissante et dynamique. Elle permet de gérer des dépendances changeantes à la volée en exécutant différentes branches de code conditionnel. Cela fonctionne aussi sur plusieurs niveaux d'indirection. N'importe quelle fonction exécutée à l'intérieur d'une portée surveillée est aussi surveillée.

Cependant, il existe des comportements clés et des compromis dont nous devons être conscients.

1. Toute réactivité est surveillée par des appels de fonction que ce soit directement ou cacher derrière un getter/proxy et déclenchée par l'accès à une propriété. Cela veut dire que d'où vous accédez aux propriétés dans un objet réactif est important.

2. Composants et fonction de rappel du contrôle du flux ne sont pas des portées surveillées et sont seulement exécutés une seule fois. Cela signifie que la déstructuration ou exécuter de la logique dans vos composants ne va pas se réexécuter. Vous devez accéder aux Signaux, Stores et props depuis d'autres primitives ou du JSX pour cette partie du code pour réévaluer.

3. Cette approche va seulement surveiller de manière synchrone. Si vous avez un setTimeout ou utilisez une fonction asynchrone dans votre Effet, le code qui s'exécute de manière asynchrone après les faits ne sera pas surveillé.
