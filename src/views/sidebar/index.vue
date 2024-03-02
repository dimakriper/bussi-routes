<template>
  <div class="sidebar">
    <ul class="nav justify-content-center nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="pills-routes-tab" data-bs-toggle="pill" data-bs-target="#pills-routes" type="button" role="tab" aria-controls="pills-routes" aria-selected="true">Маршруты</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="pills-bus-stops-tab" data-bs-toggle="pill" data-bs-target="#pills-bus-stops" type="button" role="tab" aria-controls="pills-bus-stops" aria-selected="false">Остановки</button>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div class="tab-pane fade show active" id="pills-routes" role="tabpanel" aria-labelledby="pills-routes-tab">
        <table-ad-grid></table-ad-grid>
      </div>
      <div class="tab-pane fade" id="pills-bus-stops" role="tabpanel" aria-labelledby="pills-bus-stops-tab">ИИИИИИИИИИИИ</div>
    </div>
  </div>
</template>

<script>
import TableAdGrid from "@/views/sidebar/TableAdGrid";

export default {
  name: "Sidebar",
  components: {TableAdGrid},
  methods: {
  },

}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
}

</style>