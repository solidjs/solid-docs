import {Aside} from '~/components/configurable/Aside'

<Title>Async SSR</Title>

<Aside type="advanced">
  This is a low level API intended for use by library authors. If you would like to use server side rendering in your application we suggest making use of <a href="https://start.solidjs.com/getting-started/what-is-solidstart">Solid Start</a> our meta-framework that makes adding server side rendering to your application extremely easy.
</Aside>

## What is Async SSR?

Async SSR is a server side rendering technique used by most javascript meta-frameworks like Next.js, Nuxt.js, Gatsby, etc. It is a technique that allows you to completely render your application on the server and send the HTML to the client along with the appropriate asynchronous data already fetched. This allows the client to render the page without having to wait for the data to be fetched.

Solid.js offers a similar technique through the use of the `renderToStringAsync` function. This function allows you to render your application on the server and send the HTML to the client along with all the asynchronous data already fetched. This allows your application to be completely client agnostic and not have to worry about client side data fetching.

## How does `renderToStringAsync` work?

`renderToStringAsync` works by taking a component and returning a promise that resolves to a string of HTML. This string of HTML is the rendered component with all the asynchronous data already fetched and serialized. Therefore, the whole application is ready to be hydrated by the time it reaches the client.

```jsx
import { renderToStringAsync } from 'solid-js/web'
import {createResource} from 'solid-js'

const App = () => {
  const [data] = createResource(getAsyncData)

  async function getAsyncData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const json = await response.json()

    return json
  }

  return (
    <div>
      <h1>Async SSR</h1>
      <p>{data().title}</p>
    </div>
  )
}

renderToStringAsync(App).then(html => {
  console.log(html)
})
```

You'll notice that I didn't make use of a Suspense boundary before accessing the data in the template, that is because in Async SSR Suspense boundaries are not needed because data is prefetched on the server before rendering. The above code will render the `App` component on the server and return a promise that resolves to HTML once the asynchronous data has been fetched. The HTML will look something like this:

```html
<div>
  <h1>Async SSR</h1>
  <p>delectus aut autem</p>
</div>
```

## How to use `renderToStringAsync`?

In order to use `renderToStringAsync` you'll need a server which can run javascript. You can use any server you want, but for the sake of this example we'll use [Express](https://expressjs.com/).

```js
// server.js
import express from 'express'
import { renderToStringAsync } from 'solid-js/web'
import App from './App'

const app = express()

app.get('/', async (req, res) => {
  const html = await renderToStringAsync(() => <App/>)
  res.send(html)
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
```

```jsx
// App.js
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
```

<Aside type="general">
  Keep in mind that you will need a bundler like Vite, Webpack, or Rollup to bundle your application. Here's a fully functional example using rollup and express. <a href="https://github.com/ryansolid/solid-ssr-workbench">solid-ssr-workbench</a>. This repo contains examples of all 3 forms of SSR.
</Aside>

## Limitations and benefits of `renderToStringAsync`

#### Limitations 

The main limitation of `renderToStringAsync` is that it is completely server dependent. This means that server speed and availability will directly affect the performance of your application. This is because the client will have to wait for the server to render the application before it can be hydrated. This is not a problem if you have a fast server and a lot of resources, but it can be a problem if you have a slow server or a lot of users. In this case, you may want to consider using `renderToString` instead.

A slight disadvantage of `renderToStringAsync` is that the time to first paint is blocked by how long it takes to load data on the server. This is not a problem with fast servers but may be problematic with slow servers.

#### Benefits

The main benefit of `renderToStringAsync` is that it is completely client agnostic. This means that you can render your application on the server and send the HTML to the client without having to worry about client side data fetching. This is a huge benefit because it allows you to completely decouple your application from the client. This means that you can use any client you want without having to worry about data fetching.
