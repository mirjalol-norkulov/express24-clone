<template>
  <div class="e-checkbox">
    <input
      class="e-checkbox__input" type="checkbox"
      :id="inputId"
      :checked="innerValue"
      v-model="innerValue"
      @change="$emit('change', $event)"
    />
    <label :for="inputId" class="e-checkbox__label">
      {{ label }}
    </label>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'ECheckbox',
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputId() {
      return this.$attrs.id || uuidv4();
    },
  },
  data() {
    return {
      innerValue: false,
    };
  },
  watch: {
    value(value) {
      this.innerValue = value;
    },
    innerValue: {
      immediate: true,
      handler(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {},
};
</script>

<style lang="scss">
.e-checkbox {
  @apply relative text-black flex items-center;

  &__input {
    display: none;
  }

  &__label {
    @apply flex items-center cursor-pointer select-none text-sm;

    &::before {
      @apply w-6 h-6 block border inline-block rounded mr-3 transition-all duration-200;
      content: "";
      background: url("/icons/svg/check.svg") center no-repeat;
      background-size: 0;
    }
  }

  &__input:checked + label::before {
    @apply bg-lightgreen;
    background-size: 20px;
  }

}
</style>
