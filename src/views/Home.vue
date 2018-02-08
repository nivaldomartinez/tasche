<template>
  <div class="mainContainer">
    <div class="columns is-centered" v-if="isBaulEmpty && !isLoading">
      <div class="column is-half">
        <section class="section">
          <h4 class="subtitle is-4 has-text-grey has-text-centered">No tienes nada en tu baúl, empieza a agregar sitios.</h4>
          <h4 class="subtitle is-4 has-text-grey has-text-centered">Haz click en el botón <strong>Agregar</strong></h4>
        </section>
      </div>
    </div>
    <div class="columns">
      <div class="column is-2 withScroll" :class="{sidebar: !isBaulEmpty}">
        <folders @selected="onSelectFolder"></folders>
      </div>
      <div class="column withScroll" id="sites">
        <section class="section">
          <div class="container is-fluid">
            <sites :folder="selectedFolder"></sites>
          </div>
        </section>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

import {defaultMixin} from '@/mixins'
import Folders from '@/components/Folders'
import Sites from '@/components/Sites'
import {EventBus} from '@/eventbus'

export default {
  name: 'home',
  mixins: [defaultMixin],
  components: {
    Folders,
    Sites
  },
  created () {
    EventBus.$on('emptyBaul', (isEmpty) => {
      this.isBaulEmpty = isEmpty
    })

    EventBus.$on('loading', (event) => {
      this.isLoading = event
    })
  },
  data () {
    return {
      selectedFolder: null,
      menuLoading: false,
      isBaulEmpty: false,
      isLoading: false
    }
  },
  methods: {
    onSelectFolder (folder) {
      this.selectedFolder = folder
    }
  }
}
</script>

<style scoped>

  .withScroll {
    overflow-y: scroll;
    height: 95vh;
  }

  .columns {
    margin: 0px;
  }

  .mainContainer {
    height: 95vh;
  }

  @media only screen and (max-width: 768px) {
    .withScroll {
      height: 23vh;
    }
    #sites.withScroll {
        height: 67vh;
    }
    .mainContainer {
      height: 95vh;
    }
  }

  /* Scroll */
  div::-webkit-scrollbar {
    width: 0px;
  }

  div::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
      border-radius: 10px;
  }

  div::-webkit-scrollbar-thumb {
      border-radius: 0px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
  }

  .sidebar {
    background-color: #262F34;
    padding: 30px;
    padding-top: 55px;
  }
</style>
