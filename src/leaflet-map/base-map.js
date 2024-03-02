/*
Base map constructor
Can be further extended for any purposes
Only tile layer
* */

import L from 'leaflet';
import store from "@/store";

const BASE_URL = "http://api.probki.net/map/{z}/{x}/{y}"
const BASE_ATTRIBUTION = "\"Map data &copy; <a href='http://probki.net/b2b'>Geophone OY</a>"

export class BaseMap {
    init(el, options) {
        const center = options?.center ?? store.getters.getMapCenter
        const zoom = options?.zoom ?? 7
        const minZoom = options?.minZoom ?? 2
        const maxZoom = options?.maxZoom ?? 20
        this.currentMapsURL = options?.url ?? BASE_URL; // in case if it can be changed

        this.map = L.map(el).setView(center, zoom);

        this.mainLayer = L.tileLayer(this.currentMapsURL, {
            minZoom: minZoom,
            maxZoom: maxZoom,
            attribution: options?.attribution ?? BASE_ATTRIBUTION
        }).addTo(this.map);
    }
}