<template>
  <e-modal v-bind="$attrs" v-on="$listeners">
    <div class="px-4 py-8">
      <h1 class="text-4xl font-bold text-black text-center">{{ $t('auth.signUp') }}</h1>
    </div>
  </e-modal>
</template>

<script>
import EModal from '@/components/ui/EModal.vue';

export default {
  name: 'SignUpModal',
  components: { EModal },
};
</script>

<style scoped>

</style>
