Bazen bileşen veya elemanların kabul ettiği attribute sayıları değişebilir, bu durumda da attribute'ları teker teker aktarmaktansa obje halinde aktarmak daha mantıklı olabilir. Bu durum özellikle tasarım sistemleri oluştururken yaygınca kullanılan, bir DOM elemanını bileşen içerisine sararken geçerlidir.

Bunun için spread operatör'ü kullanırız `...`.

Bu sayede objedeki bütün property'leri aktarabiliriz:

```jsx
<Info {...pkg} />
```
