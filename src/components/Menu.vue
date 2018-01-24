<template lang="html">
  <section>
    <nav class="navbar is-info menu-gradient">
      <div class="navbar-brand">
        <router-link active-class="is-active" class="navbar-item" to="/dashboard">
          <figure class="image is-32x32 menu-img">
            <img src="/static/images/logo-white.png" alt="Image">
          </figure>
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
        <div class="navbar-end">
          <div class="navbar-item has-dropdown" :class="{'is-active': isActiveDropDown}">
            <a class="navbar-link" @click="toogleDropDown">
              <figure class="image is-32x32 menu-img">
                <img :src="currentUser.photo" alt="Image">
              </figure>
              {{ currentUser.name }}
            </a>
            <div class="navbar-dropdown">
              <a class="navbar-item" @click="logout">
                Cerrar Sesión
              </a>
            </div>
          </div>
          <div class="navbar-item">

          </div>
        </div>
      </div>
    </nav>
  </section>
</template>

<script>
import { auth } from '@/firebase'
export default {
  name: 'element-menu',
  data () {
    return {
      isMenuActive: false,
      currentUser: JSON.parse(localStorage.getItem('user')),
      isActiveDropDown: false
    }
  },
  methods: {
    activeMenu () {
      this.isMenuActive = !this.isMenuActive
    },
    toogleDropDown () {
      this.isActiveDropDown = !this.isActiveDropDown
    },
    logout () {
      auth.signOut().then(() => {
        localStorage.removeItem('user')
        this.$router.push('/')
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  .menu-img img{
    border-radius: 16px;
  }

  .menu-img {
    margin-right: 10px;
  }

  .menu-gradient {
    background-image: -webkit-linear-gradient(left, #167df0 0%, #6a11cb 100%);
    background-image: -o-linear-gradient(left, #167df0 0%, #6a11cb 100%);
    background-image: linear-gradient(to right, #167df0 0%, #6a11cb 100%);
  }

  .navbar.is-info .navbar-end > a.navbar-item:hover,
  .navbar.is-info .navbar-end > a.navbar-item.is-active,
  .navbar.is-info .navbar-end .navbar-link:hover,
  .navbar.is-info .navbar-end .navbar-link.is-active {
    background-color: #6a11cb;
    color: white;
  }

  .navbar.is-info .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #6a11cb;
    color: white;
  }
</style>
