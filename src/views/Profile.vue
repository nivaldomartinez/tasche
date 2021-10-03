<template>
  <fullheight-modal :show="true">
    <section class="hero is-fullheight section">
      <div class="hero-header">
        <div class="level">
          <div class="level-item"></div>
          <div class="level-item">
            <h1 class="title is-12 has-text-info gradient-title">Mi Perfil</h1>
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
              <figure class="image is-128x128 is-centered-image" @click="onClickImage" >
              <progressive-background class="image is-128x128 is-centered-image" :src="currentUser.photo" fallback="/static/images/no-photo.png"/>
                <i class="fa fa-pencil-alt edit-button"></i>
              </figure>
              <input type="file" accept="image/*" ref="fileInput" @change="onSelectFile" v-show="false">
              <el-form ref="siteform" :model="currentUser" :rules="rules">
                <el-form-item prop="name">
                  <el-input v-model="currentUser.name" placeholder="Escribe tu nombre" suffix-icon="el-icon-edit" :disabled="isLoading"></el-input>
                </el-form-item>
                <el-form-item prop="email">
                  <el-input placeholder="Email" suffix-icon="el-icon-message" :disabled="true" v-model="currentUser.email"></el-input>
                </el-form-item>
                <el-form-item prop="phone">
                  <el-input placeholder="Agrega tu telefono" suffix-icon="el-icon-phone" :disabled="isLoading" v-model="currentUser.phone"></el-input>
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
  </fullheight-modal>
</template>

<script>

import FullheightModal from '@/components/FullheightModal'
import {defaultMixin} from '@/mixins'
import {db, storage} from '@/firebase'
import {EventBus} from '@/eventbus'

export default {
  name: 'profile',
  mixins: [defaultMixin],
  components: { FullheightModal },
  created () {
    window.addEventListener('keyup', this.cancelModal)
  },
  data () {
    return {
      isLoading: false,
      rules: {
        name: [
          { required: true, message: 'Por favor agrega tu nombre', trigger: 'change' }
        ]
      },
      dropFiles: []
    }
  },
  methods: {
    cancelModal (event) {
      if (!this.isLoading) {
        if (event !== undefined) {
          if (event.key !== undefined && event.key !== 'Escape') {
            return
          }
        }

        this.$router.push('/dashboard')
      }
    },
    onClickImage () {
      this.$refs.fileInput.click()
    },
    onSelectFile (event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0]
        const ref = storage.ref(`profiles/${this.currentUser.uid}`)
        this.isLoading = true
        ref.put(file).then(async (snapshot) => {
          this.isLoading = false
          this.currentUser.photo = await ref.getDownloadURL()
          localStorage.setItem('user', JSON.stringify(this.currentUser))
          this.onClickSaveButton(false)
          this.showNotification('Se actualizó tu foto de perfil', false)
          this.emitChanges()
        }).catch((e) => {
          this.isLoading = false
          console.log(e)
          this.showNotification('Ocurrió un error por favor intentalo mas tarde', true)
        })
      }
    },
    onClickSaveButton (showUpdateProfile = true) {
      this.isLoading = true
      db.ref('profile').child(this.currentUser.uid).update(this.currentUser).then(() => {
        this.isLoading = false
        if (showUpdateProfile) {
          localStorage.setItem('user', JSON.stringify(this.currentUser))
          this.showNotification('Se actualizó tu perfil', false)
          this.emitChanges()
          this.cancelModal()
        }
      }).catch(() => {
        this.isLoading = false
        this.showNotification('Ocurrió un error por favor intentalo mas tarde', true)
      })
    },
    emitChanges () {
      EventBus.$emit('userChanged', this.currentUser)
    }
  }

}
</script>

<style scoped>
.is-centered-image {
  margin: 0 auto;
  margin-bottom: 70px;
  cursor: pointer;
  border-radius: 50% !important;
  border: 0.5px solid #E3E3E3;
  background-size: 128px 128px;
  background-position: center;
}

.edit-button {
  position: absolute;
  right: 10px;
  bottom: 2px;
  background-color: white;
  padding: 5px;
  border-radius: 100px;
  border: 1px solid #E3E3E3;
  color: #868686;
  z-index: 1;
}
</style>
