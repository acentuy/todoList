<template>
  <div class="todo-statistics">
    <ProgressBlock
      :amount="completedTodosCount"
      :totalAmount="allTodosCount"
      :color="progressBarColors.completed"
      title="Completed"
    />
    <ProgressBlock
      :amount="activeTodosCount"
      :totalAmount="allTodosCount"
      :color="progressBarColors.finished"
      title="To be finished"
    />
  </div>
</template>

<script>
import { progressBarColors } from '../constants/progressBarColors';
import { mapGetters } from 'vuex';
import ProgressBlock from './UI/ProgressBlock.vue';

export default {
  components: { ProgressBlock },
  data() {
    return {
      progressBarColors
    };
  },
  computed: mapGetters(['allTodosCount', 'activeTodosCount', 'completedTodosCount'])
};
</script>

<style scoped>
.todo-statistics {
  display: flex;
  gap: 30px;
  margin-bottom: 32px;
}
</style>
