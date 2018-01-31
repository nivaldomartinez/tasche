<template lang="html">
  <div>
    <transition name="fade">
      <div class="modal" v-if="modalActive">
        <section class="hero is-fullheight section">
          <div class="hero-header">
            <div class="level">
              <div class="level-item"></div>
              <div class="level-item">
                <h1 class="title is-12 has-text-info" v-if="getKey() === undefined">Nuevo Sitio</h1>
                <h1 class="title is-12 has-text-info" v-if="getKey() !== undefined">Editar Sitio</h1>
              </div>
              <div class="level-item">
                <a href="javascript:;" @click="cancelModal">
                  <i class="has-text-grey-light subtitle el-icon-close"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="hero-body">
            <div class="container is-widescreen has-text-centered">
              <div class="columns is-centered">
                <div class="column is-4">
                  <el-form ref="siteform" :model="selected" :rules="rules">
                    <el-form-item prop="name">
                      <el-input v-model="selected.name" placeholder="Agrega un nombre" suffix-icon="el-icon-edit" :disabled="isLoading"></el-input>
                    </el-form-item>
                    <el-form-item prop="url">
                      <el-input placeholder="Agrega una url" suffix-icon="el-icon-share" :disabled="isLoading" v-model="selected.url" @blur="getLinkPreview"></el-input>
                    </el-form-item>
                    <el-form-item prop="description">
                      <el-input type="textarea" :rows="4" placeholder="Agrega una descripcion al sitio" v-model="selected.description" :disabled="isLoading"></el-input>
                    </el-form-item>
                    <el-form-item prop="folder">
                      <el-select @change="changef" filterable allow-create v-model="selected.folder" placeholder="Carpeta" :disabled="isLoading" style="width: 100%" no-data-text="No hay carpetas creadas">
                        <el-option v-for="folder in folders" :key="folder['.key']" :label="folder['.value']" :value="folder['.key']">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <div class="field is-grouped">
                        <p class="control">
                          <a class="button is-info" :class="{'is-loading':isLoading}" @click="onClickSaveButton">Guardar</a>
                        </p>
                        <p class="control">
                          <a class="button" :disabled="isLoading" @click="cancelModal">Cancelar</a>
                        </p>
                      </div>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </transition>
  </div>
</template>

<script>

import {db} from '@/firebase'
import {defaultMixin} from '@/mixins'

export default {
  name: 'add',
  mixins: [defaultMixin],
  created () {
    this.currentUser = JSON.parse(localStorage.getItem('user'))
    this.$bindAsArray('folders', db.ref(`folders/${this.currentUser.uid}`))
    window.addEventListener('keyup', this.cancelModal)
  },
  mounted () {
    if (this.getKey() !== undefined && this.getFolder() !== undefined) {
      this.$bindAsObject('selected', db.ref(`sites/${this.currentUser.uid}/${this.getFolder()}`).child(this.getKey()), null, () => {
        this.modalActive = true
      })
    } else {
      this.modalActive = true
    }
  },
  data () {
    return {
      selected: {
        name: null,
        url: null,
        folder: null,
        description: '',
        imageurl: null,
        timestamp: null
      },
      rules: {
        name: [
          { required: true, message: 'Por favor agrega un nombre', trigger: 'change' }
        ],
        url: [
          { required: true, message: 'Por favor agrega una url', trigger: 'change' },
          { validator: this.validateUrl, trigger: 'change' }
        ],
        folder: [
          { required: true, message: 'Por favor selecciona o agrega una carpeta', trigger: 'change' }
        ]
      },
      modalActive: false,
      isLoading: false,
      folders: null,
      newFolderName: ''
    }
  },
  methods: {
    onClickSaveButton () {
      this.$refs.siteform.validate((valid) => {
        if (valid) {
          if (this.getKey() !== undefined) {
            this.editSite()
          } else {
            this.saveSite()
          }
        } else {
          return false
        }
      })
    },
    saveSite () {
      this.isLoading = true
      this.selected.folder = this.lowerFolder
      this.selected.timestamp = new Date().getTime()
      const reference = db.ref(`sites/${this.currentUser.uid}/${this.selected.folder}`)
      const key = reference.push().key
      reference.child(key).update(this.selected).then(() => {
        this.isLoading = false
        this.saveFolder()
        this.showNotification('Sitio agregado correctamente', false)
        this.$router.push('/dashboard')
      }).catch(() => {
        this.isLoading = false
        this.showNotification('Ocurrio un error al guardar', true)
      })
    },
    editSite () {
      this.isLoading = true
      this.selected.folder = this.lowerFolder
      const reference = db.ref(`sites/${this.currentUser.uid}/${this.selected.folder}`)
      delete this.selected['.key']
      reference.child(this.getKey()).update(this.selected).then(() => {
        this.isLoading = false
        this.saveFolder()
        this.showNotification('Sitio editado correctamente', false)
        this.removeOld()
      }).catch(() => {
        this.isLoading = false
        this.showNotification('Ocurrio un error al guardar', true)
      })
    },
    cancelModal (event) {
      if (!this.isLoading) {
        if (event.key !== undefined && event.key !== 'Escape') {
          return
        }

        this.$router.push('/dashboard')
      }
    },
    removeOld () {
      if (this.selected.folder !== this.getFolder()) {
        db.ref(`sites/${this.currentUser.uid}`).child(this.getFolder()).child(this.getKey()).remove()
      }

      this.cancelModal({})
    },
    getKey () {
      return this.$route.params.key
    },
    getFolder () {
      return this.$route.params.folder
    },
    validateUrl (rule, value, callback) {
      const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
      if (regex.test(value)) {
        callback()
      } else {
        callback(new Error('Por favor agrega una url válida'))
      }
    },
    saveFolder () {
      if (this.newFolderName !== '') {
        db.ref(`folders/${this.currentUser.uid}/${this.selected.folder.toLowerCase()}`).set(this.newFolderName)
      }
    },
    changef (event) {
      if (this.selected.folder !== this.lowerFolder) {
        this.newFolderName = event
      }
    },
    getLinkPreview () {
      const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
      if (this.selected.description === '' || this.selected.description === undefined) {
        if (regex.test(this.selected.url)) {
          this.isLoading = true
          this.httpRequest((response) => {
            const prevue = JSON.parse(response)
            this.isLoading = false
            this.selected.description = prevue.description
            this.selected.imageurl = prevue.images.length > 0 ? prevue.images[0] : ''
          })
        }
      }
    },
    httpRequest (success, error) {
      const http = new XMLHttpRequest()
      const params = 'url=' + this.selected.url
      http.open('POST', 'https://linkpreview-api.herokuapp.com', true)
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      http.onreadystatechange = function () {
        if (http.readyState === 4) {
          switch (http.status) {
            case 200:
              success(http.responseText)
              break
            default:
              error()
          }
        }
      }
      http.send(params)
    }
  },
  computed: {
    lowerFolder () {
      return this.selected.folder.toLowerCase()
    }
  }
}
</script>

<style scoped>
.modal {
  display: block;
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
}

.hidden {
  display: none;
}
</style>
