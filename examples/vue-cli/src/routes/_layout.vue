<template>
  <div id="app">
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <strong>@badrap/routdir</strong>
          </a>
        </div>
      </div>
    </nav>

    <div class="container">
      <div class="content main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style src="bulma/css/bulma.min.css"></style>

<style>
.main {
  margin: 2em 0;
}
</style>
