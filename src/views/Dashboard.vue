<template lang="html">
  <div>
    <bulma-menu></bulma-menu>
    <section class="section">
      <div class="container is-fluid">
        <router-view/>
      </div>
    </section>
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
