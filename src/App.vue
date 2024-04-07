<script>
import TodoBlock from '@/components/TodoBlock.vue';

export default {
  components: { TodoBlock }
};
</script>

<template>
  <main class="app">
    <TodoBlock />
  </main>
</template>

<style scoped>
.app {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 90px 0px;
  background: linear-gradient(
    to top left,
    rgba(215, 190, 252, 1),
    rgba(148, 189, 252, 1)
  );
}
</style>
