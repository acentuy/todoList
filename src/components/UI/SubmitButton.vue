<template>
  <button class="submit-btn" type="submit">
    {{ title }}
  </button>
</template>

<script>
export default {
  props: { title: String }
};
</script>

<style scoped>
.submit-btn {
  padding: 12px 16px;
  width: 77px;
  height: 40px;
  background-color: rgba(37, 120, 244, 1);
  border-radius: 8px;
  color: rgb(255, 255, 255);
  font-size: 13px;
  font-weight: 600;
}

.submit-btn:hover {
  opacity: 0.8;
}
</style>
