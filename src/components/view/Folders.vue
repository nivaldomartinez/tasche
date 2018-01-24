<template lang="html">
  <div class="columns is-multiline">
    <div class="column is-9" v-for="folder in folders" v-if="folders">
      <div class="folder" @click="onClickFolder(folder)">
        <article class="media">
          <div class="media-left">
            <figure class="image is-24x24">
              <img src="/static/folder.png" alt="folder">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong :class="{'has-text-info': folder['.key'] === selectedFolder['.key']}">{{folder['.value']}}</strong>
              </p>
            </div>
          </div>
          <div class="media-right">
            <figure class="image is-16x16">
              <img src="/static/close.png" alt="folder" @click="deleteFolder(folder['.key'])">
            </figure>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import {db} from '@/firebase'
import {defaultMixin} from '@/mixins'

export default {
  name: 'folders',
  mixins: [defaultMixin],
  created () {
    this.$bindAsArray('folders', db.ref(`folders/${this.currentUser.uid}`))
  },
  data () {
    return {
      folders: null,
      selectedFolder: {}
    }
  },
  methods: {
    onClickFolder (folder) {
      this.selectedFolder = folder
      this.$emit('selected', folder)
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
  .folder {
    cursor: pointer;
  }
</style>
