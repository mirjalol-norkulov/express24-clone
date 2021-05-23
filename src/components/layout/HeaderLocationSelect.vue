<template>
  <div>
    <button class="flex items-center focus:outline-none" @click="isModalVisible = true">
      <direction-icon class="w-9 h-9 text-lightgreen"/>
      <span
        class="text-sm ml-3 truncate"
        style="max-width: 120px;"
        :title="currentLocation ? currentLocation.address : $t('noAddressSpecified')"
      >
        <template v-if="currentLocation">
          {{ currentLocation.address }}
        </template>
        <template v-else>{{ $t('noAddressSpecified') }}</template>
      </span>
    </button>
    <e-modal
      width="95vw"
      :visible="isModalVisible"
      show-close
      @close="isModalVisible = false">
      <location-input-box
        class="absolute top-4 left-1/2 transform -translate-x-1/2 z-1000 w-5/12"
        @select="onLocationSelect"/>
      <l-map
        ref="map"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        style="height: 70vh;"
        @update:center="onMapCenterUpdate"
        @ready="onMapReady">
        <l-tile-layer
          :url="url"
          :attribution="attribution"
        />
        <l-marker
          :lat-lng="markerPosition"
          :icon="icon"
        />
      </l-map>

      <e-button class="location-select__current" circle @click="handleGetCurrentLocation">
        <cursor-icon class="w-5 h-5"/>
      </e-button>

      <div class="location-select__bottom">
        <p class="text-center text-xl mb-3">{{ address }}</p>
        <e-button color="primary" @click="handleConfirmAddress">
          {{ $t('confirmAddress') }}
        </e-button>
      </div>
    </e-modal>
  </div>
</template>

<script>
import { latLng, icon } from 'leaflet';
import { mapState, mapMutations } from 'vuex';

import CursorIcon from '@/assets/icons/svg/cursor.svg';
import DirectionIcon from '@/assets/icons/svg/direction.svg';

import EModal from '@/components/ui/EModal.vue';
import EButton from '@/components/ui/EButton.vue';
import LocationInputBox from '@/components/layout/LocationInputBox.vue';

import { getCurrentLocation, getAddressByLatLon } from '@/utils/geolocation';

export default {
  name: 'HeaderLocationSelect',
  components: {
    EButton,
    LocationInputBox,
    DirectionIcon,
    CursorIcon,
    EModal,
  },
  data() {
    return {
      isModalVisible: false,
      map: undefined,
      center: latLng(41.311081, 69.240562),
      markerPosition: latLng(41.311081, 69.240562),
      zoom: 13,
      mapOptions: {
        zoomSnap: 0.5,
      },
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      icon: icon({
        iconUrl: '/img/pin.png',
        iconSize: [48, 48],
        iconAnchor: [24, 48],
      }),
      address: '',
    };
  },
  computed: {
    ...mapState(['currentLocation']),
  },
  watch: {
    center: {
      immediate: true,
      async handler(value) {
        this.markerPosition = value;
        this.address = await getAddressByLatLon(this.center.lat, this.center.lng);
      },
    },
  },
  async created() {
    if (!this.currentLocation) {
      this.center = await getCurrentLocation();
      this.address = await getAddressByLatLon(this.center.lat, this.center.lng);
      this.setCurrentLocation({
        latitude: this.center.lat,
        longitude: this.center.lng,
        address: this.address,
      });
    }
  },
  methods: {
    ...mapMutations({
      setCurrentLocation: 'SET_CURRENT_LOCATION',
    }),
    handleConfirmAddress() {
      this.setCurrentLocation({
        latitude: this.center.lat,
        longitude: this.center.lng,
        address: this.address,
      });
      this.isModalVisible = false;
    },
    async handleGetCurrentLocation() {
      this.center = await getCurrentLocation();
      this.zoom = 17;
    },
    onMapCenterUpdate(center) {
      this.center = center;
    },
    onMapReady() {
      this.map = this.$refs.map.mapObject;
      this.map.on('move', () => {
        this.markerPosition = this.map.getCenter();
      });
    },
    onLocationSelect(location) {
      this.center = latLng(location.lat, location.lon);
    },
  },
};
</script>

<style lang="scss">
.location-select {
  &__bottom {
    @apply absolute bottom-2 left-1/2 transform -translate-x-1/2 z-1000 flex flex-col items-center;
  }

  &__current {
    @apply absolute right-4 bottom-16 z-1000;
  }
}
</style>
