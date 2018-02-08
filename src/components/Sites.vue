<template lang="html">
  <div class="columns is-centered is-multiline" v-if="folder && !isBaulEmpty">
    <div class="column is-12" v-if="sites.length === 0 && folder['.key'] === 'starred' && !isBaulEmpty">
      <h4 class="subtitle is-4 has-text-grey has-text-centered">No has marcado ningún sitio como favorito.</h4>
      <h4 class="subtitle is-4 has-text-grey has-text-centered">Haz click en el botón <strong><i class="fas fa-star"></i></strong> del sitio para marcarlo como favorito.</h4>
    </div>
    <div class="column is-12" v-if="sites.length === 0 && folder['.key'] === 'trash' && !isBaulEmpty">
      <h4 class="subtitle is-4 has-text-grey has-text-centered">Papelera vacía.</h4>
    </div>
    <div class="column is-12" v-if="sites.length === 0 && folder['.key'] !== 'starred' && folder['.key'] !== 'all' && folder['.key'] !== 'trash'">
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
          <nav class="level" v-if="folder['.key'] !== 'trash'">
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
                <a class="has-text-grey" @click="deleteSite(site)"><i class="fas fa-trash"></i></a>
              </a>
            </div>
          </nav>
          <nav class="level" v-if="folder['.key'] === 'trash'">
            <div class="level-left">
              <a class="level-item">
                <a class="has-text-grey" @click="rescueSite(site)"><i class="fas fa-save"></i></a>
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
  props: ['folder', 'isBaulEmpty'],
  mixins: [defaultMixin],
  data () {
    return {
      sites: []
    }
  },
  methods: {
    findSites () {
      EventBus.$emit('loading', true)
      switch (this.folder['.key']) {
        case 'all':
          this.$bindAsArray('sites', db.ref(`sites/${this.currentUser.uid}`))
          break
        case 'starred':
          this.$bindAsArray('sites', db.ref(`sites/${this.currentUser.uid}`).orderByChild('isfavorite').equalTo(true))
          break
        case 'trash':
          this.$bindAsArray('sites', db.ref(`trashes/${this.currentUser.uid}`))
          break
        default:
          this.$bindAsArray('sites', db.ref(`sites/${this.currentUser.uid}`).orderByChild('folder').equalTo(this.folder['.key']))
      }

      EventBus.$emit('loading', false)
    },
    deleteSite (site) {
      this.showDeleteConfirmation('¿Seguro que quieres eliminar el sitio?', 'is-bottom-right', () => {
        db.ref(`sites/${this.currentUser.uid}/${site['.key']}`).remove()
        // set on trash
        const refTrash = `trashes/${this.currentUser.uid}/${site['.key']}`
        delete site['.key']
        db.ref(refTrash).set(site)
        this.showNotification('Se eliminó correctamente', false)
      })
    },
    rescueSite (site) {
      db.ref(`trashes/${this.currentUser.uid}/${site['.key']}`).remove()
      // set on sites
      db.ref(`folders/${this.currentUser.uid}/${site.folder}`).once('value', (snapshot) => {
        if (snapshot.val() === null) {
          db.ref(`folders/${this.currentUser.uid}/${site.folder}`).set(site.folder)
        }
        const refSite = `sites/${this.currentUser.uid}/${site['.key']}`
        delete site['.key']
        db.ref(refSite).set(site)
        this.showNotification('Recuperaste el sitio', false)
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
    folder (value) {
      if (value !== null) {
        this.findSites()
      }
    }
  }
}
</script>

<style scoped>
  .card {
    border-radius: 10px;
  }
</style>
