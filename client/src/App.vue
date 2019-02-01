<template>
  <div id="app">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
    
    <!-- Title -->
    <h1>Mooi webservice lijstje voor Bas</h1>
    <h2> - xoxo Joey</h2>

    <!-- Add resource button -->
    <i @click="this.toggleAdd" class="fas fa-plus-circle"></i>
    
    <!-- Data overview -->
    <List :items="this.data.items.slice(((this.currentPage - 1) * 5),5 * this.currentPage)" />
    
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
import Swal from 'sweetalert2'

export default {
  name: 'app',
  created() {
    this.$store.dispatch('loadApiData')
  },
  methods: {
    toggleAdd() {
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
      }).queue([
        {
          title: 'What is the name of the artist?',
          input: 'text',
          inputValidator: (value) => {
            return !value && 'Artist without name? Interesting...'
          },
          text: 'Please let it be a good one',
          onOpen: this.$store.commit('setAudioToggle'),
          onAfterClose: () => {this.$store.commit('setAudioToggle')}
        },
        {
          title: 'What is the age of the artist?',
          input: 'text',
          inputValidator: (value) => {
            return !value && 'Please tell me how old...'
          },
          text: 'If dead please answer: its over 9000',
          onAfterClose: () => {this.$store.commit('setAudioToggle')}
        },
        {
          title: 'Something lovely about the artist?',
          text: 'e.g She likes to tattoo 七輪 on her hand',
          input: 'textarea',
          inputValidator: (value) => {
            return !value && 'Please write something nice.'
          },
        },
      ]).then((result) => {
        if (result.value) {
          this.$store.dispatch('addApiDetail', result.value)
          Swal.fire({
            title: 'All done!',
            type: 'success',
            confirmButtonText: 'Nice!',
            backdrop: `rgba(0,0,123,0.4)
            url("https://sweetalert2.github.io/images/nyan-cat.gif")
            center left
            no-repeat`,
            onAfterClose: () => {this.$store.commit('setAudioToggle')}
          })
        }
      })
    }
  },
  computed: mapState([
    'data',
    'detailShow',
    'currentItemId',
    'audioToggle',
    'currentPage'
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

.fas.fa-plus-circle {
    position: absolute;
    right: 15px;
    top: 25px;
    color: #1abc9c;
    font-weight: bold;
    font-size: 2.5rem;
}

.fas.fa-plus-circle:hover {
    color: #16a085;
    cursor: pointer;
}
</style>
