<template>
  <div>
    <router-view />

    <div class="modal" :class="{ 'is-active': active }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Hello from <code>three/_layout.vue</code>!
          </p>
        </header>
        <section class="modal-card-body">
          This is a modal notification shown by <code>three/_layout.vue</code>.
        </section>
        <footer class="modal-card-foot">
          <button class="button" @click="active = false">Close</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: true,
    };
  },
};
</script>
