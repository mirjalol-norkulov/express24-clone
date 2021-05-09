<template>
  <div class="e-input" :class="[`e-input--${variant}`, !!innerValue ? 'e-input--filled' : '']">
    <label v-if="label" class="e-input__label" :for="inputId">{{ label }}</label>
    <input
      ref="input"
      class="e-input__input"
      v-model="innerValue"
      :id="inputId">
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import Inputmask from 'inputmask';

const VARIANTS = Object.freeze({
  INLINE: 'inline',
});

const DEFAULT_MASK_OPTIONS = {
  showMaskOnHover: false,
};

export default {
  name: 'EInput',
  props: {
    value: {
      type: [String, Number],
      default: undefined,
    },
    variant: {
      type: String,
      default: VARIANTS.INLINE,
    },
    label: {
      type: String,
      required: false,
    },
    mask: {
      type: String,
      required: false,
    },
    maskOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    inputId() {
      return this.$attrs.id || uuidv4();
    },
    allMaskOptions() {
      return { ...DEFAULT_MASK_OPTIONS, ...this.maskOptions };
    },
  },
  data() {
    return {
      innerValue: undefined,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.innerValue = value;
        if (this.mask && this.maskObject) {
          this.$emit('complete-change', this.maskObject.isComplete());
        }
      },
    },
    innerValue: {
      immediate: true,
      handler(value) {
        this.$emit('input', value);
        if (this.mask && this.maskObject) {
          this.$emit('complete-change', this.maskObject.isComplete());
        }
      },
    },
  },
  mounted() {
    if (this.mask) {
      this.maskObject = Inputmask(this.mask, this.allMaskOptions)
        .mask(this.$refs.input);
    }
  },
  beforeDestroy() {
    delete this.maskObject;
  },
  methods: {},
};
</script>

<style lang="scss">
.e-input {
  @apply relative inline-block px-4 py-3;

  &__input {
    @apply placeholder-gray-light w-full block outline-none leading-3;

    &:focus {
      @apply outline-none;
    }
  }

  &--inline {
    @apply px-0 border-b border-gray-light transition-all duration-300;

    .e-input__label {
      @apply absolute w-full left-0 pointer-events-none transition-all duration-300 text-gray-light;
      transform-origin: left;
    }

    &:focus-within, &.e-input--filled {
      @apply border-primary;
      box-shadow: 0 1px 0 0 theme('colors.primary.DEFAULT');

      .e-input__label {
        @apply transform scale-75 -translate-y-full;
      }
    }
  }
}
</style>
