import { latLng } from 'leaflet';
import axios from 'axios';

export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(latLng(position.coords.latitude, position.coords.longitude));
      }, (error) => {
        reject(error);
      });
    } else {
      reject(new Error('Geolocation not supported'));
    }
  });
}

export async function getAddressByLatLon(lat, lon) {
  const { data: { display_name: address } } = await axios.get(
    'https://nominatim.openstreetmap.org/reverse',
    {
      params: {
        lat,
        lon,
        format: 'json',
      },
    },
  );
  return address;
}
