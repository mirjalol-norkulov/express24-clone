<template>
  <div id="app">
    <Header/>
    <div class="container mx-auto">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue';

export default {
  components: { Header },
};
</script>
