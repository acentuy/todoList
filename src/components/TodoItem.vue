<template>
  <div
    class="todo-item"
    :class="{ 'todo-item_selected': isSelected }"
    draggable="true"
    @dragstart="onDragStart"
    @dragleave="onDragLeave"
    @dragover.prevent="onDragOver"
    @drop.prevent="onDrop"
  >
    <button class="todo-item__btn todo-item__btn_type_drag">
      <img src="@/assets/icons/drag_icon.svg" alt="drag icon" />
    </button>
    <input
      class="todo-item__checkbox"
      type="checkbox"
      @input="onChangeStatus"
      :checked="todo.completed"
    />
    <h3
      v-if="!isEditMode"
      class="todo-item__title"
      :class="{ 'todo-item__title_done': todo.completed }"
    >
      {{ todo.title }}
    </h3>
    <input
      class="todo-item__edit-input"
      v-show="isEditMode"
      ref="input"
      type="text"
      v-model="newTitle"
    />
    <button v-if="!isEditMode" @click="onEditTodo" class="todo-item__btn">
      <img src="@/assets/icons/pencil_icon.svg" alt="edit icon" />
    </button>
    <button v-else @click="onSaveTodoChanges" class="todo-item__btn">
      <img src="@/assets/icons/success_icon.svg" alt="edit icon" />
    </button>
    <button @click="onRemoveTodo" class="todo-item__btn">
      <img src="@/assets/icons/bucket_icon.svg" alt="remove icon" />
    </button>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
  data() {
    return {
      isEditMode: false,
      newTitle: this.todo.title,
      isSelected: false
    };
  },
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions(['removeTodo', 'changeTodoStatus']),
    ...mapMutations(['changeTodoTitle', 'setSelectedTodo', 'swapTodoPlaces']),
    onRemoveTodo() {
      this.removeTodo(this.todo.id);
    },
    onEditTodo() {
      this.isEditMode = true;

      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    onSaveTodoChanges() {
      if (this.newTitle.trim()) {
        this.changeTodoTitle({ ...this.todo, title: this.newTitle });
        this.isEditMode = false;
      }
    },
    onChangeStatus() {
      this.changeTodoStatus(this.todo.id);
    },
    onDragStart() {
      this.setSelectedTodo(this.todo);
    },
    onDragLeave() {
      this.isSelected = false;
    },
    onDragOver(e) {
      e.preventDefault();
      this.isSelected = true;
    },
    onDrop() {
      this.swapTodoPlaces(this.todo);

      this.isSelected = false;
    }
  }
};
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.todo-item_selected {
  background-color: rgba(143, 153, 163, 0.5);
}

.todo-item__checkbox {
  width: 18px;
  height: 18px;
  margin-right: 8px;
}

.todo-item__title_done {
  opacity: 0.5;
}

.todo-item__edit-input {
  outline: none;
  border: none;
  width: 258px;
  padding: 0;
  border-bottom: 0.5px solid rgba(143, 153, 163, 1);
}

.todo-item__btn {
  width: 16px;
  height: 16px;
  margin-left: 16px;
  padding: 0;
}

.todo-item__btn_type_drag {
  margin-right: 9px;
  margin-left: 0;
  opacity: 0.5;
  visibility: hidden;
}

.todo-item:hover .todo-item__btn_type_drag {
  visibility: visible;
}

.todo-item__btn:nth-of-type(2) {
  margin-left: auto;
}
</style>
