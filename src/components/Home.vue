<template>
  <div>
    <div class="columns">
      <div class="column" v-for="el in elements">
        <link-prevue :url="el.url">
        <div class="card" slot-scope="props">
          <header class="card-header">
            <p class="card-header-title">
              {{el.name}}
            </p>
          </header>
          <div class="card-image" v-if="props.img">
            <figure class="image is-4by3">
              <img :src="props.img" :alt="props.title">
            </figure>
          </div>

          <div class="card-content">
            <div class="content">
              {{props.description}}
            </div>
          </div>
          <footer class="card-footer">
            <router-link class="card-footer-item" :to="{name: 'edit', params: {key: el['.key']}}">Editar</router-link>
            <a href="#" class="card-footer-item">Delete</a>
          </footer>
          </div>
        </link-prevue>
      </div>
    </div>
    <pre>{{$data}}</pre>
    <router-view></router-view>
  </div>
</template>

<script>
import {db} from '@/firebase'
import LinkPrevue from 'link-prevue'

export default {
  name: 'home',
  components: {
    LinkPrevue
  },
  data () {
    return {
      elements: null
    }
  },
  firebase: {
    elements: db.ref('sites')
  }
}
</script>
