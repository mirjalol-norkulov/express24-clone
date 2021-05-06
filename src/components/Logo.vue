<template>
  <logo-icon v-bind="$attrs" v-on="$listeners"/>
</template>

<script>
import LogoIcon from '@/assets/icons/svg/logo.svg';

export default {
  name: 'Logo',
  components: { LogoIcon },
};
</script>

<style>
.st1 {
  fill: #ffec00
}

.st2 {
  fill: #8cc798
}

.st3 {
  fill: #4fa26c
}

.st6 {
  fill: #ffcb00
}

.st7 {
  fill: #ee7c00
}

</style>
