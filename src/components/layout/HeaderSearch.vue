<template>
  <div class="header-search">
    <div class="header-search__input">
      <input
        class="outline-none text-black placeholder-gray-200 flex-1"
        type="text"
        placeholder="Qidiruv">
      <search-icon class="w-4 h-4 text-gray-400"/>
    </div>
  </div>
</template>

<script>
import SearchIcon from '@/assets/icons/svg/search.svg';

export default {
  name: 'HeaderSearch',
  components: { SearchIcon },
};
</script>

<style lang="scss">
.header-search {
  &__input {
    @apply bg-white relative flex items-center border rounded-lg px-3 py-2.5 text-sm w-full z-50;
  }

  &::after {
    @apply block fixed inset-0 w-screen h-screen z-40 pointer-events-none opacity-0;
    content: "";
    background: rgba(0, 0, 0, 0.4);
    transition: opacity 0.3s;
  }

  &:focus-within::after {
    @apply pointer-events-auto opacity-100;
  }
}
</style>
