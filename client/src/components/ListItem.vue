<template>
    <li @click="toggleDetail(item._id)">{{item.name}}</li>
</template>

<script>
export default {
    props: ['item'],
    methods: {
        toggleDetail(id) {
            this.$store.commit('setCurrentId', id);
            this.$store.commit('setDetailToggle')
        }
    }
}
</script>

<style scoped>
li {
  display: block;
  border: 1px solid #ecf0f1;
  color: #ecf0f1;
  padding: 1rem;
  font-weight: bold;
  background: #e74c3c;
  margin: 0 10px;
}
li:hover {
    cursor: pointer;
    background: #c0392b;
}
</style>
