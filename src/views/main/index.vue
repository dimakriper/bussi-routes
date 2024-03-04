<template>
  <div>
    <loader v-if="!dataIsLoaded" object="#ff9633" color1="#ffffff" color2="#17fd3d" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="80" name="circular"></loader>
    <div v-else-if="dataIsLoaded" id=main-window>
      <sidebar class="sidebar-flex-1"></sidebar>
      <map-container class="map-flex-3" :map=lMap></map-container>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/views/sidebar";
import MapContainer from "@/components/MapContainer";
import {BusStopMap} from "@/leaflet-map/bussi-routes-map";
import {eventBus} from "@/main";

export default {
  name: "Main",
  components: {MapContainer, Sidebar},
  data(){
    return {
      lMap : new BusStopMap(),
    }
  },
  computed: {
    dataIsLoaded(){
      return this.$store.state.isReady;
    }
  },
  created() {
    if (this.$store.state.busRoutes.length > 0){
      this.$store.commit('setReadyStatus', true);
    }
    else {
      this.$store.dispatch("getRoutes")
    }
  },
}
</script>

<style >
/*
FIne with Flexbox API but why not Grid?
*/
#main-window {
  display: flex;
  flex-direction: row;
  height: 100vh;
  padding-top: 10px;
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