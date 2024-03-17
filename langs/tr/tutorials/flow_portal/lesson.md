Bazen ögeleri uygulamanın normal akışının dışına çıkarmak faydalı olabilir. Z-indeksleri de bazen modal'lar gibi floating (kayan) ögelerin render bağlamları ile uyumunda yetersiz kalabilir.

Solid bu probleme cevap olarak `<Portal>` bileşenini sunar, işlevi child (alt, içerdiği, sardığı) içeriğini belirlenen konuma eklemektir. Varsayılan olarak sardığı ögeler `document.body` içerisinde bir `<div>` içinde render edilir.

Örneğimizde, bilgi popup'ının kesildiğini görüyoruz. Bu sorunu, ögeyi bir `<Portal>` içerisine alarak, dolayısıyla akıştan çıkararak çözebiliriz.

```jsx
<Portal>
  <div class="popup">
    <h1>Popup</h1>
    <p>Some text you might need for something or other.</p>
  </div>
</Portal>
```
