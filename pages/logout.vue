<template>
<div></div>
</template>

<script>
export default {
  data() {
    return {

    }
  },

  computed: {
    user() {
      return this.$store.state.user
    }
  },

  created() {
    this.logout();
  },

  methods: {
    async logout() {
      if (this.user === null) {
        await this.$router.push('/')
        return;
      }

      await this.$axios.post(`/api/${'logout'}`).then(res => {
        /* Logout successful */
        if (res.status === 204) {
          this.$store.commit('setUser', null)
          this.$router.push('/')
          return;
        }

        // eslint-disable-next-line no-console
        console.error('Logout failed', res);
      });
    },
  },
}
</script>
