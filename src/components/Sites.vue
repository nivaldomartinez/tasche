<template lang="html">
  <div class="columns is-centered is-multiline">
    <div class="column is-12" v-if="sites.length === 0 && folder['.key'] === 'starred'">
      <h4 class="subtitle is-4 has-text-grey has-text-centered">No has marcado ningún sitio como favorito.</h4>
      <h4 class="subtitle is-4 has-text-grey has-text-centered">Haz click en el botón <strong><i class="fas fa-star"></i></strong> del sitio para marcarlo como favorito.</h4>
    </div>
    <div class="column is-12" v-if="sites.length === 0 && folder['.key'] !== 'starred' && folder['.key'] !== 'all'">
      <h4 class="subtitle is-4 has-text-grey has-text-centered">Carpeta vacía.</h4>
    </div>
    <div class="column is-one-third" v-for="site in sites">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <progressive-img :src="site.imageurl" fallback="/static/images/no-photo.png"/>
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{site.name}}</p>
            </div>
          </div>

          <div class="content">
            {{site.description}}
          </div>
          <nav class="level">
            <div class="level-left">
              <a class="level-item">
                <a class="has-text-grey" :href="site.url" target="_blank"><i class="fas fa-external-link-square-alt"></i></a>
              </a>
              <a class="level-item">
                <a class="has-text-grey" @click="$router.push({name: 'editsite', params: {key:site['.key'], folder:site.folder}})"><i class="fas fa-edit"></i></a>
              </a>
              <a class="level-item">
                <a :class="[site.isfavorite ? 'has-text-warning' : 'has-text-grey']" @click="setFavorite(site)"><i class="fas fa-star"></i></a>
              </a>
            </div>
            <div class="level-right">
              <a class="level-item">
                <a class="has-text-grey">{{ getFormattedSiteDate(site) }}</a>
              </a>
              <a class="level-item">
                <a class="has-text-grey" @click="deleteSite(site.folder, site['.key'])"><i class="fas fa-trash"></i></a>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {db} from '@/firebase'
import {defaultMixin} from '@/mixins'
import {EventBus} from '@/eventbus'

export default {
  name: 'sites',
  props: ['folder'],
  mixins: [defaultMixin],
  data () {
    return {
      sites: []
    }
  },
  methods: {
    findSites () {
      EventBus.$emit('loading', true)
      if (this.folder['.key'] === 'all') {
        this.$bindAsArray('sites', db.ref(`sites/${this.currentUser.uid}`), null, () => {
          EventBus.$emit('loading', false)
        })
      } else if (this.folder['.key'] === 'starred') {
        this.$bindAsArray('sites', db.ref(`sites/${this.currentUser.uid}`).orderByChild('isfavorite').equalTo(true), null, () => {
          EventBus.$emit('loading', false)
        })
      } else {
        this.$bindAsArray('sites', db.ref(`sites/${this.currentUser.uid}`).orderByChild('folder').equalTo(this.folder['.key']), null, () => {
          EventBus.$emit('loading', false)
        })
      }
    },
    deleteSite (folder, site) {
      this.showDeleteConfirmation('¿Seguro que quieres eliminar el sitio?', 'is-bottom-right', () => {
        db.ref(`sites/${this.currentUser.uid}/${site}`).remove()
        this.showNotification('Se eliminó correctamente', false)
      })
    },
    getFormattedSiteDate (site) {
      if (site.timestamp === undefined || site.timestamp === '') {
        return ''
      }
      const date = new Date(site.timestamp)
      let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      return `${day}/${month}/${date.getFullYear()}`
    },
    setFavorite (site) {
      db.ref(`sites/${this.currentUser.uid}/${site['.key']}/isfavorite`).set(!site.isfavorite)
    }
  },
  watch: {
    folder () {
      this.findSites()
    }
  }
}
</script>

<style scoped>
  .card {
    border-radius: 10px;
  }
</style>
