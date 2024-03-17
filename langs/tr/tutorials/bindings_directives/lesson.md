Solid özel direktifleri `use:` namespace'i aracılığı ile destekler. Bu aslında sadece `ref` üzerinde bir syntactic sugar'dır ancak tipik binding'lere benzemesi ve aynı eleman üzerinde çakışma olmadan birden fazla binding olabilmesi açısından kullanışlıdır. 

Özel direktif `(element, valueAccessor)` argümanlarını alan bir fonksiyondur, `element`, `use` attribute'una sahip bir DOM elemanına ve `valueAccessor` da bu attribute'a atanmış değerin getter fonksiyonuna eş düşer. Fonksiyon kapsam (scope) içerisinde aktarıldığı sürece `use:` ile kullanılabilir.

> Önemli: derleyici `use:`'u dönüştürülmesi gerektiği şeklinde algılar, dolayısıyla fonksiyonun kapsam içerisinde olması gerekir. Bu nedenle spread ile kullanılamaz veya bir bileşene uygulanamaz.

Örneğimizde, bir popup veya modal'ı dışarı tıklandığında kapanacak şekilde bir wrapper üreteceğiz. Öncelikle `clickOutside` direktifini import etmemiz ve elemanın üzerinde kullanmamız gerekiyor:

```jsx
<div class="modal" use:clickOutside={() => setShow(false)}>
  Some Modal
</div>
```

Özel direktifimizi tanımlayacağımız `click-outside.tsx` doyasını açalım. Bu direktif, body'e bağlayacağımız ve zamanı geldiğinde temizleyeceğimiz bir click handler tanımlamakta:

```jsx
export default function clickOutside(el, accessor) {
  const onClick = (e) => !el.contains(e.target) && accessor()?.();
  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
}
```

Artık modal istenildiği şekilde açılıp kapanma özelliklerine sahip.
