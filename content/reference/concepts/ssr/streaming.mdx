import {Aside} from '~/components/configurable/Aside'

<Title>Streaming</Title>

<Aside type="advanced">
  This is a low level API intended for use by library authors. If you would like to add server-side rendering to your application we recommend checking out our meta-framework <a href="https://start.solidjs.com/getting-started/what-is-solidstart">Solid Start</a> that makes adding things like server-side rendering to your application extremely easier.
</Aside>

## What is streaming?

Streaming is a server-side rending technique similar to [Simple server-side rendering](/references/concepts/ssr/simple-client-fetching-ssr/) except using streams. Data is loaded on the server and sent along the stream so that the client can render it.

In this technique as opposed to Async SSR only initial HTML is hydrated. Data loading is slightly faster allowing page load times to be reduced. This is especially noticeable when compared with Async SSR when used on slow servers.

## How does `renderToStream` work?

`renderToStream` works by taking in a component and returning HTML, however for any node where asynchronous data is needed, a placeholder is rendered in it's place and replaced as more of the stream loads. So in streaming suspense boundaries are rendered then replaced as opposed to Async SSR where suspense boundaries are not rendered at all.

```jsx
import { renderToStream } from 'solid-js/web'
import { createResource, Suspense } from 'solid-js'
import List from './MyListComponent'

const App = () => {
  const [userData] = createResource(getUserDataAsync)
  const [userPosts] = createResource(getUserPostsAsync)

  return (
    <div>
      <h1>Streaming</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <h2>{userData().username}</h2>
        <Suspense fallback={<p>Loading posts...</p>}>
          <List posts={userPosts()}/>
        </Suspense>
      </Suspense>
    </div>
  )
}

renderToStream(() => <App/>)
```

The rough code example above will first render the loading placeholders then replace those nodes as the stream loads. Here's a step by step what that might look like step by step

```html
<div>
  <h1>Streaming</h1>
  <p>Loading...</p>
</div>
```

```html
<div>
  <h1>Streaming</h1>
  <h2>johndoe</h2>
  <p>Loading posts...</p>
</div>
```

```html
<div>
  <h1>Streaming</h1>
  <h2>johndoe</h2>
  <ul>
    <li><a href='/post/1'>first post</a></li>
    <li><a href='/post/2'>second post</a></li>
    <li><a href='/post/3'>third post</a></li>
    <li><a href='/post/4'>fourth post</a></li>
  </ul>
</div>
```

## How to use `renderToStream`?

In order to use `renderToStream` you'll need a server which can run Javascript code. You may use any server framework you want but for the sake of this example we will be making use of [Express](https://expressjs.com/).

```js
// server.js
import express from 'express'
import { renderToStringAsync } from 'solid-js/web'
import App from './App'

const app = express()

app.get("*",(res,req) => {
  return renderToStream(() => <App/>).pipe(res)
})

app.listen(8080, () => console.log('App is listening on port 8080'))
```

```jsx
// App.jsx
import {createResource} from 'solid-js'

export default function App() {
  const [data] = createResource(() => fetch('https://jsonplaceholder.typicode.com/todos/1').then(res => res.json()))

  return (
    <div>
      <h1>Async SSR</h1>
      <p>{data().title}</p>
    </div>
  )
}
````

<Aside type='general'>
  Keep in mind that you will need a bundler like Vite, Webpack, or Rollup to bundle your application. Here's a fully functional example using rollup and express. [solid-ssr-workbench](https://github.com/ryansolid/solid-ssr-workbench). This repo contains examples of all 3 forms of SSR.
</Aside>
