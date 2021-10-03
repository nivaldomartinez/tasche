<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<!-- R66RMP -->

<script>
export default {
  name: 'app',
  mounted() {
    // check for active theme
    const htmlElement = document.documentElement
    const theme = localStorage.getItem('theme')

    if (theme === 'dark') {
      htmlElement.setAttribute('theme', 'dark')
    } else {
      htmlElement.setAttribute('theme', 'light')
    }
  }
}
</script>

<style>

.vue-tooltip.menu {
  background-color: #F9F9F9;
  color: #333230;
}
.vue-tooltip.menu .tooltip-arrow {
  border-color: #F9F9F9;
}

.vue-tooltip.info {
  background-color: #167df0;
}
.vue-tooltip.info .tooltip-arrow {
  border-color: #167df0;
}

.gradient-title {
  font-size: 40px;
  background: -webkit-linear-gradient(left, #167df0 0%, #6a11cb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}

.gradient-title.display {
  font-size: 72px;
  font-family: 'Work Sans', sans-serif;
}
</style>
