<template>

  <div style="height: 80vh">
    <ag-grid-vue
        style="width: 100%; height: 100%"
        :class="themeClass"
        :columnDefs="columnDefs"
        @grid-ready="onGridReady"
        :rowData="rowData"
        :autoSizeStrategy="autoSizeStrategy"
        pagination=true
        rowSelection='single'
        @rowSelected=onRowSelected
    ></ag-grid-vue>
  </div>

</template>

<script>
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'ag-grid-enterprise';
import { AgGridVue } from "ag-grid-vue";
import {eventBus} from "@/main";

export default {
  name: "StopsTable",
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [{ field: "Name", headerName: 'Остановка'}],
      rowData : null,

      gridApi: null,
      themeClass: "ag-theme-quartz",
      autoSizeStrategy: null,
    };
  },
  created() {
    this.autoSizeStrategy = {
      type: "fitGridWidth",
    };
  },
  mounted() {
    /*computed property will not detect array change so getting table data imperatively is better approach*/
    this.rowData = this.$store.getters.busStops;

  },
  beforeDestroy() {
    eventBus.$emit('clear-map')
  },
  methods: {
    onRowSelected(event) {
      const id = event.node.data.ID;
      if (event.node.selected){
        eventBus.$emit('pan-to-stop', id);
      }
    },
    onGridReady(params) {
      this.gridApi = params.api;
      eventBus.$emit('show-all-stops')
      window.addEventListener("resize", () => {
        setTimeout(() => {
          params.api.sizeColumnsToFit();

        });
      });
    },
  },
}
</script>

<style scoped>

</style>