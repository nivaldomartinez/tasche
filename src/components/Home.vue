<template>
  <div>
    <div class="columns">
      <div class="column is-6">
        <div class="column is-four-fifths" v-for="folder in folders">
          <div class="box">
            <article class="media">
              <div class="media-left">
                <figure class="image is-64x64">
                  <img src="https://image.flaticon.com/icons/png/128/148/148953.png" alt="folder">
                </figure>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{{folder.name}}</strong>
                  </p>
                </div>
                <nav class="level">
                  <div class="level-left">
                    <a class="level-item">
                      <a class="button is-info is-small" @click="$router.push({name: 'edit', params: {key:el['.key']}})">Editar</a>
                    </a>
                    <a class="level-item">
                      <a class="button is-small" @click="$router.push({name: 'edit', params: {key:el['.key']}})">Eliminar</a>
                    </a>
                  </div>
                </nav>
              </div>
            </article>
          </div>
        </div>
      </div>
      <div class="column is-6">
        <div class="columns is-centered is-multiline">
          <div class="column is-half" v-for="el in elements">
            <link-prevue :url="el.url">
              <div class="box" slot-scope="props">
                <article class="media">
                  <div class="media-left">
                    <figure class="image is-64x64">
                      <img :src="props.img" :alt="props.title" style="background-color:transparent;">
                    </figure>
                  </div>
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>{{el.name}}</strong>
                        <br>
                        {{props.description}}
                      </p>
                    </div>
                    <nav class="level">
                      <div class="level-left">
                        <a class="level-item">
                          <a class="button is-info is-small" @click="$router.push({name: 'edit', params: {key:el['.key']}})">Editar</a>
                        </a>
                        <a class="level-item">
                          <a class="button is-small" @click="$router.push({name: 'edit', params: {key:el['.key']}})">Eliminar</a>
                        </a>
                      </div>
                    </nav>
                  </div>
                </article>
              </div>
            </link-prevue>
          </div>
        </div>
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
      elements: null,
      folders: null
    }
  },
  firebase: {
    elements: db.ref('sites'),
    folders: db.ref('folders')
  }
}
</script>
