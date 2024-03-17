`lazy` ve `createResource` kendi başlarına kullanılabilseler de Solid, birden fazla asenkron event'in görüntülenmesini koordine etmek için bir mekanizma da sağlar. `Suspense`, bu asenkron event'ler çözüldükçe kısmen yüklenen içerik yerine yedek bir placeholder tutan bir sınır görevi görür.

Bu şekilde, çok fazla ara ve kısmi yükleme durumlarının neden olduğu problemleri düzenleyerek kullanıcı deneyimini iyileştirebiliriz. `Suspense` kendisinden sonra gelen asenkron okumaları otomatik olarak algılayıp buna göre hareket eder. İstediğiniz kadar `Suspense` bileşenini iç içe yerleştirebilirsiniz, bu durumda yükleme durumu algılandığında yalnızca en yakın ancestor fallback'ine dönüş yapılacaktır.

Lazy load örneğimize bir `Suspense` bileşeni ekleyelim:

```jsx
<>
  <h1>Welcome</h1>
  <Suspense fallback={<p>Loading...</p>}>
    <Greeting name="Jake" />
  </Suspense>
</>
```

Artık yükleme durumu için bir placeholder'ımız var.

Asenkron fetching'in kendisinin değil de asenkron olarak türemiş bir değerin okunmasının `Suspense`'i tetiklendiğine dikkat etmelisiniz. Eğer bir kaynak sinyali (`lazy` olsa bile) `Suspense` boundary'si altında okunmazsa, suspense işlemi gerçekleşmeyecektir.

`Suspense` birçok açıdan her iki branch'i de render eden bir `Show` bileşenidir. Asenkron Sunucu render işlemleri için `Suspense` hayati öneme sahip olsa da, client'ta render edilecek kod için hemen `Suspense` kullanma ihtiyacı hissetmeyin. Solid'in render sisteminin işleri manuel olarak bölmek için ek bir maliyeti yoktur.

```jsx
function Deferred(props) {
  const [resume, setResume] = createSignal(false);
  setTimeout(() => setResume(true), 0);

  return <Show when={resume()}>{props.children}</Show>;
}
```

Solid'de tüm işlemler bağımsız olarak sıralanır. Time Slicing gibi ek işlere gerek yoktur.
