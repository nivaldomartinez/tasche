<template lang="html">
  <div>
    <div class="columns is-centered is-multiline" v-if="folder && !isBaulEmpty">
      <div class="column is-12 empty-state" v-if="hasNotSites && folder['.key'] === 'all' && !isBaulEmpty">
        <img width="200" src="/static/images/sites-empty.svg"/>
        <h4 class="subtitle is-4 mt-5 has-text-grey has-text-centered">No tienes sitios creados, agrega un sitio ahora.</h4>
        <router-link :to="{name: 'addsite'}">
          <a class="button is-info">Agregar Sitio</a>
        </router-link>
      </div>
      <div class="column is-12 empty-state" v-if="hasNotSites && folder['.key'] === 'starred' && !isBaulEmpty">
        <img width="200" src="/static/images/fave.svg"/>
        <h4 class="subtitle is-4 mt-5 has-text-grey has-text-centered">No has marcado ningún sitio como favorito.</h4>
        <h4 class="subtitle is-4 has-text-grey has-text-centered">Haz click en el botón <strong><i class="fas fa-heart fave-icon has-text-danger"></i></strong> del sitio para marcarlo como favorito.</h4>
      </div>
      <div class="column is-12 empty-state" v-if="hasNotSites && folder['.key'] === 'trash' && !isBaulEmpty">
        <img width="300" src="/static/images/trash.svg"/>
        <h4 class="subtitle is-4 has-text-grey has-text-centered mt-5">Tu papelera vacía.</h4>
      </div>
      <div class="column is-12 empty-state" v-if="hasNotSites && folder['.key'] !== 'starred' && folder['.key'] !== 'all' && folder['.key'] !== 'trash'">
        <img width="200" src="/static/images/sites-empty.svg"/>
        <h4 class="subtitle is-4 mt-5 has-text-grey has-text-centered">Carpeta vacía.</h4>
        <router-link :to="{name: 'addsite'}">
          <a class="button is-info">Agregar Sitio</a>
        </router-link>
      </div>
    </div>
    <div class="empty-state" v-if="!folder && !isBaulEmpty">
      <img width="300" src="/static/images/unselected-folder.svg"/>
      <h4 class="subtitle mt-4 is-4 has-text-grey has-text-centered">Selecciona una carpeta para ver los sitios guardados.</h4>
    </div>
    <div class="columns is-centered" v-if="isBaulEmpty && hasNotSites">
        <div class="column is-half empty-state">
        <section class="empty-baul-state">
            <img width="200" src="/static/images/sites-empty.svg"/>
            <h4 class="subtitle is-4 has-text-grey has-text-centered mt-5">No tienes nada en tu baúl, empieza a agregar sitios.</h4>
            <router-link :to="{name: 'addsite'}">
            <a class="button is-info">Agregar Sitio</a>
            </router-link>
        </section>
        </div>
    </div>
  </div>
</template>

<script>

import {EventBus} from '@/eventbus'

export default {
  name: 'empty-state',
  props: ['folder', 'isBaulEmpty'],
  created () {
    EventBus.$on('hasNotSites', (hasntSites) => {
      this.hasNotSites = hasntSites
    })
  },
  data () {
    return {
      hasNotSites: true
    }
  }
}
</script>

<style scoped>
  .empty-state {
    text-align: center;
  }

  .fave-icon {
    font-size: 18px;
  }
</style>