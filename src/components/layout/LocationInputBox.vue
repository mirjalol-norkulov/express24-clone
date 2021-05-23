<template>
  <div v-bind="$attrs">
    <div class="location-input-box">
      <e-input
        variant="border"
        :placeholder="$t('search')"
        :loading="loading"
        class="w-full"
        v-model="searchQuery"
        @input="search">
        <search-icon slot="suffix" class="w-4 h-4 text-black"/>
      </e-input>
      <div class="location-input-box__results">
        <div
          v-for="result in searchResults"
          :key="result.place_id"
          class="location-input-box__result-item"
          @click="onItemClick(result)">
          {{ result.display_name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EInput from '@/components/ui/EInput.vue';
import SearchIcon from '@/assets/icons/svg/search.svg';
import axios from 'axios';
import debounce from '@/utils/debounce';

export default {
  name: 'LocationInputBox',
  components: {
    EInput,
    SearchIcon,
  },
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      loading: false,
    };
  },
  methods: {
    search: debounce(async function search() {
      if (!this.searchQuery) {
        this.searchResults = [];
        return;
      }

      try {
        this.loading = true;
        const { data } = await axios.get(
          'https://nominatim.openstreetmap.org/search',
          {
            params: {
              q: this.searchQuery,
              format: 'json',
            },
          },
        );
        this.searchResults = data;
      } finally {
        this.loading = false;
      }
    }, 300),
    onItemClick(item) {
      this.searchResults = [];
      this.searchQuery = '';
      this.$emit('select', item);
    },
  },
};
</script>

<style scoped lang="scss">
.location-input-box {
  &__results {
    @apply rounded-lg bg-white mt-1 max-h-72 overflow-y-auto;
    @extend .custom-scrollbar;
  }

  &__result-item {
    @apply px-2 py-2 text-sm border-b border-gray-100 cursor-pointer;

    &:first-child {
      @apply rounded-t-lg;
    }

    &:last-child {
      @apply rounded-b-lg;
    }

    &:hover {
      @apply bg-gray-100;
    }
  }
}
</style>
