UI kaynaklı bir JavaScript hatasının tüm uygulamayı bozmaması gerekir. Error boundaries (Hata sınırları), child bileşen ağacındaki bir JavaScript hatasını yakalayan, loglayan ve sonrasında hata alınan bileşen ağacı yerine fallback UI'ı görüntüleyen bileşenlerdir.

Örneğimizde hata sonucu çöken bir bileşen var, bileşeni hatayı gösterecek şekilde Error Boundary ile saralım.

```jsx
<ErrorBoundary fallback={err => err}>
  <Broken />
</ErrorBoundary>
```
