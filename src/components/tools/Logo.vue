<template>
  <div class="logo">
    <router-link :to="{name:'dashboard'}">
      <img src="/favicon.png" alt="logo">
      <h1 v-if="showTitle">
        {{ title }}
      </h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  components: {
  },
  props: {
    title: {
      type: String,
      default: 'Uncrash Pro',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
