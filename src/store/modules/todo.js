import { getDataFromLocalStorage } from '@/utils/localStorage';
import { setDataInLocalStorage } from '@/utils/localStorage';

export default {
  state() {
    return {
      todos: [],
      loading: false,
      filters: ['All', 'Active', 'Completed'],
      selectedFilter: 'All',
      selectedTodo: null
    };
  },
  mutations: {
    setTodos(state, todos) {
      state.todos = todos;
    },
    setLoading(state, bool) {
      state.loading = bool;
    },
    addTodo(state, newTodo) {
      state.todos.unshift(newTodo);
    },
    removeTodo(state, id) {
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
    changeTodoTitle(state, newTodo) {
      state.todos = state.todos.map((todo) =>
        todo.id === newTodo.id ? { ...todo, title: newTodo.title } : todo
      );
    },
    changeTodoStatus(state, id) {
      state.todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
    },
    completeAllTodos(state) {
      state.todos = state.todos.map((todo) => ({ ...todo, completed: true }));
    },
    clearCompletedTodos(state) {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
    changeFilter(state, filter) {
      switch (filter) {
        case 'Active':
          state.selectedFilter = 'Active';
          break;
        case 'Completed':
          state.selectedFilter = 'Completed';
          break;
        default:
          state.selectedFilter = 'All';
      }
    },
    setSelectedTodo(state, todo) {
      state.selectedTodo = todo;
    },
    swapTodoPlaces(state, todo) {
      state.todos = state.todos.map((el) => {
        if (el.id === todo.id) {
          return { ...el, order: state.selectedTodo.order };
        }

        if (el.id === state.selectedTodo.id) {
          return { ...el, order: todo.order };
        }

        return el;
      });
    }
  },
  actions: {
    fetchTodos({ commit }) {
      try {
        commit('setLoading', true);

        setTimeout(() => {
          const todos = getDataFromLocalStorage('todos') || [];
          commit('setTodos', todos);
          commit('setLoading', false);
        }, 500);
      } catch (error) {
        console.error('Could not get data from localStorage:', error);
        commit('setLoading', false);
      }
    },
    addTodo({ commit, dispatch }, todo) {
      try {
        dispatch('saveInLocalStorage', todo);
        commit('addTodo', todo);
      } catch (error) {
        console.error('Could not set data in localStorage:', error);
      }
    },
    saveInLocalStorage({ state }, todo) {
      const updatedTodos = [todo, ...state.todos];

      setDataInLocalStorage('todos', updatedTodos);
    },
    removeTodo({ commit }, id) {
      const todos = getDataFromLocalStorage('todos') || [];
      const filteredTodos = todos.filter((todo) => todo.id !== id);

      setDataInLocalStorage('todos', filteredTodos);
      commit('removeTodo', id);
    },
    changeTodoStatus({ commit }, id) {
      const todos = getDataFromLocalStorage('todos') || [];
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );

      setDataInLocalStorage('todos', updatedTodos);
      commit('changeTodoStatus', id);
    }
  },
  getters: {
    allTodos(state) {
      return state.todos;
    },
    isLoading(state) {
      return state.loading;
    },
    allTodosCount(_, getters) {
      return getters.allTodos.length;
    },
    sortedActiveTodos(_, getters) {
      return getters.sortedTodosByOrder.filter((todo) => !todo.completed);
    },
    activeTodosCount(_, getters) {
      return getters.sortedActiveTodos.length;
    },
    sortedCompletedTodos(_, getters) {
      return getters.sortedTodosByOrder.filter((todo) => todo.completed);
    },
    completedTodosCount(_, getters) {
      return getters.sortedCompletedTodos.length;
    },
    sortedTodosByOrder(_, getters) {
      return getters.allTodos.sort((a, b) => b.order - a.order);
    },
    nextTodoOrder(state) {
      return state.todos.length + 1;
    },
    sortedAndFilteredTodos(state, getters) {
      switch (state.selectedFilter) {
        case 'Active':
          return getters.sortedActiveTodos;
        case 'Completed':
          return getters.sortedCompletedTodos;
        default:
          return getters.sortedTodosByOrder;
      }
    },
    allFilters(state) {
      return state.filters;
    },
    filteredFilters(state, getters) {
      if (getters.activeTodosCount && getters.completedTodosCount) {
        return state.filters;
      } else {
        return ['All'];
      }
    },
    selectedFilter(state) {
      return state.selectedFilter;
    },
    selectedTodo(state) {
      return state.selectedTodo;
    }
  }
};
