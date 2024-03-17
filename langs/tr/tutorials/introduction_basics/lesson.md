# Giriş

Bu interaktif rehber Solid'in ana özelliklerini anlamanızda size yol gösterecektir. Solid'in nasıl çalıştığı hakkında daha fazla bilgi edinmek için API ve rehberlere da başvurabilirsiniz.

Ayrıca yeni başlangıç rehberimize de [buradan](https://docs.solidjs.com/tutorials/getting-started-with-solid/) göz atabilirsiniz.(hazırlık aşamasında!) 

# Solid Nedir

Solid interaktif web uygulamaları üretmeye yönelik bir Javascript framework'üdür.
Solid ile mevcut HTML ve Javascript bilginizi kullanarak uygulamalarınızda yeniden kullanılabilir bileşenler (component) üretebilirsiniz.
Solid, bileşenleri _reaktivite_ özelliklerine sahip bir şekilde geliştirmek için araçlar sunar: bu sayede deklaratif Javascript kodu ile, kullanıcı arayüzü ve kullanıcı arayüzünü oluşturan, kullanan verinin birlikte çalışmasını sağlar.

# Solid Uygulamasının Anatomisi

Solid uygulaması bileşen (component) olarak adlandırdığımız fonksiyonlardan oluşur. Sağdaki `HelloWorld` fonksiyonuna baktığımızda doğrudan `dıv` döndüğünü görüyoruz! Bu HTML ve Javascript karışımı JSX olarak adlandırılmaktadır. Solid bu etiketleri daha sonra DOM nodelarına dönüştüren bir derleyici içermektedir.

JSX, uygulamanızdaki çoğu HTML elementlerini kullanmanıza izin verir, ancak aynı zamanda yeni ögeler üretmenize de olanak tanır. `HelloWorld` fonksiyonumuzu bir kez oluşturduktan sonra uygulamamızın tamamında `<HelloWorld>` tag'ı ile kullanabiliriz.

Solid Uygulamasının giriş noktası `render` fonksiyonudur. Bu fonksiyon 2 argüman alır: birincisi uygulamamızın kodunu saran bir fonksiyon, ikincisi ise HTML de mevcut, uygulamanın bağlanacağı elemandır.

```jsx
render(() => <HelloWorld />, document.getElementById("app"));
```

# Rehberden Yararlanmak

Eğitimdeki her bir ders bir Solid özelliğine eş düşmektedir ve bunu denemek için sizlere bir senaryo sunmaktadır. Herhangi bir noktada çözümü görmek için Çöz düğmesine tıklayabilir veya baştan başlamak için sıfırla düğmesine tıklayabilirsiniz. Kod düzenleyicisinin kendisinde bir konsol ve kodunuzdan oluşturulan derlenmiş çıktıyı görebileceğiniz bir output sekmesi vardır. Solid'in nasıl kod ürettiğini merak ediyorsanız bakabilirsiniz.

İyi eğlenceler!