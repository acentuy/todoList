<template>
  <div class="filters">
    <FilterButton :isHidden="!activeTodosCount" title="Check all" @onClick="onCompleteAllTodos" />
    <FilterButton
      v-for="(filter, i) in filteredFilters"
      :key="i"
      :title="filter"
      :isActive="filter === selectedFilter"
      @onClick="onChangeFilter"
    />
    <FilterButton
      :isHidden="!completedTodosCount"
      title="Clear completed"
      @onClick="onClearCompletedTodos"
    />
  </div>
</template>

<script>
import FilterButton from './UI/FilterButton.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  components: { FilterButton },
  computed: mapGetters([
    'filteredTodos',
    'activeTodosCount',
    'completedTodosCount',
    'filteredFilters',
    'selectedFilter'
  ]),
  methods: {
    ...mapMutations(['changeFilter', 'completeAllTodos', 'clearCompletedTodos']),
    onChangeFilter(value) {
      this.changeFilter(value);
    },
    onCompleteAllTodos() {
      this.completeAllTodos();
    },
    onClearCompletedTodos() {
      this.clearCompletedTodos();
    }
  }
};
</script>

<style scoped>
.filters {
  display: flex;
  width: 410px;
  justify-content: space-between;
}
</style>
