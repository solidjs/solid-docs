# مقارنة مع المكتبات الأخرى
لسيكون هذا القسم متحيزًا ضمنيًا، لكنني أعتقد أنه من المهم فهم مكان وقوف Solid مقارنة بالمكتبات الأخرى. لا يتعلق الأمر بالأداء. للحصول على نظرة عامة كاملة على الأداء، يمكنك الرجوع إلى
[JS Framework Benchmark](https://github.com/krausest/js-framework-benchmark).

## React

كان لReact الفعل تأثير كبير على Solid. أثر تدفقها أحادي الاتجاه وفصلها الصريح للقراءة والكتابة في Hooks API على API   Solid أكثر بكثير من كونها مجرد «مكتبة عرض» بدلاً من إطار عمل. لدى Solid آراء قوية حول كيفية التعامل مع إدارة البيانات في تطوير التطبيقات، لكنها لا تسعى إلى تقييد تنفيذها.


على الرغم من أن Solidيتماشى مع فلسفة React، إلا أن Solid يعمل بشكل مختلف تمامًا. يستخدم React
DOM افتراضي بينما Solidلا يستخدم DOM افتراضي . التجريد  React هو نهج للمكونات من الأعلى إلى الأسفل عن طريق استدعاء طرق العرض بشكل متكرر ثم إحداث فرق.
يحسب Solid عرض كل قالب مرة واحدة بالكامل، وينشئ رسمًا بيانيًا لإعادة تنشيطه وينفذ فقط التعليمات المتعلقة بالتغييرات المكتشفة.

#### نصائح للهجرة:

نموذج تحديث Solid لا يشبه React، أو حتى React + MobX. بدلاً من التفكير في مكونات الدالة على أنها دالة `render`، فكر فيها على أنها `constructor`.

في Solid، Props وstores هي  [proxy objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) التي تعتمد على الوصول إلى الممتلكات للتتبع والتحديثات التفاعلية. احترس من التدمير أو الوصول المبكر إلى الممتلكات، مما قد يتسبب في فقدان هذه الخصائص للتفاعل أو التشغيل في الوقت الخطأ.

Solid's primitives have no restrictions like the Hook Rules so you are free to nest them as you see fit. 

You don't need explicit keys on list rows to have "keyed" behavior. 

In React, `onChange` fires whenever an input field is modified, but this isn't how `onChange` [works natively](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onchange). In Solid, use `onInput` to subscribe to each value change.

Finally, there is no VDOM so imperative VDOM APIs like `React.Children` and `React.cloneElement` have no equivalent in Solid. Instead of creating or modifying DOM elements directly, express your intentions declaratively.

## Vue

Solid is not particularly influenced by Vue design-wise, but they are comparable in approach. They both use Proxies in their Reactive system with read based auto-tracking. But that is where the similarities end. Vue's fine-grained dependency detection just feeds into a less fine-grained Virtual DOM and Component system whereas Solid keeps its granularity right down to its direct DOM updates.

Vue values easiness where Solid values transparency. Although Vue's new direction with Vue 3 aligns more with the approach Solid takes. These libraries might align more over time depending on how they continue to evolve.

#### Advice for migrating:

As another modern reactive library migration from Vue 3 should feel familiar. Solid's components are very much like tagging the template on the end of Vue's `setup` function. Be wary of overwrapping state derivations with computations, try a function. Reactivity is pervasive. Solid's proxies are intentionally read-only. Don't knock it before you try it.

## Svelte

Svelte pioneered the precompiled disappearing framework that Solid also employs to a certain degree. Both libraries are truly reactive and can produce really small execution code bundles although Svelte is the winner here for small demos. Solid requires a bit more explicitness in its declarations, relying less on implicit analysis from the compiler, but that is part of what gives Solid superior performance. Solid also keeps more in the runtime which scales better in larger apps. Solid's RealWorld demo implementation is 25% smaller than Svelte's.

Both libraries aim to help their developers write less code but approach it completely differently. Svelte 3 focuses on the optimization of the ease of dealing with localized change focusing on plain object interaction and two-way binding. In contrast Solid focuses on the data flow by deliberately embracing CQRS and immutable interface. With functional template composition, in many cases, Solid allows developers to write even less code than Svelte although Svelte's template syntax is definitely terser.

#### Advice for migrating:

Developer experience is different enough that while some things are analogous it is a very different experience. Components in Solid are cheap, so don't shy away from having more of them.

## Knockout.js

This library owes its existence to Knockout. Modernizing its model for fine-grained dependency detection was the motivation for this project. Knockout was released in 2010 and supports Microsoft Explorer back to IE6 while much of Solid doesn't support IE at all.

Knockout's bindings are just strings in HTML which are walked over at runtime. They depend on cloning context ($parent etc...). Whereas Solid uses JSX or Tagged Template Literals for templating opting for an in JavaScript API.

The biggest difference might be that Solid's approach to batching changes which ensures synchronicity whereas Knockout has deferUpdates which uses a deferred microtask queue.

#### Advice for migrating:

If you are used to Knockout, Solid's primitives might look strange to you. The read/write separation is intentional and not just to make life harder. Look to adopting a state/action (Flux) mental model. While the libraries look similar they promote different best practices.

## Lit & LighterHTML

These libraries are incredibly similar and have had some influence on Solid. Mostly that Solid's compiled code uses a very similar method to performantly initially render the DOM. Cloning Template elements and using comment placeholders are something that Solid and these libraries share in common.

The biggest difference is that while these libraries do not use the Virtual DOM they treat rendering the same way, top down, requiring component partitioning to keep things sane. By contrast, Solid uses its fine-grained Reactive Graph to only update what has changed and in doing so only shares this technique for its initial render. This approach takes advantage from the initial speed only available to native DOM and also have the most performant approach to updates.

#### Advice for migrating:

These libraries are pretty minimal and easy to build on top. However, keep in mind that `<MyComp/>` isn't just HTMLElement (array or function). Try to keep your things in the JSX template. Hoisting works for the most part but it is best to mentally think of this still as a render library and not a HTMLElement factory.

## S.js

This library had the greatest influence on Solid's reactive design. Solid used S.js internally for a couple of years until the feature set placed them on different paths. S.js is one of the most efficient reactive libraries to date. It models everything off synchronous time steps like a digital circuit and ensures consistency without having to do many of the more complicated mechanisms found in libraries like MobX. Solid's reactivity in the end is a sort of hybrid between S and MobX. This gives it greater performance than most reactive libraries (Knockout, MobX, Vue) while retaining the ease of mental model for the developer. S.js ultimately is still the more performant reactive library although the difference is hardly noticeable in all but the most grueling synthetic benchmarks.

## RxJS

RxJS is a Reactive library. While Solid has a similar idea of Observable data it uses a much different application of the observer pattern. While Signals are like a restricted form of an Observable (only the next), the pattern of auto dependency detection supplants RxJS' hundred or so operators. Solid could have taken this approach, and indeed earlier, versions of the library included similar operators, but in most cases it is more straightforward to write your own transformation logic in a computation. Where Observables are cold starting, unicast and push-based, many problems on the client lend themselves to hot startup and being multicast which is Solid's default behavior.

## Others

Angular and a few other popular libraries are notably missing from this comparison. Lack of experience with them prevents making any adequate comparisons. Generally, Solid has little in common with larger Frameworks and it is much harder to compare them head on.
