<template>
  <input
    class="todo-input"
    type="text"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  props: ['modelValue', 'placeholder']
};
</script>

<style scoped>
.todo-input {
  width: 317px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(199, 204, 209, 1);
  outline: none;
}

.todo-input::placeholder {
  color: rgba(143, 153, 163, 1);
}
</style>
