<template>
    <div class="detail">
        <i @click="this.toggleDetail" class="fas fa-times"></i>
        <i @click="this.toggleEdit" class="fas fa-edit"></i>
        <i @click="this.toggleDelete" class="fas fa-trash"></i>
        <h1>{{ this.item.name }}</h1>
        <h2>Age: {{ this.item.age }}</h2>
        <p>{{this.item.description}}</p>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
    created() {
        this.item = this.$store.getters.getItemById(this.currentItemId)
    },
    data() {
        return {
            item: Object,
            audio: false
        }
    },
    computed: mapState([
        'currentItemId',
        'audioToggle'
    ]),
    methods: {
        toggleDetail() {
            this.$store.commit('setDetailToggle')
        },
        toggleEdit() {
            Swal.mixin({
                confirmButtonText: 'Next &rarr;',
                showCancelButton: true,
                progressSteps: ['1', '2', '3'],
                backdrop: `
                rgba(0,0,123,0.4)
                url("https://sweetalert2.github.io/images/nyan-cat.gif")
                center left
                no-repeat
                `
            })
            .queue([
                {
                    title: 'Not satisfied with the name?',
                    text: 'Get your life together...',
                    input: 'text',
                    inputValue: this.item.name,
                    inputValidator: (value) => {
                        return !value && 'Artist without name? Interesting...'
                    },
                    onOpen: this.$store.commit('setAudioToggle'),
                    onAfterClose: () => {this.$store.commit('setAudioToggle')}
                },
                {
                    title: 'HAHAHA did the artist age?',
                    text: 'Sorry im not that good in programming',
                    input: 'text',
                    inputValue: this.item.age,
                    inputValidator: (value) => {
                        return !value && 'Please tell me how old...'
                    },
                    onAfterClose: () => {this.$store.commit('setAudioToggle')}
                },
                {
                    title: 'Some more juicy information?',
                    text: 'e.g 七輪 means a mini bbq grill!',
                    input: 'textarea',
                    inputValue: this.item.description,
                    inputValidator: (value) => {
                        return !value && 'Please write something nice.'
                    },
                    onAfterClose: () => {this.$store.commit('setAudioToggle')}
                },
            ])
            .then((result) => {
                if (result.value) {
                    this.$store.dispatch('editApiDetail', result.value)
                    Swal.fire({
                        title: 'Update done!',
                        type: 'success',
                        confirmButtonText: 'Im cool!',
                        backdrop: `rgba(0,0,123,0.4)
                        url("https://sweetalert2.github.io/images/nyan-cat.gif")
                        center left
                        no-repeat`,
                        onAfterClose: () => {this.$store.commit('setAudioToggle')}
                    })
                }
            })
        },
        toggleDelete() {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.value) {
                    Swal.fire(
                    'Deleted!',
                    'Your item has been deleted.',
                    'success'
                    ).then(()=> {
                        // Delete in resource
                        this.$store.dispatch('deleteApiDetail')
                    })
                }
            })
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

    .fas.fa-edit {
        position: absolute;
        left: 15px;
        top: 15px;
        color: #3498db;
        font-weight: bold;
        font-size: 2.5rem;
    }

    .fas.fa-edit:hover {
        color: #fff;
        cursor: pointer;
    }

    .fas.fa-trash {
        position: absolute;
        left: 80px;
        top: 15px;
        color: #3498db;
        font-weight: bold;
        font-size: 2.5rem;
    }

    .fas.fa-trash:hover {
        color: #fff;
        cursor: pointer;
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

