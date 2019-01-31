<template>
  <ul>
    <ListItem :key="item._id" v-for="item in items" :item="item" />
  </ul>
</template>

<script>
import ListItem from './ListItem'
export default {
  name: 'List',
  components: {
    ListItem
  },
  props: {
    items: Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
</style>
