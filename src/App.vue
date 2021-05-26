<template>
  <div class="flex flex-col min-h-screen" id="app">
    <Header/>
    <div class="container mx-auto flex-1">
      <router-view/>
    </div>
    <sign-in-modal :visible="isLoginModalVisible" @close="isLoginModalVisible = false"/>
    <sign-up-modal :visible="isSignUpModalVisible" @close="isSignUpModalVisible=false"/>

    <e-footer/>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue';
import SignUpModal from '@/components/auth/SignUpModal.vue';
import SignInModal from '@/components/auth/SingInModal.vue';
import EFooter from '@/components/layout/EFooter.vue';

export default {
  components: {
    EFooter,
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
  mounted() {
    this.removePreloader();
  },
  methods: {
    removePreloader() {
      if (document) {
        const preloader = document.querySelector('#preloader');
        if (preloader) {
          preloader.remove();
        }
      }
    },
  },
};
</script>
