<template lang="html">
  <div>
    <bulma-menu></bulma-menu>
    <router-view/>
  </div>
</template>

<script>

import BulmaMenu from '@/views/Menu'
export default {
  name: 'dashboard',
  components: {
    BulmaMenu
  }
}
</script>
