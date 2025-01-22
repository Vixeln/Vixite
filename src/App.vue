<script setup lang="ts">
import VesmosApp from './components/VesmosApp.vue';
</script>

<template>
  <header>
    <hgroup>
      <h1>Vixite</h1>
      <p>Vireak's Vue Vebsite</p>
    </hgroup>
  </header>

  <main>
    <!-- <TheWelcome /> -->
    <VesmosApp></VesmosApp>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
