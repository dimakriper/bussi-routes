import L from "leaflet"

const DIVICON_F = L.divIcon({
    html: '<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 17C15.2091 17 17 15.2091 17 13C17 10.7909 15.2091 9 13 9C10.7909 9 9 10.7909 9 13C9 15.2091 10.7909 17 13 17Z" stroke="blue" stroke-width="2" stroke-miterlimit="10"/></svg>',
    iconAnchor: [15, 15],
    iconSize: [30, 30],
    className: "bus-stop-icon-forward"
})
const DIVICON_B = L.divIcon({
    html: '<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 17C15.2091 17 17 15.2091 17 13C17 10.7909 15.2091 9 13 9C10.7909 9 9 10.7909 9 13C9 15.2091 10.7909 17 13 17Z" stroke="red" stroke-width="2" stroke-miterlimit="10"/></svg>',
    iconAnchor: [15, 15],
    iconSize: [30, 30],
    className: "bus-stop-icon-backward"
})

export default {
    createStopMarker(busStop){
        if (busStop.Forward === true){
            return L.marker([busStop.Lat, busStop.Lon], {icon: DIVICON_F}).bindTooltip(busStop.Name);
        }
        else {
            return L.marker([busStop.Lat, busStop.Lon], {icon: DIVICON_B}).bindTooltip(busStop.Name);
        }
    }
}