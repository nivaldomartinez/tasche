<template lang="html">
  <div class="hero is-fullheight">
    <div class="hero-body columns is-centered">
      <div class="column is-one-quarter has-text-centered">
        <img src="/static/images/typelogo.png" alt="tasche" width="90%">
        <p class="subtitle is-6">Entrar con</p>
        <button class="loginBtn loginBtn--google" :disabled="isLoading" @click="onLoginButtonClick('google')">Google</button>
        <button class="loginBtn loginBtn--twitter" :disabled="isLoading" @click="onLoginButtonClick('twitter')">Twitter</button>
        <button class="loginBtn loginBtn--github" :disabled="isLoading" @click="onLoginButtonClick('github')">Github</button>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-1">
        <loader color="#868686" v-if="isLoading"></loader>
      </div>
    </div>
  </div>
</template>

<script>

import {db, auth, googleProvider, twitterProvider, githubProvider} from '@/firebase'
import {defaultMixin} from '@/mixins'
import Loader from '@/components/Loader'

export default {
  mixins: [defaultMixin],
  created () {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.$router.push('/dashboard')
    }
  },
  components: {
    Loader
  },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    loginWith (provider) {
      auth.signInWithPopup(provider).then((result) => {
        this.getUserData(result.user.uid, (success, user) => {
          this.isLoading = true
          if (success) {
            localStorage.setItem('user', JSON.stringify(user))
            this.isLoading = false
            this.showNotification(`Entraste como ${result.user.displayName}`, false)
            this.$router.push('/dashboard')
          } else {
            db.ref('profile').child(result.user.uid).update(this.prepareUser(result.user)).then(() => {
              this.isLoading = false
              localStorage.setItem('tutorial', 'true')
              this.showNotification(`Te registraste como ${result.user.displayName}`, false)
              this.$router.push('/dashboard')
            })
          }
        })
      }).catch((error) => {
        this.showNotification(error.message, true)
      })
    },
    onLoginButtonClick (btn) {
      let provider
      switch (btn) {
        case 'google':
          provider = googleProvider
          break
        case 'twitter':
          provider = twitterProvider
          break
        case 'github':
          provider = githubProvider
          break
      }

      this.loginWith(provider)
    },
    prepareUser (dbuser) {
      let user = {}
      user.name = dbuser.displayName
      user.email = dbuser.email
      user.photo = dbuser.photoURL
      user.phone = dbuser.phoneNumber
      user.uid = dbuser.uid

      return user
    },
    getUserData (userId, callback) {
      db.ref('profile').child(userId).once('value', (snapshot) => {
        // eslint-disable-next-line
        callback((snapshot.val() !== null), snapshot.val())
      })
    }
  }
}
</script>

<style scoped>

/* Shared */
.loginBtn {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #FFF;
  cursor: pointer;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}

/* Twitter */
.loginBtn--twitter {
  background: #00aced;
}
.loginBtn--twitter:before {
  border-right: #0084b4 1px solid;
  background: url('/static/images/twitter-icon.png') 6px 6px no-repeat;
}
.loginBtn--twitter:hover,
.loginBtn--twitter:focus {
  background: #1dcaff;
}

/* Github */

.loginBtn--github {
  background: #24292e;
}
.loginBtn--github:before {
  border-right: #000 1px solid;
  background: url('/static/images/github-icon.png') 6px 6px no-repeat;
}
.loginBtn--github:hover,
.loginBtn--github:focus {
  background: #2b3137;
}

/* Google */
.loginBtn--google {
  background: #DD4B39;
}
.loginBtn--google:before {
  border-right: #BB3F30 1px solid;
  background: url('/static/images/google-icon.png') 6px 6px no-repeat;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #E74B37;
}
</style>
