import L from "leaflet"

import {BaseMap} from "./base-map";
import store from "@/store";

export class BusStopMap extends BaseMap{
    constructor() {
        super();
        this.busStopPoints = L.layerGroup()
        this.busRoute = L.layerGroup()
    }
    init(el) {
        super.init(el);
    }
}