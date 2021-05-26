<template>
  <div class="e-select">
    <div
      class="e-select__current"
      tabindex="0"
      @blur="closeMenu"
      @keyup.esc="closeMenu"
      @click="toggleIsOpen">
      {{ currentSelectedItem && currentSelectedItem[itemLabel] }}
      <chevron-down class="e-select__icon" :class="{'e-select__icon--rotated': isOpen}"/>
    </div>
    <transition name="select-menu">
      <div v-if="isOpen" class="e-select__menu">
        <e-select-option
          v-for="item in items"
          :key="item[itemKey]"
          :label="item[itemLabel]"
          @click="handleOptionClick(item[itemKey])"/>
      </div>
    </transition>
  </div>
</template>

<script>
import ChevronDown from '@/assets/icons/svg/chevron-down.svg';
import ESelectOption from '@/components/ui/ESelectOption.vue';

export default {
  name: 'ESelect',
  props: {
    value: {
      type: [String, Number],
      default: undefined,
    },
    items: {
      type: [Array],
      default: () => ([]),
    },
    itemKey: {
      type: String,
      default: undefined,
    },
    itemLabel: {
      type: String,
      default: undefined,
    },
  },
  components: {
    ESelectOption,
    ChevronDown,
  },
  data() {
    return {
      innerValue: undefined,
      isOpen: false,
    };
  },
  computed: {
    currentSelectedItem() {
      return this.items.find((item) => item[this.itemKey] === this.value);
    },
    attributes() {
      const result = {};
      Object.entries(this.$attrs)
        .forEach(([attr, value]) => {
          if (attr !== 'value') {
            result[attr] = value;
          }
        });

      return result;
    },
    listeners() {
      return Object.entries(this.$listeners)
        .filter(([attr]) => attr !== 'input')
        .reduce((res, [attr, value]) => ({
          ...res,
          [attr]: value,
        }), {});
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.innerValue = value;
      },
    },
    innerValue: {
      handler(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    toggleIsOpen() {
      this.isOpen = !this.isOpen;
    },
    handleOptionClick(value) {
      this.innerValue = value;
      this.closeMenu();
    },
    handleOutsideClick() {
    },
    closeMenu() {
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss">
.e-select {
  @apply relative;

  &__current {
    @apply pl-4 pr-8 py-2.5 outline-none
    cursor-pointer border border-solid border-gray-light rounded-lg text-sm select-none;
    min-width: 120px;

    &:focus, &:active {
      @apply ring-2 ring-gray-light ring-offset-2;
    }
  }

  &__icon {
    @apply absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-all duration-200;
    transform-origin: top;

    &--rotated {
      transform: rotate(180deg) translateY(-50%);
    }
  }

  &__menu {
    @apply absolute left-0 bg-white border border-solid border-gray-light w-full rounded-lg;
    top: calc(100% + 0.5rem);
  }

  .select-menu {
    &-enter-active, &-leave-active {
      @apply transition-all duration-200;
    }

    &-enter {
      @apply transform -translate-y-4 opacity-0;
    }

    &-enter-to {
      @apply transform translate-y-0 opacity-100;
    }

    &-leave {
      @apply transform translate-y-0 opacity-100;
    }

    &-leave-to {
      @apply transform -translate-y-4 opacity-0;
    }
  }
}
</style>
