<template lang="html">
  <div>
    <transition name="fade">
      <div class="modal" v-if="show">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'fullheight-modal',
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    }
  }
}
</script>

<style scoped>

.modal {
  display: block;
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.99);
}

.hidden {
  display: none;
}

</style>
