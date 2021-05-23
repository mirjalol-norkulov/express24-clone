<template>
  <div
    class="e-modal"
    :class="{'e-modal--visible': visible}"
    aria-labelledby="modal-title" role="dialog"
    aria-modal="true"
  >
    <div class="e-modal__wrapper">

      <!-- Modal overlay-->
      <transition name="overlay">
        <div
          v-if="visible"
          class="e-modal__overlay"
          aria-hidden="true"
          @click="handleOverlayClick"></div>
      </transition>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true">&#8203;</span>

      <!-- Modal panel -->
      <transition name="panel">
        <div
          v-if="visible"
          class="e-modal__panel"
          :style="{width: width || 'auto'}"
        >
          <!-- Close button-->
          <button v-if="showClose" class="e-modal__close-btn" @click="handleClose">
            <close-icon/>
          </button>
          <slot/>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import CloseIcon from '@/assets/icons/svg/close.svg';

export default {
  name: 'EModal',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    showClose: {
      type: Boolean,
      default: false,
    },
    closeOnEscape: {
      type: Boolean,
      default: true,
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
    width: {
      type: [String],
      default: undefined,
    },
  },
  components: { CloseIcon },
  created() {
    if (this.closeOnEscape) {
      window.addEventListener('keyup', this.onKeyUp);
    }
  },
  beforeDestroy() {
    if (this.closeOnEscape) {
      window.removeEventListener('keyup', this.onKeyUp);
    }
  },
  methods: {
    handleOverlayClick() {
      if (this.closeOnClickOverlay) {
        this.close();
      }
    },
    handleClose() {
      this.close();
    },
    onKeyUp(event) {
      if (event.keyCode === 27) {
        this.close();
      }
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
.e-modal {
  @apply fixed z-50 inset-0 overflow-y-auto pointer-events-none;

  &--visible {
    @apply pointer-events-auto;
  }

  &__close-btn {
    @apply absolute top-2 right-2 rounded-full bg-white text-gray-700 p-1.5;
    z-index: 9999;

    &:focus {
      @apply outline-none;
    }
  }

  &__wrapper {
    @apply flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center;
  }

  &__overlay {
    @apply fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity;
  }

  &__panel {
    @apply relative inline-block align-bottom
    bg-white rounded text-left overflow-hidden
    shadow-xl transform transition-all;
  }
}

@screen sm {
  .e-modal {
    &__wrapper {
      @apply block p-0;
    }

    &__panel {
      @apply my-8 align-middle max-w-4xl w-auto;
    }
  }
}

/*
  Overlay

  Entering: "ease-out duration-300"
    From: "opacity-0"
    To: "opacity-100"
  Leaving: "ease-in duration-200"
    From: "opacity-100"
    To: "opacity-0"
 */
.overlay-enter-active {
  @apply transition-opacity duration-300 ease-out;
}

.overlay-leave-active {
  @apply transition-opacity duration-200 ease-in;
}

.overlay-enter {
  @apply opacity-0;
}

.overlay-enter-to {
  @apply opacity-100;
}

.overlay-leave {
  @apply opacity-100;
}

.overlay-leave-to {
  @apply opacity-0;
}

/*
  Modal panel, show/hide based on modal state.

  Entering: "ease-out duration-300"
    From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    To: "opacity-100 translate-y-0 sm:scale-100"
  Leaving: "ease-in duration-200"
    From: "opacity-100 translate-y-0 sm:scale-100"
    To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
*/

.panel-enter-active {
  @apply transition-all duration-300 ease-out;
}

.panel-leave-active {
  @apply transition-all duration-200 ease-in;
}

.panel-enter {
  @apply opacity-0 translate-y-4;
}

.panel-enter-to {
  @apply opacity-100 translate-y-0;
}

.panel-leave {
  @apply opacity-100 translate-y-0;
}

.panel-leave-to {
  @apply opacity-0 translate-y-4;
}

@screen sm {
  .panel-enter {
    @apply translate-y-0 scale-95;
  }

  .panel-enter-to {
    @apply scale-100;
  }

  .panel-leave {
    @apply scale-100;
  }

  .panel-leave-to {
    @apply translate-y-0 scale-95;
  }
}
</style>
