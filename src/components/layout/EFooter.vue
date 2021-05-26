<template>
  <footer class="bg-black text-white">
    <div class="container mx-auto pt-6 pb-24">
      <div class="flex">
        <div class="mr-12">
          <p class="inline-block text-sm"> &copy; {{ year }} Express 24</p>
          <div class="flex justify-between mt-5">
            <a class="footer__link" href="https://www.facebook.com/express24uz/" target="_blank">
              <facebook-icon class="w-4 h-4"/>
            </a>
            <a class="footer__link" href="https://www.instagram.com/express24uz/" target="_blank">
              <instagram-icon class="w-4 h-4"/>
            </a>
            <a class="footer__link" href="https://t.me/mytaxiexpress" target="_blank">
              <telegram-icon class="w-4 h-4"/>
            </a>
          </div>
        </div>
        <div>
          <section>
            <a href="#" class="footer__link footer__link--underline ml-4">
              {{ $t('aboutUs') }}
            </a>
            <a href="#" class="footer__link footer__link--underline ml-4">
              {{ $t('userAgreement') }}
            </a>
            <a href="#" class="footer__link footer__link--underline ml-4">
              {{ $t('contacts') }}
            </a>
          </section>
          <section class="mt-4">
            <a href="#" class="footer__link footer__link--underline ml-4">
              {{ $t('faq') }}
            </a>
            <a href="#" class="footer__link footer__link--underline ml-4">
              {{ $t('cooperation') }}
            </a>
          </section>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import FacebookIcon from '@/assets/icons/svg/facebook.svg';
import InstagramIcon from '@/assets/icons/svg/instagram.svg';
import TelegramIcon from '@/assets/icons/svg/telegram.svg';

export default {
  name: 'EFooter',
  components: {
    FacebookIcon,
    InstagramIcon,
    TelegramIcon,
  },
  computed: {
    year() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped lang="scss">
.footer {
  &__link {
    @apply inline-block text-gray-300 transition-colors duration-300 text-sm;

    &:hover {
      @apply text-white;
    }

    &--underline {
      @apply transition-all duration-300 border-b border-solid border-white border-opacity-0;

      &:hover {
        @apply border-opacity-100;
      }
    }
  }
}
</style>
