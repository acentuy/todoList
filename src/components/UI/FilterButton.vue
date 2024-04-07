<template>
  <button
    class="filter-btn"
    :class="{ 'filter-btn_active': isActive, 'filter-btn_hidden': isHidden }"
    @click="$emit('onClick', title)"
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  props: {
    title: String,
    isActive: Boolean,
    isHidden: Boolean
  }
};
</script>

<style scoped>
.filter-btn {
  padding: 8px 12px;
  height: 40px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  visibility: visible;
}

.filter-btn:hover {
  opacity: 0.8;
}

.filter-btn_active,
.filter-btn:active {
  background-color: rgba(37, 120, 244, 1);
  color: rgb(255, 255, 255);
}

.filter-btn_hidden {
  visibility: hidden;
}
</style>
