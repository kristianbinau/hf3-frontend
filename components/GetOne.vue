<template>
  <div class='m-20'>
    <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900 capitalize">{{ name }}</h3>
            <p class="mt-1 text-sm text-gray-600">
              {{ description }}
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
            <div class="shadow overflow-hidden sm:rounded-md">
              <template v-if="request">
                <addresses-form v-if="name === 'addresses'" :address-object="request" ></addresses-form>
                <customers-form v-if="name === 'customers'" :customer-object="request" ></customers-form>
                <products-form v-if="name === 'products'" :product-object="request" ></products-form>
              </template>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rowId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    route: {
      type: String,
      required: false,
      default: undefined
    }
  },

  data() {
    return {
      request: null,
      url: this.route !== undefined ? this.route : `/api/${'api/' + this.name + '/' + this.rowId}`
    }
  },

  async fetch() {
    if (this.rowId === 'create') {
      this.request = {};
      return;
    }

    this.request = await fetch(this.url).then(res => {
      return res.json()
    })
  },
}
</script>

<style lang='scss' scoped>

</style>
