import L from "leaflet"
import "leaflet-polylineoffset"

export default {
    routeForward(latlons){
        return L.polyline(latlons, {color: "blue", weight: 3, opacity: 1, offset: 3})
    },
    routeBackward(latlons){
        return L.polyline(latlons, {color: "red", weight: 3, offset: 3})
    },
    getLatlons(rPoints){
        const forwardPts = rPoints.filter((pt) => pt.Forward === true)
        const backwardPts = rPoints.filter((pt) => pt.Forward === false)
        return {
            forward: forwardPts.map((pt) => [pt.Lat, pt.Lon]),
            backward: backwardPts.map((pt) => [pt.Lat, pt.Lon])
        };
    }
}