Bazen, koordine etmek istediğimiz birden fazla `Suspense` bileşenimiz olabilir. Olası yaklaşımlardan birisi, her şeyi tek bir `Suspense` altında toplamaktır, fakat bu bizi tek bir yükleme davranışı ile sınırlar. Tek bir geri dönüş durumu, her şeyin, her zaman, son şey yüklenene kadar beklemesi gerektiği anlamına gelir. Bunun yerine Solid bunu koordine etmek için `SuspenseList` bileşenini sunar.

Örneğimizdeki gibi birden fazla `Suspense` bileşenine sahip olduğunuzu düşünün. Bunları, `revealOrder` ve `forwards` ile yapılandırılmış bir `SuspenseList` ile sararsak, yüklenme sıralarına bakılmaksızın ağaçta göründükleri sırada oluşturulurlar. Bu sayfadaki ileri geri hareketi azaltır. `revealOrder`, `backward` veya `together` değerleri ile ayarlanabilir, bu da sırasıyla sırayı tersine çevirir veya tüm `Suspense` bileşenlerinin yüklenmesini bekler. Ayrıca, `hidden` veya `collapsed` olarak ayarlanabilen bir `tail` seçeneği vardır. Bu, tüm geri dönüşleri gösterme varsayılan davranışını ya hiçbirini göstermeyerek ya da `revealOrder` tarafından belirlenen yönde bir sonrakini gösterecek şekilde geçersiz kılar.

Örneğimiz şu anda placeholder'ların yüklenmesi açısından biraz karışık durumda. Tüm veriler bağımsız olarak yüklenirken verilerin yüklenme sırasına bağlı olarak genellikle birden fazla placeholder gösteriyoruz. `ProfilePage` bileşenimizin JSX'ini bir `<SuspenseList>` ile saralım.

```jsx
<SuspenseList revealOrder="forwards" tail="collapsed">
  <ProfileDetails user={props.user} />
  <Suspense fallback={<h2>Loading posts...</h2>}>
    <ProfileTimeline posts={props.posts} />
  </Suspense>
  <Suspense fallback={<h2>Loading fun facts...</h2>}>
    <ProfileTrivia trivia={props.trivia} />
  </Suspense>
</SuspenseList>
```
