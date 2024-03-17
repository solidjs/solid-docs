Artık Solid'de `<For>` ile bir listeyi nasıl oluşturacağınızı biliyorsunuz, ancak Solid belirli durumlarda daha az re-render üretecek `<Index>` bileşeni de sağlamaktadır.

Array güncellendiğinde `<For>` bileşeni elemanları array'in son durumu ile karşılaştırmak için referans eşitliğini kullanır fakat bu her zaman arzulanan bir durum olmayabilir.

JavaScript'te primitifler (string veya number gibi) her zaman değerlerine göre karşılaştırılır. `<For>` bileşenini primitif değerlerle veya array'lerden oluşan array'ler ile kullanmak gereksiz render'lara sebep olabilir. Örneğin, bir string listesini her biri düzenlenebilen `<input>` alanlarına eşlemek için `<For>` kullansaydık, bu değerdeki her değişiklik `<input>`'un yeniden oluşturulmasına neden olurdu.

Bu durumlar için `<Index>` bileşeni sağlanmıştır. Genel bir kural olarak, primitif ögelerle çalışırken `<Index>` bileşenini kullanın. 

```jsx
<Index each={cats()}>{(cat, i) =>
  <li>
    <a target="_blank" href={`https://www.youtube.com/watch?v=${cat().id}`}>
      {i + 1}: {cat().name}
    </a>
  </li>
}</Index>
```

`<Index>`, `<For>` ile benzer bir imzaya sahiptir, ancak bu kez öge sinyaldir ve index sabittir. Oluşturulan her node array'deki bir noktaya karşılık gelir ve bu noktadaki veri her değiştiğinde, sinyal güncellenir.

`<For>` array'deki her bir veri parçasıyla ilgilenir ve bu verilerin konumu değişebilir; `<Index>` ise array'deki her bir index'le ilgilenir ve her index'in içeriği değişebilir.
