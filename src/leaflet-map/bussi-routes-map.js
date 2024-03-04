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
        this.Stops = [];
        this.Routes = [];
    }
    init(el) {
        super.init(el);
        this.routesLG.addTo(this.map)
        this.stopMarkersLG.addTo(this.map)
        eventBus.$off('route-selected-from-table');
        eventBus.$on('route-selected-from-table', (id)=> {
            this.onRouteSelected(id)
        });
        eventBus.$off('route-deselected-from-table');
        eventBus.$on('route-deselected-from-table', (id)=> {
            this.removeRoutes([id]);
            this.removeStops([id]);
        });
        // eventBus.$off('show-all-stops');
        // eventBus.$on('show-all-stops', ()=> {
        //     this.showAllStops();
        // });
        // eventBus.$off('pan-to-stop');
        // eventBus.$on('pan-to-stop', (id)=> {
        //     this.panToStop(id);
        // });
    }
    onRouteSelected(id){
        // this.clearLayers();

        const route = store.getters.routeById(id);
        let currentRoute = {route: route, layers: {forward: null, backward: null}}

        //creating stop markers
        const routeStops = route.Stops;

        routeStops.forEach(pt => {
            const stopMarker = busStops.createStopMarker(pt);
            stopMarker.addTo(this.stopMarkersLG);
            this.Stops.push({stop: pt, marker: stopMarker})
        })

        //creating route polylines
        const pts = route.Points;
        const latlons = busRoutes.getLatlons(pts)

        if (latlons.forward.length > 0){
            const routeForward = busRoutes.routeForward(latlons.forward)
            routeForward.bindTooltip(route.Description, {sticky: true})
            routeForward.addTo(this.routesLG)
            this.map.fitBounds(routeForward.getBounds())
            currentRoute.layers.forward = routeForward
        }

        if (latlons.backward.length > 0){
            const routeBackward = busRoutes.routeBackward(latlons.backward)
            routeBackward.bindTooltip(route.Description, {sticky: true})
            routeBackward.addTo(this.routesLG)
            this.map.fitBounds(routeBackward.getBounds())
            currentRoute.layers.backward = routeBackward
        }
        this.Routes.push(currentRoute);

    }
    clearLayers(){
        this.routesLG.clearLayers();
        this.stopMarkersLG.clearLayers();
    }
    removeRoutes(ids=[]){
        let rmIndexes = []
        if (ids.length > 0){
            this.Routes.forEach(rt => {
                if (ids.includes(rt.route.ID)){
                    rt.layers.forward?.removeFrom(this.routesLG);
                    rt.layers.backward?.removeFrom(this.routesLG);
                    rmIndexes.push(this.Routes.indexOf(rt))
                }
            })
        }
        else {
            this.Routes.forEach(rt => {
                rt.layers.forward?.removeFrom(this.routesLG);
                rt.layers.backward?.removeFrom(this.routesLG);
                rmIndexes.push(this.Routes.indexOf(rt))
            })
        }
        rmIndexes.forEach(index => {
            this.Routes.splice(index, 1);
        })

    }
    removeStops(routeIds=[]){
        let rmIndexes = []
        if (routeIds.length > 0){
            this.Stops.forEach(pt => {
                if (routeIds.includes(pt.stop.routeID)){
                    pt.marker.removeFrom(this.stopMarkersLG);
                    rmIndexes.push(this.Stops.indexOf(pt))
                }
            })
        }
        this.Stops.forEach(pt => {
            pt.marker.removeFrom(this.stopMarkersLG);
            rmIndexes.push(this.Stops.indexOf(pt))
        })
        rmIndexes.forEach(index => {
            this.Stops.splice(index, 1);
        })

    }
}