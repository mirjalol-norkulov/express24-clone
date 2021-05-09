<template>
  <div
    class="loading-spinner"
    :class="[`loading-spinner--${color}`]"
    :style="{width: size, height: size}">
    <div class="loading-spinner__dot"></div>
    <div class="loading-spinner__dot"></div>
    <div class="loading-spinner__dot"></div>
    <div class="loading-spinner__dot"></div>
    <div class="loading-spinner__dot"></div>
    <div class="loading-spinner__dot"></div>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    size: {
      type: [Number, String],
      default: '40px',
    },
    color: {
      type: String,
      default: 'primary',
    },
  },
};
</script>

<style scoped lang="scss">
.loading-spinner {
  position: relative;
  animation: loading-spinner 2.5s infinite linear both;

  &--primary {
    .loading-spinner__dot:before {
      @apply bg-primary;
    }
  }

  &--black {
    .loading-spinner__dot:before {
      @apply bg-black;
    }
  }

  &--white {
    .loading-spinner__dot:before {
      @apply bg-white;
    }
  }
}

.loading-spinner__dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: loading-spinner__dot 2.0s infinite ease-in-out both;
}

.loading-spinner__dot:before {
  content: '';
  display: block;
  width: 25%;
  height: 25%;
  background-color: #fff;
  border-radius: 100%;
  animation: loading-spinner__dot-before 2.0s infinite ease-in-out both;
}

.loading-spinner__dot:nth-child(1) {
  animation-delay: -1.1s;
}

.loading-spinner__dot:nth-child(2) {
  animation-delay: -1.0s;
}

.loading-spinner__dot:nth-child(3) {
  animation-delay: -0.9s;
}

.loading-spinner__dot:nth-child(4) {
  animation-delay: -0.8s;
}

.loading-spinner__dot:nth-child(5) {
  animation-delay: -0.7s;
}

.loading-spinner__dot:nth-child(6) {
  animation-delay: -0.6s;
}

.loading-spinner__dot:nth-child(1):before {
  animation-delay: -1.1s;
}

.loading-spinner__dot:nth-child(2):before {
  animation-delay: -1.0s;
}

.loading-spinner__dot:nth-child(3):before {
  animation-delay: -0.9s;
}

.loading-spinner__dot:nth-child(4):before {
  animation-delay: -0.8s;
}

.loading-spinner__dot:nth-child(5):before {
  animation-delay: -0.7s;
}

.loading-spinner__dot:nth-child(6):before {
  animation-delay: -0.6s;
}

@keyframes loading-spinner {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-spinner__dot {
  80%, 100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-spinner__dot-before {
  50% {
    transform: scale(0.4);
  }
  100%, 0% {
    transform: scale(1.0);
  }
}
</style>
