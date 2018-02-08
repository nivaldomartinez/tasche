<template lang="html">
  <div class="columns is-multiline" v-if="folders.length !== 0">
    <div class="column is-12 folder" @click="onClickFolder(item)" v-for="item in menuItems" :class="{'is-active':item['.key'] === selectedFolder['.key']}">
      <article class="media">
        <div class="media-left">
          <i class="fa" :class="[
            item['.key'] === selectedFolder['.key'] ? 'has-text-white' : 'has-text-grey-light',
            item.icon]"></i>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong :class="[item['.key'] === selectedFolder['.key'] ? 'has-text-white' : 'has-text-grey-light']">{{item.name}}</strong>
            </p>
          </div>
        </div>
      </article>
    </div>
    <h6 class="subtitle is-6 has-text-grey-light" style="margin-top: 20px; margin-bottom: 20px">Carpetas</h6>
    <div class="column is-12 folder"  @click="onClickFolder(folder)" v-for="folder in folders" :class="{'is-active':folder['.key'] === selectedFolder['.key']}">
      <article class="media">
        <div class="media-left">
          <i class="fa fa-folder" :class="{
            'has-text-white':folder['.key'] === selectedFolder['.key'],
            'has-text-grey-light':folder['.key'] !== selectedFolder['.key']
            }"></i>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong :class="{
                'has-text-white':folder['.key'] === selectedFolder['.key'],
                'has-text-grey-light':folder['.key'] !== selectedFolder['.key']
                }">{{folder['.value']}}</strong>
            </p>
          </div>
        </div>
        <div class="media-right">
          <figure class="image is-16x16">
            <img src="/static/images/close.png" alt="folder" @click="deleteFolder(folder['.key'])">
          </figure>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import {db} from '@/firebase'
import {defaultMixin} from '@/mixins'
import {EventBus} from '@/eventbus'

export default {
  name: 'folders',
  mixins: [defaultMixin],
  created () {
    EventBus.$emit('loading', true)
    this.$bindAsArray('folders', db.ref(`folders/${this.currentUser.uid}`), null, () => {
      EventBus.$emit('loading', false)
    })
  },
  data () {
    return {
      folders: null,
      selectedFolder: {},
      menuItems: [{name: 'Todos', '.key': 'all', icon: 'fa-paperclip'}, {name: 'Favoritos', '.key': 'starred', icon: 'fa-star'}],
      deleteSites: []
    }
  },
  methods: {
    onClickFolder (folder) {
      this.selectedFolder = folder
      this.$emit('selected', folder)
    },
    deleteFolder (folder) {
      this.showDeleteConfirmation('¿Seguro que quieres eliminar la carpeta? Se eliminarán todos los sitios de la carpeta', 'is-bottom-left', () => {
        this.$bindAsArray('deleteSites', db.ref(`sites/${this.currentUser.uid}`).orderByChild('folder').equalTo(folder), null, () => {
          EventBus.$emit('loading', true)
          this.deleteSites.forEach((site) => {
            db.ref(`sites/${this.currentUser.uid}/${site['.key']}`).remove()
          })
          db.ref(`folders/${this.currentUser.uid}/${folder}`).remove()
          this.showNotification('Se eliminó correctamente', false)
          EventBus.$emit('loading', false)
        })
      })
    }
  },
  watch: {
    folders (value) {
      if (value.length > 0) {
        EventBus.$emit('emptyBaul', false)
      } else {
        EventBus.$emit('emptyBaul', true)
      }
    }
  }
}
</script>

<style>
  .folder {
    cursor: pointer;
  }

  .folder.is-active {
    background-color: rgba(22, 125, 240, 1);
  }

  .folder.is-active:hover {
    background-color: rgba(22, 125, 240, 1);
  }

  .folder:hover {
    background-color: rgba(22, 125, 240, 0.5);
  }
</style>
