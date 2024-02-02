<template>
  <div class="custom-block" :class="type">
    <p class="custom-block-title">{{ title }}</p>
    <component :is="name" />
    <details class="details custom-block">
      <summary>Click me to show code</summary>
      <span v-html="code"></span>
    </details>
  </div>
</template>

<script>
import { data } from './demo-codes'

export default {
  props: {
    name: String,
    title: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'info',
    },
  },
  computed: {
    code() {
      return data[this.name];
    },
  },
};
</script>

<style scoped>
.custom-block {
  font-size: 16px;
}
</style>
