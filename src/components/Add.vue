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
                  <el-form ref="form" :model="selected">
                    <el-form-item>
                      <el-input v-model="selected.name" placeholder="Agrega un nombre" suffix-icon="el-icon-edit" :disabled="isLoading"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-input placeholder="Agrega una url" suffix-icon="el-icon-share" :disabled="isLoading" v-model="selected.url"></el-input>
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

export default {
  name: 'add',
  created () {
    window.addEventListener('keyup', this.cancelModal)
  },
  mounted () {
    if (this.getKey() !== undefined) {
      this.$bindAsObject('selected', db.ref('sites').child(this.getKey()), null, () => {
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
        url: null
      },
      modalActive: false,
      isLoading: false
    }
  },
  methods: {
    onClickSaveButton () {
      if (this.getKey() !== undefined) {
        this.editAction()
      } else {
        this.saveAction()
      }
    },
    saveAction () {
      const key = db.ref('sites').push().key
      this.isLoading = true
      db.ref('sites').child(key).update(this.selected).then(() => {
        this.isLoading = false
        this.$router.replace({name: 'edit', params: {key}})
      }).catch(() => {
        this.isLoading = false
      })
    },
    editAction () {
      this.isLoading = true
      delete this.selected['.key']
      db.ref('sites').child(this.getKey()).update(this.selected).then(() => {
        this.isLoading = false
      }).catch(() => {
        this.isLoading = false
      })
    },
    cancelModal (event) {
      if (!this.isLoading) {
        if (event.key !== undefined && event.key !== 'Escape') {
          return
        }

        this.$router.push('/')
      }
    },
    getKey () {
      return this.$route.params.key
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
</style>
