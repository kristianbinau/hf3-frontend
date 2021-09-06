<template>
  <div class="fixed top-3 right-3 flex flex-col">
      <notification v-for='notification in notifications' :key="notification.id" :notification="notification"></notification>
  </div>
</template>

<script>
export default {
  props: {
    setNotification: {
      type: Object,
      required: false,
      default: null,
    },
  },

  data() {
    return {
      notifications: {},
    }
  },

  watch: {
    setNotification(val) {
      if (val === null) {
        return;
      }

      console.log('New Notification')

      this.addNotification(val);
    },
  },

  methods: {
    addNotification(notification) {
      const notificationIndex = (Math.random() + 1).toString(36).substring(7);
      this.$set(this.notifications, notificationIndex, {
        id: notificationIndex,
        short: notification.short,
        long: notification.long,
        type: notification.type,
      })

      setTimeout(() => {
        this.$delete(this.notifications, notificationIndex)
      }, notification.timeout ? notification.timeout : 5000);
    }
  }
}
</script>

<style scoped>

</style>
