<template>
  <div id="app">
    <Header/>
    <div class="container mx-auto">
      <router-view/>
    </div>
    <sign-in-modal :visible="isLoginModalVisible" @close="isLoginModalVisible = false"/>
    <sign-up-modal :visible="isSignUpModalVisible" @close="isSignUpModalVisible=false"/>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue';
import SignInModal from '@/components/auth/SingInModal.vue';
import SignUpModal from '@/components/auth/SignUpModal.vue';

export default {
  components: {
    SignUpModal,
    SignInModal,
    Header,
  },
  computed: {
    isLoginModalVisible: {
      get() {
        return this.$route.query.modal === 'sign-in';
      },
      set(value) {
        const { query } = this.$route;
        this.$router.replace({
          name: this.$route.name,
          params: this.$route.params,
          query: {
            ...query,
            modal: value ? 'sign-in' : undefined,
          },
        });
      },
    },
    isSignUpModalVisible: {
      get() {
        return this.$route.query.modal === 'sign-up';
      },
      set(value) {
        this.$router.replace({
          name: this.$route.name,
          params: this.$route.params,
          query: {
            ...this.$route.query,
            modal: value ? 'sign-up' : undefined,
          },
        });
      },
    },
  },
};
</script>
