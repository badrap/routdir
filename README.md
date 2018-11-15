# @badrap/routdir [![CircleCI](https://circleci.com/gh/badrap/routdir.svg?style=shield)](https://circleci.com/gh/badrap/routdir)

Filesystem based route generation for Webpack + vue-router.

Based on Sapper's [pages](https://sapper.svelte.technology/guide#pages) and [layouts](https://sapper.svelte.technology/guide#layouts) features, with some limitations. This package also works well together with [@badrap/preload](https://github.com/badrap/preload).

## Installation

```sh
$ yarn install --dev @badrap/routdir
```

## Usage

```js
import Vue from "vue";
import VueRouter from "vue-router";
import routdir from "@badrap/routdir";

Vue.use(VueRouter);

// Create a Webpack context (with lazy loading) from the ./routes directory,
// and feed it to routdir to build the routes.
const routes = routdir(require.context("./routes", true, /\.vue$/, "lazy"));

new Vue({
  router: new VueRouter({
    mode: "history",
    routes
  }),
  render(h) {
    return h("router-view", {}, []);
  }
}).$mount("#app");
```

## Example

The directory [examples/vue-cli](./examples/vue-cli) contains an example project
demonstrating how to use this package with [Vue CLI 3](https://cli.vuejs.org/).

## License

This library is licensed under the MIT license. See [LICENSE](./LICENSE).
