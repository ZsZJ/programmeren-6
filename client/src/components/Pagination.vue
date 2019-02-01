<template>
    <ul v-if="this.data" class="pagination">
        <li :key="n" v-for="n in getTotalItems()">
            <a @click="setPage(n)" href="#">{{n}}</a>
        </li>
    </ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: ['items'],
    computed: mapState([
        'data',
        'currentPage'
    ]),
    methods: {
        setPage(number) {
            this.$store.commit('setCurrentPage', number)
        },
        getTotalItems() {
            return Math.ceil(this.data.items.length / 5)
        }
    }
}
</script>

<style>
    .pagination {
        display: inline-block;
        padding-left: 0;
        margin: 20px 0;
        border-radius: 4px;
    }
    .pagination > li {
        display: inline-block;
    }
    .pagination > li > a {
        position: relative;
        float: left;
        padding: 6px 12px;
        margin-left: -1px;
        line-height: 1.42857143;
        color: #337ab7;
        text-decoration: none;
        background-color: #fff;
        border: 1px solid #ddd;
    }
</style>
