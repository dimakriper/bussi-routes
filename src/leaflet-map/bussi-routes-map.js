import L from "leaflet"

import {eventBus} from "@/main";
import {BaseMap} from "./base-map";
import busRoutes from "@/leaflet-map/busRoutes";
import store from "@/store";
import busStops from "@/leaflet-map/busStops";

export class BusStopMap extends BaseMap{
    constructor() {
        super();
        this.stopMarkersLG = L.layerGroup()
        this.routesLG = L.layerGroup()
        this.activeRoute = []
    }
    init(el) {
        super.init(el);
        this.routesLG.addTo(this.map)
        this.stopMarkersLG.addTo(this.map)
        eventBus.$off('route-selected-from-table');
        eventBus.$on('route-selected-from-table', (id)=> {
            this.onRouteSelected(id)
        });
        // eventBus.$off('route-deselected-from-table');
        // eventBus.$on('route-deselected-from-table', (id)=> {
        //     this.clearAll()
        // });
    }
    onRouteSelected(id){
        this.clearAll();

        const route = store.getters.routeById(id);

        //creating stop markers
        const routeStops = route.Stops;

        routeStops.forEach(pt => {
            const stopMarker = busStops.createStopMarker(pt);
            stopMarker.addTo(this.stopMarkersLG);
        })

        //creating route polylines
        const pts = route.Points;
        const latlons = busRoutes.getLatlons(pts)

        if (latlons.forward.length > 0){
            const routeForward = busRoutes.routeForward(latlons.forward)
            routeForward.bindTooltip(route.Description, {sticky: true})
            routeForward.addTo(this.routesLG)
            this.map.fitBounds(routeForward.getBounds())
        }

        if (latlons.backward.length > 0){
            const routeBackward = busRoutes.routeBackward(latlons.backward)
            routeBackward.bindTooltip(route.Description, {sticky: true})
            routeBackward.addTo(this.routesLG)
            this.map.fitBounds(routeBackward.getBounds())
        }
    }
    clearAll(){
        this.routesLG.clearLayers();
        this.stopMarkersLG.clearLayers();
    }
}