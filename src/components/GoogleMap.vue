<template>
    <div>
        <label class="col-span-2 block text-sm font-medium text-gray-700">
            Street
            <input
                class="block mt-1 w-full text-sm placeholder-gray-400 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                type="text" @input="updateStreet($event.target.value)" v-model="street" ref="streetRef"
                placeholder="Street" />
        </label>
        <button @click="geocodeAndAddMarker">Add Marker</button>
        <GoogleMap :api-key="apiKey" style="width: 100%; height: 500px" :center="center" :zoom="15"
            @click="addMarkerOnClick">
            <Marker v-for="(marker, index) in markers" :key="index" :options="marker" />
            <InfoWindow :options="infoWindowOptions" v-if="selectedMarkerIndex !== null">
                <div>{{ markers[selectedMarkerIndex].label }}</div>
            </InfoWindow>
        </GoogleMap>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase';

const apiKey = 'AIzaSyDqeb1swh-yBkGdrdxA25yKH0uGuludNj8';
const center = ref({ lat: 25.04666071288652, lng: 121.51814358455428 });
const markers = ref([]);
const street = ref('');
const streetRef = ref(null);
let autocomplete;
const selectedMarkerIndex = ref(null);
const infoWindowOptions = ref({ position: { lat: 0, lng: 0 } });

const updateStreet = (value) => street.value = value;

onMounted(() => {
    autocomplete = new google.maps.places.Autocomplete(streetRef.value, {
        types: ['restaurant'] // 指定类型为餐厅
    });

    google.maps.event.addListener(autocomplete, "place_changed", () => {
        const place = autocomplete.getPlace();
        updateStreet(place.name); // 使用店家名称作为输入框的值
    });

    loadMarkers();
});

onUnmounted(() => {
    if (autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete);
    }
});

const geocodeAndAddMarker = () => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: street.value }, async (results, status) => {
        if (status === 'OK') {
            const location = results[0].geometry.location;
            const newMarker = {
                position: { lat: location.lat(), lng: location.lng() },
                label: street.value,
                title: street.value
            };
            markers.value.push(newMarker);
            center.value = { lat: location.lat(), lng: location.lng() };

            try {
                await addDoc(collection(db, 'locations'), {
                    lat: location.lat(),
                    lng: location.lng(),
                    description: street.value,
                });
            } catch (e) {
                console.error('Error adding document: ', e);
            }

            street.value = '';
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
};

const addMarkerOnClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const newMarker = {
        position: { lat, lng },
        label: 'New Marker',
        title: 'New Marker'
    };
    markers.value.push(newMarker);

    try {
        await addDoc(collection(db, 'locations'), {
            lat,
            lng,
            description: 'New Marker'
        });
    } catch (e) {
        console.error('Error adding document: ', e);
    }
};

const selectMarker = (index) => {
    selectedMarkerIndex.value = index;
    infoWindowOptions.value.position = markers.value[index].position;
};

const loadMarkers = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'locations'));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const newMarker = {
                position: { lat: data.lat, lng: data.lng },
                label: data.description,
                title: data.description
            };
            markers.value.push(newMarker);
        });
    } catch (e) {
        console.error('Error getting documents: ', e);
    }
};
</script>

<style>
/* Add your styles here */
</style>