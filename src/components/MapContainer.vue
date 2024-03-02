<template>
  <div id="map-container" ref="map-container"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";

export default {
  props: ['map'],
  mounted() {
    this.map.init(this.$refs["map-container"]);
  },
};
</script>

<style scoped>
#map-container {
  border: solid 1px dimgray;
  height: 100%;
}
</style>