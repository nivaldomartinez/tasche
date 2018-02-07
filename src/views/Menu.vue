<template lang="html">
  <section>
    <nav class="navbar is-info menu-gradient">
      <div class="navbar-brand">
        <router-link active-class="is-active" class="navbar-item" to="/dashboard">
          <figure class="image is-32x32 logo">
            <img src="/static/images/logo-white.png" alt="Tasche">
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
          <router-link class="navbar-item" :to="{name: 'addsite'}"
          v-tooltip.right.notrigger="tooltipMenu">
          <i class="fa fa-file-alt" style="margin-right:10px" @click="file = ''"></i><p @click="file = ''">Agregar</p></router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              <div class="image is-32x32 profile-photo" :style="{ backgroundImage: `url('${currentUser.photo}')` }"></div>
              {{ currentUser.name }}
            </a>
            <div class="navbar-dropdown">
              <router-link :to="{name: 'profile'}" class="navbar-item">
                Perfil
              </router-link>
              <a class="navbar-item" @click="logout">
                Cerrar Sesión
              </a>
            </div>
          </div>
          <div class="navbar-item" v-if="isLoading">
            <loader :isMarginLess="true"></loader>
          </div>
        </div>
      </div>
    </nav>
  </section>
</template>

<script>
import { auth } from '@/firebase'
import {EventBus} from '@/eventbus'
import {tutorialMixin} from '@/mixins'
import Loader from '@/components/Loader'

export default {
  name: 'bulma-menu',
  mixins: [tutorialMixin],
  created () {
    this.file = 'menu'
    EventBus.$on('loading', (event) => {
      this.isLoading = event
    })
    EventBus.$on('userChanged', (user) => {
      this.currentUser = user
    })
  },
  data () {
    return {
      isMenuActive: false,
      currentUser: JSON.parse(localStorage.getItem('user')),
      isLoading: false
    }
  },
  components: {
    Loader
  },
  methods: {
    activeMenu () {
      this.isMenuActive = !this.isMenuActive
    },
    logout () {
      auth.signOut().then(() => {
        localStorage.clear()
        this.$router.push('/')
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  .logo {
    margin-right: 10px;
  }

  .navbar {
    z-index: 3;
  }

  .profile-photo {
    background-color: #F1F1F1;
    margin-right: 10px;
    border-radius: 50%;
    background-size: 32px 32px;
    background-position: center;
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

  .navbar.is-info .navbar-item.has-dropdown:hover .navbar-link,
  .navbar.is-info .navbar-item.has-dropdown.is-active .navbar-link{
    background-color: #6a11cb;
    color: white;
  }
</style>