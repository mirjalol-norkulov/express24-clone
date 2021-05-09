<template>
  <component :is="tag">
    <slot :value="value"></slot>
  </component>
</template>

<script>
export default {
  name: 'CountDown',
  props: {
    tag: {
      type: String,
      default: 'span',
    },
    seconds: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      value: undefined,
    };
  },
  watch: {
    seconds: {
      immediate: true,
      handler(value) {
        this.value = value;
      },
    },
  },
  created() {
    this.countDown();
  },
  methods: {
    countDown() {
      if (this.value > 0) {
        setTimeout(() => {
          this.value -= 1;
          this.countDown();
        }, 1000);
      } else {
        this.$emit('complete');
      }
    },
  },
};
</script>

<style scoped>

</style>
