<template>
  <div class="e-select-option" v-bind="$attrs" v-on="$listeners" @click="handleClick">
    {{ label }}
  </div>
</template>

<script>
export default {
  name: 'ESelectOption',
  props: {
    value: {
      type: [String, Number],
      default: undefined,
    },
    label: {
      type: [String],
      default: undefined,
    },
  },
  methods: {
    handleClick() {
      this.$emit('click', this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.e-select-option {
  @apply px-4 py-2 text-sm cursor-pointer transition-all duration-200 select-none;
  &:hover {
    @apply bg-gray-light;
  }
}
</style>
