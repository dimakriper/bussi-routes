<template>
  <div >
    <div>
      <ul class="nav nav-tabs mb-5">
        <li class="nav-item">
          <router-link :to="{name: 'routes'}" class="nav-link" :active-class="'active'" :tag="'a'">Маршруты</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'stops'}" class="nav-link" :active-class="'active'" :tag="'a'">Остановки</router-link>
        </li>
      </ul>
    </div>
    <router-view name="sidebarView"></router-view>
  </div>
</template>

<script>

export default {
  name: "Sidebar",
  data(){
    return {

    }
  },
  methods: {
  },

}
</script>

<style scoped>

</style>