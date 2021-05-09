<template>
  <button v-bind="$attrs" v-on="$listeners" class="e-button" :class="[`e-button--${color}`]">
    <slot/>
    <span class="e-button__loader" v-if="loading">
      <loading-spinner size="14px" color="black"/>
    </span>
  </button>
</template>

<script>
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';

export default {
  name: 'EButton',
  components: { LoadingSpinner },
  props: {
    color: {
      type: String,
      default: 'default',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@use "sass:string";

.e-button {
  @apply relative px-4 py-3 bg-gray-light rounded text-lg
  cursor-pointer transition-all duration-300;

  &--default {
    @apply bg-gray-light;
    &:not([disabled]):hover {
    }
  }

  &--primary {
    @apply bg-primary;
    &:not([disabled]):hover {
      @apply bg-primary-light;
    }
  }

  &[disabled] {
    @apply bg-gray-light cursor-auto;
  }

  &__loader {
    @apply absolute inset-0 flex items-center justify-center;
    background: rgba(255, 255, 255, 0.6);
  }
}
</style>
