Bazen ikiden fazla durumu kapsayan koşullu ifadeler kullanmanız gerekebilir. Bu durum için, kabaca JavaScript'in `switch`/`case` özelliğine karşılık olarak tasarlanan Solid'in `<Switch>` ve `<Match>` bileşenlerini kullanabiliriz.

Switch, ilk eşleşen koşulu işlemek (render) için sırası ile deneyecek ve eşleşen koşul işlendiğinde duracaktır. Bütün koşullar başarısız olduğu takdirde ise fallback'i işleyecektir.

Örneğimizde, iç içe geçmiş `<Show>` bileşenimizi aşağıdaki kullanım ile değiştirebiliriz:

```jsx
<Switch fallback={<p>{x()} is between 5 and 10</p>}>
  <Match when={x() > 10}>
    <p>{x()} is greater than 10</p>
  </Match>
  <Match when={5 > x()}>
    <p>{x()} is less than 5</p>
  </Match>
</Switch>
```
