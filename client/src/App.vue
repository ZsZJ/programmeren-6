<template>
  <div id="app">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
    
    <!-- Title -->
    <h1>Mooi webservice lijstje voor Bas</h1>
    <h2> - xoxo Joey</h2>
    
    <!-- Data overview -->
    <List :items="this.data.items" />
    
    <!-- Detail Page -->
    <transition name="slide">
      <Detail v-if="this.detailShow" />
    </transition>
  
  </div>
</template>

<script>
import List from './components/List.vue'
import Detail from './components/Detail.vue'
import { mapState } from 'vuex'

export default {
  name: 'app',
  created() {
    this.$store.dispatch('loadApiData')
  },
  computed: mapState([
    'data',
    'detailShow',
    'currentItemId'
  ]),
  components: {
    List,
    Detail
  }
}
</script>

<style>
body {
  background: #ecf0f1;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin: 0 auto;
}
</style>
