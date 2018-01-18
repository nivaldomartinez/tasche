<template>
  <div>
    <div class="columns">
      <div class="column is-6">
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
      <div class="column is-6">
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

export default {
  name: 'home',
  components: {
    LinkPrevue
  },
  data () {
    return {
      sites: [],
      folders: null
    }
  },
  methods: {
    findSitesByFolder (folder) {
      this.$bindAsArray('sites', db.ref('sites/' + folder['.key']))
    },
    deleteSite (folder, site) {
      this.$snackbar.open({
        message: '¿Seguro que quieres eliminar el sitio?',
        type: 'is-danger',
        position: 'is-bottom-right',
        actionText: 'Eliminar',
        queue: false,
        onAction: () => {
          db.ref(`sites/${folder}/${site}`).remove()
          this.$toast.open({
            message: 'Se eliminó correctamente',
            queue: false,
            position: 'is-bottom',
            type: 'is-info'
          })
        }
      })
    },
    deleteFolder (folder) {
      this.$snackbar.open({
        message: '¿Seguro que quieres eliminar la carpeta? Se eliminarán todos los sitios de la carpeta',
        type: 'is-danger',
        position: 'is-bottom-left',
        actionText: 'Eliminar',
        queue: false,
        onAction: () => {
          db.ref(`sites/${folder}`).remove()
          db.ref(`folders/${folder}`).remove()
          this.$toast.open({
            message: 'Se eliminó correctamente',
            queue: false,
            position: 'is-bottom',
            type: 'is-info'
          })
        }
      })
    }
  },
  firebase: {
    folders: db.ref('folders')
  }
}
</script>

<style scoped>
  .box.folder {
    cursor: pointer;
  }
</style>
