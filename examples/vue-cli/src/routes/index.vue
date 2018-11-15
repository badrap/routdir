<template>
  <div>
    <p>
      This page demonstrates some features of the <strong>@badrap/routdir</strong> package.
      <br>
      This and the following three pages are generated from the contents of the
      directory <code>routes</code>.
    </p>

    <ul>
      <li>
        <router-link to="/one">/one</router-link> is a dynamic route, rendering the
        file <code>[number].vue</code>.
      </li>
      <li>
        <router-link to="/two">/two</router-link> is a static route,
        rendering the file <code>two.vue</code> and demonstrating their precedence over
        dynamic routes.
      </li>
      <li>
        <router-link to="/three">/three</router-link> is a nested route, rendering the
        file <code>three/index.vue</code>.
      </li>
    </ul>

  </div>
</template>
