# @badrap/routdir [![CircleCI](https://circleci.com/gh/badrap/routdir.svg?style=shield)](https://circleci.com/gh/badrap/routdir)

*Filesystem based route generation for Webpack + vue-router.*

**@badrap/routdir** is based on Sapper's [pages](https://sapper.svelte.technology/guide#pages) and [layouts](https://sapper.svelte.technology/guide#layouts) features, with some limitations. This package also works well together with [@badrap/preload](https://github.com/badrap/preload).

## Installation

```sh
$ yarn install --dev @badrap/routdir
```

## Usage

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
  routes: preload(routes)
});
```

## Example

The directory [examples/vue-cli](./examples/vue-cli) contains an example project
demonstrating how to use this package with [Vue CLI 3](https://cli.vuejs.org/).

## License

This library is licensed under the MIT license. See [LICENSE](./LICENSE).
