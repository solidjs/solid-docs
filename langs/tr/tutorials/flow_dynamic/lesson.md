`<Dynamic>` etiketi verilerden render yapacağınız durumlarda kullanışlıdır. İçerisine native elemanlar için string veya bileşen fonksiyonu iletilebilir ve sonuçta sağlanan diğer prop'lar ile beraber ilettiğiniz eleman render edilir.

`<Dynamic>` bileşeni genellikle ard arda yazılmış `<Show>` veya `<Switch>` ile karşılaştırıldığında daha kısa ve etkili bir kullanım sağlar. 

Örneğimizdeki `<Switch>` ifadesini:

```jsx
<Switch fallback={<BlueThing />}>
  <Match when={selected() === 'red'}><RedThing /></Match>
  <Match when={selected() === 'green'}><GreenThing /></Match>
</Switch>
```

aşağıdaki kullanım ile değiştirebiliriz:

```jsx
<Dynamic component={options[selected()]} />
```
