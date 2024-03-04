/*
Base map constructor
Can be further extended for any purposes
Only tile layer
* */

import L from 'leaflet';
import store from "@/store";

const BASE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
const BASE_ATTRIBUTION = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

export class BaseMap {
    init(el, options) {
        const center = options?.center ?? store.getters.mapCenter
        const zoom = options?.zoom ?? 8
        const minZoom = options?.minZoom ?? 5
        const maxZoom = options?.maxZoom ?? 19
        const preferCanvas = true;
        this.currentMapsURL = options?.url ?? BASE_URL; // in case if it can be changed

        this.map = L.map(el, {preferCanvas: preferCanvas}).setView(center, zoom);

        this.mainLayer = L.tileLayer(this.currentMapsURL, {
            minZoom: minZoom,
            maxZoom: maxZoom,
            attribution: options?.attribution ?? BASE_ATTRIBUTION
        }).addTo(this.map);
    }
}