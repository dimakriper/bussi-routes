<template>
  <div id=main-window>
     <sidebar class="sidebar-flex-1"></sidebar>
     <map-container class="map-flex-3" :map=lMap></map-container>
  </div>
</template>

<script>
import Sidebar from "@/views/sidebar";
import MapContainer from "@/components/MapContainer";
import {BusStopMap} from "@/leaflet-map/bussi-routes-map";

export default {
  name: "index",
  components: {MapContainer, Sidebar},
  data(){
    return {
      lMap : new BusStopMap(),
    }
  }
}
</script>

<style scoped>
/*
FIne with Flexbox API but why not Grid?
*/
#main-window {
  display: flex;
  flex-direction: row;
  height: 100vh;
}
.map-flex-3{
  flex: 3;
  min-width: 800px;
}
.sidebar-flex-1{
  flex: 1;
  min-width: 400px;
}
</style>