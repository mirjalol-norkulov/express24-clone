<template>
  <div>
    <button class="flex items-center focus:outline-none" @click="isModalVisible = true">
      <direction-icon class="w-9 h-9 text-lightgreen"/>
      <span class="text-sm ml-3">Адрес не указан</span>
    </button>
    <e-modal
      :visible="isModalVisible"
      show-close
      @close="isModalVisible = false">
      <h1>This is modal!</h1>
    </e-modal>
  </div>
</template>

<script>
import DirectionIcon from '@/assets/icons/svg/direction.svg';
import EModal from '@/components/ui/EModal.vue';

export default {
  name: 'HeaderLocationSelect',
  components: {
    DirectionIcon,
    EModal,
  },
  data() {
    return {
      isModalVisible: false,
    };
  },
};
</script>

<style scoped>

</style>
