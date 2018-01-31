<template lang="html">
<div id="loader-container" style="width:100%">
  <div class="loader" :class="{'is-marginless':isMarginLess}" :style="'border: '+fill+' solid '+color+'; border-right-color: transparent;'"></div>
</div>
</template>

<script>
export default {
  name: 'loader',
  props: {
    color: {
      type: String,
      default: '#fff'
    },
    fill: {
      type: String,
      default: '5px'
    },
    isMarginLess: {
      type: Boolean,
      default: false
    }
  }

}
</script>

<style scoped>
/* Loader */
.loader {
  margin: 50px;
  height: 28px;
  height: 28px;
  width: 28px;
  animation: rotate 0.8s infinite linear;
  border-radius: 50%;
}

@keyframes rotate {
  0%    { transform: rotate(0deg); }
  100%  { transform: rotate(360deg); }
}
</style>
