<template>
  <form @submit.prevent="onSubmit" class="todo-form">
    <CustomInput v-model="inputValue" placeholder="Add new todo..." />
    <SubmitButton title="Submit" v-if="inputValue.length" />
  </form>
</template>

<script>
import CustomInput from './UI/CustomInput.vue';
import SubmitButton from './UI/SubmitButton.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      inputValue: ''
    };
  },
  components: { CustomInput, SubmitButton },
  computed: mapGetters(['nextTodoOrder']),
  methods: {
    ...mapActions(['addTodo']),
    onSubmit() {
      if (this.inputValue.trim()) {
        const newTodo = {
          title: this.inputValue,
          id: Date.now(),
          completed: false,
          order: this.nextTodoOrder
        };

        this.addTodo(newTodo);
        this.inputValue = '';
      }
    }
  }
};
</script>

<style scoped>
.todo-form {
  display: flex;
  gap: 16px;
}
</style>
