<template>
  <div class="todo-list">
    <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue';

export default {
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  components: { TodoItem }
};
</script>

<style scoped>
.todo-list {
  width: 410px;
  height: 92px;
  margin: 40px 0 27px;
  overflow-y: scroll;
  padding-right: 16px;
}

.todo-list::-webkit-scrollbar {
  width: 4px;
}

.todo-list::-webkit-scrollbar-thumb {
  background: rgba(32, 36, 39, 0.1);
  border-radius: 8px;
  height: 80px;
}
</style>
