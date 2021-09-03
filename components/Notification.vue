<template>
  <div v-if="validated"
    :class="{'bg-red-100 border-red-400 text-red-700': notification.type === 'error', 'bg-green-100 border-green-400 text-green-700': notification.type === 'message'}"
    class='border px-4 py-3 rounded' role='alert'>
    <strong class='font-bold'>{{ notification.short }}</strong>
    <span class='block sm:inline'>{{ notification.long }}</span>
    <span class='absolute top-0 bottom-0 right-0 px-4 py-3'></span>
  </div>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },

  computed: {
    validated() {
      console.log('wat')
      if (!this.notification.short) {
        // eslint-disable-next-line no-console
        console.error('Notification validation failed', 'No short')
        return false;
      }

      if (!this.notification.long) {
        // eslint-disable-next-line no-console
        console.error('Notification validation failed', 'No long')
        return false;
      }

      if (!(this.notification.type === 'error' || this.notification.type === 'message')) {
        // eslint-disable-next-line no-console
        console.error('Notification validation failed', 'Type is not error or message')
        return false;
      }

      return true;
    }
  },

  created() {
    console.log('notification created');
  }
}
</script>

<style scoped>

</style>
