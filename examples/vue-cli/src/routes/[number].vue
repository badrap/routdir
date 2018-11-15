<template>
  <div>
    <h1>Number {{ $route.params.number }}!</h1>
    <p>
      This is a <strong>dynamic route</strong>, rendered from <code>[number].vue</code> by setting
      the parameter <code>number</code> to <code>{{ $route.params.number }}</code>.
    </p>
    <p>
      <router-link to="/">« Go back</router-link>
    </p>
  </div>
</template>
