# @badrap/routdir

_Filesystem based route generation for Webpack + vue-router._

**@badrap/routdir** is based on Sapper's [pages](https://sapper.svelte.technology/guide#pages) and [layouts](https://sapper.svelte.technology/guide#layouts) features, with some limitations.

This package also works well together with [@badrap/preload](https://github.com/badrap/preload).

## Installation

```sh
$ npm i @badrap/routdir
```

## Usage

### Setup

**@badrap/routdir** exports one function that accepts a Webpack context object as returned by [`require.context`](https://webpack.js.org/guides/dependency-management/#require-context).

```js
import routdir from "@badrap/routdir";

// Create a Webpack context from the ./routes directory, and feed it to routdir
// to build the routes.
const routes = routdir(require.context("./routes", true, /\.vue$/));
```

The context can also be created in `"lazy"` mode to enable code splitting:

```js
const routes = routdir(require.context("./routes", true, /\.vue$/, "lazy"));
```

The resulting routes can be passed as-is to vue-router, or do some further modifications to them, such as decorating them with [@badrap/preload](https://github.com/badrap/preload).

```js
import VueRouter from "vue-router";
import preload from "@badrap/preload";

const router = new VueRouter({
  mode: "history",
  routes: preload(routes),
});
```

### Static Routes

Files with basic alphanumeric names become _static routes_. For example `one.vue` and `two.vue` become routes `/one` and `/two`, respectively.

`index.vue` is a special case that just gets rendered as the root route. For example `index.vue` and `nested/index.vue` become routes `/` and `/nested`, respectively.

### Dynamic Routes

Filenames wrapped in `[` and `]` become _dynamic routes_. For example `[number].vue` becomes route `/:number`. The route parameter `number` is then available for the route component as `$route.params.number`.

In the case a route matches a static route _and_ a dynamic route the static one has the precedence.

### Nested Routes & Layouts

Nested directories become nested routes. For example files `nested/two.vue` and `nested/[number].vue` become routes `/nested/two` and `/nested/:number`, respectively.

A routes under a specific directory (including the root directory) can have an optional common layout, defined by a special file `_layout.vue`. For example the file `nested/_layout.vue` would then become a layout for all routes under `/nested`. The layouts also stack, so `_layout.vue` and `nested/_layout.vue` both apply to all routes under `/nested`.

## Example

The directory [examples/vue-cli](./examples/vue-cli) contains an example project
demonstrating how to use this package with [Vue CLI 3](https://cli.vuejs.org/).

## License

This library is licensed under the MIT license. See [LICENSE](./LICENSE).
