`Suspense`, veriler yüklenirken fallback içeriği görmemizi sağlar. Bu durum ilk yükleme için harika olsa da devamındaki gezinmeler için iskelet durumuna geri dönmek genellikle daha kötü bir kullanıcı deneyimi yaşatır.

Bu durumlar için `useTransition` kullanabiliriz ve fallback durumuna geri dönmeyi engelleyebiliriz. `useTransition` bir wrapper ve bir pending indicator sağlar. Wrapper, bütün downstream güncellemeleri bütün asenkron event'ler tamamlanana kadar bekleyen bir transaction'a koyar.

Bunun anlamı, `useTransition`, kontrol akışı suspend edildiğinde, bir sonraki işlem ekran dışında işlenirken, mevcut durumu görüntülemeye devam eder. Mevcut sınırların içindeki Resource okumaları da transition'a eklenir. Ancak, yeni iç içe geçmiş `Suspense` bileşenleri, görünüme gelmeden önce yüklemeyi tamamlamışlarsa "fallback" göstereceklerdir. 

Örnekte gezinirken, içeriğin loading placeholder'ına geri döndüğüne dikkat edin. `App` bileşenimiz için bir transition ekleyelim. İlk olarak `updateTab` fonksiyonunu değiştirelim:

```js
const [pending, start] = useTransition();
const updateTab = (index) => () => start(() => setTab(index));
```

`useTransition` bir bekleyen sinyal göstergesi (pending signal indicator) ve güncellememizin etrafını saracağımız geçişi başlatmak üzere bir metot döndürür.

Bu bekleyen sinyali kullanıcı arayüzünde bir bilgilendirme oluşturacak şekilde kullanmalıyız. `tab` container `div`'ine bir pending sınıfı ekleyebiliriz:

```js
<div class="tab" classList={{ pending: pending() }}>
```

Bu şekilde sekme geçişlerimiz çok daha akıcı olacaktır.
