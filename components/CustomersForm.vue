<template>
  <div>
    <notifications :set-notification="notification"></notifications>

    <div class="px-4 py-5 bg-white sm:p-6">
      <div class="grid grid-cols-6 gap-6">
        <div class="col-span-6 sm:col-span-3">
          <label for="id" class="block text-sm font-medium text-gray-700">Id</label>
          <input id="id" v-model="customer.id" disabled type="text" name="id" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>

        <div class="col-span-6 sm:col-span-3">
          <label for="login-id" class="block text-sm font-medium text-gray-700">Login Id</label>
          <input id="login-id" v-model="customer.login_id" type="text" name="login-id" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>

        <div class="col-span-6 sm:col-span-3">
          <label for="address-id" class="block text-sm font-medium text-gray-700">Address Id</label>
          <input id="address-id" v-model="customer.address_id" type="text" name="address-id" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>

        <div class="col-span-6">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input id="name" v-model="customer.name" type="text" name="name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>

        <div class="col-span-6">
          <label for="created_at" class="block text-sm font-medium text-gray-700">Created At</label>
          <input id="created_at" v-model="customer.created_at" disabled type="text" name="created_at" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>

        <div class="col-span-6">
          <label for="updated_at" class="block text-sm font-medium text-gray-700">Updated At</label>
          <input id="updated_at" v-model="customer.updated_at" disabled type="text" name="updated_at" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
      </div>
    </div>
    <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
      <button class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit" @click="save">
        Save
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    customerObject: {
      type: Object,
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
      customer: {
        id: '',
        login_id: '',
        address_id: '',
        name: '',
        updated_at: '',
        created_at: '',
      },
      url: this.route !== undefined ? this.route : `/api/${'api/customers'}`,
      notification: null,
    }
  },

  created() {
    if (!(this.customerObject && Object.keys(this.customerObject).length === 0 && this.customerObject.constructor === Object)) {
      this.customer = this.customerObject
    }
  },

  methods: {
    save() {
      if (this.customerObject && Object.keys(this.customerObject).length === 0 && this.customerObject.constructor === Object) {
        // Create
        this.create();
      } else {
        // Update
        this.update();
      }
    },

    create() {
      this.$axios.post(this.url, {
        'login_id': this.customer.login_id,
        'address_id': this.customer.address_id,
        'name': this.customer.name,
      })
        .then(res => {
          if (res.status === 200) {
            this.notification = {
              short: 'Success!',
              long: 'Customer was created successfully',
              type: 'message',
            }
          }
        })
    },

    update() {
      const data = {
        'login_id': this.customer.login_id,
        'address_id': this.customer.address_id,
        'name': this.customer.name,
      };

      if (this.customerObject.login_id === this.customer.login_id) {
        data.login_id = undefined
      }

      this.$axios.patch(this.url + '/' + this.customerObject.id, data)
        .then(res => {
          if (res.status === 200) {
            this.notification = {
              short: 'Success!',
              long: 'Customer was updated successfully',
              type: 'message',
            }
          }
        })
    },
  }
}
</script>

<style lang='scss' scoped>

</style>
