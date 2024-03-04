import L from "leaflet"

export default {
    createStopMarker(busStop){
        if (busStop.Forward === true){
            return L.circleMarker([busStop.Lat, busStop.Lon], {color: 'blue', weight: 3}).bindTooltip(busStop.Name);
        }
        else {
            return L.circleMarker([busStop.Lat, busStop.Lon], {color: 'red', weight: 3}).bindTooltip(busStop.Name);
        }
    }
}