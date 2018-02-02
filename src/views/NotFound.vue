<template lang="html">
  <section class="hero is-fullheight">
    <div class="hero-body columns is-centered">
      <div class="column is-3 has-text-centered">
        <h1 class="title">Ups! Te perdiste</h1>
        <h1 class="title notfoundtext">404</h1>
        <p class="title is-6">No entres en panico, y asegurate de volver de forma segura</p>
        <button class="button is-info" @click="$router.push('/')"> Volver a salvo </button>
      </div>
    </div>
  </section>
  <!-- don't panic, and make sure to watch your oxygen level -->
</template>

<script>
export default {
  name: 'notfound'
}
</script>

<style scoped>
  .notfoundtext {
    font-size: 100px;
    background: -webkit-linear-gradient(left, #167df0 0%, #6a11cb 100%);
    background: -o-linear-gradient(left, #167df0 0%, #6a11cb 100%);
    background: linear-gradient(to right, #167df0 0%, #6a11cb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
