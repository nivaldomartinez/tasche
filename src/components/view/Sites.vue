<template lang="html">
  <div class="columns is-centered is-multiline">
    <div class="column is-one-third" v-for="site in sites">
      <link-prevue :url="site.url">
        <div class="card" slot-scope="props">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <object :data="props.img" type="image/png" class="image is-48x48">
                    <img src="/static/images/no-photo.png" style="background-color: transparent"/>
                  </object>
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{site.name}}</p>
              </div>
            </div>

            <div class="content">
              {{props.description}}
            </div>
            <nav class="level">
              <div class="level-left">
                <a class="level-item">
                  <a class="has-text-grey" :href="props.url" target="_blank"><i class="fa fa-external-link-square"></i></a>
                </a>
                <a class="level-item">
                  <a class="has-text-grey" @click="$router.push({name: 'editsite', params: {key:site['.key'], folder:site.folder}})"><i class="fa fa-pencil"></i></a>
                </a>
                <a class="level-item">
                  <a class="has-text-grey" @click="deleteSite(site.folder, site['.key'])"><i class="fa fa-trash"></i></a>
                </a>
              </div>
              <div class="level-right">
                <a class="level-item">
                  <a class="has-text-grey">{{ getFormattedSiteDate(site) }}</a>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </link-prevue>
    </div>
  </div>
</template>

<script>

import {db} from '@/firebase'
import LinkPrevue from 'link-prevue'
import {defaultMixin} from '@/mixins'

export default {
  name: 'sites',
  props: ['folder'],
  mixins: [defaultMixin],
  data () {
    return {
      sites: []
    }
  },
  components: {
    LinkPrevue
  },
  methods: {
    findSites () {
      this.$bindAsArray('sites', db.ref(`sites/${this.currentUser.uid}/${this.folder['.key']}`))
    },
    deleteSite (folder, site) {
      this.showDeleteConfirmation('¿Seguro que quieres eliminar el sitio?', 'is-bottom-right', () => {
        db.ref(`sites/${this.currentUser.uid}/${folder}/${site}`).remove()
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
