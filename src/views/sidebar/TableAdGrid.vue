<template>

  <div style="display: flex; flex-direction: row; height: 100%;">
    <div style=" overflow: hidden; flex-grow: 1">
      <ag-grid-vue
          style="width: 100%; "
          :class="themeClass"
          :columnDefs="columnDefs"
          @grid-ready="onGridReady"
          :rowData="rowData"
          :autoSizeStrategy="autoSizeStrategy"
          domLayout='autoHeight'
      ></ag-grid-vue>
    </div>
  </div>

</template>

<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridVue } from "ag-grid-vue";

export default {
  name: "TableAdGrid",
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [{ field: "make" }, { field: "model" }, { field: "price" }],
      gridApi: null,
      themeClass: "ag-theme-quartz",

      rowData: null,
      autoSizeStrategy: null,
    };
  },
  created() {
    this.rowData = [
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxster", price: 72000 },
    ];
    this.autoSizeStrategy = {
      type: "fitGridWidth",
    };
  },
  methods: {
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