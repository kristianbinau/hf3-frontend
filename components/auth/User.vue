<template>
<div></div>
</template>

<script>
export default {
  created() {
    this.getUser();
  },

  methods: {
    async getUser() {
      const vm = this
      /* Request logged in user */
      return await this.$axios.get(`https://hf3.binau.dev/${'api/user'}`)
        .then(res => {
          /* User is logged in */
          if (res.status === 200) {
            vm.$store.commit('setUser', res.data)
            return res.data
          }

          /* User is not logged in */
          vm.$store.commit('setUser', null)
          vm.$router.push('/login');
          return null
        })
        .catch(function (error) {
          /* Endpoint failure or.. */
          /* User is not logged in */
          vm.$store.commit('setUser', null)
          vm.$router.push('/login');
          return error
        })
    },
  }
}
</script>

<style scoped>

</style>
