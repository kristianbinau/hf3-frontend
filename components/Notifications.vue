<template>
  <div class="fixed top-3 right-3 flex flex-col">
    <notification v-for="(notification, index) in notifications" :key="index" :notification="notification"></notification>
  </div>
</template>

<script>
export default {
  components: { Notification },
  props: {
    setNotification: {
      type: Object,
      required: false,
      default: null,
    },
  },

  data() {
    return {
      notifications: [],
    }
  },

  watch: {
    setNotification(val) {
      if (val === null) {
        return;
      }

      this.addNotification(val);
    },
  },

  methods: {
    addNotification(notification) {
      console.log(notification);
      const notificationIndex = this.notifications.length;
      this.notifications[notificationIndex] = {
        short: notification.short,
        long: notification.long,
        type: notification.type,
      };
      setTimeout(() => {
        this.notifications.splice(notificationIndex, 1);
      }, notification.timeout ? notification.timeout : 5000);
    }
  }
}
</script>

<style scoped>

</style>
