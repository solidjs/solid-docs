Props, bileşen fonksiyonumuza aktarılabilen, JSX'e bağlı tüm attribute'ları temsil eden objeye verdiğimiz isimdir. Props objeleri salt okunurdur ve Object getter'larına sarılmış reaktif özelliklere sahiplerdir.  sayede, çağıranın sinyal, sinyal ifadesi veya statik değer kullanmasına bağlı olmadan tutarlı bir biçimde olmalarını sağlanır. Ulaşmak için `props.propName` kullanılır.

Bu nedenle props objelerini yalnızca destructure ederek kullanmamak önemlidir, çünkü, bu bir izlenme kapsamı içerisinde yapılmazsa reaktivite kaybolacaktır. Genel olarak, props objesi üzerindeki property'lere özellikle Solid'in primitifleri veya JSX dışında erişmek reaktiviteyi kaybetmekle sonuçlanabilir. Bu sadece destructing için değil, aynı zamanda `Object.assign` gibi spread ve fonksiyonlar için de geçerlidir.

Solid, props ile çalışırken bize yardımcı olacak bazı utility'lere sahiptir. Bunlardan birincisi, potansiyel olarak reaktif objeleri reaktiviteyi kaybetmeden birleştiren `mergeProps`tur. (`Object.assign` benzeri). En yaygın kullanımı bileşenlerimiz için varsayılan prop'ları atamaktır.

Örneğimizde, `greetings.tsx` dosyasında varsayılanları satır içinde kullandık, ek olarak `mergeProps`'u da kullanarak, reaktiviteyi koruyabilir ve güncellemelerin işlenmesini sağlayabiliriz.

```jsx
const merged = mergeProps({ greeting: "Hi", name: "John" }, props);

return <h3>{merged.greeting} {merged.name}</h3>
```
