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
          <router-link class="navbar-item" :to="{name: 'add'}">Agregar</router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <a class="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="http://localhost:4000" target="_blank" href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=http://localhost:4000&amp;via=jgthms">
                  <span class="icon">
                    <i class="fa fa-twitter"></i>
                  </span>
                  <span>
                    Tweet
                  </span>
                </a>
              </p>
            </div>
          </div>
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
