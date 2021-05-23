<template>
  <button
    v-bind="$attrs"
    v-on="$listeners"
    class="e-button"
    :class="[`e-button--${color}`, `e-button--${size}`, circle ? 'e-button--circle' : '']">
    <slot/>
    <span class="e-button__loader" v-if="loading">
      <loading-spinner size="14px" color="black"/>
    </span>
  </button>
</template>

<script>
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';

const SIZES = Object.freeze({
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
});

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
    size: {
      type: String,
      default: SIZES.MEDIUM,
      validator(value) {
        return Object.values(SIZES)
          .includes(value);
      },
    },
    circle: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@use "sass:string";

.e-button {
  @apply relative px-4 bg-gray-light rounded
  cursor-pointer transition-all duration-300 outline-none;

  &:focus, &:active {
    @apply outline-none ring-2 ring-offset-1;
  }

  &--small {
    @apply py-1 text-sm;
  }

  &--medium {
    @apply py-2.5;
  }

  &--large {
    @apply py-3 text-lg;
  }

  &--circle {
    border-radius: 50%;

    &.e-button--small {
      @apply px-1 py-1;
    }

    &.e-button--medium {
      @apply px-2.5 py-2.5;
    }

    &.e-button--large {
      @apply px-3 py-3;
    }
  }

  &--default {
    @apply bg-gray-light ring-gray-300;
    &:not([disabled]):hover {
    }
  }

  &--primary {
    @apply bg-primary ring-primary;
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
