# Reaktivität

Die Datenverwaltung in Solid baut auf einer Reihe von flexiblen reaktiven Primitiven auf, die verantwortlich für alle Updates sind. Sie nimmt dazu einen sehr ähnlichen Ansatz wie MobX oder Vue, außer dass die Granularität nicht zugunsten eines VDOM eingeschränkt wird. Abhängigkeiten werden automatisch verfolgt wenn die reaktiven Werte in den Effekten und im JSX-Code ausgelesen werden.

Solids Primitiven kommen in der Form von `create`-Aufrufen, die häufig Tupel zurückgeben, deren erstes Element generell den Lese- und das zweite den Schreibzugriff ermöglicht. Normalerweise benennt man den lesbaren Teil beim Namen der Primitive.

Hier ist ein einfacher automatisch hoch laufender Zähler, der durch das Schreiben des `count`-Signals aktualisiert wird.

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

## Einleitung in die Primitiven

Die Reaktivität in Solid besteht aus 3 primären Primitiven, Signal, Memo und Effekt. Ihr Kern basiert auf dem Observer-Pattern, in dem Signale (und Memos) durch das Verpacken von Memos und Effekten verfolgt werden.

Signale sind die einfachste Primitiven. Sie enthalten einen Wert und Lese- und Schreibfunktionen, so dass man Lese- und Schreibzugriffe abfangen kann.

```js
const [count, setCount] = createSignal(0);
```

Effekte sind Funktionen, in die Lesezugriffe auf Signale verpackt werden und die ausgeführt werden, wann immer der Wert eines Signals, auf dem der Effekt basiert, verändert wird. Das ist nützlich, um Seiteneffekte zu behandeln, wie Rendering.

```js
createEffect(() => console.log("The latest count is", count()));
```

Memos sind zwischengespeicherte von Signalen abgeleitete Werte. Sie haben die Eigenschaften sowohl von Signalen als auch von Effekten. Sie verfolgen die Signale, auf denen sie basieren und werden neu ausgeführt, wenn sich deren Werte ändern und sind selbst verfolgbare Signale.

```js
const fullName = createMemo(() => `${firstName()} ${lastName()}`);
```

## Wie es funktioniert

Signale sind Event-Sender, die eine Liste von Empfängern beinhalten. Die Empfänger werden benachrichtigt, wenn sich der Wert ändert.

Wo die Dinge interessanter werden ist, wie diese Empfänger registriert werden. Solid benutzt eine automatische Verfolgung von Abhängigkeiten. Aktualisierungen passieren automatisch, sobald sich die Daten ändern.

Der Trick ist ein globaler Stack zur Laufzeit. Bevor ein Effekt oder Memo sein Funktions-Argument (nochmal) ausführt, lädt es sich auf diesen Stack. Danach prüft jedes Signal, das gelesen wird, ob ein gegenwärtiger Empfänger auf dem Stack ist und falls ja, fügt es diesen zu seinen registrierten Empfängern hinzu.

Man kann sich das so vorstellen:

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

Jetzt wissen wir bei jeder Aktualisierung, welche Effekte neu aufgerufen werden müssen. Einfach, aber effektiv. Die tatsächliche Implementierung ist wesentlich komplizierter, aber das ist die Quintessenz dessen, was passiert.

Für ein detaillierteres Verständnis, wie Reaktivität funktioniert, gibt es diese nützlichen Artikel:

[A Hands-on Introduction to Fine-Grained Reactivity](https://dev.to/ryansolid/a-hands-on-introduction-to-fine-grained-reactivity-3ndf)

[Building a Reactive Library from Scratch](https://dev.to/ryansolid/building-a-reactive-library-from-scratch-1i0p)

[SolidJS: Reactivity to Rendering](https://angularindepth.com/posts/1289/solidjs-reactivity-to-rendering)

## Überlegungen

Dieser Ansatz zur Reaktivität ist sehr mächtig und dynamisch. Er kann Abhängigkeitsveränderungen während der Ausführung durch verschiedene Zweige von konditionalem Code handhaben. Jede Funktion innerhalb eines verfolgten Kontextes wird ebenfalls verfolgt.

Allerdings gibt es ein paar grundsätzliche Verhaltensweisen und Kompromisse, die man kennen sollte.

1. Alle Reaktivität von Funktionsaufrufen wird verfolgt, egal ob direkt oder hinter einem Getter/Proxy und ausgelöst durch Zugriff auf eine Eigenschaft. Das bedeutet, wo man auf Eigenschaften reaktiver Objekte zugreift, ist wichtig.

2. Komponenten und Callbacks von Kontrollflüssen sind keine Verfolgungskontexte und werden nur einmal ausgeführt. Das bedeutet, Destructuring oder Logik auf der obersten Ebene wird nicht nochmal ausgeführt. Die Signale, Stores und Props müssen innerhalb anderer reaktiver Primitiven aufgerufen werden, damit der Code nochmal ausgeführt wird.

3. Diese Herangehensweise trackt nur synchron. Wenn es einen setTimeout oder eine asynchrone Funktion in einem Effekt hat, wird der Code, der danach ausgeführt wird, nicht verfolgt.
