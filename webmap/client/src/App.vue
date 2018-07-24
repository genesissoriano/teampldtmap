<template>
  <v-app dark>
    <div id="app">
      <app-header></app-header>
      <keep-alive>
        <router-view/>
      </keep-alive>
  </div>
  </v-app>
</template>

<script>
import Header from './components/header.vue'
export default {
  components: {
    'app-header': Header
  },
  name: 'App'
}
</script>
<style <style lang="sass">
#app 
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  text-align: center
  margin-top: 0rem !important
</style>
