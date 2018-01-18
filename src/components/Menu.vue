<template lang="html">
  <section>
    <nav class="navbar is-info">
      <div class="navbar-brand">
        <router-link active-class="is-active" class="navbar-item" to="/">
          <h1><strong>Tasche</strong></h1>
        </router-link>
        <div :class="{'is-active':isMenuActive}" class="navbar-burger burger" @click="activeMenu" data-target="menu-tasche">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="menu-tasche" :class="{'is-active':isMenuActive}" class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" :to="{name: 'addsite'}">Agregar</router-link>
        </div>
      </div>
    </nav>
  </section>
</template>

<script>
export default {
  name: 'element-menu',
  data () {
    return {
      isMenuActive: false
    }
  },
  methods: {
    activeMenu () {
      this.isMenuActive = !this.isMenuActive
    }
  }
}
</script>
