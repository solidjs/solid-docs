Solid 的响应式是同步的，这意味着在任何变更后的下一行 DOM 都会更新。在大多数情况下，这完全没问题，因为 Solid 的粒度渲染只是更新在响应式系统中的传播。渲染两次无关的更改实际上并不意味着浪费性能。

如果更改是相关的怎么办？Solid 的 `batch` 工具函数允许将多个更改推入队列，然后在通知观察者之前同时使用它们。在批处理中更新的信号值直到批处理完成才会提交。

在这个例子中，我们在按钮点击时分配了两个名字，触发了渲染更新两次。单击该按钮后，可以在控制台中看到日志。因此，让我们将 `set` 调用打包成一个批次。

```js
 const updateNames = () => {
    console.log("Button Clicked");
    batch(() => {
      setFirstName(firstName() + "n");
      setLastName(lastName() + "!");
    })
  }
```

就是这样。现在整个变更集只会通知一次。