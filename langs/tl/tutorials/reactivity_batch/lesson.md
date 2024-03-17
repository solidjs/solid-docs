Solid's reactivity is synchronous which means, by the next line after any change, the DOM will have updated. And for the most part this is perfectly fine, as Solid's granular rendering is just a propagation of the update in the reactive system. Unrelated changes "rendering" twice don't actually mean wasted work.

What if the changes are related? Solid's `batch` helper allows to queue up multiple changes and then apply them all at the same time before notifying their observers. Within the batch, updated Signal values are not committed until completion.

In this example, we are assigning both names on a button click and this triggers our rendered update twice. You can see the logs in the console when you click the button. So let's wrap the `set` calls in a batch.

```js
 const updateNames = () => {
    console.log("Button Clicked");
    batch(() => {
      setFirstName(firstName() + "n");
      setLastName(lastName() + "!");
    })
  }
```
And that's it. Now we only notify once for the whole changeset.