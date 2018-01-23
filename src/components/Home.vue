<template>
  <div>
    <div class="columns">
      <div class="column is-5">
        <div class="column is-four-fifths" v-for="folder in folders">
          <div class="box folder" @click="findSitesByFolder(folder)">
            <article class="media">
              <div class="media-left">
                <figure class="image is-64x64">
                  <img src="https://image.flaticon.com/icons/png/128/148/148953.png" alt="folder">
                </figure>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{{folder['.value']}}</strong>
                  </p>
                </div>
                <a class="button is-small" @click="deleteFolder(folder['.key'])">Eliminar</a>
              </div>
            </article>
          </div>
        </div>
      </div>
      <div class="column is-7">
        <div class="columns is-centered is-multiline">
          <p class="subtitle is-5" v-if="sites.length <= 0">Selecciona una carpeta</p>
          <div class="column is-half" v-for="site in sites">
            <link-prevue :url="site.url">
              <div class="card" slot-scope="props">
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img :src="props.img" :alt="props.title" style="background-color:transparent;">
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
                        <a class="button is-small" :href="props.url" target="_blank">Ver</a>
                      </a>
                      <a class="level-item">
                        <a class="button is-info is-small" @click="$router.push({name: 'editsite', params: {key:site['.key'], folder:site.folder}})">Editar</a>
                      </a>
                      <a class="level-item">
                        <a class="button is-small" @click="deleteSite(site.folder, site['.key'])">Eliminar</a>
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
            </link-prevue>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {db} from '@/firebase'
import LinkPrevue from 'link-prevue'
import {defaultMixin} from '@/mixins'

export default {
  name: 'home',
  mixins: [defaultMixin],
  created () {
    this.currentUser = JSON.parse(localStorage.getItem('user'))
    this.$bindAsArray('folders', db.ref(`folders/${this.currentUser.uid}`))
  },
  components: {
    LinkPrevue
  },
  data () {
    return {
      sites: [],
      folders: null,
      currentUser: null
    }
  },
  methods: {
    findSitesByFolder (folder) {
      this.$bindAsArray('sites', db.ref(`sites/${this.currentUser.uid}/${folder['.key']}`))
    },
    deleteSite (folder, site) {
      this.showDeleteConfirmation('¿Seguro que quieres eliminar el sitio?', 'is-bottom-right', () => {
        db.ref(`sites/${this.currentUser.uid}/${folder}/${site}`).remove()
        this.showNotification('Se eliminó correctamente', false)
      })
    },
    deleteFolder (folder) {
      this.showDeleteConfirmation('¿Seguro que quieres eliminar la carpeta? Se eliminarán todos los sitios de la carpeta', 'is-bottom-left', () => {
        db.ref(`sites/${this.currentUser.uid}/${folder}`).remove()
        db.ref(`folders/${this.currentUser.uid}/${folder}`).remove()
        this.showNotification('Se eliminó correctamente', false)
      })
    }
  }
}
</script>

<style scoped>
  .box.folder {
    cursor: pointer;
  }
</style>
