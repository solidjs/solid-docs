JSX, templatelardaki mantık akışlarını kontrol etmek için JavaScript kullanmanıza olanak sağlar. Ancak, Virtual DOM olmadan `Array.prototype.map` gibi kullanımlar, her güncellemede tüm DOM node'larını gerek olmadığı halde yeniden oluşturacaktır. Bunun yerine Reactive kütüphanelerde template helper'lar kullanılması yaygındır. Solid içerisinde biz bunları bileşenler içerisine sardık.

En temel kontrol akışı (control flow) koşuldur. Solid derleyicisi ternary ifadeleri (`a ? b : c`) ve boolean ifadeleri (`a && b`) optimal şekilde işleyecek kadar akıllıdır, ancak okuma kolaylığı bağlamında Solid'in `<Show>` bileşeni genellikle daha kullanışlıdır.

Örnekte, yalnızca mevcut durumu gösteren (kullanıcı girişi yapılıp yapılmadığı) bir buton var. JSX'i aşağıdaki şekilde güncelleyin:
```jsx
<Show
  when={loggedIn()}
  fallback={<button onClick={toggle}>Log in</button>}
>
  <button onClick={toggle}>Log out</button>
</Show>
```
`fallback` prop'u `else` işlevi görür ve  `when`'e ilişkilendirilen koşul truthy olmadığında gösterilir. 

Artık butona tıklamak beklenildiği gibi iki durum arasında ileri geri geçiş yapmamızı sağlamakta.
