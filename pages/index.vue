<template>
  <div></div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user
    }
  },

  created() {
    if (this.user === null) {
      this.$router.push('/login')
    }
  },
}
</script>
