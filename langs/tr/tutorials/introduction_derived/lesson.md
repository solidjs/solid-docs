JSX ile bir sinyale her erişildiğinde, görünümün de bu sinyale bağlı olarak otomatik olarak güncellendiğini gördük. Ancak, bileşen fonksiyonunun kendisi sadece bir kez çalışmaktadır.

Bir sinyali başka bir fonksiyon ile sararak sinyale bağlı yeni ifadeler oluşturulabilir. Bu sinyale erişen fonksiyonun kendisi de aynı zamanda bir sinyaldir: sardığı sinyal değiştiğinde fonksiyona erişmekte olan okuyucular da güncellenecektir.

Counter'ı, artık ikişer ikişer saymak üzere, `doubleCount` fonksiyonu ile güncelleyelim:

```jsx
const doubleCount = () => count() * 2;
```

Sonrasında `doubleCount` fonksiyonunu, bir sinyali nasıl çağırıyorsak aynı şekilde JSX üzerinde çağırabiliriz:
```jsx
return <div>Count: {doubleCount()}</div>;
```

Bu tür fonksiyonlara _derived signal_ (türetilmiş sinyal) diyoruz çünkü reaktiviteleri eriştikleri sinyalden gelmekte. Kendileri bir değer saklamazlar, (bir derived signal oluşturur ve onu hiç çağırmazsanız, kullanılmayan herhangi bir fonksiyon gibi Solid'in çıktısından çıkarılacaktır) ancak kendilerine bağlı olan tüm efektleri güncellerler ve bir görünüme dahil edildiklerinde re-render'ı tetiklerler.