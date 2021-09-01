<template>
<div></div>
</template>

<script>
export default {
  data() {
    return {

    }
  },

  mounted() {
    this.logout();
  },

  methods: {
    async logout() {
      const logoutResponse = await this.$axios.$post(`/api/${'logout'}`).then(res => {
        console.log(res);
        return res;
      });
      console.log(logoutResponse);

      await this.$router.push('/')
    },
  },
}
</script>
