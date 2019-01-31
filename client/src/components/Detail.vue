<template>
    <div class="detail">
        <i @click="this.toggleDetail" class="fas fa-times"></i>
        <h1>{{ this.item.name }}</h1>
        <h2>Age: {{ this.item.age }}</h2>
        <p>{{this.item.description}}</p>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import swal from 'sweetalert';


export default {
    created() {
        this.item = this.$store.getters.getItemById(this.currentItemId)
    },
    data() {
        return {
            item: Object
        }
    },
    computed: mapState([
        'currentItemId'
    ]),
    methods: {
        toggleDetail() {
            this.$store.commit('setDetailToggle')
        }
    }
}
</script>

<style scoped>
    .detail {
        position: fixed;
        top: 0;
        left: 0;
        background: #34495e;
        width: 100%;
        color: #fff;
        height: 100%;
        overflow: hidden;
        text-align: center;
    }

    .fas.fa-times {
        position: absolute;
        right: 15px;
        top: 15px;
        color: #3498db;
        font-weight: bold;
        font-size: 3rem;
    }

    .fas.fa-times:hover {
        cursor: pointer;
        color: #fff;
        -webkit-animation:spin .3s linear;
        -moz-animation:spin .3s linear;
        animation:spin .3s linear;
    }
    p {
        font-size: 1.3rem;
        width: 50%;
        margin: 0 auto;
    }

    @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
    @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
    @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }

    .slide-enter-active, .slide-leave-active {
        transition: height .5s;
    }
    .slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
        height: 0;
    }
</style>

