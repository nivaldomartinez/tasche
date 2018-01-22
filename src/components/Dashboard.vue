<template lang="html">
  <div>
    <element-menu></element-menu>
    <section class="section">
      <div class="container is-fluid">
        <router-view/>
      </div>
    </section>
  </div>
</template>

<script>

import ElementMenu from '@/components/Menu'
export default {
  name: 'dashboard',
  components: {
    ElementMenu
  }
}
</script>
