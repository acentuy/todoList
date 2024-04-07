<template>
  <div class="loader">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.loader {
  margin-top: 50px;
}

:slotted(p) {
  font-size: 18px;
  font-weight: 700;
}
</style>
