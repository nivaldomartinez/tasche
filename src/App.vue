<template>
  <div id="app">
    <element-menu></element-menu>
    <section class="section">
      <div class="container is-fluid">
        <router-view/>
      </div>
    </section>
  </div>
</template>
<!-- R66RMP -->
<script>

import ElementMenu from '@/components/Menu'

export default {
  name: 'app',
  components: {
    ElementMenu
  }
}
</script>

<style>
body {
  background-color: #F9F9F9;
}
</style>
