<template>
  <div class="mainContainer">
    <div class="columns" v-if="!isMobileDevice">
      <div class="column is-one-fifth withScroll">
        <folders @selected="onSelectFolder"></folders>
      </div>
      <div class="column withScroll" id="sites">
        <sites :folder="selectedFolder"></sites>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {db} from '@/firebase'
import {defaultMixin} from '@/mixins'
import Folders from '@/components/view/Folders'
import Sites from '@/components/view/Sites'

export default {
  name: 'home',
  mixins: [defaultMixin],
  components: {
    Folders,
    Sites
  },
  data () {
    return {
      selectedFolder: null
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
    height: 86vh;
  }

  .mainContainer {
    height: 85vh;
  }

  @media only screen and (max-width: 768px) {
    .withScroll {
      height: 10vh;
    }
    #sites.withScroll {
        height: 75vh;
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
</style>
