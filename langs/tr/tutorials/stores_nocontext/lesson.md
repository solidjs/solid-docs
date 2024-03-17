Context, store'lar için harika bir araçtır. Injection'u yönetir, ownership'i reaktif grafiğe bağlar, otomatik olarak disposal'ları yönetir ve tüm bunları yaparken render için ek yük oluşturmaz.

Yine de bazen context kullanmak aşırıya kaçabilir, alternatifi reaktif sistemi doğrudan kullanmaktır. Örneğin, global kapsamda bir sinyal oluşturarak bunu diğer modüllerin kullanması için `export` edip bir reaktif data store oluşturabiliriz.

```js
import { createSignal } from 'solid-js';

export default createSignal(0);

// kullanmak istediğimiz başka bir yer:
import counter from './counter';
const [count, setCount] = counter;
```

Solid'in reaktivitesi evrensel bir kavramdır, bileşenlerin içinde ya da dışında olması fark etmez. Global veya local state'için ayrı bir konsept yoktur ve hepsi birbirine denktir.

Tek kısıtlama, tüm hesaplamaların (Efektler/Memolar) reaktif bir kök (`createRoot`) altında oluşturulması gereksinimidir. Solid'in render'ı bunu otomatik yapmaktadır. 

Bu örnekte `counter.tsx` global bir store'dur. `main.tsx` içinde, bileşenimizi şu şekilde düzenleyerek kullanabiliriz:

```jsx
const { count, doubleCount, increment } = counter;

return (
  <button type="button" onClick={increment}>
    {count()} {doubleCount()}
  </button>
);
```

Sonuç olarak, hesaplamalar içeren karmaşık bir global store oluşturacağınız zaman bir root oluşturduğunuza dikkat edin. Ya da daha iyisi kendinize bir iyilik yapın ve sadece context kullanın.
