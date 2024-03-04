<template>

  <div style="height: 80vh">
      <ag-grid-vue
          style="width: 100%; height: 100%"
          :class="themeClass"
          :columnDefs="columnDefs"
          @grid-ready="onGridReady"
          :rowData="rowData"
          :autoSizeStrategy="autoSizeStrategy"
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
  name: "RoutesTable",
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [{ field: "Description", headerName: 'Маршрут' }],
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
    this.rowData = this.$store.state.busRoutes;
  },
  beforeDestroy() {
    eventBus.$emit('clear-map')
  },
  methods: {
    onRowSelected(event) {
      const id = event.node.data.ID;
      if (event.node.selected){
        eventBus.$emit('route-selected-from-table', id);
      }
      else {
        eventBus.$emit('route-deselected-from-table', id);
      }
    },
    onGridReady(params) {
      this.gridApi = params.api;

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