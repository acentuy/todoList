<template>
  <div class="todo-block">
    <img class="todo-block__image" src="@/assets/images/todo-image.svg" alt="todos image" />
    <h1 class="todo-block__title">Today I need to</h1>
    <TodoForm />
    <TodoList v-if="!isLoading" :todos="sortedAndFilteredTodos" />
    <CustomLoader v-else><p>Loading...</p></CustomLoader>
    <TodoStatistics v-if="allTodosCount" />
    <TodoFilters v-if="allTodosCount" />
    <div v-if="!allTodosCount && !isLoading" class="todo-block__checkmark-container">
      <img
        class="todo-block__checkmark"
        src="@/assets/icons/checkmark-done_icon.svg"
        alt="checkmark logo"
      />
      <p class="todo-block__checkmark-text">Congrat, you have no more tasks to do</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TodoForm from './TodoForm.vue';
import TodoList from './TodoList.vue';
import TodoFilters from './TodoFilters.vue';
import CustomLoader from './UI/CustomLoader.vue';
import TodoStatistics from './TodoStatistics.vue';

export default {
  components: { TodoForm, TodoList, TodoFilters, CustomLoader, TodoStatistics },
  computed: mapGetters(['allTodosCount', 'sortedAndFilteredTodos', 'isLoading']),
  methods: mapActions(['fetchTodos']),
  mounted() {
    this.fetchTodos();
  }
};
</script>

<style scoped>
.todo-block {
  background-color: rgb(255, 255, 255);
  width: 730px;
  height: 719px;
  border-radius: 24px;
  padding: 32px 32px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo-block__image {
  width: 180px;
  height: 180px;
}

.todo-block__title {
  font-weight: 700;
  margin: 48px 0 52px;
  font-size: 24px;
}

.todo-block__checkmark-container {
  display: flex;
  align-items: center;
  margin-top: auto;
}

.todo-block__checkmark-text {
  margin-left: 8px;
  color: rgba(143, 153, 163, 1);
  user-select: none;
}
</style>
