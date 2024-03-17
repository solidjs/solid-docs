Solid'i bu kadar performanslı yapan şeylerden birisi de bileşenlerin temelde sadece fonksiyon çağrısı olmasıdır. Solid'te güncellemelerin yayılması, derleyicinin potansiyel olarak reaktif ifadeleri obje getter'larına sarması ile olur. Derleyicinin çıktısını aşağıdaki gibi düşünebilirsiniz:

```jsx
// aşağıdaki JSX
<MyComp dynamic={mySignal()}>
  <Child />
</MyComp>

// buna dönüşmekte
MyComp({
  get dynamic() { return mySignal() },
  get children() { return Child() }
});
```
Yani props lazy olarak değerlendirilir (lazily evaluate edilir). Yani kullanılacakları ana kadar bir erişim gerçekleşmez. Bu sayede, ek wrapper veya senkronizasyon olmaksızın reaktivite korunur. Ancak bu durum; tekrarlı erişimin, alt bileşenlerin veya elemanların yeniden oluşturulmasına yol açabileceği anlamına gelir.

Genellikle JSX'e sadece prop'lar ekleneceği için sorun oluşmamaktadır ancak, child (alt) elemanlarla çalışırken, elemanları defalarca tekrar oluşturmaktan kaçınmak için dikkatli olmanız gerekir.

Bu sebeple, Solid `children` helper'ını sunar. Bu metot hem `children` prop'u etrafında bir memo oluşturur hem de iç içe geçmiş child reactive referanslarını çözer, böylece child'lar ile doğrudan etkileşime girilebilir.

Örneğimizde, dinamik bir listemiz var ve elemanların `color` style property'sini ayarlamak ayarlamak istiyoruz. Doğrudan `props.children` ile etkileşime girersek, yalnızca node'ları defalarca oluşturmakla kalmaz, aynı zamanda da `props.children`'i `<For>`'dan döndürülen memo gibi bir fonksiyon olarak bulurduk.

Bunun yerine `children` helper'ını `colored-list.tsx` içerisinde kullanalım:
```jsx
export default function ColoredList(props) {
  const c = children(() => props.children);
  return <>{c()}</>
}
```
Şimdi de elemanlarımızı güncelleyecek bir Effect oluşturalım:
```jsx
createEffect(() => c().forEach(item => item.style.color = props.color));
```
