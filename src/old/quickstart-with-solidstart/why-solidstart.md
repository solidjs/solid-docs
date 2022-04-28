<title>Why SolidStart</title>
To build a complete web application with SolidJS from scratch, there are many important details you need to consider:

- Code has to be bundled using a bundler like vite or webpack and transformed using a compiler like Babel.
- You need to do production optimizations such as code splitting.
- You might want to statically pre-render some pages for performance and SEO. You might also want to use server-side rendering or client-side rendering.
- You might have to write some server-side code to connect your Solid app to your database.

A framework can solve these problems. But such a framework must have the right level of abstraction — otherwise it won’t be very useful. It also needs to have great "Developer Experience", ensuring you and your team have an amazing experience while writing code.

### SolidStart: The Solid Framework

Enter SolidStart, the Solid Framework. SolidStart provides a solution to all of the above problems. But more importantly, it puts you and your team in the pit of success when building Solid applications.

SolidStart aims to have best-in-class developer experience and many built-in features, such as:

- An intuitive page-based routing system (with support for dynamic routes)
- Pre-rendering, both static generation (SSG) and server-side rendering (SSR) are supported on a per-page basis
- Automatic code splitting for faster page loads
- Client-side routing with optimized prefetching
- Built-in CSS and Sass support, and support for any CSS-in-JS library
- Development environment with Fast Refresh support
- API routes to build API endpoints with Serverless Functions
- Fully extendable

## Why

How we build SolidJS apps right now requires some difficult setup to get everything working together. Let's look at the problems that we need to solve:

- Routing
  - Render-as-you-fetch pattern, start loading data before you start rendering the UI for a route
  - Code-split rendering code for each router
  - Nested Routes
  - Browser-like transitions between routes
