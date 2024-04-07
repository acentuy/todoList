<template>
  <div class="progress-block">
    <p class="progress-block__amount">{{ amount }} tasks</p>
    <h3 class="progress-block__title">{{ title }}</h3>
    <div class="progress-block__progress-bar">
      <div :style="thumbStyles" class="progress-block__progress-thumb"></div>
    </div>
  </div>
</template>

<script>
import { calculateThumbWidth } from '@/utils/calculateThumbWidth.js';

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    totalAmount: {
      type: Number
    },
    amount: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      required: true
    }
  },
  computed: {
    thumbStyles() {
      return {
        backgroundColor: this.color,
        width: calculateThumbWidth(this.amount, this.totalAmount)
      };
    }
  }
};
</script>

<style scoped>
.progress-block {
  width: 190px;
  height: 85px;
  padding: 16px;
  border-radius: 8px;
  background-color: rgba(32, 36, 39, 0.05);
}

.progress-block__amount {
  opacity: 0.5;
  font-size: 12px;
  font-weight: 600;
}

.progress-block__title {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.28px;
  margin: 4px 0 12px;
}

.progress-block__progress-bar {
  height: 4px;
  width: 100%;
  background-color: rgba(32, 36, 39, 0.07);
}

.progress-block__progress-thumb {
  height: 100%;
}
</style>
